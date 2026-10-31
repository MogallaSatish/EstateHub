import express from 'express';
import { Agent } from '../models/Agent.js';
import { Property } from '../models/Property.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/agents
// @desc    Get all certified real estate brokers
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { locality, search } = req.query;
    const query = {};

    if (locality && locality !== 'ALL') {
      query.operationalLocalities = { $in: [locality] };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { agency: { $regex: search, $options: 'i' } },
        { reraRegistrationNumber: { $regex: search, $options: 'i' } },
      ];
    }

    const agents = await Agent.find(query).sort({ rating: -1, dealsClosed: -1 });

    res.json({
      success: true,
      count: agents.length,
      data: agents,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/agents/:id
// @desc    Get single broker details and their active property listings
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const agent = await Agent.findById(req.params.id);

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: `Agent not found with ID ${req.params.id}`,
      });
    }

    // Fetch active listings for this agent
    const listings = await Property.find({
      $or: [{ agentId: agent._id }, { agentName: agent.name }],
      status: 'APPROVED',
    });

    res.json({
      success: true,
      data: {
        ...agent.toObject(),
        listings,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/agents
// @desc    Register a new verified broker
// @access  Private (ADMIN)
router.post('/', protect, authorize('ADMIN'), async (req, res, next) => {
  try {
    const agent = await Agent.create(req.body);

    res.status(201).json({
      success: true,
      data: agent,
      message: 'Broker registered with AP RERA certification successfully.',
    });
  } catch (error) {
    next(error);
  }
});

export default router;

