import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

export default function CheckoutPage() {
  const { items, total, subtotal, tax, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
  });

  // Redirect if empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Button onClick={() => navigate('/')}>Return to Store</Button>
      </div>
    );
  }

  const handleCheckout = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      navigate('/success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-surface-secondary py-12">
      <div className="page-container max-w-5xl">
        <button onClick={() => navigate(-1)} className="text-brand-muted hover:text-brand-text mb-6 font-medium">
          ← Back to store
        </button>
        
        <h1 className="text-3xl font-bold font-display mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            <Card padding="md">
              <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <Input 
                    label="Full Name" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Input 
                    label="Email Address" 
                    type="email"
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                  />
                </div>
                <div className="col-span-2">
                  <Input 
                    label="Street Address" 
                    value={formData.address} 
                    onChange={e => setFormData({...formData, address: e.target.value})} 
                  />
                </div>
                <div className="col-span-2">
                  <Input 
                    label="City" 
                    value={formData.city} 
                    onChange={e => setFormData({...formData, city: e.target.value})} 
                  />
                </div>
              </div>
            </Card>

            <Card padding="md">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-brand-green bg-brand-green/5' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="block text-2xl mb-2">💳</span>
                  <span className="font-bold block">Credit/Debit Card</span>
                  <span className="text-xs text-brand-muted">Visa, MasterCard, Amex</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('momo')}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    paymentMethod === 'momo' 
                      ? 'border-brand-green bg-brand-green/5' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="block text-2xl mb-2">📱</span>
                  <span className="font-bold block">Mobile Money</span>
                  <span className="text-xs text-brand-muted">MTN, Airtel</span>
                </button>
              </div>

              {/* Dummy Card Input */}
              {paymentMethod === 'card' && (
                <div className="mt-6 space-y-4 animate-fade-in">
                  <Input label="Card Number" placeholder="0000 0000 0000 0000" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Expiry (MM/YY)" placeholder="MM/YY" />
                    <Input label="CVC" placeholder="123" />
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card padding="md" className="sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex-1 pr-4">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-brand-muted ml-2">x{item.qty}</span>
                    </div>
                    <span className="font-semibold">${item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-brand-muted">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-brand-muted">
                  <span>Tax (8%)</span>
                  <span>${tax}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-4 border-t border-gray-100 mt-2">
                  <span>Total</span>
                  <span className="text-brand-green">${total}</span>
                </div>
              </div>

              <Button 
                fullWidth 
                size="lg" 
                className="mt-8"
                loading={loading}
                onClick={handleCheckout}
              >
                Pay ${total}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
