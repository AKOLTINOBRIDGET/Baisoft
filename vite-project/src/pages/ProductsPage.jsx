import { useState } from 'react';
import { COLORS } from "../componets/colors";
import { Button } from '../componets/button';
import { Modal } from '../componets/modal';
import {Badge } from '../componets/badge';

const MOCK_PRODUCTS = [
  { id: 'p1', name: 'MacBook Pro 14"', category: 'Electronics', price: 1999, stock: 12, business: 'Tech Solutions', status: 'published' },
  { id: 'p2', name: 'Designer Summer Dress', category: 'Fashion', price: 89, stock: 45, business: 'Fashion Hub', status: 'draft' },
  { id: 'p3', name: 'Organic Coffee Beans', category: 'Food', price: 15, stock: 150, business: 'Food Express', status: 'published' },
];

export default function ProductsPage() {
  const [products] = useState(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Products</h2>
          <p className="text-gray-500">Manage your inventory and product listings</p>
        </div>
        <Button onClick={() => setShowModal(true)}>+ Add Product</Button>
      </div>

      {/* Product Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickStat label="Total Products" value={products.length} color={COLORS.secondary} />
        <QuickStat label="Low Stock" value="2" color="#EF4444" />
        <QuickStat label="Published" value="21" color="#10B981" />
        <QuickStat label="Drafts" value="4" color="#F59E0B" />
      </div>

      {/* Search & Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              🔍
            </span>
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Product Info</th>
                <th className="px-6 py-4">Business</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-800">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.business}</td>
                  <td className="px-6 py-4 font-medium">${product.price}</td>
                  <td className="px-6 py-4">
                    <span className={product.stock < 15 ? "text-red-500 font-bold" : ""}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={product.status === 'published' ? 'active' : 'inactive'}>
                      {product.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded text-blue-600">✏️</button>
                      <button className="p-1 hover:bg-gray-100 rounded text-red-600">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Form Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Product">
        <form className="space-y-4">
           <div>
             <label className="block text-sm font-medium text-gray-700">Product Name</label>
             <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
           </div>
           <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-medium text-gray-700">Price ($)</label>
               <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700">Stock</label>
               <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
             </div>
           </div>
           <div className="flex justify-end space-x-3 mt-6">
             <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
             <Button onClick={() => setShowModal(false)}>Save Product</Button>
           </div>
        </form>
      </Modal>
    </div>
  );
}

// Simple internal helper for stats on the products page
const QuickStat = ({ label, value, color }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
    <p className="text-2xl font-bold mt-1" style={{ color }}>{value}</p>
  </div>
);