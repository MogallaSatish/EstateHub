import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a property title'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    tagline: {
      type: String,
      default: '',
    },
    propertyType: {
      type: String,
      required: [true, 'Property type is required'],
      enum: ['Apartment', 'Independent Villa', 'Residential Plot', 'Commercial Showroom', 'Duplex Penthouse'],
    },
    listingType: {
      type: String,
      required: [true, 'Listing type is required (SALE or RENT)'],
      enum: ['SALE', 'RENT'],
      default: 'SALE',
    },
    price: {
      type: Number,
      required: [true, 'Please provide asking price in INR'],
    },
    priceDisplay: {
      type: String,
      required: true,
    },
    pricePerUnit: {
      type: String,
      default: '',
    },
    locality: {
      type: String,
      required: [true, 'Locality is required'],
      trim: true,
    },
    city: {
      type: String,
      default: 'Vijayawada',
    },
    address: {
      type: String,
      required: [true, 'Site address is required'],
    },
    bedrooms: {
      type: Number,
      default: null,
    },
    bathrooms: {
      type: Number,
      default: null,
    },
    areaSqFt: {
      type: Number,
      default: null,
    },
    areaSqYards: {
      type: Number,
      default: null,
    },
    facing: {
      type: String,
      enum: ['East', 'North', 'West', 'South', 'North-East'],
      default: 'East',
    },
    furnishing: {
      type: String,
      enum: ['Unfurnished', 'Semi-Furnished', 'Fully Furnished'],
      default: 'Unfurnished',
    },
    possessionStage: {
      type: String,
      enum: ['Ready to Move', 'Under Construction', 'Immediate'],
      default: 'Ready to Move',
    },
    reraApproved: {
      type: Boolean,
      default: true,
    },
    reraNumber: {
      type: String,
      default: '',
      trim: true,
    },
    crdaApproved: {
      type: Boolean,
      default: true,
    },
    images: {
      type: [String],
      validate: [val => val.length > 0, 'At least one image is required'],
    },
    description: {
      type: String,
      required: [true, 'Please provide property description'],
    },
    amenities: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['APPROVED', 'PENDING_APPROVAL', 'REJECTED', 'FEATURED', 'SOLD'],
      default: 'APPROVED',
    },
    agentId: {
      type: String,
      default: 'agent-1',
    },
    agentName: {
      type: String,
      default: 'Venkatesh Naidu',
    },
    agentPhone: {
      type: String,
      default: '+91 98491 12345',
    },
    agentAvatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    inquiriesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexing for performant search queries
propertySchema.index({ title: 'text', locality: 'text', description: 'text' });
propertySchema.index({ locality: 1, propertyType: 1, listingType: 1, price: 1 });

export const Property = mongoose.model('Property', propertySchema);

