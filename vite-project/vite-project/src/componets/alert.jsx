// ALERT COMPONENT
// ============================================
export const Alert = ({ 
  children, 
  variant = 'info',
  onClose,
  className = ''
}) => {
  const variants = {
    success: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', icon: '✓' },
    error: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: '✕' },
    warning: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', icon: '⚠' },
    info: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: 'ℹ' }
  };
  
  const style = variants[variant];
  
  return (
    <div className={`${style.bg} border ${style.border} rounded-lg p-4 ${className}`}>
      <div className="flex items-start">
        <span className={`${style.text} font-bold mr-3`}>{style.icon}</span>
        <div className={`flex-1 ${style.text}`}>{children}</div>
        {onClose && (
          <button onClick={onClose} className={`${style.text} ml-3 hover:opacity-70`}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
