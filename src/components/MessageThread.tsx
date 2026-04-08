import React, { useState } from 'react';
import { Send } from './Icons';
import { mockMessages, } from '../data/mockData';
import { Message } from '../types';

const MessageThread: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: String(messages.length + 1),
      sender: 'client',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      read: false,
    };
    setMessages([...messages, newMsg]);
    setInput('');

    // Simulate contractor reply
    setTimeout(() => {
      const reply: Message = {
        id: String(messages.length + 2),
        sender: 'contractor',
        text: "Got it! I'll look into that and get back to you shortly. Thanks for the heads up! 🔧",
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        read: false,
      };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-4">
        <h3 className="text-lg font-bold">Messages</h3>
        <p className="text-gray-500 text-xs">Chat with Mike's Plumbing & HVAC</p>
      </div>

      {/* Messages */}
      <div className="space-y-3 mb-4 max-h-[50vh] overflow-y-auto no-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              msg.sender === 'client'
                ? 'bg-amber-500 text-black rounded-br-md'
                : 'bg-brand-card border border-white/10 text-white rounded-bl-md'
            }`}>
              <p className="text-sm">{msg.text}</p>
              <p className={`text-[10px] mt-1 ${
                msg.sender === 'client' ? 'text-black/50' : 'text-gray-500'
              }`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 bg-brand-card border border-white/10 rounded-full p-1.5">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-gray-600 outline-none"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="w-9 h-9 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white disabled:opacity-30 transition-all active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MessageThread;
