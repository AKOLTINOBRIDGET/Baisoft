import { memo } from 'react';

export const Input = memo(({
  label, type = 'text', name, value, onChange, placeholder,
  error, icon, className = '', autoComplete
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && <label className="block text-sm font-semibold text-brand-text mb-2">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`input-field ${icon ? 'pl-10' : ''} ${error ? 'border-brand-error focus:border-brand-error focus:ring-brand-error/20' : ''}`}
        />
      </div>
      {error && <p className="mt-1.5 text-sm text-brand-error font-medium">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
