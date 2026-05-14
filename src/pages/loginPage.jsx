import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MOCK_USERS } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Alert } from '../components/ui/Alert';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    
    if (!formData.password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setAlert(null);
    if (!validateForm()) return;
    
    setLoading(true);

    setTimeout(() => {
      const userFound = MOCK_USERS.find(
        u => u.email.toLowerCase() === formData.email.toLowerCase() && u.password === formData.password
      );

      if (userFound) {
        const userData = { ...userFound, id: Math.random().toString(36).substr(2, 9) };
        delete userData.password; // Don't store password in local state
        
        login('mock-jwt-token-' + Date.now(), userData);
        
        setAlert({ type: 'success', message: 'Welcome back! Redirecting...' });
        
        // Redirect based on role
        setTimeout(() => {
          if (userData.role === 'buyer') navigate('/');
          else navigate('/dashboard');
        }, 1000);
      } else {
        setAlert({ type: 'error', message: 'Invalid email or password.' });
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-surface-secondary relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-brand-teal rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 animate-slide-up">
        <div className="card p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-green/10 text-brand-green mb-4 shadow-sm">
              <span className="text-3xl">📦</span>
            </div>
            <h1 className="text-3xl font-bold font-display text-brand-text mb-2">Welcome Back</h1>
            <p className="text-brand-muted">Sign in to Baisoft ProductHub</p>
          </div>

          {alert && (
            <Alert variant={alert.type} onClose={() => setAlert(null)} className="mb-6">
              {alert.message}
            </Alert>
          )}

          <form onSubmit={handleLogin}>
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
            />

            <div className="mb-2">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-brand-text">Password</label>
                <a href="#" className="text-sm font-semibold text-brand-green hover:text-brand-green-dark transition-colors">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input-field pr-12 ${errors.password ? 'border-brand-error focus:border-brand-error focus:ring-brand-error/20' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-text transition-colors text-sm font-medium"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-sm text-brand-error font-medium">{errors.password}</p>}
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              className="mt-6 py-3"
            >
              Sign In
            </Button>
          </form>

          {/* Quick Demo Login Helper */}
          <div className="mt-8 border-t border-gray-100 pt-6">
            <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider text-center mb-4">
              Demo Credentials
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {MOCK_USERS.slice(0, 4).map(u => (
                <button
                  key={u.email}
                  onClick={() => setFormData({ email: u.email, password: u.password })}
                  className="p-2 text-left bg-surface-secondary hover:bg-brand-green/5 border border-transparent hover:border-brand-green/20 rounded-lg transition-all"
                >
                  <p className="font-semibold text-brand-text truncate">{u.name}</p>
                  <p className="text-brand-muted truncate mt-0.5">{u.role.replace('_', ' ')}</p>
                </button>
              ))}
            </div>
            
            <div className="mt-2">
              <button
                onClick={() => setFormData({ email: 'buyer@example.com', password: 'buyer123' })}
                className="w-full p-2 text-center bg-brand-teal/30 hover:bg-brand-teal/50 rounded-lg transition-all"
              >
                <p className="font-semibold text-brand-text text-xs">Test as Buyer</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}