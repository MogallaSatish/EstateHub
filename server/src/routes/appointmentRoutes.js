import express from 'express';
import { Appointment } from '../models/Appointment.js';
import { Property } from '../models/Property.js';

const router = express.Router();

// @route   GET /api/appointments
// @desc    Get appointments list
// @access  Public / Private
router.get('/', async (req, res, next) => {
  try {
    const { status, clientPhone } = req.query;
    const query = {};

    if (status && status !== 'ALL') query.status = status;
    if (clientPhone) query.clientPhone = clientPhone;

    const appointments = await Appointment.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/appointments
// @desc    Schedule on-site inspection or virtual walkthrough
// @access  Public
router.post('/', async (req, res, next) => {
  try {
    const { 
      propertyId, 
      date, 
      timeSlot, 
      type, 
      clientName, 
      clientPhone,
      locality,
      propertyTitle,
      propertyImage 
    } = req.body;

    if (!propertyId || !date || !timeSlot || !clientName || !clientPhone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: propertyId, date, timeSlot, clientName, and clientPhone.',
      });
    }

    let resolvedTitle = propertyTitle || 'Verified Property';
    let resolvedLocality = locality || 'Vijayawada';
    let resolvedImage = propertyImage || '';
    let resolvedAgent = 'Venkatesh Naidu';

    try {
      const property = await Property.findById(propertyId);
      if (property) {
        resolvedTitle = property.title;
        resolvedLocality = property.locality;
        resolvedImage = property.images[0] || '';
        resolvedAgent = property.agentName;
      }
    } catch (e) {
      // Use provided fallback data
    }

    const appointment = await Appointment.create({
      propertyId,
      propertyTitle: resolvedTitle,
      propertyImage: resolvedImage,
      locality: resolvedLocality,
      date,
      timeSlot,
      type: type || 'In-Person Site Visit',
      clientName,
      clientPhone,
      agentName: resolvedAgent,
      status: 'CONFIRMED',
    });

    res.status(201).json({
      success: true,
      data: appointment,
      message: 'Inspection booked successfully. Confirmation details sent via SMS.',
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/appointments/:id/status
// @desc    Update appointment status (CONFIRMED, COMPLETED, CANCELLED)
// @access  Public / Private
router.put('/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: `Appointment not found with ID ${req.params.id}`,
      });
    }

    res.json({
      success: true,
      data: appointment,
      message: `Appointment ${status.toLowerCase()} successfully.`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;

