import express from 'express';
import * as campaignController from '../controllers/campaign.controller.js';

const router = express.Router();

router.post('/', campaignController.createCampaign);
router.get('/', campaignController.getAllCampaigns);
router.get('/segment/:segmentId', campaignController.getCampaignsBySegment);
router.get('/:campaignId', campaignController.getCampaignStats);
router.patch('/:campaignId/metrics', campaignController.updateCampaignMetrics);
router.post('/:campaignId/send', campaignController.sendCampaign);
router.get('/:campaignId/statistics', campaignController.getCampaignStatistics);

export default router;