import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { ROLE_PERMISSIONS } from '../constants/permissions';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try { return JSON.parse(userData); } 
      catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('userData');
        localStorage.removeItem('authToken');
      }
    }
    return null;
  });

  const hasPermission = useCallback((permission) => {
    if (!user || !user.role) return false;
    // Buyer role has no specific permissions in the dashboard
    if (user.role === 'buyer') return false; 
    return (ROLE_PERMISSIONS[user.role] || []).includes(permission);
  }, [user]);

  const hasAnyPermission = useCallback((permissions) => {
    return permissions.some(p => hasPermission(p));
  }, [hasPermission]);

  const hasAllPermissions = useCallback((permissions) => {
    return permissions.every(p => hasPermission(p));
  }, [hasPermission]);

  const login = (token, userData) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    login,
    logout,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isAuthenticated: !!user,
    isBuyer: user?.role === 'buyer',
    isSuperAdmin: user?.role === 'super_admin',
    isBusinessAdmin: user?.role === 'business_admin'
  }), [user, hasPermission, hasAnyPermission, hasAllPermissions]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};