import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

// Protect routes - JWT verification
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Authentication token required.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'estatehub_secret_key_ap_rera_2026_production');
    
    // Find user by id (if DB is connected)
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      // In offline/mock fallback mode
      req.user = { id: decoded.id, role: decoded.role, name: decoded.name };
    } else {
      req.user = user;
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token verification failed or expired. Please sign in again.',
    });
  }
};

// Authorize by specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Role '${req.user ? req.user.role : 'GUEST'}' is not authorized to access this resource.`,
      });
    }
    next();
  };
};

