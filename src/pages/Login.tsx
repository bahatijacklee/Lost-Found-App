import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BookOpen, Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';

export function Login() {
  const { user, login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const demoAccounts = [
    { email: 'john.doe@university.edu', role: 'Student' },
    { email: 'admin@university.edu', role: 'Admin' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="text-center lg:text-left space-y-6 animate-fade-in">
          <div className="flex items-center justify-center lg:justify-start space-x-3">
            <div className="p-3 bg-primary-600 rounded-2xl">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Lost & Found</h1>
              <p className="text-gray-600">University Digital Platform</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Welcome back to your campus lost & found
            </h2>
            <p className="text-gray-600 text-lg">
              Reuniting students with their belongings through technology. 
              Report lost items, search found items, and connect with your community.
            </p>
          </div>

          {/* Features */}
          <div className="grid gap-4">
            <div className="flex items-center space-x-3 text-gray-700">
              <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
              <span>Secure university email authentication</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
              <span>Photo upload and detailed descriptions</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
              <span>Smart matching and instant notifications</span>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Sign in to your account</h3>
            <p className="text-gray-600">Use your university email to access the platform</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="email"
                label="University Email"
                placeholder="your.name@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                error={error && error.includes('email') ? error : ''}
              />
            </div>

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                error={error && !error.includes('email') ? error : ''}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full"
              size="lg"
            >
              Sign in
            </Button>
          </form>

          {/* Demo accounts */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2 text-blue-600" />
              Demo Accounts
            </h4>
            <div className="space-y-2 text-sm">
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  onClick={() => setEmail(account.email)}
                  className="block w-full text-left p-2 bg-white rounded border hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">{account.email}</div>
                  <div className="text-gray-600">{account.role}</div>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Password can be anything for demo purposes
            </p>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            Need help? Contact{' '}
            <a href="mailto:support@university.edu" className="text-primary-600 hover:text-primary-500">
              IT Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}