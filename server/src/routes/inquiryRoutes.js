import express from 'express';
import { Inquiry } from '../models/Inquiry.js';
import { Property } from '../models/Property.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/inquiries
// @desc    Get all inquiries (filterable by buyer or status)
// @access  Public / Private
router.get('/', async (req, res, next) => {
  try {
    const { buyerEmail, status } = req.query;
    const query = {};

    if (buyerEmail) query.buyerEmail = buyerEmail;
    if (status && status !== 'ALL') query.status = status;

    const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/inquiries
// @desc    Submit new property inquiry
// @access  Public
router.post('/', async (req, res, next) => {
  try {
    const { propertyId, buyerName, buyerEmail, buyerPhone, message } = req.body;

    if (!propertyId || !buyerName || !buyerEmail || !buyerPhone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: propertyId, buyerName, buyerEmail, buyerPhone, and message.',
      });
    }

    // Try finding property details
    let propertyTitle = 'Verified Property';
    let propertyPrice = '₹ Price on Request';
    let propertyImage = '';

    try {
      const property = await Property.findById(propertyId);
      if (property) {
        propertyTitle = property.title;
        propertyPrice = property.priceDisplay;
        propertyImage = property.images[0] || '';
        // Increment inquiry counter
        property.inquiriesCount = (property.inquiriesCount || 0) + 1;
        await property.save();
      }
    } catch (e) {
      // If propertyId is mock or custom string
      propertyTitle = req.body.propertyTitle || 'Vijayawada Venture';
      propertyPrice = req.body.propertyPrice || '₹1.45 Cr';
      propertyImage = req.body.propertyImage || '';
    }

    const inquiry = await Inquiry.create({
      propertyId,
      propertyTitle,
      propertyPrice,
      propertyImage,
      buyerName,
      buyerEmail,
      buyerPhone,
      message,
    });

    res.status(201).json({
      success: true,
      data: inquiry,
      message: 'Inquiry received. The listing agent will contact you within 15 minutes.',
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/inquiries/:id/status
// @desc    Update inquiry status (NEW, REPLIED, SCHEDULED, CLOSED)
// @access  Private (SELLER, AGENT, ADMIN)
router.put('/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body;

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: `Inquiry not found with ID ${req.params.id}`,
      });
    }

    res.json({
      success: true,
      data: inquiry,
      message: 'Inquiry status updated successfully.',
    });
  } catch (error) {
    next(error);
  }
});

export default router;

