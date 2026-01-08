
// import { COLORS } from "../componets/colors";
// import { useState} from 'react';
// // Mock data for businesses
// const MOCK_BUSINESSES = [
//   {
//     id: 'business-1',
//     name: 'Tech Solutions Ltd',
//     email: 'contact@techsolutions.com',
//     phone: '+256 700 123456',
//     address: '123 Business Street, Kampala',
//     adminName: 'John Admin',
//     adminEmail: 'john@techsolutions.com',
//     status: 'active',
//     productsCount: 15,
//     usersCount: 8,
//     createdAt: '2024-01-15'
//   },
//   {
//     id: 'business-2',
//     name: 'Fashion Hub',
//     email: 'info@fashionhub.com',
//     phone: '+256 700 654321',
//     address: '456 Style Avenue, Kampala',
//     adminName: 'Sarah Manager',
//     adminEmail: 'sarah@fashionhub.com',
//     status: 'active',
//     productsCount: 8,
//     usersCount: 5,
//     createdAt: '2024-02-20'
//   },
//   {
//     id: 'business-3',
//     name: 'Food Express',
//     email: 'hello@foodexpress.com',
//     phone: '+256 700 789012',
//     address: '789 Market Road, Kampala',
//     adminName: 'Mike Owner',
//     adminEmail: 'mike@foodexpress.com',
//     status: 'inactive',
//     productsCount: 2,
//     usersCount: 2,
//     createdAt: '2024-03-10'
//   }
// ];

// // Main Business Management Component
// export default function BusinessManagement() {
//   const [businesses, setBusinesses] = useState(MOCK_BUSINESSES);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [showModal, setShowModal] = useState(false);
//   const [editingBusiness, setEditingBusiness] = useState(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

//   const filteredBusinesses = businesses.filter(business => {
//     const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          business.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = filterStatus === 'all' || business.status === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   const handleCreateNew = () => {
//     setEditingBusiness(null);
//     setShowModal(true);
//   };

//   const handleEdit = (business) => {
//     setEditingBusiness(business);
//     setShowModal(true);
//   };

//   const handleSave = (businessData) => {
//     if (editingBusiness) {
//       setBusinesses(prev => prev.map(b => b.id === businessData.id ? businessData : b));
//     } else {
//       setBusinesses(prev => [...prev, businessData]);
//     }
//     setShowModal(false);
//     setEditingBusiness(null);
//   };

//   const handleDelete = (id) => {
//     setBusinesses(prev => prev.filter(b => b.id !== id));
//     setShowDeleteConfirm(null);
//   };

//   const stats = {
//     total: businesses.length,
//     active: businesses.filter(b => b.status === 'active').length,
//     inactive: businesses.filter(b => b.status === 'inactive').length
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.text }}>
//             Business Management
//           </h1>
//           <p className="text-gray-600">Manage all businesses in the system</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm">Total Businesses</p>
//                 <p className="text-3xl font-bold mt-1" style={{ color: COLORS.secondary }}>{stats.total}</p>
//               </div>
//               <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.primary }}>
//                 <span className="text-2xl">🏢</span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm">Active Businesses</p>
//                 <p className="text-3xl font-bold mt-1 text-green-600">{stats.active}</p>
//               </div>
//               <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
//                 <span className="text-2xl">✅</span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm">Inactive Businesses</p>
//                 <p className="text-3xl font-bold mt-1 text-red-600">{stats.inactive}</p>
//               </div>
//               <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
//                 <span className="text-2xl">❌</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Search and Filter Bar */}
//         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div className="flex-1 max-w-md">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search businesses..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C853]"
//                 />
//                 <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-3">
//               <select
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C853]"
//               >
//                 <option value="all">All Status</option>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//               </select>
              
//               <Button onClick={handleCreateNew}>
//                 + Add Business
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Businesses Table */}
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredBusinesses.length === 0 ? (
//                   <tr>
//                     <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
//                       No businesses found
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredBusinesses.map((business) => (
//                     <tr key={business.id} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-6 py-4">
//                         <div>
//                           <p className="font-medium" style={{ color: COLORS.text }}>{business.name}</p>
//                           <p className="text-sm text-gray-500">{business.address}</p>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-sm">
//                           <p className="text-gray-900">{business.email}</p>
//                           <p className="text-gray-500">{business.phone}</p>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-sm">
//                           <p className="text-gray-900">{business.adminName}</p>
//                           <p className="text-gray-500">{business.adminEmail}</p>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-sm">
//                           <p className="text-gray-900">{business.productsCount} Products</p>
//                           <p className="text-gray-500">{business.usersCount} Users</p>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <Badge variant={business.status}>
//                           {business.status === 'active' ? 'Active' : 'Inactive'}
//                         </Badge>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center space-x-2">
//                           <button
//                             onClick={() => handleEdit(business)}
//                             className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                             title="Edit"
//                           >
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                             </svg>
//                           </button>
//                           <button
//                             onClick={() => setShowDeleteConfirm(business.id)}
//                             className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                             title="Delete"
//                           >
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                             </svg>
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Create/Edit Modal */}
//         <Modal
//           isOpen={showModal}
//           onClose={() => {
//             setShowModal(false);
//             setEditingBusiness(null);
//           }}
//           title={editingBusiness ? 'Edit Business' : 'Create New Business'}
//           size="large"
//         >
//           <BusinessForm
//             business={editingBusiness}
//             onSave={handleSave}
//             onCancel={() => {
//               setShowModal(false);
//               setEditingBusiness(null);
//             }}
//           />
//         </Modal>

//         {/* Delete Confirmation Modal */}
//         <Modal
//           isOpen={!!showDeleteConfirm}
//           onClose={() => setShowDeleteConfirm(null)}
//           title="Confirm Delete"
//           size="small"
//         >
//           <div className="text-center">
//             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//               </svg>
//             </div>
//             <h3 className="text-lg font-semibold mb-2" style={{ color: COLORS.text }}>Delete Business?</h3>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to delete this business? This action cannot be undone.
//             </p>
//             <div className="flex justify-center space-x-3">
//               <Button variant="secondary" onClick={() => setShowDeleteConfirm(null)}>
//                 Cancel
//               </Button>
//               <Button variant="danger" onClick={() => handleDelete(showDeleteConfirm)}>
//                 Delete Business
//               </Button>
//             </div>
//           </div>
//         </Modal>
//       </div>
//     </div>
//   );
// }
import { COLORS } from "../components/colors";
import { useState } from 'react';
import { Button, Badge, Modal } from '../components/common';
import BusinessForm from '../components/BusinessForm';

const MOCK_BUSINESSES = [ /* ... keep your mock data here ... */ ];

export default function BusinessManagement() {
  // ... keep your state and logic (filteredBusinesses, handleEdit, etc.) ...

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      {/* ... Your JSX remains the same, but now uses the imported components ... */}
    </div>
  );
}