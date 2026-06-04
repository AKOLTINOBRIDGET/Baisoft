import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import BusinessForm from '../components/features/BusinessForm';
import { MOCK_BUSINESSES } from '../data/mockData';
import { Search, AlertTriangle } from 'lucide-react';

export default function BusinessManagement() {
  const [businesses, setBusinesses] = useState(MOCK_BUSINESSES);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          business.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || business.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSave = (data) => {
    if (editingBusiness) {
      setBusinesses(prev => prev.map(b => b.id === data.id ? data : b));
    } else {
      setBusinesses(prev => [...prev, data]);
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    setBusinesses(prev => prev.filter(b => b.id !== showDeleteConfirm));
    setShowDeleteConfirm(null);
  };

  const stats = {
    total: businesses.length,
    active: businesses.filter(b => b.status === 'active').length,
    pending: businesses.filter(b => b.status === 'pending').length
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold font-display text-brand-text">Businesses</h2>
          <p className="text-brand-muted">Manage registered vendor businesses and their status.</p>
        </div>
        <Button onClick={() => { setEditingBusiness(null); setShowModal(true); }}>
          + Add New Business
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card padding="md" className="text-center">
          <p className="text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Total</p>
          <p className="text-3xl font-bold font-display text-brand-text">{stats.total}</p>
        </Card>
        <Card padding="md" className="text-center">
          <p className="text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Active</p>
          <p className="text-3xl font-bold font-display text-brand-success">{stats.active}</p>
        </Card>
        <Card padding="md" className="text-center">
          <p className="text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Pending</p>
          <p className="text-3xl font-bold font-display text-brand-warning">{stats.pending}</p>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card padding="none" className="overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-wrap gap-4 items-end justify-between bg-surface-secondary/30">
          <div className="w-full max-w-xs">
            <Input 
              placeholder="Search by name or owner..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-5 h-5 text-brand-muted" />}
              className="mb-0"
            />
          </div>
          <div className="w-full max-w-[200px]">
            <select 
              className="input-field mb-0"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left">
            <thead className="bg-surface-secondary/50 text-brand-muted text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Business</th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4">Revenue</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBusinesses.map(business => (
                <tr key={business.id} className="hover:bg-brand-green/5 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-bold text-brand-text">{business.name}</p>
                    <p className="text-xs font-semibold text-brand-muted uppercase">{business.category}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-brand-text">{business.owner}</td>
                  <td className="px-6 py-4 text-sm font-bold text-brand-text">{business.revenue}</td>
                  <td className="px-6 py-4">
                    <Badge variant={business.status === 'active' ? 'success' : business.status === 'pending' ? 'warning' : 'default'}>
                      {business.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => { setEditingBusiness(business); setShowModal(true); }}
                      className="text-brand-green hover:text-brand-green-dark font-semibold text-sm mr-4"
                    >Edit</button>
                    <button 
                      onClick={() => setShowDeleteConfirm(business.id)}
                      className="text-red-500 hover:text-red-600 font-semibold text-sm"
                    >Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modals */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingBusiness ? 'Edit Business' : 'Create Business'} maxWidth="max-w-2xl">
        <BusinessForm 
          key={editingBusiness ? editingBusiness.id : 'new'} 
          business={editingBusiness} 
          onSave={handleSave} 
          onCancel={() => setShowModal(false)} 
        />
      </Modal>

      <Modal isOpen={!!showDeleteConfirm} onClose={() => setShowDeleteConfirm(null)} title="Confirm Delete">
        <div className="flex items-center gap-4 text-red-500 mb-6 bg-red-50 p-4 rounded-xl">
          <AlertTriangle className="w-6 h-6 text-red-500 shrink-0" />
          <p className="font-semibold text-sm text-red-800">Are you sure you want to delete this business? This action cannot be undone.</p>
        </div>
        <div className="flex gap-4 justify-end">
          <Button variant="ghost" onClick={() => setShowDeleteConfirm(null)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Yes, Delete</Button>
        </div>
      </Modal>
    </div>
  );
}