import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/Button';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { itemCount, setIsDrawerOpen } = useCart();
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="page-container h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-green/10 text-brand-green flex items-center justify-center">
            <span className="text-xl">📦</span>
          </div>
          <span className="font-bold font-display text-xl tracking-tight">ProductHub</span>
        </Link>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Search products, categories..." 
              className="w-full bg-surface-secondary border-none rounded-full py-2 pl-4 pr-10 text-sm focus:ring-2 focus:ring-brand-green/20 focus:bg-white transition-all outline-none"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-green">
              🔍
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="relative p-2 text-gray-600 hover:text-brand-green hover:bg-brand-green/5 rounded-full transition-colors"
          >
            <span className="text-xl">🛒</span>
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-brand-green text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                {itemCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-3 ml-2 border-l border-gray-200 pl-4">
              <span className="text-sm font-semibold hidden sm:block">{user.name.split(' ')[0]}</span>
              {user.role === 'buyer' ? (
                <Button variant="ghost" size="sm" onClick={logout}>Logout</Button>
              ) : (
                <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
                  Dashboard
                </Button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-2 border-l border-gray-200 pl-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Sign In</Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
