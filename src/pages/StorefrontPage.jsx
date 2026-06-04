import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_PRODUCTS, CATEGORIES } from '../data/mockData';
import { ProductCard } from '../components/features/ProductCard';
import { Navbar } from '../components/layout/Navbar';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useCart } from '../contexts/CartContext';
import { AIChatbot } from '../components/features/AIChatbot';
import { 
  SlidersHorizontal, 
  Search, 
  ShieldCheck, 
  Laptop, 
  Shirt, 
  Coffee, 
  Sparkles, 
  Flame, 
  Home as HomeIcon, 
  BookOpen, 
  LayoutGrid 
} from 'lucide-react';

const CATEGORY_ICONS = {
  all: LayoutGrid,
  electronics: Laptop,
  fashion: Shirt,
  food: Coffee,
  beauty: Sparkles,
  sports: Flame,
  home: HomeIcon,
  books: BookOpen,
};

const CATEGORY_GRADIENTS = {
  all: 'from-gray-100 to-gray-200 text-gray-700',
  electronics: 'from-blue-400 to-indigo-500 text-white',
  fashion: 'from-pink-400 to-rose-500 text-white',
  food: 'from-amber-400 to-orange-500 text-white',
  beauty: 'from-purple-400 to-pink-500 text-white',
  sports: 'from-teal-400 to-emerald-500 text-white',
  home: 'from-lime-400 to-green-500 text-white',
  books: 'from-cyan-400 to-blue-500 text-white',
};

const MOCK_REVIEWS_LIST = [
  { name: 'Sarah K.', rating: 5, date: 'May 12, 2026', title: 'Absolutely Fantastic!', comment: 'High quality product that exceeded my expectations. Fast delivery too!', verified: true },
  { name: 'David M.', rating: 4, date: 'April 28, 2026', title: 'Very Good, highly recommend', comment: 'Works exactly as described. The customer service from the store was great.', verified: true },
  { name: 'Elena R.', rating: 5, date: 'April 15, 2026', title: 'Top tier quality', comment: 'Beautiful packaging, premium build, and exactly what I needed. Will buy again!', verified: false }
];

