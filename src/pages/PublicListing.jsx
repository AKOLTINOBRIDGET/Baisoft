import { COLORS } from '../components/colors';
import { ProductCard } from '../components/features/ProductCard';
import { useState } from 'react';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const PublicListing = ({ products }) => {
  const approvedProducts = products.filter(p => p.status === 'approved');

  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      <nav className="p-6 border-b flex justify-between items-center">
        <h1 className="text-2xl font-bold" style={{ color: COLORS.secondary }}>ProductHub Shop</h1>
        <button className="text-gray-600 font-medium">Login to Manage</button>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {approvedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      </div>

      {/* Product Details Modal */}
      <Modal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        title="Product Details"
        maxWidth="max-w-2xl"
      >
        {selectedProduct && (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <div className="aspect-square bg-surface-secondary rounded-2xl flex items-center justify-center overflow-hidden">
                <img
                  src={selectedProduct.image || '/logo.png'}
                  alt={selectedProduct.name}
                  className={`w-full h-full ${selectedProduct.image ? 'object-cover' : 'object-contain opacity-30 grayscale'}`}
                  onError={e => {
                    e.target.src = '/logo.png';
                    e.target.className = 'w-full h-full object-contain opacity-30 grayscale';
                  }}
                />
                {selectedProduct.featured && (
                  <Badge variant="brand" className="absolute top-4 left-4 bg-brand-green text-white">Featured</Badge>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col">
              <h2 className="text-2xl font-extrabold text-brand-text">{selectedProduct.name}</h2>
              <p className="text-brand-muted">{selectedProduct.description}</p>
              <div className="mt-4 flex items-center gap-4">
                <span className="text-2xl font-black text-brand-text">${selectedProduct.price}</span>
                {selectedProduct.originalPrice && (
                  <span className="text-sm text-brand-muted line-through">${selectedProduct.originalPrice}</span>
                )}
              </div>
              <Button className="mt-6 self-start" onClick={() => setSelectedProduct(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};