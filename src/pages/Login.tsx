import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth/useAuth';
import { Button } from '../components/ui/Button';
import { LoginForm } from '../components/auth/LoginForm';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}