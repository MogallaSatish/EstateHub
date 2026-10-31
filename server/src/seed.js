import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { User } from './models/User.js';
import { Property } from './models/Property.js';
import { Agent } from './models/Agent.js';
import { Inquiry } from './models/Inquiry.js';
import { Appointment } from './models/Appointment.js';
import { Notification } from './models/Notification.js';
import { AuditLog } from './models/AuditLog.js';

dotenv.config();

const seedData = async () => {
  const connected = await connectDB();
  if (!connected) {
    console.error('❌ Cannot seed database: MongoDB Atlas is not connected.');
    process.exit(1);
  }

  try {
    console.log('🔄 Cleaning existing collections...');
    await User.deleteMany({});
    await Property.deleteMany({});
    await Agent.deleteMany({});
    await Inquiry.deleteMany({});
    await Appointment.deleteMany({});
    await Notification.deleteMany({});
    await AuditLog.deleteMany({});

    console.log('🌱 Seeding Users...');
    await User.create([
      {
        name: 'Suresh Varma',
        email: 'suresh.varma@example.com',
        phone: '+91 98480 22334',
        password: 'password123',
        role: 'BUYER',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        location: 'Benz Circle, Vijayawada',
        bio: 'Looking for premium 3 BHK residential apartments and gated villa ventures.',
        status: 'ACTIVE',
      },
      {
        name: 'Kavitha Rao',
        email: 'kavitha.estates@example.com',
        phone: '+91 94401 55678',
        password: 'password123',
        role: 'SELLER',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        location: 'MG Road, Vijayawada',
        bio: 'Independent real estate developer & property owner with 15+ years experience in CRDA zone.',
        status: 'ACTIVE',
      },
      {
        name: 'Rajesh Goud',
        email: 'admin.rajesh@estatehub.in',
        phone: '+91 98850 99887',
        password: 'password123',
        role: 'ADMIN',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        location: 'EstateHub HQ, Vijayawada',
        bio: 'Head of Operations & RERA Compliance Auditing, EstateHub Andhra Pradesh.',
        status: 'ACTIVE',
      },
    ]);

    console.log('🌱 Seeding Agents...');
    await Agent.create([
      {
        name: 'Venkatesh Naidu',
        title: 'Senior Property Consultant',
        agency: 'Amaravati Prime Realty',
        phone: '+91 98491 12345',
        email: 'venkatesh.n@amaravatiprime.in',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
        rating: 4.9,
        reviewsCount: 128,
        experienceYears: 12,
        reraRegistrationNumber: 'APRERA/AGT/2023/0482',
        operationalLocalities: ['Benz Circle', 'Poranki', 'Tadepalli', 'Gannavaram'],
        activeListingsCount: 18,
        dealsClosed: 94,
        bio: 'Specialist in luxury high-rises and approved open plot layouts along NH-16 and capital development corridors.',
      },
      {
        name: 'Ananya Sharma',
        title: 'Commercial & Luxury Specialist',
        agency: 'Horizon Crest Real Estate',
        phone: '+91 98485 67890',
        email: 'ananya@horizoncrest.com',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
        rating: 4.8,
        reviewsCount: 86,
        experienceYears: 8,
        reraRegistrationNumber: 'APRERA/AGT/2024/0719',
        operationalLocalities: ['MG Road', 'Gollapudi', 'Bhavanipuram', 'Gunadala'],
        activeListingsCount: 14,
        dealsClosed: 62,
        bio: 'Dedicated to connecting NRI investors and institutions with verified commercial hubs and gated communities.',
      },
      {
        name: 'Praveen Reddy',
        title: 'Managing Director & RERA Advisor',
        agency: 'Krishna Valley Properties',
        phone: '+91 99890 33445',
        email: 'praveen@krishnavalley.in',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
        rating: 5.0,
        reviewsCount: 154,
        experienceYears: 16,
        reraRegistrationNumber: 'APRERA/AGT/2022/0114',
        operationalLocalities: ['Auto Nagar', 'Enikepadu', 'Mangalagiri', 'Kankipadu'],
        activeListingsCount: 22,
        dealsClosed: 140,
        bio: 'Authorized sales channel partner for top tier tier-1 builders with 100% clear title documentation.',
      },
    ]);

    console.log('🌱 Seeding Properties...');
    await Property.create([
      {
        title: 'Modern 3 BHK Luxury Apartment',
        tagline: 'Panoramic Krishna River view with world-class clubhouse',
        propertyType: 'Apartment',
        listingType: 'SALE',
        price: 14500000,
        priceDisplay: '₹1.45 Cr',
        pricePerUnit: '₹5,800 / sq.ft',
        locality: 'Benz Circle',
        city: 'Vijayawada',
        address: 'Green Meadows Heights, Opp. Gateway Hotel, Benz Circle',
        bedrooms: 3,
        bathrooms: 3,
        areaSqFt: 2500,
        areaSqYards: 277,
        facing: 'East',
        furnishing: 'Semi-Furnished',
        possessionStage: 'Ready to Move',
        reraApproved: true,
        reraNumber: 'P04260230198',
        crdaApproved: true,
        images: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
        ],
        description: 'Experience ultra-modern urban luxury in the heart of Vijayawada. Boasting a grand double-height foyer, Italian marble flooring, VRV central air-conditioning, infinity pool overlooking river bend, and 24/7 dual generator backup.',
        amenities: ['Swimming Pool', 'Clubhouse', 'Gymnasium', '2 Car Parkings', 'Children Play Area', 'EV Charging Station', '24x7 Security CCTV'],
        featured: true,
        status: 'APPROVED',
        agentName: 'Venkatesh Naidu',
        agentPhone: '+91 98491 12345',
        agentAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
        viewsCount: 1420,
        inquiriesCount: 38,
      },
      {
        title: 'Luxury Independent Villa in Gated Community',
        tagline: 'Custom contemporary architecture with private landscaped garden',
        propertyType: 'Independent Villa',
        listingType: 'SALE',
        price: 32000000,
        priceDisplay: '₹3.20 Cr',
        pricePerUnit: '₹8,000 / sq.ft',
        locality: 'Poranki',
        city: 'Vijayawada',
        address: 'Boulevard Estates, Villa No. 18, Poranki Main Road',
        bedrooms: 4,
        bathrooms: 5,
        areaSqFt: 4000,
        areaSqYards: 330,
        facing: 'North-East',
        furnishing: 'Fully Furnished',
        possessionStage: 'Ready to Move',
        reraApproved: true,
        reraNumber: 'P04260240512',
        crdaApproved: true,
        images: [
          'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
        ],
        description: 'An architectural statement built on 330 Sq. Yards. Features private home theater, elevator shaft, solar rooftop grid, designer modular kitchen from Germany, and landscaped sit-out deck.',
        amenities: ['Private Garden', 'Home Theater', 'Solar Power Grid', 'Clubhouse Access', '3 Car Garage', 'Jogging Track'],
        featured: true,
        status: 'APPROVED',
        agentName: 'Venkatesh Naidu',
        agentPhone: '+91 98491 12345',
        agentAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
        viewsCount: 2150,
        inquiriesCount: 52,
      },
      {
        title: 'CRDA Approved Open Residential Plot',
        tagline: 'High-growth investment corridor ready for immediate villa construction',
        propertyType: 'Residential Plot',
        listingType: 'SALE',
        price: 6800000,
        priceDisplay: '₹68.0 L',
        pricePerUnit: '₹34,000 / sq.yd',
        locality: 'Gannavaram',
        city: 'Vijayawada',
        address: 'Emerald City Layout, Adjacent to Airport Bypass Road',
        areaSqYards: 200,
        facing: 'East',
        furnishing: 'Unfurnished',
        possessionStage: 'Immediate',
        reraApproved: true,
        reraNumber: 'P04280220911',
        crdaApproved: true,
        images: [
          'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
        ],
        description: 'Corner plot with 40-foot BT roads, underground drainage, avenue plantations, 100% Vaastu compliant, spot registration available with bank loan approvals from SBI & HDFC.',
        amenities: ['40ft Blacktop Roads', 'Underground Drainage', 'Overhead Water Tank', 'Street Lights', 'Compound Wall'],
        featured: false,
        status: 'APPROVED',
        agentName: 'Ananya Sharma',
        agentPhone: '+91 98485 67890',
        agentAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
        viewsCount: 980,
        inquiriesCount: 29,
      },
      {
        title: 'Executive 3 BHK Furnished Flat for Rent',
        tagline: 'Corporate expat grade interior styling near commercial business park',
        propertyType: 'Apartment',
        listingType: 'RENT',
        price: 45000,
        priceDisplay: '₹45,000 / month',
        pricePerUnit: 'Deposit: ₹1.5 L',
        locality: 'Tadepalli',
        city: 'Vijayawada',
        address: 'Royal Palms Towers, Flat 802, Tadepalli Riverside Highway',
        bedrooms: 3,
        bathrooms: 3,
        areaSqFt: 1850,
        areaSqYards: 205,
        facing: 'North',
        furnishing: 'Fully Furnished',
        possessionStage: 'Immediate',
        reraApproved: true,
        reraNumber: 'P04260210045',
        crdaApproved: true,
        images: [
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
        ],
        description: 'Fully furnished with premium leather seating, 65-inch Smart TVs, microwave, washer/dryer, high-speed fiber internet, and dedicated covered basement parking.',
        amenities: ['Fully Air-conditioned', 'Power Backup', 'Gym', 'Gated Security', 'Covered Parking', 'High-speed Lift'],
        featured: true,
        status: 'APPROVED',
        agentName: 'Praveen Reddy',
        agentPhone: '+91 99890 33445',
        agentAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
        viewsCount: 840,
        inquiriesCount: 19,
      },
    ]);

    console.log('🌱 Seeding Inquiries & Appointments...');
    await Inquiry.create([
      {
        propertyId: 'mock-1',
        propertyTitle: 'Modern 3 BHK Luxury Apartment',
        propertyPrice: '₹1.45 Cr',
        propertyImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
        buyerName: 'Suresh Varma',
        buyerEmail: 'suresh.varma@example.com',
        buyerPhone: '+91 98480 22334',
        message: 'Interested in a weekend site inspection. Is the price negotiable for an upfront payment?',
        date: '29 Oct 2026',
        status: 'NEW',
      },
    ]);

    await Appointment.create([
      {
        propertyId: 'mock-1',
        propertyTitle: 'Modern 3 BHK Luxury Apartment',
        propertyImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
        locality: 'Benz Circle, Vijayawada',
        date: 'Saturday, 07 Nov 2026',
        timeSlot: '11:00 AM - 12:00 PM',
        type: 'In-Person Site Visit',
        clientName: 'Suresh Varma',
        clientPhone: '+91 98480 22334',
        agentName: 'Venkatesh Naidu',
        status: 'CONFIRMED',
      },
    ]);

    console.log('✅ [Database Seed Complete]: Initialized EstateHub collections with sample data.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedData();

