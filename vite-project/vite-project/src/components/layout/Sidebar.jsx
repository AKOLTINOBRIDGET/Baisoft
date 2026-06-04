import { useNavigate } from 'react-router-dom';

export default function Sidebar({ isOpen, onClose, user, currentPath }) {
  const navigate = useNavigate();

  const getNavigationItems = () => {
    const common = [{ id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' }];
    const roleItems = {
      super_admin: [
        { id: 'businesses', label: 'Businesses', icon: '🏢', path: '/businesses' },
        { id: 'products', label: 'Products', icon: '📦', path: '/products' },
        { id: 'orders', label: 'Orders', icon: '🛍️', path: '/orders' },
        { id: 'users', label: 'Users', icon: '👥', path: '/users' },
      ],
      business_admin: [
        { id: 'products', label: 'Products', icon: '📦', path: '/products' },
        { id: 'orders', label: 'Orders', icon: '🛍️', path: '/orders' },
        { id: 'users', label: 'Users', icon: '👥', path: '/users' },
      ],
      editor: [
        { id: 'products', label: 'Products', icon: '📦', path: '/products' },
      ],
      approver: [
        { id: 'products', label: 'Products', icon: '📦', path: '/products' },
      ],
      buyer: [
        { id: 'orders', label: 'My Orders', icon: '🛍️', path: '/orders' },
      ]
    };
    return [...common, ...(roleItems[user?.role] || [])];
  };

  const navItems = getNavigationItems();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" 
          onClick={onClose} 
        />
      )}
      
      <aside className={`fixed top-0 left-0 h-screen bg-white shadow-card z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:sticky lg:top-0 w-64 flex flex-col border-r border-gray-100`}>
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="MMPlaza Logo" className="w-8 h-8 object-contain" />
            <h2 className="text-xl font-bold font-display text-brand-text">ProductHub</h2>
          </div>
          <button onClick={onClose} className="lg:hidden text-brand-muted hover:text-brand-text">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User Mini Profile */}
        <div className="p-4 mx-4 mt-4 rounded-xl bg-surface-secondary border border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-green text-white flex items-center justify-center font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-brand-text truncate">{user?.name}</p>
              <p className="text-xs text-brand-muted truncate capitalize font-medium">{user?.role?.replace('_', ' ')}</p>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          <p className="px-2 text-xs font-bold text-brand-muted uppercase tracking-wider mb-3">Menu</p>
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.id}
                onClick={() => { navigate(item.path); onClose(); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-all group ${
                  isActive 
                    ? 'bg-brand-green text-white shadow-green' 
                    : 'text-brand-muted hover:bg-brand-green/10 hover:text-brand-green'
                }`}
              >
                <span className={`text-xl transition-transform ${isActive ? '' : 'group-hover:scale-110'}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-surface-secondary/50 shrink-0">
          <p className="text-[10px] text-center text-brand-muted font-bold tracking-widest uppercase">
            © 2026 ProductHub
          </p>
        </div>
      </aside>
    </>
  );
}
