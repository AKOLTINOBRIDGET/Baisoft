import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { COLORS } from "../componets/colors";
import Sidebar from '../componets/sidebar';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Sync path for active link styling
  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        user={user}
        currentPath={currentPath}
      />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-6 py-4">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl lg:text-2xl font-bold" style={{ color: COLORS.text }}>Dashboard</h1>
            </div>

            {/* User Dropdown */}
            <div className="relative">
              <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-inner" style={{ backgroundColor: COLORS.secondary }}>
                  <span className="text-white font-semibold text-sm">{user?.name?.charAt(0).toUpperCase()}</span>
                </div>
                <span className="hidden md:block font-medium" style={{ color: COLORS.text }}>{user?.name?.split(' ')[0]}</span>
              </button>

              {showUserMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-3 border-b bg-gray-50 rounded-t-lg">
                      <p className="font-semibold" style={{ color: COLORS.text }}>{user?.name}</p>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors">👤 My Profile</button>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors">⚙️ Settings</button>
                    <hr className="my-1" />
                    <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium">🚪 Logout</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
               <StatCard title="Total Products" value="25" icon="📦" trend="+3 from last month" />
               <StatCard title="Total Users" value="15" icon="👥" trend="Active users" />
               {user?.role === 'super_admin' && <StatCard title="Businesses" value="3" icon="🏢" trend="Active businesses" />}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h3 className="text-xl font-semibold mb-3" style={{ color: COLORS.text }}>Welcome back, {user?.name}! 👋</h3>
              <p className="text-gray-600 mb-4">
                You're logged in as <span className="font-medium capitalize px-2 py-1 rounded text-sm" style={{ backgroundColor: COLORS.primary }}>{user?.role?.replace('_', ' ')}</span>
              </p>
              <button className="px-4 py-2 rounded-lg text-white font-medium hover:brightness-110 shadow-lg transition-all" style={{ backgroundColor: COLORS.secondary }}>
                Quick Action
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Internal Helper Component for Stats
const StatCard = ({ title, value, icon, trend }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-lg" style={{ color: COLORS.text }}>{title}</h3>
      <span className="text-3xl">{icon}</span>
    </div>
    <p className="text-4xl font-bold mb-2" style={{ color: COLORS.secondary }}>{value}</p>
    <p className="text-sm text-gray-500">{trend}</p>
  </div>
);

export default DashboardLayout;