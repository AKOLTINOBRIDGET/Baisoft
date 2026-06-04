// src/constants/routes.js
export const ROUTES = {
  // Public
  HOME: '/',
  LOGIN: '/login',
  PUBLIC_PRODUCTS: '/products',
  
  // Super Admin
  SUPER_ADMIN_DASHBOARD: '/super-admin',
  MANAGE_BUSINESSES: '/super-admin/businesses',
  
  // Business Admin & Users
  DASHBOARD: '/dashboard',
  PRODUCTS: '/dashboard/products',
  PRODUCT_CREATE: '/dashboard/products/create',
  PRODUCT_EDIT: '/dashboard/products/:id/edit',
  USERS: '/dashboard/users',
  APPROVALS: '/dashboard/approvals',
  PROFILE: '/dashboard/profile'
};
