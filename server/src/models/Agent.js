import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Agent name is required'],
      trim: true,
    },
    title: {
      type: String,
      default: 'Senior Property Consultant',
    },
    agency: {
      type: String,
      required: [true, 'Agency affiliation is required'],
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 1,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    experienceYears: {
      type: Number,
      default: 5,
    },
    reraRegistrationNumber: {
      type: String,
      required: [true, 'AP RERA agent registration number is required'],
      trim: true,
    },
    operationalLocalities: {
      type: [String],
      default: ['Benz Circle', 'Poranki', 'Tadepalli'],
    },
    activeListingsCount: {
      type: Number,
      default: 0,
    },
    dealsClosed: {
      type: Number,
      default: 0,
    },
    bio: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Agent = mongoose.model('Agent', agentSchema);

