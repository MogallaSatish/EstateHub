import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    propertyId: {
      type: String,
      required: true,
    },
    propertyTitle: {
      type: String,
      required: true,
    },
    propertyImage: {
      type: String,
      default: '',
    },
    locality: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: [true, 'Inspection date is required'],
    },
    timeSlot: {
      type: String,
      required: [true, 'Time slot is required'],
    },
    type: {
      type: String,
      enum: ['In-Person Site Visit', 'Virtual Video Walkthrough'],
      default: 'In-Person Site Visit',
    },
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
    },
    clientPhone: {
      type: String,
      required: [true, 'Client phone is required'],
    },
    agentName: {
      type: String,
      default: 'Venkatesh Naidu',
    },
    status: {
      type: String,
      enum: ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'],
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
  }
);

export const Appointment = mongoose.model('Appointment', appointmentSchema);

