import { memo } from 'react';

export const Card = memo(({
  children, className = '', hoverable = false, padding = 'md'
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div className={`${hoverable ? 'card-hover' : 'card'} ${paddings[padding]} ${className}`}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';
