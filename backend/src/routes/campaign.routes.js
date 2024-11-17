import express from 'express';
import * as campaignController from '../controllers/campaign.controller.js';

const router = express.Router();

router.post('/', campaignController.createCampaign);
router.get('/', campaignController.getAllCampaigns);
router.get('/segment/:segmentId', campaignController.getCampaignsBySegment);
router.get('/:campaignId', campaignController.getCampaignStats);
router.patch('/metrics/:campaignId', campaignController.updateCampaignMetrics);
router.post('/send/:campaignId', campaignController.sendCampaign);
router.get('/statistics/:campaignId', campaignController.getCampaignStatistics);

export default router;