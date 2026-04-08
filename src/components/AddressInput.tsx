import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, ArrowRight } from './Icons';

interface AddressInputProps {
  onSelect: (address: string) => void;
  isLoading: boolean;
}

const SAMPLE_ADDRESSES = [
  { id: '1', description: '742 Evergreen Terrace, Springfield, IL 62704' },
  { id: '2', description: '123 Main Street, Austin, TX 78701' },
  { id: '3', description: '456 Oak Avenue, Denver, CO 80202' },
  { id: '4', description: '789 Pine Boulevard, Chicago, IL 60601' },
  { id: '5', description: '1010 Maple Drive, Portland, OR 97201' },
];

const AddressInput: React.FC<AddressInputProps> = ({ onSelect, isLoading }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<typeof SAMPLE_ADDRESSES>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (query.length > 1) {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        const filtered = SAMPLE_ADDRESSES.filter(a =>
          a.description.toLowerCase().includes(query.toLowerCase())
        );
        // If nothing matches, show all as suggestions for demo
        setSuggestions(filtered.length > 0 ? filtered : SAMPLE_ADDRESSES);
        setShowSuggestions(true);
      }, 200);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [query]);

  const handleSelect = (address: string) => {
    setQuery(address);
    setShowSuggestions(false);
    onSelect(address);
  };

  const handleSubmit = () => {
    if (query.trim()) {
      setShowSuggestions(false);
      onSelect(query);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="relative w-full max-w-md mx-auto z-50">
      <div className={`relative flex items-center bg-white/95 backdrop-blur-xl rounded-full shadow-2xl transition-all duration-300 ${
        showSuggestions ? 'rounded-b-none rounded-t-2xl' : ''
      }`}>
        <Search className="absolute left-4 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter any address..."
          className="w-full py-4 pl-12 pr-14 bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 font-medium text-base rounded-full"
          disabled={isLoading}
        />
        <button
          onClick={handleSubmit}
          disabled={!query.trim() || isLoading}
          className="absolute right-2 w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full flex items-center justify-center hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl shadow-2xl rounded-b-2xl overflow-hidden border-t border-gray-100 max-h-60 overflow-y-auto">
          {suggestions.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item.description)}
              className="w-full flex items-center px-4 py-3 hover:bg-gray-100/50 transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center mr-3 flex-shrink-0">
                <MapPin className="w-4 h-4 text-amber-600" />
              </div>
              <span className="text-gray-800 text-sm font-medium line-clamp-1">{item.description}</span>
            </button>
          ))}
          <div className="px-4 py-2 bg-gray-50 text-center">
            <span className="text-[10px] text-gray-400 font-medium">Demo mode — enter any address</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressInput;
