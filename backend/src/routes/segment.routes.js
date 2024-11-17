import express from 'express';
import * as segmentController from '../controllers/segment.controller.js';

const router = express.Router();

router.post('/', segmentController.createSegment);
router.get('/', segmentController.getAllSegments);
router.get('/:segmentId/audience', segmentController.getSegmentAudience);

export default router;