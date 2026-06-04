import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const CATEGORY_OPTIONS = [
  { id: 'electronics', label: 'Electronics' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'food', label: 'Food & Beverages' },
  { id: 'beauty', label: 'Beauty' },
  { id: 'sports', label: 'Sports' },
  { id: 'home', label: 'Home & Garden' },
  { id: 'books', label: 'Books' },
];

export default function ProductForm({ product, onSave, onCancel }) {
  // Convert specs object to array of { key, value } for form editing
  const initialSpecs = product?.specs 
    ? Object.entries(product.specs).map(([key, value]) => ({ key, value }))
    : [];

  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || 'electronics',
    price: product?.price || '',
    originalPrice: product?.originalPrice || '',
    stock: product?.stock || '',
    description: product?.description || '',
    image: product?.image || '',
    featured: product?.featured || false,
    tags: product?.tags ? product.tags.join(', ') : '',
  });

  const [specs, setSpecs] = useState(initialSpecs);
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  const handleAddSpec = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setSpecs([...specs, { key: newSpecKey.trim(), value: newSpecValue.trim() }]);
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };

  const handleRemoveSpec = (index) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct specs object from specs array
    const specsObject = specs.reduce((acc, curr) => {
      if (curr.key && curr.value) {
        acc[curr.key] = curr.value;
      }
      return acc;
    }, {});

    // Parse tags to array
    const tagsArray = formData.tags
      ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
      : [];

    onSave({
      ...product,
      ...formData,
      price: parseFloat(formData.price) || 0,
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      stock: parseInt(formData.stock) || 0,
      tags: tagsArray,
      specs: specsObject,
      id: product?.id || `p-${Date.now()}`,
      rating: product?.rating || 0,
      reviews: product?.reviews || 0,
      businessId: product?.businessId || 'biz-1',
      business: product?.business || 'TechGear Pro',
      status: product?.status || 'pending_approval'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input 
          label="Product Name"
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          placeholder="e.g. Wireless Noise-Cancelling Headphones"
          className="mb-0"
        />
        <div>
          <label className="block text-sm font-semibold text-brand-text mb-2">Category</label>
          <select 
            className="input-field"
            value={formData.category}
            onChange={e => setFormData({...formData, category: e.target.value})}
          >
            {CATEGORY_OPTIONS.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input 
          label="Price ($)"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={e => setFormData({...formData, price: e.target.value})}
          placeholder="0.00"
          className="mb-0"
        />
        <Input 
          label="Original Price ($ - Optional)"
          type="number"
          step="0.01"
          value={formData.originalPrice}
          onChange={e => setFormData({...formData, originalPrice: e.target.value})}
          placeholder="0.00"
          className="mb-0"
        />
        <Input 
          label="Stock Quantity"
          type="number"
          value={formData.stock}
          onChange={e => setFormData({...formData, stock: e.target.value})}
          placeholder="0"
          className="mb-0"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input 
          label="Image URL"
          value={formData.image}
          onChange={e => setFormData({...formData, image: e.target.value})}
          placeholder="https://images.unsplash.com/..."
          className="mb-0"
        />
        <Input 
          label="Tags (Comma separated)"
          value={formData.tags}
          onChange={e => setFormData({...formData, tags: e.target.value})}
          placeholder="wireless, audio, sony"
          className="mb-0"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-brand-text mb-2">Product Description</label>
        <textarea 
          rows="3"
          className="input-field"
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
          placeholder="Describe the product features, benefits, sizing, etc."
        />
      </div>

      {/* Specifications Dynamic Builder */}
      <div>
        <label className="block text-sm font-semibold text-brand-text mb-2">Specifications</label>
        <div className="space-y-2 mb-3">
          {specs.map((spec, index) => (
            <div key={index} className="flex items-center gap-2 bg-surface-secondary/50 p-2 rounded-lg border border-gray-100 text-sm">
              <span className="font-bold text-brand-muted uppercase text-xs w-1/3 truncate">{spec.key}</span>
              <span className="text-brand-text font-semibold flex-1 truncate">{spec.value}</span>
              <button 
                type="button" 
                onClick={() => handleRemoveSpec(index)}
                className="text-red-500 hover:text-red-700 font-bold px-2"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input 
            type="text"
            placeholder="Spec Name (e.g. Warranty)"
            value={newSpecKey}
            onChange={e => setNewSpecKey(e.target.value)}
            className="flex-1 bg-surface-secondary text-xs font-semibold border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-brand-green"
          />
          <input 
            type="text"
            placeholder="Spec Value (e.g. 1 Year)"
            value={newSpecValue}
            onChange={e => setNewSpecValue(e.target.value)}
            className="flex-1 bg-surface-secondary text-xs font-semibold border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-brand-green"
          />
          <Button type="button" variant="outline" size="sm" onClick={handleAddSpec}>Add</Button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <input 
          type="checkbox" 
          id="featured" 
          checked={formData.featured}
          onChange={e => setFormData({...formData, featured: e.target.checked})}
          className="rounded border-gray-300 text-brand-green focus:ring-brand-green w-4 h-4"
        />
        <label htmlFor="featured" className="text-xs font-bold text-brand-text cursor-pointer select-none">
          Feature this product on the marketplace front page
        </label>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Product</Button>
      </div>
    </form>
  );
}
