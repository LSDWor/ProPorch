import React, { useState } from 'react';
import { QuoteData } from '../types';
import { SERVICES_LIST, SERVICE_FORM_FIELDS } from '../data/mockData';
import { Upload, Send, CheckCircle2, ArrowRight } from './Icons';

interface QuoteTabProps {
  onGenerateQuote: (serviceType: string) => void;
  quoteResult: QuoteData | null;
  onClearQuote: () => void;
}

const QuoteTab: React.FC<QuoteTabProps> = ({ onGenerateQuote, quoteResult, onClearQuote }) => {
  const [selectedService, setSelectedService] = useState<string>('');
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setFormValues({});
    onClearQuote();
  };

  const handleGenerate = () => {
    if (!selectedService) return;
    setIsGenerating(true);
    setTimeout(() => {
      onGenerateQuote(selectedService);
      setIsGenerating(false);
    }, 1200);
  };

  const fields = selectedService ? SERVICE_FORM_FIELDS[selectedService] || [] : [];

  if (quoteResult) {
    return (
      <div className="animate-fade-in pb-20">
        {/* Quote Result */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Your Estimate</h3>
          <p className="text-gray-500 text-sm mt-1">{quoteResult.description}</p>
        </div>

        <div className="bg-gray-50 rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-200/60">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-900 uppercase tracking-wide">{quoteResult.serviceType}</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200">
                {quoteResult.estimatedDays}
              </span>
            </div>
          </div>
          {quoteResult.lineItems.map((item, idx) => (
            <div key={idx} className={`p-4 flex justify-between items-center ${idx !== quoteResult.lineItems.length - 1 ? 'border-b border-gray-200/60' : ''}`}>
              <span className="text-gray-700 text-sm">{item.label}</span>
              <span className="text-gray-900 font-semibold text-sm">${item.amount.toLocaleString()}</span>
            </div>
          ))}
          <div className="p-4 bg-gray-900 text-white flex justify-between items-center">
            <span className="font-bold">Total</span>
            <span className="text-2xl font-bold">${quoteResult.total.toLocaleString()}</span>
          </div>
        </div>

        <button
          onClick={() => { onClearQuote(); setSelectedService(''); }}
          className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-lg"
        >
          Get Another Quote
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-20">
      <h3 className="text-xl font-bold text-gray-900 mb-2">Get an Instant Quote</h3>
      <p className="text-gray-500 text-sm mb-6">Select a service type and fill in the details.</p>

      {/* Service type selector */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {SERVICES_LIST.map(service => (
          <button
            key={service.id}
            onClick={() => handleServiceSelect(service.id)}
            className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${
              selectedService === service.id
                ? 'bg-black text-white border-black shadow-lg'
                : 'bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100'
            }`}
          >
            <span className="text-lg mb-1">{service.icon}</span>
            <span className="text-[10px] font-semibold">{service.name}</span>
          </button>
        ))}
      </div>

      {/* Form fields */}
      {selectedService && fields.length > 0 && (
        <div className="space-y-4 mb-6">
          {fields.map((field, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                value={formValues[field.label] || ''}
                onChange={(e) => setFormValues(prev => ({ ...prev, [field.label]: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-base focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
            </div>
          ))}

          {/* Photo Upload UI */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Photos (optional)</label>
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-gray-300 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500 font-medium">Tap to upload photos</p>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 10MB</p>
            </div>
          </div>
        </div>
      )}

      {/* Generate button */}
      {selectedService && (
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>
              Get Instant Quote
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default QuoteTab;
