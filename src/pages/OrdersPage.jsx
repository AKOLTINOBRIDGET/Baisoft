import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MOCK_ORDERS } from '../data/mockData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export default function OrdersPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter orders based on role. (Mock data doesn't have businessId on items, so we simplify)
  const userOrders = user?.role === 'buyer' 
    ? MOCK_ORDERS.filter(o => o.customer === user.name)
    : MOCK_ORDERS; // Admin/vendor sees all in this demo

  const filteredOrders = userOrders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          icon="🔍"
          className="mb-0"
        />
      </Card>

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

              {user?.role !== 'buyer' && (
                <div className="border-t border-gray-100 pt-4 mt-4 flex justify-end gap-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="primary" size="sm">Update Status</Button>
                </div>
              )}
            </Card>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <span className="text-4xl mb-3 block opacity-50">🛍️</span>
            <h3 className="text-lg font-bold">No orders found</h3>
            <p className="text-brand-muted">You don't have any orders matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
