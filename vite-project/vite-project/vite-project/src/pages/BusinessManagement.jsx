import React, { useState } from 'react';
import { Button } from '../componets/button';
import { Modal } from '../componets/modal';
import {Badge } from '../componets/badge';
import BusinessForm from '../componets/BusinessForm';
import { COLORS } from '../componets/colors';

const MOCK_BUSINESSES = [
  { id: 'business-1', name: 'Tech Solutions Ltd', email: 'contact@techsolutions.com', phone: '+256 700 123456', address: 'Kampala', adminName: 'John Admin', adminEmail: 'john@techsolutions.com', status: 'active', productsCount: 15, usersCount: 8, createdAt: '2024-01-15' },
  // ... rest of your mock data
];

export default function BusinessManagement() {
  const [businesses, setBusinesses] = useState(MOCK_BUSINESSES);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          business.email.toLowerCase().includes(searchTerm.toLowerCase());
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
    inactive: businesses.filter(b => b.status === 'inactive').length
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: COLORS.text }}>Businesses</h2>
          <p className="text-gray-500">Manage registered businesses and their subscriptions</p>
        </div>
        <Button onClick={() => { setEditingBusiness(null); setShowModal(true); }}>
          + Add New Business
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium uppercase">Total</p>
          <p className="text-3xl font-bold mt-2" style={{ color: COLORS.secondary }}>{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium uppercase">Active</p>
          <p className="text-3xl font-bold mt-2 text-green-600">{stats.active}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium uppercase">Inactive</p>
          <p className="text-3xl font-bold mt-2 text-red-600">{stats.inactive}</p>
        </div>
      </div>

      {/* Filters and Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 items-center justify-between">
          <input 
            type="text" placeholder="Search name or email..." 
            className="px-4 py-2 border rounded-lg w-full max-w-xs outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="px-4 py-2 border rounded-lg outline-none"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
              <tr>
                <th className="px-6 py-4">Business</th>
                <th className="px-6 py-4">Admin</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBusinesses.map(business => (
                <tr key={business.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-bold">{business.name}</p>
                    <p className="text-xs text-gray-500">{business.email}</p>
                  </td>
                  <td className="px-6 py-4 text-sm">{business.adminName}</td>
                  <td className="px-6 py-4">
                    <Badge variant={business.status}>{business.status}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => { setEditingBusiness(business); setShowModal(true); }}
                      className="text-blue-600 hover:underline mr-4"
                    >Edit</button>
                    <button 
                      onClick={() => setShowDeleteConfirm(business.id)}
                      className="text-red-600 hover:underline"
                    >Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingBusiness ? 'Edit' : 'Create'}>
        <BusinessForm business={editingBusiness} onSave={handleSave} onCancel={() => setShowModal(false)} />
      </Modal>

      <Modal isOpen={!!showDeleteConfirm} onClose={() => setShowDeleteConfirm(null)} title="Confirm Delete">
        <p className="mb-6">Are you sure you want to delete this business?</p>
        <div className="flex gap-4 justify-end">
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(null)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
      </div>
  );
}