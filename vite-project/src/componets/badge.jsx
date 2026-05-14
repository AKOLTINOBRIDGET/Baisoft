// BADGE COMPONENT
// ============================================
export const Badge = ({ 
  children, 
  variant = 'default',
  size = 'medium'
}) => {
  const variants = {
    default: 'bg-gray-200 text-gray-700',
    primary: 'bg-[#E0F7FA] text-[#424242]',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  };
  
  const sizes = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-1.5 text-base'
  };
  
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';

