import CommunicationLog from '../models/communicationLog.model.js';
import Campaign from '../models/campaign.model.js';
import Customer from '../models/customers.model.js';
import mongoose from 'mongoose';

const buildMongoQuery = (conditions, logicOperator) => {
    const queries = conditions.map(condition => {
        switch(condition.field) {
            case 'lastVisited':
                return {
                    [condition.field]: {
                        [condition.operator === '>' ? '$gt' : '$lt']: new Date(condition.value)
                    }
                };
            default:
                return {
                    [condition.field]: {
                        [translateOperator(condition.operator)]: condition.value
                    }
                };
        }
    });

    return {
        [logicOperator === 'AND' ? '$and' : '$or']: queries
    };
};

const translateOperator = (operator) => {
    const operatorMap = {
        '>': '$gt',
        '<': '$lt',
        '>=': '$gte',
        '<=': '$lte',
        '==': '$eq',
        '!=': '$ne'
    };
    return operatorMap[operator];
};

export const sendCampaignMessages = async (campaignId) => {
    try {
        const campaign = await Campaign.findById(campaignId)
            .populate('segmentId');
        
        if (!campaign) {
            throw new Error('Campaign not found');
        }

        // Build query from segment conditions
        const query = buildMongoQuery(
            campaign.segmentId.conditions, 
            campaign.segmentId.logicOperator
        );
        
        // Get customers matching segment criteria
        const customers = await Customer.find(query);
        
        const logs = await Promise.all(customers.map(customer => 
            createCommunicationLog(campaign, customer)
        ));
        
        // Process messages
        const results = await Promise.all(logs.map(log => 
            processMessage(log)
        ));
        
        // Update campaign metrics
        const sentCount = results.filter(r => r.status === 'SENT').length;
        const failedCount = results.filter(r => r.status === 'FAILED').length;
        
        await Campaign.findByIdAndUpdate(campaignId, {
            status: 'SENT',
            sentAt: new Date(),
            metrics: {
                delivered: sentCount,
                failed: failedCount,
                total: results.length
            }
        });
        
        return results;
    } catch (error) {
        throw new Error(`Error sending campaign messages: ${error.message}`);
    }
};


const createCommunicationLog = async (campaign, customer) => {
    const message = `Hi ${customer.name}, here's 10% off on your next order!`;
    
    return await CommunicationLog.create({
        campaignId: campaign._id,
        customerId: customer._id,
        message: message,
        status: 'PENDING'
    });
};

const processMessage = async (log) => {
    try {
        const isSuccessful = Math.random() < 0.9;
        const status = isSuccessful ? 'SENT' : 'FAILED';
        
        // Update communication log
        const updatedLog = await CommunicationLog.findByIdAndUpdate(
            log._id,
            {
                status: status,
                deliveredAt: isSuccessful ? new Date() : null
            },
            { new: true }
        );
        
        return updatedLog;
    } catch (error) {
        throw new Error(`Error processing message: ${error.message}`);
    }
};

export const getCampaignStats = async (campaignId) => {
    try {
        const stats = await CommunicationLog.aggregate([
            { 
                $match: { 
                    campaignId: new mongoose.Types.ObjectId(campaignId)
                }
            },
            { 
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);
        
        // Convert to a more readable format
        const defaultStats = {
            sent: 0,
            failed: 0,
            pending: 0
        };

        return stats.reduce((acc, curr) => {
            acc[curr._id.toLowerCase()] = curr.count;
            return acc;
        }, defaultStats);
    } catch (error) {
        throw new Error(`Error fetching campaign stats: ${error.message}`);
    }
};