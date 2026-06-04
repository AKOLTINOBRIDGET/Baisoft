import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export default function OrderSuccessPage() {
  const navigate = useNavigate();

  // Simple confetti effect could go here
  
  return (
    <div className="min-h-screen bg-surface-secondary flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-card text-center animate-slide-up">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 text-4xl shadow-inner">
          ✓
        </div>
        
        <h1 className="text-3xl font-bold font-display text-brand-text mb-2">Order Confirmed!</h1>
        <p className="text-brand-muted mb-8">
          Thank you for your purchase. We've sent a confirmation email with your order details and tracking information.
        </p>

        <div className="bg-surface-secondary p-4 rounded-xl mb-8 text-sm">
          <p className="text-brand-muted mb-1">Order Number</p>
          <p className="font-mono font-bold text-lg">#ORD-{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
        </div>

        <div className="space-y-3">
          <Button fullWidth onClick={() => navigate('/')}>
            Continue Shopping
          </Button>
          <Button fullWidth variant="ghost" onClick={() => navigate('/dashboard')}>
            View My Orders
          </Button>
        </div>
      </div>
    </div>
  );
}
