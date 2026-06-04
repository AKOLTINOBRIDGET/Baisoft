import { memo } from 'react';

export const Badge = memo(({ children, variant = 'default', className = '' }) => {
  const variants = {
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    default: 'badge-default',
    brand: 'bg-brand-green-light text-brand-green-dark text-xs font-semibold px-2.5 py-0.5 rounded-full',
  };

  return (
    <span className={`${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';
