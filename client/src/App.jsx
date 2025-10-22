import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import LoginPage from './pages/LoginPage';
import EmployeeSchedule from './pages/employee/EmployeeSchedule';
import DailyLog from './pages/employee/DailyLog';
import AdminDashboard from './pages/admin/AdminDashboard';
import Layout from './components/common/Layout';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="flex justify-center items-center h-screen">A carregar...</div>;
    }
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return allowedRoles.includes(user.role) 
        ? <Layout><Outlet /></Layout>
        : <Navigate to="/login" replace />; // Ou para uma página "Não autorizado"
};

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">A carregar...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={user.role === 'EMPLOYER' ? '/admin/dashboard' : '/employee/log'} />} />
      
      <Route element={<ProtectedRoute allowedRoles={['EMPLOYEE']} />}>
        <Route path="/employee/log" element={<DailyLog />} />
        <Route path="/employee/schedule" element={<EmployeeSchedule />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['EMPLOYER']} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

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