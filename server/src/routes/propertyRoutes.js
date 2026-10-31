import express from 'express';
import { Property } from '../models/Property.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Helper to format numeric price into Indian notation
const formatPrice = (val) => {
  if (val >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  }
  return `₹${(val / 100000).toFixed(2)} L`;
};

// @route   GET /api/properties
// @desc    Get all properties with multi-faceted filtering & sorting
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { 
      search, 
      propertyType, 
      listingType, 
      locality, 
      reraApproved, 
      minPrice, 
      maxPrice, 
      sort,
      featured,
      limit = 50 
    } = req.query;

    const query = {};

    // Text search or regex match
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { locality: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (propertyType && propertyType !== 'ALL') {
      query.propertyType = propertyType;
    }

    if (listingType && listingType !== 'ALL') {
      query.listingType = listingType;
    }

    if (locality && locality !== 'ALL') {
      query.locality = { $regex: locality, $options: 'i' };
    }

    if (reraApproved === 'true') {
      query.reraApproved = true;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Default status: APPROVED listings only for public view (unless explicitly querying)
    if (!req.query.status) {
      query.status = { $in: ['APPROVED', 'FEATURED'] };
    } else if (req.query.status !== 'ALL') {
      query.status = req.query.status;
    }

    let sortOption = { featured: -1, createdAt: -1 };
    if (sort === 'price-low') sortOption = { price: 1 };
    if (sort === 'price-high') sortOption = { price: -1 };
    if (sort === 'newest') sortOption = { createdAt: -1 };

    const properties = await Property.find(query)
      .sort(sortOption)
      .limit(Number(limit));

    res.json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/properties/:id
// @desc    Get single property by ID
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: `Property not found with ID ${req.params.id}`,
      });
    }

    // Increment view count asynchronously
    Property.findByIdAndUpdate(req.params.id, { $inc: { viewsCount: 1 } }).exec();

    res.json({
      success: true,
      data: property,
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/properties
// @desc    Create new property listing
// @access  Private (SELLER, AGENT, ADMIN)
router.post('/', protect, authorize('SELLER', 'AGENT', 'ADMIN'), async (req, res, next) => {
  try {
    const propertyData = { ...req.body };

    // Auto-generate priceDisplay if not supplied
    if (!propertyData.priceDisplay && propertyData.price) {
      propertyData.priceDisplay = formatPrice(propertyData.price);
    }

    // Assign creating agent/user info
    if (req.user) {
      propertyData.agentId = req.user._id || req.user.id;
      propertyData.agentName = req.user.name;
      propertyData.agentPhone = req.user.phone;
    }

    const property = await Property.create(propertyData);

    res.status(201).json({
      success: true,
      data: property,
      message: 'Property listing created successfully.',
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/properties/:id
// @desc    Update property details
// @access  Private (SELLER, AGENT, ADMIN)
router.put('/:id', protect, authorize('SELLER', 'AGENT', 'ADMIN'), async (req, res, next) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: `Property not found with ID ${req.params.id}`,
      });
    }

    const updates = { ...req.body };
    if (updates.price) {
      updates.priceDisplay = formatPrice(updates.price);
    }

    property = await Property.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: property,
      message: 'Property updated successfully.',
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/properties/:id
// @desc    Delete a property listing
// @access  Private (SELLER, ADMIN)
router.delete('/:id', protect, authorize('SELLER', 'ADMIN'), async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: `Property not found with ID ${req.params.id}`,
      });
    }

    await property.deleteOne();

    res.json({
      success: true,
      message: 'Property deleted successfully from database.',
    });
  } catch (error) {
    next(error);
  }
});

export default router;

