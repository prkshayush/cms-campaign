import Campaign from '../models/campaign.model.js';

export const createCampaign = async (campaignData) => {
    try {
        const campaign = await Campaign.create(campaignData);
        return campaign;
    } catch (error) {
        throw new Error(`Error creating campaign: ${error.message}`);
    }
};

export const getCampaignsBySegment = async (segmentId) => {
    try {
        const campaigns = await Campaign.find({ segmentId })
            .sort({ createdAt: -1 })
            .populate('segmentId');
        return campaigns;
    } catch (error) {
        throw new Error(`Error fetching campaigns: ${error.message}`);
    }
};

export const getCampaignStats = async (campaignId) => {
    try {
        const campaign = await Campaign.findById(campaignId)
            .populate('segmentId');
        return campaign;
    } catch (error) {
        throw new Error(`Error fetching campaign stats: ${error.message}`);
    }
};

export const getAllCampaigns = async () => {
    try {
        const campaigns = await Campaign.find()
            .sort({ createdAt: -1 })
            .populate('segmentId');
        return campaigns;
    } catch (error) {
        throw new Error(`Error fetching campaigns: ${error.message}`);
    }
};

export const updateCampaignMetrics = async (campaignId, metrics) => {
    try {
        const campaign = await Campaign.findByIdAndUpdate(
            campaignId,
            { $set: { metrics }},
            { new: true }
        );
        return campaign;
    } catch (error) {
        throw new Error(`Error updating campaign metrics: ${error.message}`);
    }
};