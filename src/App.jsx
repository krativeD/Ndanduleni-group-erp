import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Profile from './pages/Profile';

// HR Module Imports
import Employees from './pages/hr/Employees';
import Attendance from './pages/hr/Attendance';
import LeaveManagement from './pages/hr/LeaveManagement';
import Payroll from './pages/hr/Payroll';
import Recruitment from './pages/hr/Recruitment';
import Performance from './pages/hr/Performance';
import Training from './pages/hr/Training';

// CRM Module Imports
import Contacts from './pages/crm/Contacts';
import Leads from './pages/crm/Leads';
import Deals from './pages/crm/Deals';
import Activities from './pages/crm/Activities';
import CRMReports from './pages/crm/Reports';

// Services Module Imports
import Schedule from './pages/services/Schedule';
import Jobs from './pages/services/Jobs';
import Teams from './pages/services/Teams';
import Quality from './pages/services/Quality';
import Equipment from './pages/services/Equipment';
import Chemicals from './pages/services/Chemicals';

// Inventory Module Imports
import Stock from './pages/inventory/Stock';
import Movements from './pages/inventory/Movements';
import Suppliers from './pages/inventory/Suppliers';
import PurchaseOrders from './pages/inventory/PurchaseOrders';
import StockTake from './pages/inventory/StockTake';

import './styles/global.css';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

// Public Route wrapper (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/dashboard" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />
      <Route path="/forgot-password" element={
        <PublicRoute>
          <ForgotPassword />
        </PublicRoute>
      } />
      
      {/* Core Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/users" element={
        <ProtectedRoute>
          <Users />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      
      {/* HR Module Routes */}
      <Route path="/hr/employees" element={
        <ProtectedRoute>
          <Employees />
        </ProtectedRoute>
      } />
      <Route path="/hr/attendance" element={
        <ProtectedRoute>
          <Attendance />
        </ProtectedRoute>
      } />
      <Route path="/hr/leave" element={
        <ProtectedRoute>
          <LeaveManagement />
        </ProtectedRoute>
      } />
      <Route path="/hr/payroll" element={
        <ProtectedRoute>
          <Payroll />
        </ProtectedRoute>
      } />
      <Route path="/hr/recruitment" element={
        <ProtectedRoute>
          <Recruitment />
        </ProtectedRoute>
      } />
      <Route path="/hr/performance" element={
        <ProtectedRoute>
          <Performance />
        </ProtectedRoute>
      } />
      <Route path="/hr/training" element={
        <ProtectedRoute>
          <Training />
        </ProtectedRoute>
      } />
      
      {/* CRM Module Routes */}
      <Route path="/crm/contacts" element={
        <ProtectedRoute>
          <Contacts />
        </ProtectedRoute>
      } />
      <Route path="/crm/leads" element={
        <ProtectedRoute>
          <Leads />
        </ProtectedRoute>
      } />
      <Route path="/crm/deals" element={
        <ProtectedRoute>
          <Deals />
        </ProtectedRoute>
      } />
      <Route path="/crm/activities" element={
        <ProtectedRoute>
          <Activities />
        </ProtectedRoute>
      } />
      <Route path="/crm/reports" element={
        <ProtectedRoute>
          <CRMReports />
        </ProtectedRoute>
      } />
      
      {/* Services Module Routes */}
      <Route path="/services/schedule" element={
        <ProtectedRoute>
          <Schedule />
        </ProtectedRoute>
      } />
      <Route path="/services/jobs" element={
        <ProtectedRoute>
          <Jobs />
        </ProtectedRoute>
      } />
      <Route path="/services/teams" element={
        <ProtectedRoute>
          <Teams />
        </ProtectedRoute>
      } />
      <Route path="/services/quality" element={
        <ProtectedRoute>
          <Quality />
        </ProtectedRoute>
      } />
      <Route path="/services/equipment" element={
        <ProtectedRoute>
          <Equipment />
        </ProtectedRoute>
      } />
      <Route path="/services/chemicals" element={
        <ProtectedRoute>
          <Chemicals />
        </ProtectedRoute>
      } />
      
      {/* Inventory Module Routes */}
      <Route path="/inventory/stock" element={
        <ProtectedRoute>
          <Stock />
        </ProtectedRoute>
      } />
      <Route path="/inventory/movements" element={
        <ProtectedRoute>
          <Movements />
        </ProtectedRoute>
      } />
      <Route path="/inventory/suppliers" element={
        <ProtectedRoute>
          <Suppliers />
        </ProtectedRoute>
      } />
      <Route path="/inventory/orders" element={
        <ProtectedRoute>
          <PurchaseOrders />
        </ProtectedRoute>
      } />
      <Route path="/inventory/stocktake" element={
        <ProtectedRoute>
          <StockTake />
        </ProtectedRoute>
      } />
      
      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
