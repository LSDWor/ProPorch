import React, { useState } from 'react';
import { Search, MapPin, ArrowRight } from './Icons';

interface AddressInputProps {
  onSelect: (address: string) => void;
  isLoading: boolean;
}

const SAMPLE_ADDRESSES = [
  { id: '1', description: '742 Evergreen Terrace, Springfield, IL 62704' },
  { id: '2', description: '123 Main Street, Austin, TX 73301' },
  { id: '3', description: '456 Oak Avenue, Denver, CO 80201' },
];

const AddressInput: React.FC<AddressInputProps> = ({ onSelect, isLoading }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = query.length > 0
    ? SAMPLE_ADDRESSES.filter(a => a.description.toLowerCase().includes(query.toLowerCase()))
    : [];

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
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  return (
    <div className="relative w-full max-w-md mx-auto z-50">
      <div className={`relative flex items-center bg-white/95 backdrop-blur-xl rounded-full shadow-2xl transition-all duration-300 ${showSuggestions && filteredSuggestions.length > 0 ? 'rounded-b-none rounded-t-2xl' : ''}`}>
        <Search className="absolute left-4 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 0 && setShowSuggestions(true)}
          placeholder="Search by address"
          className="w-full py-4 pl-12 pr-14 bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 font-medium text-base"
          disabled={isLoading}
        />
        
        <button 
          onClick={handleSubmit}
          disabled={!query.trim() || isLoading}
          className="absolute right-2 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl shadow-2xl rounded-b-2xl overflow-hidden border-t border-gray-100 max-h-60 overflow-y-auto">
          {filteredSuggestions.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item.description)}
              className="w-full flex items-center px-4 py-3 hover:bg-gray-100/50 transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 flex-shrink-0">
                <MapPin className="w-4 h-4 text-gray-600" />
              </div>
              <span className="text-gray-800 text-sm font-medium line-clamp-1">{item.description}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressInput;
