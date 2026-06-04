import { useState } from 'react';
import { MOCK_PRODUCTS } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import ProductForm from '../components/features/ProductForm';
import { Search, Package, AlertCircle, CheckCircle2, FileText, Trash2, Edit, Plus } from 'lucide-react';

export default function ProductsPage() {
  const { user, hasPermission } = useAuth();
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const canCreate = hasPermission('create_products');
  const canApprove = hasPermission('approve_products');

  const handleApprove = (productId) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, status: 'approved' } : p
    ));
  };

  const handleSave = (productData) => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === productData.id ? productData : p));
    } else {
      setProducts(prev => [productData, ...prev]);
    }
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleDelete = () => {
    setProducts(prev => prev.filter(p => p.id !== showDeleteConfirm));
    setShowDeleteConfirm(null);
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
          <Button onClick={() => { setEditingProduct(null); setShowModal(true); }} className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        )}
      </div>

      {/* Search Bar */}
      <Card padding="md" className="mb-6">
        <Input 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Search className="w-5 h-5 text-brand-muted" />}
          className="mb-0"
        />
      </Card>

      {/* Product Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <QuickStat label="Total" value={filteredProducts.length} className="text-brand-text" icon={<Package className="w-6 h-6 text-brand-muted" />} />
        <QuickStat label="Pending" value={filteredProducts.filter(p => p.status === 'pending_approval').length} className="text-brand-warning" icon={<AlertCircle className="w-6 h-6 text-brand-warning" />} />
        <QuickStat label="Approved" value={filteredProducts.filter(p => p.status === 'approved').length} className="text-brand-success" icon={<CheckCircle2 className="w-6 h-6 text-brand-success" />} />
        <QuickStat label="Drafts" value={filteredProducts.filter(p => p.status === 'draft').length} className="text-brand-muted" icon={<FileText className="w-6 h-6 text-brand-muted" />} />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} padding="md" hoverable className="flex flex-col h-full bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  fullWidth 
                  onClick={() => { setEditingProduct(product); setShowModal(true); }}
                  className="flex items-center justify-center gap-1.5"
                >
                  <Edit className="w-3.5 h-3.5" /> Edit
                </Button>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => setShowDeleteConfirm(product.id)}
                  className="p-2 flex items-center justify-center"
                  aria-label="Delete product"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Product Form Modal */}
      <Modal 
        isOpen={showModal} 
        onClose={() => { setShowModal(false); setEditingProduct(null); }} 
        title={editingProduct ? 'Edit Product' : 'Create Product'}
        maxWidth="max-w-2xl"
      >
        <p className="text-sm text-brand-muted mb-6">
          {editingProduct 
            ? 'Modify the details of your product below.' 
            : "New products are saved as 'Pending Approval' by default."}
        </p>
        <ProductForm 
          key={editingProduct ? editingProduct.id : 'new'}
          product={editingProduct}
          onSave={handleSave}
          onCancel={() => { setShowModal(false); setEditingProduct(null); }}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={!!showDeleteConfirm} onClose={() => setShowDeleteConfirm(null)} title="Confirm Delete">
        <div className="flex items-center gap-4 text-red-500 mb-6 bg-red-50 p-4 rounded-xl">
          <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
          <p className="font-semibold text-sm text-red-800">Are you sure you want to delete this product? This action cannot be undone.</p>
        </div>
        <div className="flex gap-4 justify-end">
          <Button variant="ghost" onClick={() => setShowDeleteConfirm(null)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Yes, Delete</Button>
        </div>
      </Modal>
    </div>
  );
}

const QuickStat = ({ label, value, className, icon }) => (
  <Card padding="md" className="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
    <div className="text-left">
      <p className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-1">{label}</p>
      <p className={`text-3xl font-bold font-display ${className}`}>{value}</p>
    </div>
    <div className="p-3 bg-surface-secondary rounded-xl">
      {icon}
    </div>
  </Card>
);
