import express from 'express';
import { Notification } from '../models/Notification.js';

const router = express.Router();

// @route   GET /api/notifications
// @desc    Get all notifications
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/notifications/mark-all-read
// @desc    Mark all notifications as read
// @access  Public
router.put('/mark-all-read', async (req, res, next) => {
  try {
    await Notification.updateMany({ read: false }, { read: true });
    res.json({
      success: true,
      message: 'All notifications marked as read.',
    });
  } catch (error) {
    next(error);
  }
});

export default router;

