import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserRole } from './types';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { BuyPropertiesPage } from './pages/public/BuyPropertiesPage';
import { RentPropertiesPage } from './pages/public/RentPropertiesPage';
import { PropertiesSearchPage } from './pages/public/PropertiesSearchPage';
import { PropertyDetailsPage } from './pages/public/PropertyDetailsPage';
import { AgentsDirectoryPage } from './pages/public/AgentsDirectoryPage';
import { AgentProfilePage } from './pages/public/AgentProfilePage';
import { AboutUsPage } from './pages/public/AboutUsPage';
import { ContactUsPage } from './pages/public/ContactUsPage';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegistrationPage } from './pages/auth/RegistrationPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

// Buyer Pages
import { BuyerDashboardPage } from './pages/buyer/BuyerDashboardPage';
import { BuyerFavoritesPage } from './pages/buyer/BuyerFavoritesPage';
import { BuyerInquiriesPage } from './pages/buyer/BuyerInquiriesPage';
import { BuyerAppointmentsPage } from './pages/buyer/BuyerAppointmentsPage';
import { BuyerNotificationsPage } from './pages/buyer/BuyerNotificationsPage';
import { BuyerProfilePage } from './pages/buyer/BuyerProfilePage';

// Seller Pages
import { SellerDashboardPage } from './pages/seller/SellerDashboardPage';
import { SellerListingsPage } from './pages/seller/SellerListingsPage';
import { SellerAddPropertyPage } from './pages/seller/SellerAddPropertyPage';
import { SellerEditPropertyPage } from './pages/seller/SellerEditPropertyPage';
import { SellerInquiriesPage } from './pages/seller/SellerInquiriesPage';
import { SellerAppointmentsPage } from './pages/seller/SellerAppointmentsPage';
import { SellerMessagesPage } from './pages/seller/SellerMessagesPage';
import { SellerAnalyticsPage } from './pages/seller/SellerAnalyticsPage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminPropertiesPage } from './pages/admin/AdminPropertiesPage';
import { AdminApprovalsPage } from './pages/admin/AdminApprovalsPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';

export const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>('BUYER');

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/buy" element={<BuyPropertiesPage />} />
        <Route path="/rent" element={<RentPropertiesPage />} />
        <Route path="/properties" element={<PropertiesSearchPage />} />
        <Route path="/property/:id" element={<PropertyDetailsPage />} />
        <Route path="/agents" element={<AgentsDirectoryPage />} />
        <Route path="/agent/:id" element={<AgentProfilePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage onLogin={(r) => setCurrentRole(r)} />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Buyer Portal Routes */}
        <Route path="/buyer/overview" element={<BuyerDashboardPage />} />
        <Route path="/buyer/favorites" element={<BuyerFavoritesPage />} />
        <Route path="/buyer/inquiries" element={<BuyerInquiriesPage />} />
        <Route path="/buyer/appointments" element={<BuyerAppointmentsPage />} />
        <Route path="/buyer/notifications" element={<BuyerNotificationsPage />} />
        <Route path="/buyer/profile" element={<BuyerProfilePage />} />

        {/* Seller Portal Routes */}
        <Route path="/seller/overview" element={<SellerDashboardPage />} />
        <Route path="/seller/listings" element={<SellerListingsPage />} />
        <Route path="/seller/add-property" element={<SellerAddPropertyPage />} />
        <Route path="/seller/edit-property/:id" element={<SellerEditPropertyPage />} />
        <Route path="/seller/inquiries" element={<SellerInquiriesPage />} />
        <Route path="/seller/appointments" element={<SellerAppointmentsPage />} />
        <Route path="/seller/messages" element={<SellerMessagesPage />} />
        <Route path="/seller/analytics" element={<SellerAnalyticsPage />} />

        {/* Admin Portal Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/properties" element={<AdminPropertiesPage />} />
        <Route path="/admin/approvals" element={<AdminApprovalsPage />} />
        <Route path="/admin/reports" element={<AdminReportsPage />} />
        <Route path="/admin/audit-logs" element={<AdminAuditLogsPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

