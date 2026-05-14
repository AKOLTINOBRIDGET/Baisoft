/**
 * Email validation
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Password strength validation
 * Minimum 8 characters, at least one letter and one number
 * @param {string} password
 * @returns {boolean}
 */
export const isValidPassword = (password) => {
  return password && password.length >= 8;
};

/**
 * Validate product form data
 * @param {Object} data - Product data
 * @returns {Object} - { isValid: boolean, errors: Object }
 */
export const validateProduct = (data) => {
  const errors = {};
  
  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Product name is required';
  } else if (data.name.length > 100) {
    errors.name = 'Product name must be less than 100 characters';
  }
  
  if (!data.description || data.description.trim().length === 0) {
    errors.description = 'Description is required';
  } else if (data.description.length < 10) {
    errors.description = 'Description must be at least 10 characters';
  }
  
  if (!data.price || isNaN(data.price) || parseFloat(data.price) <= 0) {
    errors.price = 'Valid price is required';
  }
  
  if (!data.productType) {
    errors.productType = 'Product type is required';
  }
  
  // Digital product specific validation
  if (data.productType === 'digital') {
    if (data.downloadUrl && !isValidUrl(data.downloadUrl)) {
      errors.downloadUrl = 'Valid download URL is required';
    }
  }
  
  // Physical product specific validation
  if (data.productType === 'physical') {
    if (data.inventory && (isNaN(data.inventory) || parseInt(data.inventory) < 0)) {
      errors.inventory = 'Valid inventory count is required';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate business form data
 * @param {Object} data - Business data
 * @returns {Object} - { isValid: boolean, errors: Object }
 */
export const validateBusiness = (data) => {
  const errors = {};
  
  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Business name is required';
  } else if (data.name.length > 100) {
    errors.name = 'Business name must be less than 100 characters';
  }
  
  if (!data.description || data.description.trim().length === 0) {
    errors.description = 'Description is required';
  }
  
  if (data.email && !isValidEmail(data.email)) {
    errors.email = 'Valid email is required';
  }
  
  if (data.website && !isValidUrl(data.website)) {
    errors.website = 'Valid website URL is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate user form data
 * @param {Object} data - User data
 * @param {boolean} isEdit - Whether this is an edit operation
 * @returns {Object} - { isValid: boolean, errors: Object }
 */
export const validateUser = (data, isEdit = false) => {
  const errors = {};
  
  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Name is required';
  }
  
  if (!data.email || !isValidEmail(data.email)) {
    errors.email = 'Valid email is required';
  }
  
  if (!isEdit) {
    if (!data.password || !isValidPassword(data.password)) {
      errors.password = 'Password must be at least 8 characters';
    }
  }
  
  if (!data.role) {
    errors.role = 'Role is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * URL validation
 * @param {string} url
 * @returns {boolean}
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Sanitize string input
 * @param {string} str
 * @returns {string}
 */
export const sanitizeString = (str) => {
  if (!str) return '';
  return str.trim().replace(/[<>]/g, '');
};

/**
 * Format currency
 * @param {number} amount
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

/**
 * Format date
 * @param {string|Date} date
 * @returns {string}
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Format date with time
 * @param {string|Date} date
 * @returns {string}
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};