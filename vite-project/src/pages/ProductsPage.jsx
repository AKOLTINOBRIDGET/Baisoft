import { useState } from 'react';
import { MOCK_PRODUCTS } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';

export default function ProductsPage() {
  const { user, hasPermission } = useAuth();
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const canCreate = hasPermission('create_products');
  const canApprove = hasPermission('approve_products');

  const handleApprove = (productId) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, status: 'approved' } : p
    ));
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBusiness = user?.role === 'super_admin' || p.businessId === user?.businessId;
    return matchesSearch && matchesBusiness;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold font-display text-brand-text">Products</h2>
          <p className="text-brand-muted">Internal management for {user?.businessName || 'All Businesses'}</p>
        </div>
        {canCreate && (
          <Button onClick={() => setShowModal(true)}>+ Add Product</Button>
        )}
      </div>

      {/* Search Bar */}
      <Card padding="md" className="mb-6">
        <Input 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon="🔍"
          className="mb-0"
        />
      </Card>

      {/* Product Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <QuickStat label="Total" value={filteredProducts.length} className="text-brand-text" />
        <QuickStat label="Pending" value={filteredProducts.filter(p => p.status === 'pending_approval').length} className="text-brand-warning" />
        <QuickStat label="Approved" value={filteredProducts.filter(p => p.status === 'approved').length} className="text-brand-success" />
        <QuickStat label="Drafts" value={filteredProducts.filter(p => p.status === 'draft').length} className="text-brand-muted" />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} padding="md" hoverable className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-brand-text leading-tight mb-1">{product.name}</h3>
                <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider">{product.category}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <Badge variant={product.status === 'approved' ? 'success' : product.status === 'pending_approval' ? 'warning' : 'default'}>
                {product.status.replace('_', ' ')}
              </Badge>
            </div>

            <p className="text-sm text-brand-muted mb-4 line-clamp-2 flex-1">{product.description}</p>
            
            <div className="border-t border-gray-100 pt-4 mt-auto">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-xl font-bold text-brand-text">${product.price}</p>
                  <p className="text-xs font-medium text-brand-muted">Stock: {product.stock}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                {canApprove && product.status === 'pending_approval' && (
                  <Button size="sm" fullWidth onClick={() => handleApprove(product.id)}>Approve</Button>
                )}
                <Button variant="outline" size="sm" fullWidth>Edit</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Product Form Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create Product">
        <p className="text-sm text-brand-muted mb-6">New products are saved as 'Pending Approval' by default.</p>
        <div className="space-y-4 mb-6">
          <Input label="Product Name" placeholder="Enter product name" />
          <Input label="Price ($)" type="number" placeholder="0.00" />
        </div>
        <Button onClick={() => setShowModal(false)} fullWidth size="lg">Submit for Review</Button>
      </Modal>
    </div>
  );
}

const QuickStat = ({ label, value, className }) => (
  <Card padding="md" className="text-center">
    <p className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">{label}</p>
    <p className={`text-3xl font-bold font-display ${className}`}>{value}</p>
  </Card>
);
