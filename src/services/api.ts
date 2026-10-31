import { Property, Agent, Inquiry, Appointment, NotificationItem, AuditLog, User } from '../types';
import { 
  mockProperties, 
  mockAgents, 
  mockInquiries, 
  mockAppointments, 
  mockNotifications, 
  mockAuditLogs, 
  mockUsers 
} from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper for making fetch requests with JWT token
const request = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const token = localStorage.getItem('estatehub_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || `API request failed with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};

// Properties API Service
export const propertiesService = {
  async getAll(params?: Record<string, string>): Promise<Property[]> {
    try {
      const query = params ? `?${new URLSearchParams(params).toString()}` : '';
      const res = await request<{ success: boolean; data: Property[] }>(`/properties${query}`);
      return res.data;
    } catch {
      return mockProperties;
    }
  },

  async getById(id: string): Promise<Property> {
    try {
      const res = await request<{ success: boolean; data: Property }>(`/properties/${id}`);
      return res.data;
    } catch {
      return mockProperties.find(p => p.id === id) || mockProperties[0];
    }
  },

  async create(data: Partial<Property>): Promise<Property> {
    const res = await request<{ success: boolean; data: Property }>('/properties', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.data;
  },

  async update(id: string, data: Partial<Property>): Promise<Property> {
    const res = await request<{ success: boolean; data: Property }>(`/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return res.data;
  },

  async delete(id: string): Promise<boolean> {
    const res = await request<{ success: boolean }>(`/properties/${id}`, {
      method: 'DELETE',
    });
    return res.success;
  },
};

// Agents API Service
export const agentsService = {
  async getAll(params?: Record<string, string>): Promise<Agent[]> {
    try {
      const query = params ? `?${new URLSearchParams(params).toString()}` : '';
      const res = await request<{ success: boolean; data: Agent[] }>(`/agents${query}`);
      return res.data;
    } catch {
      return mockAgents;
    }
  },

  async getById(id: string): Promise<Agent & { listings?: Property[] }> {
    try {
      const res = await request<{ success: boolean; data: Agent & { listings?: Property[] } }>(`/agents/${id}`);
      return res.data;
    } catch {
      const found = mockAgents.find(a => a.id === id) || mockAgents[0];
      const listings = mockProperties.filter(p => p.agentId === found.id);
      return { ...found, listings };
    }
  },
};

// Inquiries API Service
export const inquiriesService = {
  async getAll(): Promise<Inquiry[]> {
    try {
      const res = await request<{ success: boolean; data: Inquiry[] }>('/inquiries');
      return res.data;
    } catch {
      return mockInquiries;
    }
  },

  async create(data: Partial<Inquiry>): Promise<Inquiry> {
    try {
      const res = await request<{ success: boolean; data: Inquiry }>('/inquiries', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return res.data;
    } catch {
      return {
        id: `inq-${Date.now()}`,
        propertyId: data.propertyId || '',
        propertyTitle: data.propertyTitle || 'Property',
        propertyPrice: data.propertyPrice || '',
        propertyImage: data.propertyImage || '',
        buyerName: data.buyerName || '',
        buyerEmail: data.buyerEmail || '',
        buyerPhone: data.buyerPhone || '',
        message: data.message || '',
        date: 'Today',
        status: 'NEW',
      };
    }
  },
};

// Appointments API Service
export const appointmentsService = {
  async getAll(): Promise<Appointment[]> {
    try {
      const res = await request<{ success: boolean; data: Appointment[] }>('/appointments');
      return res.data;
    } catch {
      return mockAppointments;
    }
  },

  async create(data: Partial<Appointment>): Promise<Appointment> {
    try {
      const res = await request<{ success: boolean; data: Appointment }>('/appointments', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return res.data;
    } catch {
      return {
        id: `appt-${Date.now()}`,
        propertyId: data.propertyId || '',
        propertyTitle: data.propertyTitle || 'Property',
        propertyImage: data.propertyImage || '',
        locality: data.locality || 'Vijayawada',
        date: data.date || '',
        timeSlot: data.timeSlot || '',
        type: data.type || 'In-Person Site Visit',
        clientName: data.clientName || '',
        clientPhone: data.clientPhone || '',
        agentName: data.agentName || 'Venkatesh Naidu',
        status: 'CONFIRMED',
      };
    }
  },
};

// Health Service
export const healthService = {
  async check(): Promise<{ status: string; database?: { connectionState: string } }> {
    try {
      return await request('/health');
    } catch {
      return { status: 'OFFLINE' };
    }
  },
};

