import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export default function BusinessForm({ business, onSave, onCancel }) {
  const [formData, setFormData] = useState(business || {
    name: '',
    email: '',
    phone: '',
    address: '',
    adminName: '',
    adminEmail: '',
    status: 'active'
  });

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
        <Input 
          label="Business Name"
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
        />
        <Input 
          label="Business Email"
          type="email"
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
        />
        <Input 
          label="Admin Name"
          value={formData.adminName}
          onChange={e => setFormData({...formData, adminName: e.target.value})}
        />
        <Input 
          label="Admin Email"
          type="email"
          value={formData.adminEmail}
          onChange={e => setFormData({...formData, adminEmail: e.target.value})}
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-semibold text-brand-text mb-2">Status</label>
        <select 
          className="input-field"
          value={formData.status}
          onChange={e => setFormData({...formData, status: e.target.value})}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Business</Button>
      </div>
    </form>
  );
}
