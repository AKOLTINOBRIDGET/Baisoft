// src/componets/Chatbot.jsx
import { useState } from 'react';

export const Chatbot = ({ products }) => {
  const [messages, setMessages] = useState([]); // Stores History
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    const userMsg = { role: 'user', text: input, timestamp: new Date() };
    setMessages([...messages, userMsg]);
    
    // Logic: Chatbot queries the products
    // Filter approved products only for public queries
    // const availableData = products.filter(p => p.status === 'approved');
    
    // Here you would call your OpenAI/Grok API
    // const aiResponse = await callAI(input, availableData);
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white shadow-2xl rounded-2xl border border-gray-200 flex flex-col h-96 z-50">
      <div className="p-4 bg-green-600 text-white rounded-t-2xl font-bold flex justify-between">
        <span>Product AI Assistant</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`p-2 rounded-lg text-sm ${m.role === 'user' ? 'bg-gray-100 ml-8' : 'bg-green-50 mr-8'}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about products..." 
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>
  );
};