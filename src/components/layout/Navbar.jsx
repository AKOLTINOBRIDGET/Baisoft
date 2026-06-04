import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/Button';
import { MOCK_PRODUCTS, CATEGORIES } from '../../data/mockData';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { itemCount, setIsDrawerOpen } = useCart();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const containerRef = useRef(null);

  // Filter approved products only for public catalog searches
  const approvedProducts = MOCK_PRODUCTS.filter(p => p.status === 'approved');

  // Handle outside clicks to close suggestion box
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Compute suggestions based on input and category
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = approvedProducts.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesText = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.business.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesText;
    });

    setSuggestions(filtered.slice(0, 5)); // Limit to top 5 suggestions
  }, [searchQuery, selectedCategory]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setShowSuggestions(false);
    setMobileSearchOpen(false);
    navigate(`/?search=${encodeURIComponent(searchQuery)}&category=${selectedCategory}`);
  };

  const handleSuggestionClick = (productId) => {
    setShowSuggestions(false);
    setMobileSearchOpen(false);
    setSearchQuery('');
    navigate(`/?product=${productId}`);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm transition-all duration-300">
      <div className="page-container h-16 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="MMPlaza Logo" className="w-8 h-8 object-contain" />
          <span className="font-bold font-display text-xl tracking-tight">ProductHub</span>
        </Link>

        {/* Advanced Search Bar - Desktop */}
        <div ref={containerRef} className="hidden md:flex flex-1 max-w-xl relative">
          <form onSubmit={handleSearchSubmit} className="flex w-full bg-surface-secondary border border-gray-200/80 rounded-full overflow-hidden hover:border-gray-300 focus-within:border-brand-green focus-within:ring-2 focus-within:ring-brand-green/20 transition-all">
            {/* Category Dropdown (Amazon Inspired) */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent border-r border-gray-200 text-xs font-semibold px-4 outline-none text-brand-muted hover:text-brand-text cursor-pointer max-w-[140px] truncate"
            >
              <option value="all">All Departments</option>
              {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>

            {/* TextInput */}
            <div className="flex-1 relative flex items-center">
              <input 
                type="text" 
                placeholder="Search products, brands, categories..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full bg-transparent px-4 py-2 text-sm text-brand-text outline-none placeholder-brand-muted"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  onClick={() => setSearchQuery('')}
                  className="text-gray-400 hover:text-brand-text text-xs pr-2"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Search Button */}
            <button 
              type="submit" 
              className="bg-brand-green text-white hover:bg-brand-green-dark px-6 flex items-center justify-center transition-colors"
              aria-label="Search button"
            >
              🔍
            </button>
          </form>

          {/* Autocomplete Suggestions Popup */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-card-hover py-2 z-50 animate-fade-in max-h-96 overflow-y-auto">
              <p className="px-4 py-1.5 text-[10px] font-bold text-brand-muted uppercase tracking-wider">Suggested Products</p>
              {suggestions.map(product => (
                <button
                  key={product.id}
                  onClick={() => handleSuggestionClick(product.id)}
                  className="w-full text-left px-4 py-2.5 hover:bg-surface-secondary flex items-center gap-3 transition-colors border-b border-gray-50 last:border-0"
                >
                  <div className="w-10 h-10 bg-surface-secondary rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xl">📦</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-brand-text truncate">{product.name}</p>
                    <p className="text-xs text-brand-muted truncate">{product.business} in <span className="capitalize">{product.category}</span></p>
                  </div>
                  <span className="font-extrabold text-sm text-brand-green">${product.price}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Actions Menu */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          
          {/* Mobile Search Toggle Button */}
          <button 
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-brand-green hover:bg-brand-green/5 rounded-full transition-colors"
            aria-label="Toggle mobile search"
          >
            {mobileSearchOpen ? '✕' : '🔍'}
          </button>

          {/* Cart Icon */}
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="relative p-2 text-gray-600 hover:text-brand-green hover:bg-brand-green/5 rounded-full transition-colors"
            aria-label="Open cart"
          >
            <span className="text-xl">🛒</span>
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-brand-green text-white text-[10px] font-extrabold flex items-center justify-center rounded-full border-2 border-white shadow-xs">
                {itemCount}
              </span>
            )}
          </button>

          {/* Auth Button */}
          {user ? (
            <div className="flex items-center gap-2 border-l border-gray-100 pl-3 sm:pl-4">
              <span className="text-xs font-bold hidden sm:block text-brand-text">{user.name.split(' ')[0]}</span>
              {user.role === 'buyer' ? (
                <Button variant="ghost" size="xs" onClick={logout} className="rounded-full">Sign Out</Button>
              ) : (
                <Button variant="outline" size="xs" onClick={() => navigate('/dashboard')} className="rounded-full text-xs py-1.5 px-3">
                  Dashboard
                </Button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-2 border-l border-gray-200 pl-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/splash')}>Sign In</Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Input Panel (Toggleable) */}
      {mobileSearchOpen && (
        <div className="p-4 bg-white border-t border-gray-100 md:hidden animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="flex bg-surface-secondary border border-gray-200 rounded-full overflow-hidden focus-within:border-brand-green">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent px-4 py-2 text-sm text-brand-text outline-none"
            />
            <button 
              type="submit" 
              className="bg-brand-green text-white px-5 flex items-center justify-center"
            >
              🔍
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};
