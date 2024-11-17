import * as campaignService from '../services/campaign.service.js';
import * as messageService from '../services/message.service.js';

export const createCampaign = async (req, res) => {
    try {
        const campaign = await campaignService.createCampaign(req.body);
        res.status(201).json(campaign);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getCampaignsBySegment = async (req, res) => {
    try {
        const campaigns = await campaignService.getCampaignsBySegment(req.params.segmentId);
        res.json(campaigns);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const sendCampaign = async (req, res) => {
    try {
        const results = await messageService.sendCampaignMessages(req.params.campaignId);
        res.json(results);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getCampaignStats = async (req, res) => {
    try {
        const stats = await campaignService.getCampaignStats(req.params.campaignId);
        res.json(stats);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getCampaignStatistics = async (req, res) => {
    try {
        const stats = await messageService.getCampaignStats(req.params.campaignId);
        res.json(stats);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await campaignService.getAllCampaigns();
        res.json(campaigns);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateCampaignMetrics = async (req, res) => {
    try {
        const campaign = await campaignService.updateCampaignMetrics(
            req.params.campaignId,
            req.body.metrics
        );
        res.json(campaign);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};