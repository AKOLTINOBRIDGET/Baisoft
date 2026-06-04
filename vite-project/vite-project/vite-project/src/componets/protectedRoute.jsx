import { Navigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

// Simple feedback component for denied access
const UnauthorizedAccess = ({ message = "Access Denied" }) => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>403</h1>
    <p>{message}</p>
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