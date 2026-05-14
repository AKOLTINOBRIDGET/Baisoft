import { createContext, useContext, useState, useMemo, useCallback } from 'react';

const CartContext = createContext(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const addItem = useCallback((product, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { ...product, qty }];
    });
    setIsDrawerOpen(true);
  }, []);

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    if (qty <= 0) { removeItem(id); return; }
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }, [removeItem]);

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);
  const tax = useMemo(() => Math.round(subtotal * 0.08), [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);
  const itemCount = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);

  const value = useMemo(() => ({
    items, addItem, removeItem, updateQty, clearCart,
    subtotal, tax, total, itemCount,
    isDrawerOpen, setIsDrawerOpen,
  }), [items, addItem, removeItem, updateQty, clearCart, subtotal, tax, total, itemCount, isDrawerOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
