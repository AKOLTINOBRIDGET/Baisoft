import { useAuth } from "../contexts/AuthContext";

/**
 * Route protection based on user roles
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Protected content
 * @param {string[]} [props.allowedRoles=[]] - Array of allowed role strings
 * @param {ReactNode} [props.fallback] - Fallback component for unauthorized access
 * @param {Function} [props.onUnauthorized] - Callback when access is denied
 * @returns {ReactNode} Children or fallback based on role authorization
 */
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
