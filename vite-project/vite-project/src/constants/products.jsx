// src/constants/products.js
export const PRODUCT_STATUS = {
  DRAFT: 'draft',
  PENDING_APPROVAL: 'pending_approval',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

export const PRODUCT_STATUS_LABELS = {
  [PRODUCT_STATUS.DRAFT]: 'Draft',
  [PRODUCT_STATUS.PENDING_APPROVAL]: 'Pending Approval',
  [PRODUCT_STATUS.APPROVED]: 'Approved',
  [PRODUCT_STATUS.REJECTED]: 'Rejected'
};

export const PRODUCT_STATUS_COLORS = {
  [PRODUCT_STATUS.DRAFT]: 'bg-gray-200 text-gray-700',
  [PRODUCT_STATUS.PENDING_APPROVAL]: 'bg-yellow-200 text-yellow-800',
  [PRODUCT_STATUS.APPROVED]: 'bg-green-200 text-green-800',
  [PRODUCT_STATUS.REJECTED]: 'bg-red-200 text-red-800'
};

export const PRODUCT_TYPES = {
  DIGITAL: 'digital',
  PHYSICAL: 'physical'
};

export const PRODUCT_TYPE_LABELS = {
  [PRODUCT_TYPES.DIGITAL]: 'Digital Product',
  [PRODUCT_TYPES.PHYSICAL]: 'Physical Product'
};