export default function StorefrontPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addItem } = useCart();

  // Dialog & Active tab states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // overview, specs, reviews

  // Navigation Filter Sync
  const querySearch = searchParams.get('search') || '';
  const queryCategory = searchParams.get('category') || 'all';
  const queryProduct = searchParams.get('product') || '';

  // Local Filter States
  const [activeCategory, setActiveCategory] = useState(queryCategory);
  const [searchQuery, setSearchQuery] = useState(querySearch);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    setActiveCategory(queryCategory);
    setSearchQuery(querySearch);
  }, [queryCategory, querySearch]);

  // Handle direct product opening from query param
  useEffect(() => {
    if (queryProduct) {
      const prod = MOCK_PRODUCTS.find(p => p.id === queryProduct && p.status === 'approved');
      if (prod) {
        setSelectedProduct(prod);
        setActiveTab('overview');
      }
    }
  }, [queryProduct]);

  // Derived list of vendors
  const approvedProducts = MOCK_PRODUCTS.filter(p => p.status === 'approved');
  const vendors = Array.from(new Set(approvedProducts.map(p => p.business)));

  // Handle vendor checkbox toggle
  const handleVendorToggle = (vendor) => {
    setSelectedVendors(prev => 
      prev.includes(vendor) ? prev.filter(v => v !== vendor) : [...prev, vendor]
    );
  };

  // Clear all filters
  const handleClearFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setMinPrice('');
    setMaxPrice('');
    setRatingFilter(0);
    setInStockOnly(false);
    setSelectedVendors([]);
    setSortBy('featured');
    setSearchParams({});
  };

  // Filter and Sort Logic
  const filteredProducts = approvedProducts.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.business.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
                          
    const matchesMinPrice = minPrice === '' || product.price >= parseFloat(minPrice);
    const matchesMaxPrice = maxPrice === '' || product.price <= parseFloat(maxPrice);
    const matchesRating = ratingFilter === 0 || product.rating >= ratingFilter;
    const matchesStock = !inStockOnly || product.stock > 0;
    const matchesVendor = selectedVendors.length === 0 || selectedVendors.includes(product.business);

    return matchesCategory && matchesSearch && matchesMinPrice && matchesMaxPrice && matchesRating && matchesStock && matchesVendor;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    // Default is featured
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="min-h-screen bg-surface-secondary flex flex-col font-sans">
      <Navbar />

      {/* Hero Section with Glassmorphism Search */}
      <div className="bg-brand-dark text-white py-14 relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-brand-dark to-slate-950">
        <div className="absolute top-[-30%] right-[-10%] w-[60%] h-[150%] bg-brand-green/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="page-container relative z-10">
          <div className="max-w-2xl text-center md:text-left">
            <Badge variant="brand" className="mb-4 bg-brand-green/20 text-brand-green font-bold text-xs uppercase tracking-widest px-3 py-1 border border-brand-green/30">
              Verified Marketplace
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display mb-4 leading-tight">
              Aesthetic Shopping <br className="hidden md:inline" />
              Reimagined.
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 max-w-lg leading-relaxed">
              Discover unique craft, designer essentials, and top-tier electronics from verified independent businesses.
            </p>
            
            {/* Quick Hero Search Input */}
            <div className="relative max-w-md">
              <input 
                type="text" 
                placeholder="Find anything (MacBook, Coffee, Blazers...)" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-3.5 rounded-full text-brand-text pr-32 focus:outline-none focus:ring-4 focus:ring-brand-green/20 transition-all shadow-lg border border-gray-100 bg-white"
              />
              <Button 
                className="absolute right-1.5 top-1.5 bottom-1.5 rounded-full px-5 text-xs font-bold uppercase tracking-wider"
                onClick={() => document.getElementById('marketplace-body').scrollIntoView()}
              >
                Explore
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Circular Visual Category Grid (Etsy Inspired) */}
      <div className="bg-white border-b border-gray-100 py-8 shadow-xs">
        <div className="page-container">
          <p className="text-xs font-bold text-brand-muted uppercase tracking-widest text-center mb-6">Shop by Category</p>
          <div className="flex justify-start md:justify-center overflow-x-auto gap-6 sm:gap-8 pb-3 custom-scrollbar">
            {CATEGORIES.map(category => {
              const isSelected = activeCategory === category.id;
              const gradient = CATEGORY_GRADIENTS[category.id] || 'from-gray-100 to-gray-200';
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setSearchParams({ category: category.id });
                  }}
                  className="flex flex-col items-center gap-2 text-center group shrink-0 transition-transform active:scale-95 outline-none"
                >
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300 relative ${
                    isSelected ? 'ring-4 ring-brand-green ring-offset-2 scale-105' : 'border border-gray-100'
                  }`}>
                    {(() => {
                      const IconComponent = CATEGORY_ICONS[category.id] || LayoutGrid;
                      return <IconComponent className={`w-6 h-6 sm:w-7 sm:h-7 ${isSelected ? 'text-brand-green' : 'text-brand-text group-hover:text-brand-green'}`} />;
                    })()}
                  </div>
                  <span className={`text-xs font-bold tracking-tight transition-colors duration-200 ${
                    isSelected ? 'text-brand-green' : 'text-brand-text group-hover:text-brand-green'
                  }`}>
                    {category.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Marketplace Grid & Filters Side Panel */}
      <div className="flex-1 page-container py-10" id="marketplace-body">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          
          {/* Desktop Left Filter Panel (eBay/Amazon Inspired) */}
          <aside className="hidden lg:block w-64 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs shrink-0 sticky top-20">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <h3 className="font-extrabold text-brand-text text-sm uppercase tracking-wider">Filters</h3>
              <button 
                onClick={handleClearFilters}
                className="text-xs font-bold text-brand-green hover:text-brand-green-dark transition-colors"
              >
                Clear All
              </button>
            </div>

            {/* Sort Filter */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2.5">Sort Products</label>
              <select 
                className="w-full text-xs font-semibold text-brand-text bg-surface-secondary border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-brand-green transition-all"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured / Suggested</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2.5">Price Range ($)</label>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full bg-surface-secondary text-xs font-semibold text-brand-text border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-brand-green"
                />
                <input 
                  type="number" 
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full bg-surface-secondary text-xs font-semibold text-brand-text border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-brand-green"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2.5">Customer Rating</label>
              <div className="space-y-1.5">
                {[4, 3, 2].map(stars => (
                  <button
                    key={stars}
                    onClick={() => setRatingFilter(ratingFilter === stars ? 0 : stars)}
                    className={`w-full flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg font-semibold transition-all ${
                      ratingFilter === stars 
                        ? 'bg-brand-green/10 text-brand-green border border-brand-green/20' 
                        : 'text-brand-text hover:bg-surface-secondary'
                    }`}
                  >
                    <span className="flex text-yellow-400">
                      {'★'.repeat(stars)}
                      {'☆'.repeat(5 - stars)}
                      <span className="text-brand-text ml-1.5 font-bold">& Up</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Vendor Filter */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2.5">Verified Shops</label>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {vendors.map(vendor => (
                  <label key={vendor} className="flex items-center gap-2 text-xs font-bold text-brand-text cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={selectedVendors.includes(vendor)}
                      onChange={() => handleVendorToggle(vendor)}
                      className="rounded border-gray-300 text-brand-green focus:ring-brand-green w-4 h-4"
                    />
                    <span>{vendor}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stock Availability Toggle */}
            <div>
              <label className="flex items-center justify-between text-xs font-bold text-brand-text cursor-pointer select-none">
                <span>Show In-Stock Only</span>
                <input 
                  type="checkbox" 
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-gray-300 text-brand-green focus:ring-brand-green w-4 h-4"
                />
              </label>
            </div>
          </aside>

          {/* Right Product Grid Area */}
          <main className="flex-grow w-full">
            {/* Header info */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold font-display text-brand-text capitalize">
                  {activeCategory === 'all' ? 'All Products' : CATEGORIES.find(c => c.id === activeCategory)?.label}
                </h2>
                {searchQuery && (
                  <p className="text-xs font-semibold text-brand-muted mt-1">Showing search results for "{searchQuery}"</p>
                )}
              </div>

              {/* Mobile Filter Toggle Button */}
              <Button 
                variant="outline" 
                size="sm" 
                className="lg:hidden rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5"
                onClick={() => setFilterDrawerOpen(true)}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
              </Button>
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={(p) => {
                      setSelectedProduct(p);
                      setActiveTab('overview');
                    }} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center">
                <Search className="w-14 h-14 mb-4 text-brand-muted opacity-60" />
                <h3 className="text-xl font-bold mb-1 text-brand-text">No products fit your search</h3>
                <p className="text-brand-muted text-sm max-w-sm mx-auto">Try clearing price ranges, ratings, or category filters to expand results.</p>
                <Button variant="outline" className="mt-6 rounded-full font-extrabold tracking-wider" onClick={handleClearFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Premium Product Details Modal (Amazon + Etsy inspired) */}
      <Modal 
        isOpen={!!selectedProduct} 
        onClose={() => {
          setSelectedProduct(null);
          // Strip product query param on close
          const params = new URLSearchParams(searchParams);
          params.delete('product');
          setSearchParams(params);
        }}
        title="Product Details"
        maxWidth="max-w-4xl"
      >
        {selectedProduct && (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <div className="aspect-square bg-surface-secondary rounded-2xl flex items-center justify-center relative overflow-hidden">
                <img 
                  src={selectedProduct.image || "/logo.png"} 
                  alt={selectedProduct.name} 
                  className={`w-full h-full ${selectedProduct.image ? 'object-cover' : 'w-1/2 h-1/2 object-contain opacity-30 grayscale'}`}
                  onError={(e) => {
                    e.target.src = '/logo.png';
                    e.target.className = 'w-1/2 h-1/2 object-contain opacity-30 grayscale';
                  }}
                />
                {selectedProduct.featured && (
                  <Badge variant="brand" className="absolute top-4 left-4 bg-brand-green font-bold text-xs uppercase shadow-md border-0 text-white">Featured</Badge>
                )}
                {selectedProduct.stock > 0 && selectedProduct.stock <= 5 && (
                  <span className="absolute bottom-4 right-4 bg-amber-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md animate-bounce">
                    Only {selectedProduct.stock} Left!
                  </span>
                )}
              </div>
            </div>

            {/* Right Side Detail Tabs and Data */}
            <div className="w-full md:w-1/2 flex flex-col self-stretch">
              
              {/* Product Heading Info */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold text-brand-green tracking-widest uppercase">{selectedProduct.business}</span>
                  {selectedProduct.rating >= 4.7 && (
                    <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      ★ Star Seller
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-extrabold font-display leading-tight text-brand-text">
                  {selectedProduct.name}
                </h2>
              </div>

              {/* Stars & Mini Price summary */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-base">★</span>
                  <span className="text-sm font-extrabold text-brand-text">{selectedProduct.rating || 'New'}</span>
                  <span className="text-xs text-brand-muted font-medium">({selectedProduct.reviews || 0} customer reviews)</span>
                </div>
                <div className="h-4 w-px bg-gray-200" />
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-brand-text">${selectedProduct.price}</span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm text-brand-muted line-through">${selectedProduct.originalPrice}</span>
                  )}
                </div>
              </div>

              {/* Tabs Navigation */}
              <div className="flex border-b border-gray-100 mb-6 gap-6">
                {['overview', 'specs', 'reviews'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-xs font-extrabold uppercase tracking-wider border-b-2 transition-all outline-none ${
                      activeTab === tab 
                        ? 'border-brand-green text-brand-green' 
                        : 'border-transparent text-brand-muted hover:text-brand-text'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="flex-1 overflow-y-auto max-h-60 pr-2 custom-scrollbar mb-6">
                {/* 1. Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-4 animate-fade-in">
                    <p className="text-sm text-brand-muted leading-relaxed">
                      {selectedProduct.description}
                    </p>
                    <div className="bg-surface-secondary/50 p-4 rounded-2xl border border-gray-100 text-xs text-brand-muted leading-relaxed">
                      <span className="font-bold text-brand-text mb-1.5 flex items-center gap-1.5 text-xs">
                        <ShieldCheck className="w-4 h-4 text-brand-green" /> Multi-Tenant Vendor Guarantees:
                      </span>
                      Purchased items are directly shipped and managed by <span className="font-bold text-brand-green">{selectedProduct.business}</span>. Secured transaction checkout is backed by SSL connections.
                    </div>
                  </div>
                )}

                {/* 2. Specifications Tab */}
                {activeTab === 'specs' && (
                  <div className="animate-fade-in">
                    {selectedProduct.specs ? (
                      <table className="w-full text-xs text-left border-collapse">
                        <tbody>
                          {Object.entries(selectedProduct.specs).map(([key, val]) => (
                            <tr key={key} className="border-b border-gray-50 last:border-0 hover:bg-surface-secondary/55">
                              <td className="py-2.5 font-bold text-brand-muted uppercase tracking-wider w-1/3">{key}</td>
                              <td className="py-2.5 text-brand-text font-semibold">{val}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-xs text-brand-muted">No specifications listed for this item.</p>
                    )}
                  </div>
                )}

                {/* 3. Reviews Tab (Amazon Star Distribution Graphics) */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6 animate-fade-in">
                    {/* Star distribution */}
                    <div className="flex items-center gap-6 bg-surface-secondary/40 p-4 rounded-xl border border-gray-100">
                      <div className="text-center">
                        <p className="text-3xl font-black text-brand-text">{selectedProduct.rating || '4.8'}</p>
                        <p className="text-[10px] text-brand-muted font-bold uppercase tracking-wider mt-1">out of 5 stars</p>
                      </div>
                      <div className="flex-1 space-y-1.5 text-[10px] font-bold text-brand-text">
                        <div className="flex items-center gap-2">
                          <span className="w-8 shrink-0">5 star</span>
                          <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="bg-yellow-400 h-full" style={{ width: '75%' }} />
                          </div>
                          <span className="w-8 shrink-0 text-right">75%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-8 shrink-0">4 star</span>
                          <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="bg-yellow-400 h-full" style={{ width: '15%' }} />
                          </div>
                          <span className="w-8 shrink-0 text-right">15%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-8 shrink-0">3 star</span>
                          <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="bg-yellow-400 h-full" style={{ width: '8%' }} />
                          </div>
                          <span className="w-8 shrink-0 text-right">8%</span>
                        </div>
                      </div>
                    </div>

                    {/* Review Comments list */}
                    <div className="space-y-4">
                      {MOCK_REVIEWS_LIST.map((rev, index) => (
                        <div key={index} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0 text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center font-bold text-[10px]">
                                {rev.name.charAt(0)}
                              </div>
                              <span className="font-extrabold text-brand-text">{rev.name}</span>
                              {rev.verified && (
                                <span className="text-[9px] font-bold text-brand-success bg-green-50 px-1 rounded">Verified Purchase</span>
                              )}
                            </div>
                            <span className="text-brand-muted text-[10px] font-medium">{rev.date}</span>
                          </div>
                          <div className="flex text-yellow-400 mb-1">
                            {'★'.repeat(rev.rating)}
                            {'☆'.repeat(5 - rev.rating)}
                          </div>
                          <p className="font-bold text-brand-text mb-1">{rev.title}</p>
                          <p className="text-brand-muted leading-relaxed font-medium">{rev.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Stock availability & Action CTA */}
              <div className="mt-auto space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                  <span className="text-brand-muted">Availability</span>
                  <span className={selectedProduct.stock > 0 ? 'text-brand-green' : 'text-red-500'}>
                    {selectedProduct.stock > 0 ? `In Stock (${selectedProduct.stock})` : 'Out of Stock'}
                  </span>
                </div>
                
                <Button 
                  fullWidth 
                  size="lg"
                  disabled={selectedProduct.stock === 0}
                  onClick={() => {
                    addItem(selectedProduct, 1);
                    setSelectedProduct(null);
                    // Strip param
                    const params = new URLSearchParams(searchParams);
                    params.delete('product');
                    setSearchParams(params);
                  }}
                  className="rounded-xl font-bold uppercase tracking-wider py-3"
                >
                  {selectedProduct.stock === 0 ? 'Item Out of Stock' : 'Add to Cart'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Floating Interactive AI Shopping Chatbot */}
      <AIChatbot />

      {/* Mobile Filter Drawer Overlay */}
      {filterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setFilterDrawerOpen(false)} />
          <div className="relative w-80 bg-white h-full shadow-2xl flex flex-col p-6 animate-slide-in-right overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <h3 className="font-extrabold text-brand-text text-sm uppercase tracking-wider">Filters</h3>
              <button onClick={() => setFilterDrawerOpen(false)} className="text-gray-400 hover:text-brand-text text-sm font-bold">✕</button>
            </div>

            {/* Sort */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2.5">Sort Products</label>
              <select 
                className="w-full text-xs font-semibold text-brand-text bg-surface-secondary border border-gray-200 rounded-xl px-3 py-2.5 outline-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
              </select>
            </div>

            {/* Price */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2.5">Price Range ($)</label>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full bg-surface-secondary text-xs font-semibold border border-gray-200 rounded-xl px-3 py-2"
                />
                <input 
                  type="number" 
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full bg-surface-secondary text-xs font-semibold border border-gray-200 rounded-xl px-3 py-2"
                />
              </div>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2.5">Rating</label>
              <div className="space-y-1">
                {[4, 3, 2].map(stars => (
                  <button
                    key={stars}
                    onClick={() => setRatingFilter(ratingFilter === stars ? 0 : stars)}
                    className={`w-full flex items-center justify-between text-xs py-2 px-3 rounded-lg font-bold border ${
                      ratingFilter === stars ? 'bg-brand-green/10 text-brand-green border-brand-green/20' : 'border-transparent text-brand-text'
                    }`}
                  >
                    <span>{'★'.repeat(stars)}{'☆'.repeat(5 - stars)} & Up</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Vendors */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2.5">Shops</label>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {vendors.map(vendor => (
                  <label key={vendor} className="flex items-center gap-2 text-xs font-bold text-brand-text cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={selectedVendors.includes(vendor)}
                      onChange={() => handleVendorToggle(vendor)}
                      className="rounded border-gray-300 text-brand-green w-4 h-4"
                    />
                    <span>{vendor}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stock Toggle */}
            <div className="mb-8">
              <label className="flex items-center justify-between text-xs font-bold text-brand-text cursor-pointer">
                <span>Show In-Stock Only</span>
                <input 
                  type="checkbox" 
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-gray-300 text-brand-green w-4 h-4"
                />
              </label>
            </div>

            <Button fullWidth onClick={() => setFilterDrawerOpen(false)} className="rounded-xl mt-auto">Apply Filters</Button>
          </div>
        </div>
      )}
    </div>
  );
}
