import { useState } from 'react';
import { COLORS } from "../componets/colors";
import { Button } from '../componets/button';
import { Modal } from '../componets/modal';
import { Badge } from '../componets/badge';
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

  // Requirement: Permissions Awareness
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
    // Internal users see all products for their business; Super Admins see all
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

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Product Info</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-800">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </td>
                  <td className="px-6 py-4 font-medium">${product.price}</td>
                  <td className="px-6 py-4">
                    <Badge variant={product.status === 'approved' ? 'active' : 'inactive'}>
                      {product.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {/* Role-Based Approval Action */}
                    {canApprove && product.status === 'pending_approval' && (
                      <button 
                        onClick={() => handleApprove(product.id)}
                        className="text-green-600 hover:bg-green-50 px-3 py-1 rounded border border-green-200 text-sm font-bold"
                      >
                        Approve
                      </button>
                    )}
                    {canEdit && <button className="p-1 hover:bg-gray-100 rounded text-blue-600">✏️</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
    <p className="text-xs font-semibold text-gray-400 uppercase">{label}</p>
    <p className="text-2xl font-bold mt-1" style={{ color }}>{value}</p>
  </div>
);