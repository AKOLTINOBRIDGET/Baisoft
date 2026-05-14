import { useState } from 'react';
import { MOCK_PRODUCTS, CATEGORIES } from '../data/mockData';
import { ProductCard } from '../components/features/ProductCard';
import { Navbar } from '../components/layout/Navbar';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useCart } from '../contexts/CartContext';

export default function StorefrontPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const { addItem } = useCart();

  const approvedProducts = MOCK_PRODUCTS.filter(p => p.status === 'approved');
  
  const filteredProducts = approvedProducts.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.business.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen bg-surface-secondary flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-brand-dark text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-brand-green/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="page-container relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 leading-tight">
              Discover Premium Products
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
              Shop from hundreds of verified businesses offering top-quality electronics, fashion, and more.
            </p>
            <div className="relative max-w-md">
              <input 
                type="text" 
                placeholder="What are you looking for?" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-full text-brand-text pr-32 focus:outline-none focus:ring-4 focus:ring-brand-green/30 transition-all shadow-lg"
              />
              <Button 
                className="absolute right-2 top-2 bottom-2 rounded-full px-6"
                onClick={() => document.getElementById('products-section').scrollIntoView()}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 page-container py-12" id="products-section">
        
        {/* Categories Bar */}
        <div className="flex overflow-x-auto custom-scrollbar pb-4 mb-8 gap-3">
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap font-medium transition-all duration-200 border ${
                activeCategory === category.id 
                  ? 'bg-brand-green text-white border-brand-green shadow-green' 
                  : 'bg-white text-brand-text border-gray-200 hover:border-brand-green/50 hover:bg-brand-green/5'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold font-display text-brand-text">
            {activeCategory === 'all' ? 'All Products' : CATEGORIES.find(c => c.id === activeCategory)?.label}
          </h2>
          <span className="text-brand-muted font-medium bg-white px-3 py-1 rounded-lg border border-gray-100 shadow-sm">
            {filteredProducts.length} items
          </span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={handleProductClick} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <span className="text-6xl mb-4 block opacity-50">🔍</span>
            <h3 className="text-xl font-bold mb-2">No products found</h3>
            <p className="text-brand-muted">Try adjusting your filters or search query.</p>
            <Button variant="outline" className="mt-6" onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </main>

      {/* Product Details Modal */}
      <Modal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        title="Product Details"
        maxWidth="max-w-3xl"
      >
        {selectedProduct && (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <div className="aspect-square bg-surface-secondary rounded-2xl flex items-center justify-center text-8xl relative">
                📦
                {selectedProduct.featured && (
                  <Badge variant="brand" className="absolute top-4 left-4">Featured</Badge>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col">
              <p className="text-sm font-semibold text-brand-green tracking-wider uppercase mb-2">
                {selectedProduct.business}
              </p>
              <h2 className="text-2xl font-bold font-display mb-2 leading-tight">
                {selectedProduct.name}
              </h2>
              
              <div className="flex items-center gap-2 mb-6">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="font-bold">{selectedProduct.rating}</span>
                <span className="text-brand-muted text-sm">({selectedProduct.reviews} reviews)</span>
              </div>

              <div className="mb-6 flex items-end gap-3">
                <p className="text-3xl font-bold text-brand-text">
                  ${selectedProduct.price}
                </p>
                {selectedProduct.originalPrice && (
                  <p className="text-lg text-brand-muted line-through mb-1">
                    ${selectedProduct.originalPrice}
                  </p>
                )}
              </div>

              <div className="bg-surface-secondary/50 p-4 rounded-xl mb-6 border border-gray-100">
                <h4 className="font-semibold text-sm mb-2">Description</h4>
                <p className="text-brand-muted text-sm leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              <div className="mt-auto space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-brand-muted">Availability</span>
                  <span className="font-semibold text-brand-green">
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
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
