// import { ROLE_PERMISSIONS, USER_ROLES } from './constants';

// /**
//  * Check if a user has a specific permission
//  * @param {Object} user - User object with role property
//  * @param {string} permission - Permission to check
//  * @returns {boolean}
//  */
// export const hasPermission = (user, permission) => {
//   if (!user || !user.role) return false;
  
//   const userPermissions = ROLE_PERMISSIONS[user.role] || [];
//   return userPermissions.includes(permission);
// };

// /**
//  * Check if a user has any of the specified permissions
//  * @param {Object} user - User object with role property
//  * @param {Array<string>} permissions - Array of permissions to check
//  * @returns {boolean}
//  */
// export const hasAnyPermission = (user, permissions) => {
//   if (!user || !user.role || !Array.isArray(permissions)) return false;
  
//   return permissions.some(permission => hasPermission(user, permission));
// };

// /**
//  * Check if a user has all specified permissions
//  * @param {Object} user - User object with role property
//  * @param {Array<string>} permissions - Array of permissions to check
//  * @returns {boolean}
//  */
// export const hasAllPermissions = (user, permissions) => {
//   if (!user || !user.role || !Array.isArray(permissions)) return false;
  
//   return permissions.every(permission => hasPermission(user, permission));
// };

// /**
//  * Check if user is Super Admin
//  * @param {Object} user - User object
//  * @returns {boolean}
//  */
// export const isSuperAdmin = (user) => {
//   return user?.role === USER_ROLES.SUPER_ADMIN;
// };

// /**
//  * Check if user is Business Admin
//  * @param {Object} user - User object
//  * @returns {boolean}
//  */
// export const isBusinessAdmin = (user) => {
//   return user?.role === USER_ROLES.BUSINESS_ADMIN;
// };

// /**
//  * Check if user can edit a specific product
//  * @param {Object} user - User object
//  * @param {Object} product - Product object
//  * @returns {boolean}
//  */
// export const canEditProduct = (user, product) => {
//   if (!user || !product) return false;
  
//   // Super Admin can edit anything
//   if (isSuperAdmin(user)) return true;
  
//   // Business Admin can edit any product in their business
//   if (isBusinessAdmin(user) && user.businessId === product.businessId) {
//     return true;
//   }
  
//   // Editors can edit their own products
//   if (user.role === USER_ROLES.EDITOR && user.id === product.createdBy) {
//     return true;
//   }
  
//   return false;
// };

// /**
//  * Check if user can delete a specific product
//  * @param {Object} user - User object
//  * @param {Object} product - Product object
//  * @returns {boolean}
//  */
// export const canDeleteProduct = (user, product) => {
//   if (!user || !product) return false;
  
//   // Only Super Admin and Business Admin can delete
//   if (isSuperAdmin(user)) return true;
  
//   if (isBusinessAdmin(user) && user.businessId === product.businessId) {
//     return true;
//   }
  
//   return false;
// };

// /**
//  * Check if user can approve products
//  * @param {Object} user - User object
//  * @returns {boolean}
//  */
// export const canApproveProducts = (user) => {
//   return hasPermission(user, 'approve_product');
// };

// /**
//  * Get user's accessible routes based on role
//  * @param {Object} user - User object
//  * @returns {Array<string>}
//  */
// export const getAccessibleRoutes = (user) => {
//   if (!user) return ['/login', '/marketplace', '/'];
  
//   const routes = ['/marketplace', '/'];
  
//   if (isSuperAdmin(user)) {
//     routes.push('/super-admin', '/super-admin/businesses');
//   } else if (user.businessId) {
//     routes.push('/dashboard', '/dashboard/products', '/dashboard/users');
    
//     if (canApproveProducts(user)) {
//       routes.push('/dashboard/approvals');
//     }
    
//     if (hasPermission(user, 'create_product')) {
//       routes.push('/products/create');
//     }
//   }
  
//   return routes;
// };

// /**
//  * Filter products based on user permissions
//  * @param {Array<Object>} products - Array of products
//  * @param {Object} user - User object
//  * @returns {Array<Object>}
//  */
// export const filterProductsByPermission = (products, user) => {
//   if (!user || !Array.isArray(products)) return [];
  
//   // Super Admin sees everything
//   if (isSuperAdmin(user)) return products;
  
//   // Business Admin sees all products in their business
//   if (isBusinessAdmin(user)) {
//     return products.filter(p => p.businessId === user.businessId);
//   }
  
//   // Editors see their own products + approved products
//   if (user.role === USER_ROLES.EDITOR) {
//     return products.filter(
//       p => p.createdBy === user.id || p.status === 'approved'
//     );
//   }
  
//   // Approvers see all products in their business
//   if (user.role === USER_ROLES.APPROVER) {
//     return products.filter(p => p.businessId === user.businessId);
//   }
  
//   // Viewers only see approved products
//   return products.filter(p => p.status === 'approved');
// };


import { ROLE_PERMISSIONS } from './constants';

// src/utils/permissions.js
/**
 * Check if a user has a specific permission
 * @param {string} userRole - User's role
 * @param {string} permission - Permission to check
 * @returns {boolean}
 */
export const hasPermission = (userRole, permission) => {
  const rolePermissions = ROLE_PERMISSIONS[userRole] || [];
  return rolePermissions.includes(permission);
};

/**
 * Check if a user has any of the specified permissions
 * @param {string} userRole - User's role
 * @param {string[]} permissions - Array of permissions
 * @returns {boolean}
 */
export const hasAnyPermission = (userRole, permissions) => {
  return permissions.some(permission => hasPermission(userRole, permission));
};

/**
 * Check if a user has all of the specified permissions
 * @param {string} userRole - User's role
 * @param {string[]} permissions - Array of permissions
 * @returns {boolean}
 */
export const hasAllPermissions = (userRole, permissions) => {
  return permissions.every(permission => hasPermission(userRole, permission));
};

/**
 * Get all permissions for a role
 * @param {string} userRole - User's role
 * @returns {string[]}
 */
export const getRolePermissions = (userRole) => {
  return ROLE_PERMISSIONS[userRole] || [];
};