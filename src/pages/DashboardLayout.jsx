import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import DashboardWrapper from '../components/DashboardWrapper';
import { Menu, Store, User, LogOut } from 'lucide-react';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Dynamic Title
  const pageTitle = location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard';

  return (
    <div className="min-h-screen bg-surface-secondary flex font-sans">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        user={user}
        currentPath={location.pathname}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(true)} 
                className="lg:hidden p-2 rounded-lg text-brand-muted hover:bg-surface-secondary hover:text-brand-text transition-colors flex items-center justify-center"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-bold font-display capitalize text-brand-text">
                {pageTitle}
              </h1>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Go to Storefront Button */}
              <button 
                onClick={() => navigate('/')}
                className="hidden sm:flex items-center gap-2 text-sm font-semibold text-brand-green bg-brand-green/10 hover:bg-brand-green/20 px-4 py-2 rounded-lg transition-colors"
              >
                <Store className="w-4 h-4" /> View Storefront
              </button>

              {/* User Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)} 
                  className="flex items-center gap-3 p-1.5 rounded-full hover:bg-surface-secondary transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-sm">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:block font-semibold text-sm text-brand-text pr-2">
                    {user?.name?.split(' ')[0]}
                  </span>
                </button>

                {showUserMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-card border border-gray-100 py-1 z-50 animate-fade-in">
                      <div className="px-4 py-3 border-b border-gray-100 bg-surface-secondary/50">
                        <p className="font-bold text-sm text-brand-text">{user?.name}</p>
                        <p className="text-xs text-brand-muted truncate">{user?.email}</p>
                      </div>
                      <div className="p-1">
                        <button className="w-full text-left px-4 py-2 text-sm font-medium text-brand-text rounded-lg hover:bg-surface-secondary transition-colors flex items-center gap-2">
                          <User className="w-4 h-4 text-brand-muted" /> My Profile
                        </button>
                        <div className="h-px bg-gray-100 my-1" />
                        <button 
                          onClick={logout} 
                          className="w-full text-left px-4 py-2 text-sm font-bold text-brand-error rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4 text-brand-error" /> Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <DashboardWrapper>
            <Outlet />
          </DashboardWrapper>
        </main>
      </div>
    </div>
  );
}