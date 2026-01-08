// // Mock users for demo - Replace with actual API call
// import React, { useState } from 'react';
// import { COLORS } from "../componets/colors";


// const MOCK_USERS = [
//   { email: 'superadmin@example.com', password: 'admin123', role: 'super_admin', name: 'Super Admin' },
//   { email: 'business@example.com', password: 'business123', role: 'business_admin', name: 'Business Admin', businessId: 'business-1' },
//   { email: 'editor@example.com', password: 'editor123', role: 'editor', name: 'Editor User', businessId: 'business-1' },
//   { email: 'approver@example.com', password: 'approver123', role: 'approver', name: 'Approver User', businessId: 'business-1' },
//   { email: 'viewer@example.com', password: 'viewer123', role: 'viewer', name: 'Viewer User', businessId: 'business-1' }
// ];

// // Main Login Page Component
// export default function LoginPage() {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [alert, setAlert] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
    
//     // Clear error for this field
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   // Validate form
//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }
    
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle login
//   const handleLogin = () => {
//     setAlert(null);
    
//     if (!validateForm()) return;
    
//     setLoading(true);
    
//     // Simulate API call
//     setTimeout(() => {
//       const user = MOCK_USERS.find(
//         u => u.email.toLowerCase() === formData.email.toLowerCase() && 
//              u.password === formData.password
//       );
      
//       if (user) {
//         // Create user data
//         const userData = {
//           id: Math.random().toString(36).substr(2, 9),
//           name: user.name,
//           email: user.email,
//           role: user.role,
//           businessId: user.businessId || null
//         };
        
//         // Generate mock token
//         const token = 'mock-jwt-token-' + Date.now();
        
//         // Store in localStorage
//         localStorage.setItem('authToken', token);
//         localStorage.setItem('userData', JSON.stringify(userData));
        
//         // Show success message
//         setAlert({ type: 'success', message: 'Login successful! Redirecting...' });
        
//         // Redirect after short delay
//         setTimeout(() => {
//           window.location.href = '/dashboard';
//         }, 1500);
//       } else {
//         setAlert({ type: 'error', message: 'Invalid email or password. Please try again.' });
//         setLoading(false);
//       }
//     }, 1000);
//   };

//   // Handle Enter key press
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !loading) {
//       handleLogin();
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: COLORS.primary }}>
//       {/* Main Container */}
//       <div className="w-full max-w-md">
//         {/* Login Card */}
//         <div className="bg-white rounded-2xl shadow-2xl p-8">
//           {/* Logo/Brand Section */}
//           <div className="text-center mb-8">
//             <div 
//               className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
//               style={{ backgroundColor: COLORS.secondary }}
//             >
//               <span className="text-3xl text-white">📦</span>
//             </div>
//             <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.text }}>
//               Welcome Back
//             </h1>
//             <p className="text-gray-600">Sign in to ProductHub</p>
//           </div>

//           {/* Alert Message */}
//           {alert && (
//             <Alert 
//               type={alert.type} 
//               message={alert.message} 
//               onClose={() => setAlert(null)} 
//             />
//           )}

//           {/* Login Form */}
//           <div onKeyPress={handleKeyPress}>
//             {/* Email Input */}
//             <FormInput
//               label="Email Address"
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               error={errors.email}
//               autoComplete="email"
//               icon={
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
//                 </svg>
//               }
//             />

//             {/* Password Input */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text }}>
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                   </svg>
//                 </div>
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   placeholder="Enter your password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className={`w-full pl-10 pr-12 py-3 rounded-lg border-2 transition-all focus:outline-none ${
//                     errors.password 
//                       ? 'border-red-500 focus:border-red-600' 
//                       : 'border-gray-300 focus:border-[#00C853]'
//                   }`}
//                   autoComplete="current-password"
//                 />
//                 <button
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
//                   type="button"
//                 >
//                   {showPassword ? (
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                     </svg>
//                   ) : (
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//               {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
//             </div>

//             {/* Remember Me & Forgot Password */}
//             <div className="flex items-center justify-between mb-6">
//               <label className="flex items-center cursor-pointer">
//                 <input 
//                   type="checkbox" 
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                   className="rounded" 
//                   style={{ accentColor: COLORS.secondary }} 
//                 />
//                 <span className="ml-2 text-sm text-gray-600">Remember me</span>
//               </label>
//               <a 
//                 href="#" 
//                 className="text-sm font-medium hover:underline transition-colors" 
//                 style={{ color: COLORS.secondary }}
//               >
//                 Forgot password?
//               </a>
//             </div>

//             {/* Login Button */}
//             <button
//               onClick={handleLogin}
//               disabled={loading}
//               className="w-full py-3 rounded-lg text-white font-semibold transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
//               style={{ backgroundColor: COLORS.secondary }}
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center">
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Signing in...
//                 </span>
//               ) : (
//                 'Sign In'
//               )}
//             </button>
//           </div>

//           {/* Divider */}
//           <div className="relative my-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-gray-500">Demo Credentials</span>
//             </div>
//           </div>

//           {/* Demo Credentials Grid */}
//           <div className="space-y-2">
//             <div className="grid grid-cols-2 gap-2 text-xs">
//               <div className="p-2 bg-gray-50 rounded border border-gray-200">
//                 <p className="font-semibold text-gray-700">Super Admin</p>
//                 <p className="text-gray-500">superadmin@example.com</p>
//               </div>
//               <div className="p-2 bg-gray-50 rounded border border-gray-200">
//                 <p className="font-semibold text-gray-700">Business Admin</p>
//                 <p className="text-gray-500">business@example.com</p>
//               </div>
//               <div className="p-2 bg-gray-50 rounded border border-gray-200">
//                 <p className="font-semibold text-gray-700">Editor</p>
//                 <p className="text-gray-500">editor@example.com</p>
//               </div>
//               <div className="p-2 bg-gray-50 rounded border border-gray-200">
//                 <p className="font-semibold text-gray-700">Approver</p>
//                 <p className="text-gray-500">approver@example.com</p>
//               </div>
//             </div>
//             <p className="text-xs text-center text-gray-500">
//               Password for all demo accounts: <span className="font-mono font-semibold">admin123</span> or <span className="font-mono font-semibold">[role]123</span>
//             </p>
//           </div>
//         </div>

//         {/* Footer */}
//         <p className="text-center mt-6 text-sm text-gray-600">
//           Don't have an account?{' '}
//           <a href="#" className="font-medium hover:underline transition-colors" style={{ color: COLORS.secondary }}>
//             Contact your administrator
//           </a>
//         </p>

//         {/* Copyright */}
//         <p className="text-center mt-4 text-xs text-gray-500">
//           © 2026 ProductHub. All rights reserved.
//         </p>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Ensure this path is correct
import { COLORS } from "../componets/colors"; // Fixed "componets" typo

// --- SUB-COMPONENTS ---

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

// --- MAIN COMPONENT ---

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