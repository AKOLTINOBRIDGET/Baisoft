import { useState, useEffect, useRef } from 'react';
import { useCart } from '../../contexts/CartContext';
import { MOCK_PRODUCTS } from '../../data/mockData';
import { Button } from '../ui/Button';

export const AIChatbot = () => {
  const { addItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! 👋 I'm your ProductHub AI Shopping Assistant. Ask me about products, categories, or what's currently in stock!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: ['Show Electronics 💻', 'Suggest Coffee ☕', 'Any Fashion? 👗', 'Best Seller Books 📚']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle chatbot query
  const processQuery = (queryText) => {
    setIsTyping(true);

    setTimeout(() => {
      const q = queryText.toLowerCase();
      
      // Data Integrity boundary: Bot queries ONLY approved products
      const approvedProducts = MOCK_PRODUCTS.filter(p => p.status === 'approved');

      let responseText = '';
      let matchedProducts = [];

      // Simple keyword matching rules
      if (q.includes('electronic') || q.includes('laptop') || q.includes('macbook') || q.includes('tv') || q.includes('samsung') || q.includes('computer') || q.includes('screen')) {
        matchedProducts = approvedProducts.filter(p => p.category === 'electronics');
        responseText = "I found these premium, approved electronic items in our inventory. Let me know if you would like me to add one to your cart!";
      } else if (q.includes('headphone') || q.includes('sony') || q.includes('music') || q.includes('sound') || q.includes('audio')) {
        matchedProducts = approvedProducts.filter(p => p.id === 'p2');
        responseText = "Our top noise-canceling headphones are the Sony WH-1000XM5. Here are the approved details:";
      } else if (q.includes('fashion') || q.includes('blazer') || q.includes('dress') || q.includes('clothes') || q.includes('jacket') || q.includes('bag') || q.includes('leather')) {
        // Designer summer dress is pending_approval, so it MUST NOT show up!
        matchedProducts = approvedProducts.filter(p => p.category === 'fashion');
        responseText = "Here are our verified and approved fashion items (excluding pending approvals):";
      } else if (q.includes('coffee') || q.includes('food') || q.includes('drink') || q.includes('brew') || q.includes('beverage')) {
        matchedProducts = approvedProducts.filter(p => p.category === 'food');
        responseText = "For food and beverages, I highly recommend our Ethiopian Single Origin Coffee beans!";
      } else if (q.includes('book') || q.includes('read') || q.includes('habits') || q.includes('self-help')) {
        matchedProducts = approvedProducts.filter(p => p.category === 'books');
        responseText = "We have the best-seller book available for immediate dispatch:";
      } else if (q.includes('mug') || q.includes('ceramic') || q.includes('home') || q.includes('cup')) {
        matchedProducts = approvedProducts.filter(p => p.category === 'home');
        responseText = "Check out our rustic home essentials:";
      } else if (q.includes('yoga') || q.includes('mat') || q.includes('sport') || q.includes('fit') || q.includes('exercise')) {
        matchedProducts = approvedProducts.filter(p => p.category === 'sports');
        responseText = "Here are our high-performance fitness gear:";
      } else if (q.includes('all') || q.includes('stock') || q.includes('catalog') || q.includes('product') || q.includes('show')) {
        matchedProducts = approvedProducts.slice(0, 4);
        responseText = "Here is a list of some of our popular, approved products:";
      } else {
        responseText = "I couldn't find any approved products matching that query. Try asking for 'electronics', 'fashion', 'coffee', or 'books' to explore our verified catalog!";
      }

      // Special check: ensure no non-approved products slipped in
      matchedProducts = matchedProducts.filter(p => p.status === 'approved');

      const botMessage = {
        id: Date.now(),
        sender: 'bot',
        text: responseText,
        products: matchedProducts,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = (textToSend) => {
    if (!textToSend.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    processQuery(textToSend);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {/* Floating Chat Bubble Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-brand-green text-white rounded-full flex items-center justify-center shadow-lg hover:bg-brand-green-dark hover:scale-105 active:scale-95 transition-all duration-300 relative group"
          aria-label="Open AI Shopping Chatbot"
        >
          <span className="text-2xl animate-pulse">🤖</span>
          <span className="absolute right-0 top-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-ping" />
        </button>
      )}

      {/* Chat Window Glassmorphic Container */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-100/90 flex flex-col overflow-hidden animate-slide-up relative z-50">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-dark to-slate-900 text-white p-5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center font-bold text-lg border border-brand-green/45">
                🤖
              </div>
              <div>
                <h3 className="font-extrabold text-sm tracking-wide">Shopping Assistant</h3>
                <p className="text-[10px] text-brand-green font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-ping" />
                  AI Agent Online
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white font-bold text-sm p-1.5 rounded-lg hover:bg-white/10 transition-all"
            >
              ✕
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                {/* Message Bubble */}
                <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs font-semibold leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-brand-green text-white rounded-tr-none'
                    : 'bg-white text-brand-text border border-gray-100 rounded-tl-none'
                }`}>
                  <p>{msg.text}</p>
                  
                  {/* Embedded Interactive Product Cards */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="mt-3.5 space-y-3.5 pt-3 border-t border-gray-100">
                      {msg.products.map(prod => (
                        <div key={prod.id} className="flex gap-2.5 bg-surface-secondary/75 p-2 rounded-xl border border-gray-200/50 items-center">
                          <div className="w-12 h-12 rounded-lg bg-white overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center">
                            {prod.image ? (
                              <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-xl">📦</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-extrabold text-[11px] text-brand-text truncate leading-tight">{prod.name}</p>
                            <p className="text-[10px] text-brand-green font-bold mt-0.5">${prod.price}</p>
                          </div>
                          <Button
                            variant="primary"
                            size="xs"
                            className="py-1 px-2.5 rounded-lg text-[9px] uppercase tracking-wider font-extrabold shrink-0"
                            onClick={() => addItem(prod, 1)}
                          >
                            + Add
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Timestamp */}
                <span className="text-[9px] text-brand-muted mt-1 px-1 font-bold">{msg.timestamp}</span>

                {/* Initial suggestion chips */}
                {msg.suggestions && (
                  <div className="flex flex-wrap gap-2 mt-3 max-w-[95%]">
                    {msg.suggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(sug.replace(/[💻☕👗📚]/g, '').trim())}
                        className="text-[10px] font-extrabold text-brand-green bg-white hover:bg-brand-green/5 border border-brand-green/20 px-3 py-1.5 rounded-full shadow-xs transition-all outline-none"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white border border-gray-100 rounded-2xl rounded-tl-none p-3 max-w-[120px] shadow-xs">
                <span className="text-[10px] text-brand-muted font-bold animate-pulse">AI is typing</span>
                <span className="w-1 h-1 bg-brand-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1 h-1 bg-brand-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1 h-1 bg-brand-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Bar */}
          <div className="p-4 border-t border-gray-100 bg-white shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex gap-2 bg-surface-secondary border border-gray-200/80 rounded-full px-4 py-1.5 items-center focus-within:border-brand-green focus-within:ring-2 focus-within:ring-brand-green/10 transition-all"
            >
              <input
                type="text"
                placeholder="Ask something..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow bg-transparent text-xs font-semibold text-brand-text outline-none py-1.5 placeholder-brand-muted"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="text-brand-green disabled:opacity-30 p-1.5 font-bold hover:scale-115 transition-all text-sm"
                aria-label="Send message"
              >
                ➔
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
