import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: String,
      default: 'Just now',
    },
    read: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ['PRICE_DROP', 'NEW_MATCH', 'APPOINTMENT', 'INQUIRY', 'SYSTEM'],
      default: 'SYSTEM',
    },
    link: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Notification = mongoose.model('Notification', notificationSchema);

