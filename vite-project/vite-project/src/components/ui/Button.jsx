import { memo } from 'react';

export const Button = memo(({
  children, variant = 'primary', size = 'md',
  fullWidth = false, disabled = false, onClick,
  type = 'button', className = '', icon, loading = false,
}) => {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';
  const variants = {
    primary:  'bg-brand-green text-white hover:bg-brand-green-dark focus:ring-brand-green shadow-sm hover:shadow-green',
    secondary:'bg-brand-teal text-brand-text hover:bg-cyan-100 focus:ring-cyan-300',
    outline:  'border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white focus:ring-brand-green',
    danger:   'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400',
    ghost:    'text-brand-text hover:bg-surface-tertiary focus:ring-gray-300',
    dark:     'bg-brand-text text-white hover:bg-gray-700 focus:ring-gray-500',
  };
  const sizes = {
    xs: 'px-3 py-1.5 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  return (
    <button
      type={type} onClick={onClick} disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : icon}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
