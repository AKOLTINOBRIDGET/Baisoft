import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MOCK_ORDERS } from '../data/mockData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Search, ShoppingBag } from 'lucide-react';

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // all, pending, processing, shipped, delivered
  const [viewingOrder, setViewingOrder] = useState(null);
  const [updatingOrder, setUpdatingOrder] = useState(null);

  // Filter orders based on role. (Mock data doesn't have businessId on items, so we simplify)
  const userOrders = user?.role === 'buyer' 
    ? orders.filter(o => o.customer === user.name)
    : orders; // Admin/vendor sees all in this demo

  const filteredOrders = userOrders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          o.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = activeTab === 'all' || o.status === activeTab;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => 
      o.id === orderId ? { ...o, status: newStatus } : o
    ));
    setUpdatingOrder(null);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'delivered': return <Badge variant="success">Delivered</Badge>;
      case 'shipped': return <Badge variant="brand">Shipped</Badge>;
      case 'processing': return <Badge variant="warning">Processing</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold font-display text-brand-text">
            {user?.role === 'buyer' ? 'My Orders' : 'Order Management'}
          </h2>
          <p className="text-brand-muted">
            {user?.role === 'buyer' ? 'Track and manage your recent purchases.' : 'View and fulfill customer orders.'}
          </p>
        </div>
      </div>

      <Card padding="md" className="mb-6">
        <Input 
          placeholder="Search by Order ID or Customer..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Search className="w-5 h-5 text-brand-muted" />}
          className="mb-0"
        />
      </Card>

      {/* Status Filter Tabs */}
      <div className="flex border-b border-gray-100 mb-6 gap-6 overflow-x-auto pb-2 custom-scrollbar">
        {['all', 'pending', 'processing', 'shipped', 'delivered'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-xs font-extrabold uppercase tracking-wider border-b-2 transition-all outline-none capitalize whitespace-nowrap ${
              activeTab === tab 
                ? 'border-brand-green text-brand-green' 
                : 'border-transparent text-brand-muted hover:text-brand-text'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <Card key={order.id} padding="md" hoverable>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-lg text-brand-text">{order.id}</h3>
                    {getStatusBadge(order.status)}
                  </div>
                  <p className="text-sm text-brand-muted">Ordered on {order.date}</p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-sm text-brand-muted mb-1">Total Amount</p>
                  <p className="font-bold text-xl text-brand-green">${order.total}</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mt-4">
                <p className="text-sm font-semibold mb-2 text-brand-text">Items</p>
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-brand-muted">{item.qty}x {item.name}</span>
                      <span className="font-medium text-brand-text">${item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mt-4 flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setViewingOrder(order)}>
                  View Details
                </Button>
                {user?.role !== 'buyer' && (
                  <Button variant="primary" size="sm" onClick={() => setUpdatingOrder(order)}>
                    Update Status
                  </Button>
                )}
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 flex flex-col items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-brand-muted mb-3 opacity-55" />
            <h3 className="text-lg font-bold text-brand-text">No orders found</h3>
            <p className="text-brand-muted text-sm">You don't have any orders matching your search or filters.</p>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      <Modal 
        isOpen={!!viewingOrder} 
        onClose={() => setViewingOrder(null)} 
        title={`Order Details: ${viewingOrder?.id}`}
        maxWidth="max-w-xl"
      >
        {viewingOrder && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-brand-muted border-b border-gray-100 pb-4">
              <div>
                <p className="font-bold text-brand-text mb-0.5">Customer Name</p>
                <p>{viewingOrder.customer}</p>
              </div>
              <div>
                <p className="font-bold text-brand-text mb-0.5">Order Date</p>
                <p>{viewingOrder.date}</p>
              </div>
              <div>
                <p className="font-bold text-brand-text mb-0.5">Payment Method</p>
                <p>{viewingOrder.paymentMethod || 'Credit Card'}</p>
              </div>
              <div>
                <p className="font-bold text-brand-text mb-0.5">Status</p>
                <div className="mt-1">{getStatusBadge(viewingOrder.status)}</div>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold text-brand-text mb-3">Items Ordered</p>
              <div className="space-y-3">
                {viewingOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-surface-secondary/50 p-3 rounded-xl border border-gray-100 text-sm font-semibold">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-surface-secondary border border-gray-100 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="w-4 h-4 text-brand-muted" />
                      </div>
                      <span className="text-brand-text">{item.name} <span className="text-brand-muted font-normal text-xs">x{item.qty}</span></span>
                    </div>
                    <span className="text-brand-green">${item.price * item.qty}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-sm font-black text-brand-text">
              <span>Total Price</span>
              <span className="text-lg text-brand-green">${viewingOrder.total}</span>
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={() => setViewingOrder(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Update Status Modal */}
      <Modal 
        isOpen={!!updatingOrder} 
        onClose={() => setUpdatingOrder(null)} 
        title="Update Order Status"
        maxWidth="max-w-md"
      >
        {updatingOrder && (
          <div className="space-y-4">
            <p className="text-sm text-brand-muted">
              Select the new status for order <span className="font-bold text-brand-text">{updatingOrder.id}</span>.
            </p>
            <div>
              <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Order Status</label>
              <select 
                className="input-field"
                defaultValue={updatingOrder.status}
                id="update-status-select"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
            <div className="flex gap-3 justify-end pt-4">
              <Button variant="ghost" onClick={() => setUpdatingOrder(null)}>Cancel</Button>
              <Button 
                onClick={() => {
                  const newStatus = document.getElementById('update-status-select')?.value;
                  if (newStatus) {
                    handleUpdateStatus(updatingOrder.id, newStatus);
                  }
                }}
              >
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
