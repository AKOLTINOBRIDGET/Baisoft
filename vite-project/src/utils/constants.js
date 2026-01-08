/**
 * User Roles
 * Defines all possible user roles in the system
 */
export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  BUSINESS_ADMIN: 'business_admin',
  EDITOR: 'editor',
  APPROVER: 'approver',
  VIEWER: 'viewer'
};

/**
 * Product Status
 * Lifecycle states for products
 */
export const PRODUCT_STATUS = {
  DRAFT: 'draft',
  PENDING_APPROVAL: 'pending_approval',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

/**
 * Product Types
 * Categories of products
 */
export const PRODUCT_TYPES = {
  DIGITAL: 'digital',
  PHYSICAL: 'physical'
};

/**
 * Business Status
 */
export const BUSINESS_STATUS = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  PENDING: 'pending'
};

/**
 * Route Paths
 */
export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  MARKETPLACE: '/marketplace',
  STORE: '/store/:businessId',
  PRODUCT_DETAIL: '/product/:productId',
  
  // Super Admin routes
  SUPER_ADMIN_DASHBOARD: '/super-admin',
  SUPER_ADMIN_BUSINESSES: '/super-admin/businesses',
  
  // Business Admin routes
  BUSINESS_DASHBOARD: '/dashboard',
  BUSINESS_PRODUCTS: '/dashboard/products',
  BUSINESS_USERS: '/dashboard/users',
  BUSINESS_APPROVALS: '/dashboard/approvals',
  BUSINESS_ANALYTICS: '/dashboard/analytics',
  
  // User routes
  USER_PRODUCTS: '/my-products',
  CREATE_PRODUCT: '/products/create',
  EDIT_PRODUCT: '/products/edit/:productId'
};

/**
 * Permission Actions
 * All possible actions in the system
 */
export const PERMISSIONS = {
  // Business management
  CREATE_BUSINESS: 'create_business',
  EDIT_BUSINESS: 'edit_business',
  DELETE_BUSINESS: 'delete_business',
  VIEW_ALL_BUSINESSES: 'view_all_businesses',
  
  // User management
  CREATE_USER: 'create_user',
  EDIT_USER: 'edit_user',
  DELETE_USER: 'delete_user',
  ASSIGN_ROLES: 'assign_roles',
  
  // Product management
  CREATE_PRODUCT: 'create_product',
  EDIT_PRODUCT: 'edit_product',
  DELETE_PRODUCT: 'delete_product',
  VIEW_ALL_PRODUCTS: 'view_all_products',
  VIEW_OWN_PRODUCTS: 'view_own_products',
  
  // Product approval
  APPROVE_PRODUCT: 'approve_product',
  REJECT_PRODUCT: 'reject_product',
  
  // Public
  VIEW_APPROVED_PRODUCTS: 'view_approved_products'
};

/**
 * Role-Permission Mapping
 * Defines what each role can do
 */
export const ROLE_PERMISSIONS = {
  [USER_ROLES.SUPER_ADMIN]: [
    PERMISSIONS.VIEW_ALL_BUSINESSES,
    PERMISSIONS.CREATE_BUSINESS,
    PERMISSIONS.EDIT_BUSINESS,
    PERMISSIONS.DELETE_BUSINESS,
    PERMISSIONS.VIEW_ALL_PRODUCTS
  ],
  
  [USER_ROLES.BUSINESS_ADMIN]: [
    PERMISSIONS.CREATE_USER,
    PERMISSIONS.EDIT_USER,
    PERMISSIONS.DELETE_USER,
    PERMISSIONS.ASSIGN_ROLES,
    PERMISSIONS.CREATE_PRODUCT,
    PERMISSIONS.EDIT_PRODUCT,
    PERMISSIONS.DELETE_PRODUCT,
    PERMISSIONS.VIEW_ALL_PRODUCTS,
    PERMISSIONS.APPROVE_PRODUCT,
    PERMISSIONS.REJECT_PRODUCT
  ],
  
  [USER_ROLES.EDITOR]: [
    PERMISSIONS.CREATE_PRODUCT,
    PERMISSIONS.EDIT_PRODUCT,
    PERMISSIONS.VIEW_OWN_PRODUCTS,
    PERMISSIONS.VIEW_APPROVED_PRODUCTS
  ],
  
  [USER_ROLES.APPROVER]: [
    PERMISSIONS.APPROVE_PRODUCT,
    PERMISSIONS.REJECT_PRODUCT,
    PERMISSIONS.VIEW_ALL_PRODUCTS,
    PERMISSIONS.VIEW_APPROVED_PRODUCTS
  ],
  
  [USER_ROLES.VIEWER]: [
    PERMISSIONS.VIEW_APPROVED_PRODUCTS
  ]
};

/**
 * Status Badge Colors
 */
export const STATUS_COLORS = {
  [PRODUCT_STATUS.DRAFT]: 'badge-info',
  [PRODUCT_STATUS.PENDING_APPROVAL]: 'badge-warning',
  [PRODUCT_STATUS.APPROVED]: 'badge-success',
  [PRODUCT_STATUS.REJECTED]: 'badge-danger'
};

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
  BUSINESS: 'business_data'
};