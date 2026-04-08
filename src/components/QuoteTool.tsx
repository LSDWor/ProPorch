import React, { useState } from 'react';
import { QuoteData } from '../types';
import { Camera, ArrowRight, CheckCircle2, Zap } from './Icons';
import { SERVICES_LIST, SERVICE_FORM_FIELDS } from '../data/mockData';
import EstimateDrawer from './EstimateDrawer';

interface QuoteToolProps {
  onGenerateQuote: (serviceType: string) => void;
  quoteResult: QuoteData | null;
  onClearQuote: () => void;
}

const QuoteTool: React.FC<QuoteToolProps> = ({ onGenerateQuote, quoteResult, onClearQuote }) => {
  const [selectedService, setSelectedService] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [photoCount, setPhotoCount] = useState(0);

  const fields = selectedService ? SERVICE_FORM_FIELDS[selectedService] || [] : [];

  const handleGenerate = () => {
    if (!selectedService) return;
    setIsGenerating(true);
    setTimeout(() => {
      onGenerateQuote(selectedService);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="px-5 pt-16 pb-24 min-h-screen bg-brand-dark">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Instant Quote</h2>
        <p className="text-gray-400 text-sm">Get a detailed estimate in seconds</p>
      </div>

      {/* Service Selector */}
      <div className="mb-6">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">
          Select Service Type
        </label>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {SERVICES_LIST.map((service) => (
            <button
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${
                selectedService === service.id
                  ? 'bg-amber-500/10 border-amber-500/30 ring-1 ring-amber-500/50'
                  : 'bg-brand-card border-white/10 hover:bg-white/5'
              }`}
            >
              <span className="text-2xl">{service.icon}</span>
              <span className={`text-[10px] font-semibold ${
                selectedService === service.id ? 'text-amber-400' : 'text-gray-400'
              }`}>
                {service.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Form */}
      {selectedService && (
        <div className="space-y-4 mb-6 animate-fade-in">
          {fields.map((field, i) => (
            <div key={i}>
              <label className="text-xs font-semibold text-gray-300 mb-1.5 block">{field.label}</label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                className="w-full bg-brand-card border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all"
              />
            </div>
          ))}

          {/* Photo Upload */}
          <div>
            <label className="text-xs font-semibold text-gray-300 mb-1.5 block">Photos (optional)</label>
            <button
              onClick={() => setPhotoCount(prev => prev + 1)}
              className="w-full bg-brand-card border border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center gap-2 hover:bg-white/5 transition-all"
            >
              <Camera className="w-8 h-8 text-gray-500" />
              <span className="text-sm text-gray-400">Tap to add photos</span>
              {photoCount > 0 && (
                <span className="text-xs text-amber-400 font-semibold">{photoCount} photo(s) added</span>
              )}
            </button>
          </div>

          {/* Address */}
          <div>
            <label className="text-xs font-semibold text-gray-300 mb-1.5 block">Property Address</label>
            <input
              type="text"
              placeholder="123 Main St, City, State"
              className="w-full bg-brand-card border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-glow active:scale-95 transition-all disabled:opacity-70"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating Quote...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Generate Instant Quote
              </>
            )}
          </button>
        </div>
      )}

      {/* Empty State */}
      {!selectedService && (
        <div className="text-center py-16 animate-fade-in">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-gray-600" />
          </div>
          <p className="text-gray-500 text-sm">Select a service type above to get started</p>
        </div>
      )}

      {/* Quote Result Drawer */}
      {quoteResult && (
        <EstimateDrawer data={quoteResult} onClose={onClearQuote} />
      )}
    </div>
  );
};

export default QuoteTool;
