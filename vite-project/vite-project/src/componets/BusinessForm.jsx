import React, { useState, useEffect } from 'react';
import { Button } from '../componets/button';

export default function BusinessForm({ business, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    adminName: '',
    adminEmail: '',
    status: 'active'
  });

  useEffect(() => {
    if (business) setFormData(business);
  }, [business]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: business?.id || `business-${Date.now()}`,
      productsCount: business?.productsCount || 0,
      usersCount: business?.usersCount || 0,
      createdAt: business?.createdAt || new Date().toISOString().split('T')[0]
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700">Business Name</label>
          <input 
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700">Business Email</label>
          <input 
            type="email" required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700">Admin Name</label>
          <input 
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            value={formData.adminName}
            onChange={e => setFormData({...formData, adminName: e.target.value})}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700">Admin Email</label>
          <input 
            type="email" required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            value={formData.adminEmail}
            onChange={e => setFormData({...formData, adminEmail: e.target.value})}
          />
        </div>
      </div>
      
      <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-700">Status</label>
        <select 
          className="w-full px-3 py-2 border rounded-lg outline-none"
          value={formData.status}
          onChange={e => setFormData({...formData, status: e.target.value})}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Business</Button>
      </div>
    </form>
  );
}