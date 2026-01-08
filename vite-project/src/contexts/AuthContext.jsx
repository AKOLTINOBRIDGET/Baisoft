import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const AuthContext = createContext(null);

// Custom hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Permission definitions
const ROLE_PERMISSIONS = {
  super_admin: [
    'manage_businesses', 'create_users', 'edit_users', 'delete_users',
    'assign_roles', 'create_products', 'edit_products', 'delete_products',
    'approve_products', 'view_all_products'
  ],
  business_admin: [
    'create_users', 'edit_users', 'delete_users', 'assign_roles',
    'create_products', 'edit_products', 'delete_products',
    'approve_products', 'view_all_products'
  ],
  editor: ['create_products', 'edit_products', 'view_all_products'],
  approver: ['approve_products', 'view_all_products'],
  viewer: ['view_products']
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

  const [loading, setLoading] = useState(false);

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
    loading,
    login,
    logout,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isAuthenticated: !!user,
    isSuperAdmin: user?.role === 'super_admin',
    isBusinessAdmin: user?.role === 'business_admin'
  }), [user, loading, hasPermission, hasAnyPermission, hasAllPermissions]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};