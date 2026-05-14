import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { ROLE_PERMISSIONS } from '../constants/permissions';

const AuthContext = createContext(null);

/**
 * Custom hook for accessing authentication context
 * @returns {Object} Authentication context with user data and methods
 * @throws {Error} If used outside of AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // 1. Lazy State Initialization (Prevents Cascading Renders)
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('userData');
        localStorage.removeItem('authToken');
      }
    }
    return null;
  });

  // 2. Permission Helpers (Memoized for performance)
  const hasPermission = useCallback((permission) => {
    if (!user || !user.role) return false;
    return (ROLE_PERMISSIONS[user.role] || []).includes(permission);
  }, [user]);

  const hasAnyPermission = useCallback((permissions) => {
    return permissions.some(p => hasPermission(p));
  }, [hasPermission]);

  const hasAllPermissions = useCallback((permissions) => {
    return permissions.every(p => hasPermission(p));
  }, [hasPermission]);

  // 3. Auth Actions
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

  // 4. Memoize the context value to prevent unnecessary re-renders of children
  const value = useMemo(() => ({
    user,
    login,
    logout,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isAuthenticated: !!user,
    isSuperAdmin: user?.role === 'super_admin',
    isBusinessAdmin: user?.role === 'business_admin'
  }), [user, hasPermission, hasAnyPermission, hasAllPermissions]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};