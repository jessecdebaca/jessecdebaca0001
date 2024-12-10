import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuthContext } from './lib/auth/AuthProvider';
import { Shell } from './components/layout/Shell';
import { Dashboard } from './pages/Dashboard';
import { Contacts } from './pages/Contacts';
import { Companies } from './pages/Companies';
import { Deals } from './pages/Deals';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';

const queryClient = new QueryClient();

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!user.is_admin) {
    return <Navigate to="/" />;
  }

  return <Shell>{children}</Shell>;
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Shell>{children}</Shell>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute>
                  <Contacts />
                </PrivateRoute>
              }
            />
            <Route
              path="/companies"
              element={
                <PrivateRoute>
                  <Companies />
                </PrivateRoute>
              }
            />
            <Route
              path="/deals"
              element={
                <PrivateRoute>
                  <Deals />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}