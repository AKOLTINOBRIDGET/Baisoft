import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export const CartDrawer = () => {
  const { isDrawerOpen, setIsDrawerOpen, items, updateQty, removeItem, total, subtotal, tax } = useCart();
  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold font-display">Your Cart</h2>
          <button 
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-800 rounded-lg hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <span className="text-6xl mb-4">🛒</span>
              <p className="font-semibold text-lg">Your cart is empty</p>
              <p className="text-sm">Looks like you haven't added anything yet.</p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => setIsDrawerOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-surface-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <img src="/logo.png" alt="Product Placeholder" className="w-10 h-10 object-contain opacity-30 grayscale" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-sm line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-brand-muted">{item.business}</p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 text-xs"
                      >
                        Remove
                      </button>
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button 
                          className="px-2 py-1 text-gray-500 hover:text-gray-800"
                          onClick={() => updateQty(item.id, item.qty - 1)}
                        >-</button>
                        <span className="px-2 text-sm font-medium w-8 text-center">{item.qty}</span>
                        <button 
                          className="px-2 py-1 text-gray-500 hover:text-gray-800"
                          onClick={() => updateQty(item.id, item.qty + 1)}
                        >+</button>
                      </div>
                      <p className="font-bold">${item.price * item.qty}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-surface-secondary/50">
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between text-brand-muted">
                <span>Subtotal</span>
                <span className="font-medium text-brand-text">${subtotal}</span>
              </div>
              <div className="flex justify-between text-brand-muted">
                <span>Tax (8%)</span>
                <span className="font-medium text-brand-text">${tax}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 mt-2">
                <span>Total</span>
                <span className="text-brand-green">${total}</span>
              </div>
            </div>
            <Button 
              fullWidth 
              onClick={() => {
                setIsDrawerOpen(false);
                navigate('/checkout');
              }}
              className="py-3.5"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
