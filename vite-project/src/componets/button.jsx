

import { memo } from 'react';
import { COLORS } from "./colors";

/**
 * Button component with multiple variants and sizes
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Button content
 * @param {string} [props.variant='primary'] - Button style variant
 * @param {string} [props.size='medium'] - Button size variant
 * @param {boolean} [props.fullWidth=false] - Whether button should be full width
 * @param {boolean} [props.disabled=false] - Whether button is disabled
 * @param {Function} [props.onClick] - Click handler function
 * @param {string} [props.type='button'] - Button type attribute
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {JSX.Element} Button element
 */
export const Button = memo(({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = ''
}) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: `bg-[#00C853] text-white hover:bg-[#00A544] focus:ring-[#00C853] ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
    secondary: `bg-[#E0F7FA] text-[#424242] hover:bg-[#B2EBF2] focus:ring-[#E0F7FA] ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
    outline: `border-2 border-[#00C853] text-[#00C853] hover:bg-[#00C853] hover:text-white focus:ring-[#00C853] ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
    danger: `bg-[#F44336] text-white hover:bg-[#D32F2F] focus:ring-[#F44336] ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
    ghost: `text-[#424242] hover:bg-[#E8EAF6] focus:ring-[#E8EAF6] ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`
  };
  
  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
    >
      {children}
    </button>
  );
});
