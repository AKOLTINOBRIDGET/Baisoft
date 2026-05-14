import { useState } from 'react';
import { COLORS } from "../componets/colors";
import { Button } from '../componets/button';
import { Modal } from '../componets/modal';
import { Badge } from '../componets/badge';
import { Card } from '../componets/card';
import { useAuth } from '../contexts/AuthContext';

const MOCK_PRODUCTS = [
  { id: 'p1', name: 'MacBook Pro 14"', category: 'Electronics', price: 1999, stock: 12, business: 'Tech Solutions', status: 'approved', description: 'Powerful M3 chip laptop.' },
  { id: 'p2', name: 'Designer Summer Dress', category: 'Fashion', price: 89, stock: 45, business: 'Fashion Hub', status: 'pending_approval', description: 'Lightweight floral dress.' },
  { id: 'p3', name: 'Organic Coffee Beans', category: 'Food', price: 15, stock: 150, business: 'Food Express', status: 'draft', description: 'Fair trade roasted beans.' },
];

export default function ProductsPage() {
  const { user } = useAuth(); // Get user role and business info
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const canCreate = ['super_admin', 'business_admin', 'editor'].includes(user?.role);
  const canApprove = ['super_admin', 'approver'].includes(user?.role);
  const canEdit = ['super_admin', 'business_admin', 'editor'].includes(user?.role);

  const handleApprove = (productId) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, status: 'approved' } : p
    ));
  };

  const filteredProducts = products.filter(p => 
    (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (user?.role === 'super_admin' || p.business === user?.businessName)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Products</h2>
          <p className="text-gray-500">Internal management for {user?.businessName || 'All Businesses'}</p>
        </div>
        {canCreate && (
          <Button onClick={() => setShowModal(true)}>+ Add Product</Button>
        )}
      </div>

      {/* Search Bar */}
      <input 
        type="text" 
        placeholder="Search products..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Product Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickStat label="Total" value={filteredProducts.length} color={COLORS.secondary} />
        <QuickStat label="Pending" value={filteredProducts.filter(p => p.status === 'pending_approval').length} color="#F59E0B" />
        <QuickStat label="Approved" value={filteredProducts.filter(p => p.status === 'approved').length} color="#10B981" />
        <QuickStat label="Drafts" value={filteredProducts.filter(p => p.status === 'draft').length} color="#6B7280" />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} padding="normal" className="relative">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>
              <Badge variant={product.status === 'approved' ? 'success' : product.status === 'pending_approval' ? 'warning' : 'default'}>
                {product.status.replace('_', ' ')}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold text-gray-800">${product.price}</p>
                <p className="text-xs text-gray-500">Stock: {product.stock}</p>
              </div>
              <div className="flex space-x-2">
                {canApprove && product.status === 'pending_approval' && (
                  <Button size="small" onClick={() => handleApprove(product.id)}>Approve</Button>
                )}
                {canEdit && (
                  <Button variant="outline" size="small">Edit</Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Product Form Modal (Simplified) */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create Product">
          <p className="text-sm text-gray-500 mb-4">New products are saved as 'Pending Approval' by default.</p>
          <Button onClick={() => setShowModal(false)} className="w-full">Submit for Review</Button>
      </Modal>
    </div>
  );
}

const QuickStat = ({ label, value, color }) => (
  <Card padding="normal" className="text-center">
    <p className="text-xs font-semibold text-gray-400 uppercase">{label}</p>
    <p className="text-2xl font-bold mt-1" style={{ color }}>{value}</p>
  </Card>
);
