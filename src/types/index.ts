export type UserRole = 'BUYER' | 'SELLER' | 'AGENT' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  location?: string;
  bio?: string;
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED';
  joinedDate: string;
}

export type PropertyType = 'Apartment' | 'Independent Villa' | 'Residential Plot' | 'Commercial Showroom' | 'Duplex Penthouse';
export type ListingType = 'SALE' | 'RENT';
export type PropertyStatus = 'APPROVED' | 'PENDING_APPROVAL' | 'REJECTED' | 'FEATURED' | 'SOLD';

export interface Property {
  id: string;
  title: string;
  tagline?: string;
  propertyType: PropertyType;
  listingType: ListingType;
  price: number; // in INR
  priceDisplay: string; // e.g. "₹1.45 Cr" or "₹35,000 / month"
  pricePerUnit: string; // e.g. "₹5,200 / sq.ft" or "₹42,000 / sq.yd"
  locality: string;
  city: string;
  address: string;
  bedrooms?: number;
  bathrooms?: number;
  areaSqFt?: number;
  areaSqYards?: number;
  facing: 'East' | 'North' | 'West' | 'South' | 'North-East';
  furnishing: 'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished';
  possessionStage: 'Ready to Move' | 'Under Construction' | 'Immediate';
  reraApproved: boolean;
  reraNumber?: string;
  crdaApproved?: boolean;
  images: string[];
  description: string;
  amenities: string[];
  featured?: boolean;
  status: PropertyStatus;
  agentId: string;
  agentName: string;
  agentPhone: string;
  agentAvatar: string;
  createdAt: string;
  viewsCount: number;
  inquiriesCount: number;
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  agency: string;
  phone: string;
  email: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  reraRegistrationNumber: string;
  operationalLocalities: string[];
  activeListingsCount: number;
  dealsClosed: number;
  bio: string;
}

export interface Inquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyPrice: string;
  propertyImage: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  message: string;
  date: string;
  status: 'NEW' | 'REPLIED' | 'SCHEDULED' | 'CLOSED';
}

export interface Appointment {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  locality: string;
  date: string;
  timeSlot: string;
  type: 'In-Person Site Visit' | 'Virtual Video Walkthrough';
  clientName: string;
  clientPhone: string;
  agentName: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'PRICE_DROP' | 'NEW_MATCH' | 'APPOINTMENT' | 'INQUIRY' | 'SYSTEM';
  link?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  category: 'SECURITY' | 'MODERATION' | 'PROPERTY' | 'USER_MANAGEMENT';
  userId: string;
  userName: string;
  role: UserRole;
  targetResource: string;
  details: string;
  ipAddress: string;
  timestamp: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
}

