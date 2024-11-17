import * as segmentService from '../services/segment.service.js';

export const getAllSegments = async (req, res) => {
  try {
    const segments = await segmentService.getAllSegments();
    res.status(200).json(segments);
  } catch (error) {
    res.status(500).json({ error: `Error fetching segments: ${error.message}` });
  }
};

export const createSegment = async (req, res) => {
  try {
    const segment = await segmentService.createSegment(req.body);
    res.status(201).json(segment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getSegmentAudience = async (req, res) => {
  try {
    const audience = await segmentService.getSegmentAudience(req.params.segmentId);
    res.json(audience);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};