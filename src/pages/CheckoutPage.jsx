import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { ArrowLeft, ArrowRight, CreditCard, Smartphone, ShieldCheck, Bell, Package } from 'lucide-react';

export default function CheckoutPage() {
  const { items, total, subtotal, tax, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get discount from router state
  const initialDiscount = location.state?.discount || 0;

  // Form steps: 'shipping' | 'payment'
  const [step, setStep] = useState('shipping');
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [momoPhone, setMomoPhone] = useState('');
  
  // Shipping states
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    zip: '',
    phone: '',
  });

  // Credit Card states for visualizer
  const [cardData, setCardData] = useState({
    number: '',
    name: user?.name || '',
    expiry: '',
    cvc: '',
  });

  const [formErrors, setFormErrors] = useState({});

  // Clean empty cart redirect
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-surface-secondary text-center font-sans">
        <Package className="w-16 h-16 text-brand-muted mb-4 opacity-50" />
        <h2 className="text-2xl font-black text-brand-text mb-2">Your checkout cart is empty</h2>
        <p className="text-sm text-brand-muted mb-6">Add items from the store to proceed with secure payment.</p>
        <Button className="rounded-full font-bold uppercase tracking-wider text-xs px-6 py-3" onClick={() => navigate('/')}>Return to Storefront</Button>
      </div>
    );
  }

  const validateShipping = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = 'Valid email is required';
    if (!formData.address.trim()) errors.address = 'Shipping address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.zip.trim()) errors.zip = 'ZIP code is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePayment = () => {
    const errors = {};
    if (paymentMethod === 'card') {
      const cleanedNumber = cardData.number.replace(/\s/g, '');
      if (cleanedNumber.length !== 16) {
        errors.cardNumber = 'Card number must be 16 digits';
      }
      if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
        errors.cardExpiry = 'Expiry date must be MM/YY';
      }
      if (cardData.cvc.length < 3) {
        errors.cardCvc = 'CVC must be at least 3 digits';
      }
    } else if (paymentMethod === 'momo') {
      if (!momoPhone.trim() || momoPhone.length < 8) {
        errors.momoPhone = 'Please enter a valid mobile money number';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (validateShipping()) {
      setFormErrors({});
      setStep('payment');
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!validatePayment()) return;
    
    setLoading(true);
    // Simulate API secure payment processing
    setTimeout(() => {
      clearCart();
      navigate('/success');
    }, 2000);
  };

  // Card Number Formatter
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    const matches = value.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    setCardData({ 
      ...cardData, 
      number: parts.length > 0 ? parts.join(' ') : value 
    });
    if (formErrors.cardNumber) setFormErrors({...formErrors, cardNumber: ''});
  };

  // Expiry Formatter (MM/YY)
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setCardData({ ...cardData, expiry: value });
    if (formErrors.cardExpiry) setFormErrors({...formErrors, cardExpiry: ''});
  };

  const finalTotal = Math.max(0, total - initialDiscount);

  return (
    <div className="min-h-screen bg-surface-secondary py-12 font-sans">
      <div className="page-container max-w-5xl">
        
        {/* Back Button */}
        <button 
          onClick={() => step === 'payment' ? setStep('shipping') : navigate(-1)} 
          className="text-xs font-bold text-brand-muted hover:text-brand-text mb-6 flex items-center gap-1.5 transition-colors uppercase tracking-wider outline-none"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> {step === 'payment' ? 'Back to Shipping' : 'Back to Store'}
        </button>

        {/* Checkout Header and Progress Tracker */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black font-display text-brand-text">Checkout</h1>
            <p className="text-xs text-brand-muted mt-1">SSL Secured and encrypted transactions</p>
          </div>
          
          {/* Progress Tracker (Amazon Inspired) */}
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand-muted">
            <span className={`px-3 py-1.5 rounded-full ${step === 'shipping' ? 'bg-brand-green text-white shadow-green' : 'bg-green-100 text-brand-green'}`}>1. Shipping</span>
            <ArrowRight className="w-3.5 h-3.5 text-gray-300" />
            <span className={`px-3 py-1.5 rounded-full ${step === 'payment' ? 'bg-brand-green text-white shadow-green' : 'bg-gray-200 text-gray-500'}`}>2. Payment</span>
          </div>
        </div>

        {/* Main Grid split */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column Forms */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Step 1: Shipping Information */}
            {step === 'shipping' && (
              <Card padding="md" className="p-6 md:p-8 animate-fade-in">
                <h2 className="text-lg font-extrabold text-brand-text border-b border-gray-100 pb-3 mb-6">Shipping Address</h2>
                <form onSubmit={handleNextStep} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <Input 
                        label="Full Name" 
                        placeholder="John Doe"
                        value={formData.name} 
                        onChange={e => {
                          setFormData({...formData, name: e.target.value});
                          if (formErrors.name) setFormErrors({...formErrors, name: ''});
                        }} 
                        error={formErrors.name}
                        required
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <Input 
                        label="Email Address" 
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email} 
                        onChange={e => {
                          setFormData({...formData, email: e.target.value});
                          if (formErrors.email) setFormErrors({...formErrors, email: ''});
                        }} 
                        error={formErrors.email}
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Input 
                        label="Street Address" 
                        placeholder="123 Main Street, Apt 4B"
                        value={formData.address} 
                        onChange={e => {
                          setFormData({...formData, address: e.target.value});
                          if (formErrors.address) setFormErrors({...formErrors, address: ''});
                        }} 
                        error={formErrors.address}
                        required
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <Input 
                        label="City" 
                        placeholder="New York"
                        value={formData.city} 
                        onChange={e => {
                          setFormData({...formData, city: e.target.value});
                          if (formErrors.city) setFormErrors({...formErrors, city: ''});
                        }} 
                        error={formErrors.city}
                        required
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <Input 
                        label="ZIP Code" 
                        placeholder="10001"
                        value={formData.zip} 
                        onChange={e => {
                          setFormData({...formData, zip: e.target.value});
                          if (formErrors.zip) setFormErrors({...formErrors, zip: ''});
                        }} 
                        error={formErrors.zip}
                        required
                      />
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-100 flex justify-end">
                    <Button type="submit" className="rounded-xl font-bold uppercase tracking-wider text-xs px-6 py-3">
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Step 2: Secure Payment details */}
            {step === 'payment' && (
              <Card padding="md" className="p-6 md:p-8 animate-fade-in">
                <h2 className="text-lg font-extrabold text-brand-text border-b border-gray-100 pb-3 mb-6">Payment Options</h2>
                
                {/* Visual Premium Glassmorphic Credit Card Preview (Wow Factor) */}
                {paymentMethod === 'card' && (
                  <div className="w-full max-w-sm mx-auto mb-8 aspect-[1.58/1] bg-gradient-to-tr from-brand-dark via-slate-800 to-brand-green/70 rounded-2xl p-6 text-white flex flex-col justify-between shadow-lg relative overflow-hidden transition-all duration-500 hover:rotate-1">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
                    {/* Chip & Logo */}
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-7 bg-amber-400/80 rounded-sm relative border border-amber-300 shadow-inner flex items-center justify-center">
                        <div className="w-8 h-5 border border-white/20 rounded-xs" />
                      </div>
                      <span className="font-extrabold text-sm tracking-widest text-white/80">SECURE BANK</span>
                    </div>

                    {/* Card Number */}
                    <p className="text-lg sm:text-xl font-mono tracking-widest text-center my-4 font-bold">
                      {cardData.number || '•••• •••• •••• ••••'}
                    </p>

                    {/* Holder & Expiry */}
                    <div className="flex justify-between items-end">
                      <div className="min-w-0 pr-4">
                        <p className="text-[9px] uppercase tracking-wider text-white/50 font-bold">Card Holder</p>
                        <p className="text-xs font-bold uppercase truncate font-mono">{cardData.name || 'YOUR NAME'}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-[9px] uppercase tracking-wider text-white/50 font-bold">Expires</p>
                        <p className="text-xs font-bold font-mono">{cardData.expiry || 'MM/YY'}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('card');
                      setFormErrors({});
                    }}
                    className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col items-start ${
                      paymentMethod === 'card' 
                        ? 'border-brand-green bg-brand-green/5' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 mb-1.5 text-brand-green" />
                    <span className="font-bold text-xs uppercase tracking-wider block text-brand-text">Credit/Debit Card</span>
                    <span className="text-[10px] text-brand-muted font-medium mt-0.5 block">Visa, MasterCard, Amex</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('momo');
                      setFormErrors({});
                    }}
                    className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col items-start ${
                      paymentMethod === 'momo' 
                        ? 'border-brand-green bg-brand-green/5' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Smartphone className="w-6 h-6 mb-1.5 text-brand-green" />
                    <span className="font-bold text-xs uppercase tracking-wider block text-brand-text">Mobile Money</span>
                    <span className="text-[10px] text-brand-muted font-medium mt-0.5 block">MTN Momo, Airtel Money</span>
                  </button>
                </div>

                {/* Secure inputs form */}
                <form onSubmit={handleCheckout} className="space-y-4">
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 animate-fade-in">
                      <Input 
                        label="Card Number" 
                        placeholder="4111 2222 3333 4444" 
                        value={cardData.number}
                        onChange={handleCardNumberChange}
                        error={formErrors.cardNumber}
                        required 
                      />
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <Input 
                            label="Expiry Date" 
                            placeholder="MM/YY" 
                            value={cardData.expiry}
                            onChange={handleExpiryChange}
                            error={formErrors.cardExpiry}
                            required 
                          />
                        </div>
                        <div className="col-span-1">
                          <Input 
                            label="CVC" 
                            placeholder="123" 
                            type="password"
                            maxLength="4"
                            value={cardData.cvc}
                            onChange={e => {
                              setCardData({...cardData, cvc: e.target.value.replace(/\D/g, '')});
                              if (formErrors.cardCvc) setFormErrors({...formErrors, cardCvc: ''});
                            }}
                            error={formErrors.cardCvc}
                            required 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'momo' && (
                    <div className="space-y-4 animate-fade-in">
                      <Input 
                        label="Mobile Number" 
                        placeholder="e.g. 024 000 0000" 
                        type="tel" 
                        value={momoPhone}
                        onChange={e => {
                          setMomoPhone(e.target.value.replace(/\D/g, ''));
                          if (formErrors.momoPhone) setFormErrors({...formErrors, momoPhone: ''});
                        }}
                        error={formErrors.momoPhone}
                        required 
                      />
                      <div className="bg-surface-secondary p-4 rounded-xl text-xs font-semibold text-brand-muted border border-gray-100 flex items-start gap-2">
                        <Bell className="w-4 h-4 text-brand-muted shrink-0 mt-0.5" />
                        <span>You will receive a secure authorization prompt on your mobile device to complete this transaction.</span>
                      </div>
                    </div>
                  )}

                  <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                    <button 
                      type="button" 
                      onClick={() => setStep('shipping')}
                      className="text-xs font-bold text-brand-muted hover:text-brand-text uppercase tracking-wider transition-colors flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                    <Button 
                      type="submit" 
                      loading={loading}
                      className="rounded-xl font-bold uppercase tracking-wider text-xs px-6 py-3"
                    >
                      Complete Secure Payment
                    </Button>
                  </div>
                </form>
              </Card>
            )}
          </div>

          {/* Right Column Order summary and trust badge */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Order Summary card */}
            <Card padding="md" className="p-6">
              <h2 className="text-sm font-extrabold text-brand-text uppercase tracking-wider border-b border-gray-100 pb-3 mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-5 max-h-60 overflow-y-auto custom-scrollbar pr-1">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-start gap-4 text-xs font-semibold text-brand-text">
                    <div className="flex gap-2.5 min-w-0">
                      <div className="w-10 h-10 bg-surface-secondary border border-gray-100 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <Package className="w-4 h-4 text-brand-muted" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold truncate">{item.name}</p>
                        <p className="text-[10px] text-brand-muted mt-0.5">Qty: {item.qty} @ ${item.price}</p>
                      </div>
                    </div>
                    <span className="font-bold">${item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              {/* Calculations layout */}
              <div className="border-t border-gray-100 pt-4 space-y-2.5 text-xs font-semibold">
                <div className="flex justify-between text-brand-muted">
                  <span>Subtotal</span>
                  <span className="text-brand-text font-bold">${subtotal}</span>
                </div>
                <div className="flex justify-between text-brand-muted">
                  <span>Shipping</span>
                  <span className="text-brand-success font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-brand-muted">
                  <span>Tax (8%)</span>
                  <span className="text-brand-text font-bold">${tax}</span>
                </div>
                {initialDiscount > 0 && (
                  <div className="flex justify-between text-brand-success">
                    <span>Discount Code</span>
                    <span>-${initialDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between font-black text-base pt-4 border-t border-gray-100 mt-2 text-brand-text">
                  <span>Order Total</span>
                  <span className="text-brand-green">${finalTotal}</span>
                </div>
              </div>
            </Card>

            {/* Secure connection trust banner */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center flex flex-col items-center shadow-xs">
              <ShieldCheck className="w-8 h-8 text-brand-green mb-2" />
              <p className="font-extrabold text-xs text-brand-text uppercase tracking-wider">SSL Secure Checkouts</p>
              <p className="text-[11px] text-brand-muted leading-relaxed mt-1 max-w-xs font-medium">
                Your credentials are encrypted and securely sent directly to our multi-tenant payment gateways. We never cache or store card information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
