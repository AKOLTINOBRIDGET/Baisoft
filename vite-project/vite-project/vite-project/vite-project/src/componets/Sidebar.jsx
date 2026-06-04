import React from 'react';
import { useNavigate } from 'react-router-dom';
import { COLORS } from './colors';

const Sidebar = ({ isOpen, onClose, user, currentPath }) => {
  const navigate = useNavigate();

  const getNavigationItems = () => {
    const common = [{ id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' }];
    const roleItems = {
      super_admin: [
        { id: 'businesses', label: 'Businesses', icon: '🏢', path: '/businesses' },
        { id: 'products', label: 'Products', icon: '📦', path: '/products' },
        { id: 'users', label: 'Users', icon: '👥', path: '/users' },
        { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' }
      ],
      business_admin: [
        { id: 'products', label: 'Products', icon: '📦', path: '/products' },
        { id: 'users', label: 'Users', icon: '👥', path: '/users' },
        { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' }
      ],
      editor: [
        { id: 'products', label: 'Products', icon: '📦', path: '/products' },
        { id: 'profile', label: 'My Profile', icon: '👤', path: '/profile' }
      ],
      approver: [
        { id: 'products', label: 'Products', icon: '📦', path: '/products' },
        { id: 'approvals', label: 'Approvals', icon: '✅', path: '/approvals' },
        { id: 'profile', label: 'My Profile', icon: '👤', path: '/profile' }
      ],
      viewer: [
        { id: 'products', label: 'Products', icon: '📦', path: '/products' },
        { id: 'profile', label: 'My Profile', icon: '👤', path: '/profile' }
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
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={onClose} 
        />
      )}
      
      {/* Side Bar - Now with h-screen and sticky positioning */}
      <aside className={`fixed top-0 left-0 h-screen bg-white shadow-xl z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:sticky lg:top-0 w-64 flex flex-col border-r border-gray-200`}>
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: COLORS.secondary }}>
                <span className="text-xl">📦</span>
              </div>
              <h2 className="text-xl font-bold" style={{ color: COLORS.secondary }}>ProductHub</h2>
            </div>
            <button onClick={onClose} className="lg:hidden text-gray-600 p-1 hover:bg-gray-100 rounded">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* User Mini Profile */}
        <div className="p-4 border-b border-gray-200" style={{ backgroundColor: COLORS.primary }}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-inner" style={{ backgroundColor: COLORS.secondary }}>
              <span className="text-white font-bold text-sm">{user?.name?.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate" style={{ color: COLORS.text }}>{user?.name}</p>
              <p className="text-xs text-gray-600 truncate capitalize">{user?.role?.replace('_', ' ')}</p>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { navigate(item.path); onClose(); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all group ${currentPath === item.path ? 'text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
              style={currentPath === item.path ? { backgroundColor: COLORS.secondary } : {}}
            >
              <span className={`text-xl transition-transform group-hover:scale-110`}>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-[10px] text-center text-gray-400 font-medium tracking-widest uppercase">© 2026 ProductHub v1.0</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;