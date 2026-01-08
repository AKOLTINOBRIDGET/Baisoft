// CARD COMPONENT
// ============================================
import { COLORS } from "./colors";

export const Card = ({ 
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
};
