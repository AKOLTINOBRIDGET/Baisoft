import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export const CartDrawer = () => {
  const { isDrawerOpen, setIsDrawerOpen, items, updateQty, removeItem, total, subtotal, tax } = useCart();
  const navigate = useNavigate();

  // Promo code states
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // in dollars
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    
    const code = promoCode.trim().toUpperCase();
    if (code === 'WELCOME10' || code === 'BAISOFT') {
      const discountAmount = Math.round(subtotal * 0.1);
      setAppliedDiscount(discountAmount);
      setPromoSuccess(`10% discount applied! (-$${discountAmount})`);
    } else {
      setPromoError('Invalid coupon code. Try WELCOME10');
      setAppliedDiscount(0);
    }
  };

  const finalTotal = Math.max(0, total - appliedDiscount);

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end font-sans">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-extrabold font-display text-brand-text">Shopping Cart</h2>
            <p className="text-xs text-brand-muted mt-0.5">Review your selected items</p>
          </div>
          <button 
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 text-gray-400 hover:text-brand-text rounded-full hover:bg-gray-100 transition-colors text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-grow overflow-y-auto p-6 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20 opacity-75">
              <span className="text-6xl mb-4 animate-bounce-subtle">🛒</span>
              <p className="font-extrabold text-lg text-brand-text">Your cart is empty</p>
              <p className="text-xs text-brand-muted mt-1 max-w-xs">Looks like you haven't added anything to your cart yet.</p>
              <Button 
                variant="outline" 
                className="mt-6 rounded-full font-bold uppercase tracking-wider text-xs"
                onClick={() => setIsDrawerOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-surface-secondary rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img 
                      src={item.image || '/logo.png'} 
                      alt={item.name} 
                      className={`w-full h-full ${item.image ? 'object-cover' : 'w-10 h-10 object-contain opacity-30 grayscale'}`}
                      onError={(e) => {
                        e.target.src = '/logo.png';
                        e.target.className = 'w-10 h-10 object-contain opacity-30 grayscale';
                      }}
                    />
                  </div>

                  {/* Item Description */}
                  <div className="flex-grow flex flex-col min-w-0">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-brand-text truncate leading-tight">{item.name}</h4>
                        <p className="text-[10px] font-semibold text-brand-green uppercase tracking-wider mt-0.5">{item.business}</p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 text-xs font-bold shrink-0 transition-colors"
                      >
                        Remove
                      </button>
                    </div>

                    <p className="text-xs text-brand-muted font-bold mt-1 mb-2">${item.price} each</p>
                    
                    {/* Quantity controls */}
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-xs">
                        <button 
                          className="px-2.5 py-1 text-gray-500 hover:bg-gray-50 font-bold"
                          onClick={() => updateQty(item.id, item.qty - 1)}
                        >-</button>
                        <span className="px-2 text-xs font-bold w-8 text-center text-brand-text">{item.qty}</span>
                        <button 
                          className="px-2.5 py-1 text-gray-500 hover:bg-gray-50 font-bold"
                          onClick={() => updateQty(item.id, item.qty + 1)}
                        >+</button>
                      </div>
                      <p className="font-extrabold text-sm text-brand-text">${item.price * item.qty}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout Summary Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-surface-secondary/50 shadow-inner">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="mb-5 flex gap-2">
              <input
                type="text"
                placeholder="PROMO CODE (WELCOME10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border border-gray-200 outline-none focus:border-brand-green bg-white shadow-xs"
              />
              <Button type="submit" variant="outline" size="sm" className="rounded-xl text-xs px-4">
                Apply
              </Button>
            </form>
            {promoError && <p className="text-[10px] text-red-500 font-bold mb-3">{promoError}</p>}
            {promoSuccess && <p className="text-[10px] text-brand-success font-bold mb-3">{promoSuccess}</p>}

            {/* Calculations */}
            <div className="space-y-2.5 mb-5 text-xs font-semibold">
              <div className="flex justify-between text-brand-muted">
                <span>Subtotal</span>
                <span className="text-brand-text font-bold">${subtotal}</span>
              </div>
              <div className="flex justify-between text-brand-muted">
                <span>Tax (8%)</span>
                <span className="text-brand-text font-bold">${tax}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-brand-success">
                  <span>Coupon Discount</span>
                  <span>-$${appliedDiscount}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-base pt-3 border-t border-gray-200 mt-2 text-brand-text">
                <span>Total</span>
                <span className="text-brand-green">${finalTotal}</span>
              </div>
            </div>
            
            <Button 
              fullWidth 
              onClick={() => {
                setIsDrawerOpen(false);
                navigate('/checkout', { state: { discount: appliedDiscount } });
              }}
              className="py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs"
            >
              Secure Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
