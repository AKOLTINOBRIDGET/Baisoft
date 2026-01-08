// ============================================
// ROLE GATE COMPONENT (for inline use)
// ============================================
import { useAuth } from "./authcontext";

export const RoleGate = ({ 
  children, 
  role = null,
  roles = [],
  fallback = null
}) => {
  const { user } = useAuth();

  // Check single role
  if (role && user?.role !== role) {
    return fallback;
  }

  // Check multiple roles
  if (roles.length > 0 && !roles.includes(user?.role)) {
    return fallback;
  }

  return children;
};