import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['SECURITY', 'MODERATION', 'PROPERTY', 'USER_MANAGEMENT'],
      default: 'MODERATION',
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['BUYER', 'SELLER', 'AGENT', 'ADMIN'],
      default: 'ADMIN',
    },
    targetResource: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
      default: '127.0.0.1',
    },
    timestamp: {
      type: String,
      default: () => new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    },
    status: {
      type: String,
      enum: ['SUCCESS', 'WARNING', 'FAILED'],
      default: 'SUCCESS',
    },
  },
  {
    timestamps: true,
  }
);

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);

