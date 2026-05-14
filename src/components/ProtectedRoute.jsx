import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UnauthorizedAccess = ({ message = "Access Denied" }) => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center animate-fade-in">
    <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-2xl mb-4">
      ✕
    </div>
    <h1 className="text-3xl font-bold font-display text-brand-text mb-2">403</h1>
    <p className="text-brand-muted">{message}</p>
  </div>
);

export const ProtectedRoute = ({ 
  children, 
  requireAuth = true,
  requiredPermission = null,
  requiredPermissions = [],
  requireAll = false,
  requiredRole = null,
  requiredRoles = [],
  fallback = null
}) => {
  const { isAuthenticated, user, hasPermission, hasAnyPermission, hasAllPermissions } = useAuth();

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) return fallback || <UnauthorizedAccess />;
  
  if (requiredRoles.length > 0 && !requiredRoles.includes(user?.role)) return fallback || <UnauthorizedAccess />;

  if (requiredPermission && !hasPermission(requiredPermission)) return fallback || <UnauthorizedAccess />;

  if (requiredPermissions.length > 0) {
    const hasAccess = requireAll ? hasAllPermissions(requiredPermissions) : hasAnyPermission(requiredPermissions);
    if (!hasAccess) return fallback || <UnauthorizedAccess />;
  }

  return children;
};
