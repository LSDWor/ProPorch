import React, { useState, useEffect } from 'react';
import { QuoteData } from '../types';
import { X, CheckCircle2, DollarSign, Clock, ArrowRight } from './Icons';

interface EstimateDrawerProps {
  data: QuoteData;
  onClose: () => void;
}

const EstimateDrawer: React.FC<EstimateDrawerProps> = ({ data, onClose }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsMounted(true));
  }, []);

  const handleApprove = () => {
    setApproved(true);
  };

  if (approved) {
    return (
      <>
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-brand-dark rounded-t-[30px] border-t border-white/10 p-6 animate-slide-up">
          <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6" />
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Quote Approved!</h3>
            <p className="text-gray-400 mb-8">Your deposit of ${(data.total * 0.2).toFixed(0)} has been processed. Mike's team will reach out within 24 hours.</p>
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-bold active:scale-95 transition-all"
            >
              Done
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`fixed bottom-0 left-0 right-0 z-50 bg-brand-dark rounded-t-[30px] border-t border-white/10 max-h-[85vh] flex flex-col transition-transform duration-500 ${
        isMounted ? 'translate-y-0' : 'translate-y-full'
      }`}>
        {/* Handle */}
        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mt-3 mb-2" />
        
        {/* Header */}
        <div className="flex justify-between items-start px-6 pb-4 border-b border-white/10">
          <div>
            <h3 className="text-xl font-bold">{data.serviceType} Quote</h3>
            <p className="text-gray-400 text-sm mt-1">{data.description}</p>
          </div>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
          {/* Line Items */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Breakdown</h4>
            <div className="bg-brand-card rounded-2xl border border-white/10 overflow-hidden">
              {data.lineItems.map((item, idx) => (
                <div key={idx} className={`p-4 flex justify-between items-center ${
                  idx !== data.lineItems.length - 1 ? 'border-b border-white/5' : ''
                }`}>
                  <span className="text-white text-sm font-medium">{item.label}</span>
                  <span className="text-amber-400 font-bold text-sm">${item.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-5 border border-amber-500/20">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-xs mb-1">Total Estimate</p>
                <p className="text-3xl font-extrabold text-white">${data.total.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <Clock className="w-3 h-3" />
                  {data.estimatedDays}
                </div>
              </div>
            </div>
          </div>

          {/* Deposit info */}
          <div className="bg-brand-card rounded-2xl p-5 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span className="text-sm font-bold">20% Deposit Required</span>
            </div>
            <p className="text-gray-400 text-sm">
              Secure your spot with a ${(data.total * 0.2).toFixed(0)} deposit. Remaining balance due upon completion.
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-6 border-t border-white/10">
          <button
            onClick={handleApprove}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-glow active:scale-95 transition-all"
          >
            Approve & Pay ${(data.total * 0.2).toFixed(0)} Deposit
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default EstimateDrawer;
