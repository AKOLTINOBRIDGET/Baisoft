// ROLE-BASED ROUTE COMPONENT
// ============================================
import { useAuth } from "./authcontext";

export const RoleBasedRoute = ({ 
  children, 
  allowedRoles = [],
  fallback = null,
  onUnauthorized = null
}) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    if (onUnauthorized) {
      onUnauthorized('auth_required');
    }
    return fallback || <UnauthorizedAccess message="Please log in to access this page." />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    if (onUnauthorized) {
      onUnauthorized('role_mismatch');
    }
    return fallback || <UnauthorizedAccess />;
  }

  return children;
};
