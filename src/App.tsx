import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/layout/ProtectedRoute';
import UserDashboard from './pages/UserDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import MainLayout from './components/layout/MainLayout';
import MenuPage from './pages/MenuPage';
import OrderSummaryPage from './pages/OrderSummaryPage';
import GroupChatPage from './pages/GroupChatPage';
import OrderStatusPage from './pages/OrderStatusPage';
import GroupDetailsPage from './pages/GroupDetailsPage';


const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Toaster position="top-center" reverseOrder={false} toastOptions={{
          style: { fontFamily: 'inherit', direction: 'rtl' },
        }} />
        {/* هنا سيتم إضافة الـ Layout و Navigation لاحقاً */}
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />

          {/* صفحات محمية داخل MainLayout */}
          <Route element={<MainLayout><ProtectedRoute allowedRoles={['user']} /></MainLayout>}>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/order-summary" element={<OrderSummaryPage />} />
            <Route path="/group-chat" element={<GroupChatPage />} />
            <Route path="/order-status" element={<OrderStatusPage />} />
            <Route path="/group/:id" element={<GroupDetailsPage />} />
          </Route>
          <Route element={<MainLayout><ProtectedRoute allowedRoles={['admin']} /></MainLayout>}>
            <Route path="/company" element={<CompanyDashboard />} />
          </Route>

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 