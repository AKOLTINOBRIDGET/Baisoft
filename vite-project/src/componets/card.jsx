
import { memo } from 'react';
import { COLORS } from "./colors";

/**
 * Card container component with optional title and subtitle
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Card content
 * @param {string} [props.title] - Card title
 * @param {string} [props.subtitle] - Card subtitle
 * @param {string} [props.padding='normal'] - Padding size variant
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {JSX.Element} Card component with content
 */
export const Card = memo(({
  children,
  title,
  subtitle,
  padding = 'normal',
  className = ''
}) => {
  const paddings = {
    none: '',
    small: 'p-4',
    normal: 'p-6',
    large: 'p-8'
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-md ${paddings[padding]} ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-xl font-semibold" style={{ color: COLORS.text }}>{title}</h3>}
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
});
