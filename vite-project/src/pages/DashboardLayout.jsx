import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { COLORS } from "../componets/colors";
import Sidebar from '../componets/sidebar';
import DashboardWrapper from '../componets/DashboardWrapper';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();

  // Dynamic Title based on the URL path (e.g., /products -> PRODUCTS)
  const pageTitle = location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 1. Sidebar Component */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        user={user}
        currentPath={location.pathname}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* 2. Top Navigation Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-6 py-4">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl lg:text-2xl font-bold capitalize" style={{ color: COLORS.text }}>
                {pageTitle}
              </h1>
            </div>

            {/* User Dropdown Menu */}
            <div className="relative">
              <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-inner text-white" style={{ backgroundColor: COLORS.secondary }}>
                  <span className="font-semibold text-sm">{user?.name?.charAt(0).toUpperCase()}</span>
                </div>
                <span className="hidden md:block font-medium text-gray-700">{user?.name?.split(' ')[0]}</span>
              </button>

              {showUserMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-3 border-b bg-gray-50 rounded-t-lg">
                      <p className="font-semibold text-sm" style={{ color: COLORS.text }}>{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors">👤 My Profile</button>
                    <hr className="my-1" />
                    <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium">🚪 Logout</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* 3. Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <DashboardWrapper>
            


            <Outlet />
          </DashboardWrapper>
        </main>
      </div>
    </div>
  );
};




export default DashboardLayout;