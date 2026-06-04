import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Ensure this path is correct
import { COLORS } from "../componets/colors"; // Fixed "componets" typo


const Alert = ({ children, variant = 'info', onClose, className = '' }) => {
  const variants = {
    success: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', icon: '✓' },
    error: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: '✕' },
    warning: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', icon: '⚠' },
    info: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: 'ℹ' }
  };
  const style = variants[variant] || variants.info;
  return (
    <div className={`${style.bg} border ${style.border} rounded-lg p-4 ${className}`}>
      <div className="flex items-start">
        <span className={`${style.text} font-bold mr-3`}>{style.icon}</span>
        <div className={`flex-1 ${style.text}`}>{children}</div>
        {onClose && (
          <button onClick={onClose} className={`${style.text} ml-3 hover:opacity-70`}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

const FormInput = ({ label, type = 'text', name, value, onChange, placeholder, error, icon, autoComplete }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text }}>{label}</label>
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full ${icon ? 'pl-10' : 'px-4'} pr-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
          error ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-[#00C853]'
        }`}
      />
    </div>
    {error && <p className="mt-1 text-sm text-red-500 font-medium">{error}</p>}
  </div>
);


const MOCK_USERS = [
  { email: 'superadmin@example.com', password: 'admin123', role: 'super_admin', name: 'Super Admin' },
  { email: 'business@example.com', password: 'business123', role: 'business_admin', name: 'Business Admin', businessId: 'business-1' },
  { email: 'editor@example.com', password: 'editor123', role: 'editor', name: 'Editor User', businessId: 'business-1' },
  { email: 'approver@example.com', password: 'approver123', role: 'approver', name: 'Approver User', businessId: 'business-1' },
  { email: 'viewer@example.com', password: 'viewer123', role: 'viewer', name: 'Viewer User', businessId: 'business-1' }
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    setAlert(null);
    if (!validateForm()) return;
    setLoading(true);

    setTimeout(() => {
      const userFound = MOCK_USERS.find(
        u => u.email.toLowerCase() === formData.email.toLowerCase() && u.password === formData.password
      );

      if (userFound) {
        const userData = {
          id: Math.random().toString(36).substr(2, 9),
          name: userFound.name,
          email: userFound.email,
          role: userFound.role,
          businessId: userFound.businessId || null
        };
        
        // Log in via Context (this handles localStorage for you)
        login('mock-jwt-token-' + Date.now(), userData);
        
        setAlert({ type: 'success', message: 'Login successful! Redirecting...' });
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        setAlert({ type: 'error', message: 'Invalid email or password. Please try again.' });
        setLoading(false);
      }
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) handleLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: COLORS.primary }}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: COLORS.secondary }}>
              <span className="text-3xl text-white">📦</span>
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.text }}>Welcome Back</h1>
            <p className="text-gray-600">Sign in to ProductHub</p>
          </div>

          {alert && (
            <Alert variant={alert.type} onClose={() => setAlert(null)} className="mb-6">
              {alert.message}
            </Alert>
          )}

          <div onKeyPress={handleKeyPress}>
            <FormInput
              label="Email Address"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>}
            />

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text }}>Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 rounded-lg border-2 transition-all focus:outline-none ${errors.password ? 'border-red-500' : 'border-gray-300 focus:border-[#00C853]'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="rounded" style={{ accentColor: COLORS.secondary }} />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium hover:underline" style={{ color: COLORS.secondary }}>Forgot password?</a>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3 rounded-lg text-white font-semibold shadow-lg transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: COLORS.secondary }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Demo Credentials</span></div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px]">
            {MOCK_USERS.slice(0, 4).map(u => (
               <div key={u.email} className="p-1 bg-gray-50 rounded border border-gray-200">
                 <p className="font-bold truncate">{u.name}</p>
                 <p className="text-gray-500 truncate">{u.email}</p>
               </div>
            ))}
          </div>
        </div>
        <p className="text-center mt-4 text-xs text-gray-500">© 2026 ProductHub. All rights reserved.</p>
      </div>
    </div>
  );
}