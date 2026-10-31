import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    propertyId: {
      type: String,
      required: true,
    },
    propertyTitle: {
      type: String,
      required: true,
    },
    propertyPrice: {
      type: String,
      required: true,
    },
    propertyImage: {
      type: String,
      default: '',
    },
    buyerName: {
      type: String,
      required: [true, 'Buyer name is required'],
      trim: true,
    },
    buyerEmail: {
      type: String,
      required: [true, 'Buyer email is required'],
      trim: true,
      lowercase: true,
    },
    buyerPhone: {
      type: String,
      required: [true, 'Buyer phone number is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Inquiry message cannot be empty'],
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    },
    status: {
      type: String,
      enum: ['NEW', 'REPLIED', 'SCHEDULED', 'CLOSED'],
      default: 'NEW',
    },
  },
  {
    timestamps: true,
  }
);

export const Inquiry = mongoose.model('Inquiry', inquirySchema);

