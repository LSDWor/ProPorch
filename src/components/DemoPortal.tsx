import React, { useState, useEffect } from 'react';
import { ChevronLeft, CheckCircle2, Zap, ArrowRight, MessageSquare, Star } from './Icons';
import { LOADING_STEPS, HERO_IMAGES } from '../data/mockData';
import AddressInput from './AddressInput';
import BottomNav from './BottomNav';
import ProjectDashboard from './ProjectDashboard';
import QuoteTool from './QuoteTool';
import ReferralSection from './ReferralSection';

interface DemoPortalProps {
  demo: any;
}

const DemoPortal: React.FC<DemoPortalProps> = ({ demo }) => {
  const { state, setActiveTab, submitAddress, goToLanding, generateQuote, clearQuote } = demo;
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    if (state.activeTab !== 'home' || state.isLoading) return;
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [state.activeTab, state.isLoading]);

  // Home tab content
  const renderHome = () => {
    if (state.isLoading) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 px-6">
          <div className="w-full max-w-xs space-y-4">
            {LOADING_STEPS.map((step, index) => {
              const isActive = index === state.loadingStep;
              const isCompleted = index < state.loadingStep;

              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    isActive ? 'opacity-100 scale-105' :
                    isCompleted ? 'opacity-40' :
                    'opacity-0 translate-y-4'
                  }`}
                >
                  <div className={`w-5 h-5 flex items-center justify-center rounded-full border transition-colors duration-300 ${
                    isCompleted ? 'bg-amber-500 border-amber-500' :
                    isActive ? 'border-white animate-pulse' :
                    'border-gray-600'
                  }`}>
                    {isCompleted && <CheckCircle2 className="w-3 h-3 text-black" />}
                    {isActive && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <span className={`font-medium text-lg ${isActive ? 'text-white' : 'text-gray-400'}`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-full flex flex-col">
        {/* Background */}
        <div className="absolute inset-0">
          {HERO_IMAGES.map((img, i) => (
            <div
              key={img}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                i === heroIndex ? 'opacity-30' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/40 to-brand-dark" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 pb-24">
          {/* Contractor branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 mb-6">
              <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">M</span>
              </div>
              <span className="text-sm font-semibold text-white">Mike's Plumbing & HVAC</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4 leading-tight">
            Check your project status
          </h1>
          <p className="text-white/70 text-center mb-8 max-w-xs mx-auto">
            Enter your property address to view your project timeline and details.
          </p>
          
          <AddressInput onSelect={submitAddress} isLoading={false} />

          {/* Quick actions */}
          <div className="grid grid-cols-3 gap-3 mt-10 max-w-md mx-auto w-full">
            {[
              { icon: <Zap className="w-5 h-5" />, label: 'Get Quote', tab: 'quote' as const },
              { icon: <MessageSquare className="w-5 h-5" />, label: 'Message', tab: 'projects' as const },
              { icon: <Star className="w-5 h-5" />, label: 'Refer', tab: 'referrals' as const },
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => setActiveTab(action.tab)}
                className="flex flex-col items-center gap-2 p-4 bg-white/5 backdrop-blur border border-white/10 rounded-2xl hover:bg-white/10 transition-all active:scale-95"
              >
                <div className="text-amber-400">{action.icon}</div>
                <span className="text-xs font-medium text-gray-300">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Account tab content
  const renderAccount = () => (
    <div className="px-6 pt-16 pb-24 min-h-screen bg-brand-dark">
      <h2 className="text-2xl font-bold mb-6">Account</h2>
      
      {/* Profile card */}
      <div className="bg-brand-card rounded-2xl p-5 border border-white/10 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-xl font-bold">
            JD
          </div>
          <div>
            <p className="font-bold text-lg">John Doe</p>
            <p className="text-gray-400 text-sm">john.doe@email.com</p>
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-400">Account Status</p>
          <p className="text-amber-400 font-bold text-sm">Active Customer</p>
        </div>
      </div>

      {/* Menu items */}
      <div className="space-y-2">
        {[
          'Notification Settings',
          'Payment Methods',
          'Service History',
          'Help & Support',
          'Privacy Policy',
        ].map((item) => (
          <div key={item} className="flex items-center justify-between p-4 bg-brand-card rounded-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
            <span className="text-sm font-medium">{item}</span>
            <ArrowRight className="w-4 h-4 text-gray-500" />
          </div>
        ))}
      </div>

      <button
        onClick={goToLanding}
        className="w-full mt-8 py-3 border border-white/20 rounded-xl text-gray-400 font-medium text-sm hover:bg-white/5 transition-all"
      >
        Exit Demo → Back to ProPorch
      </button>
    </div>
  );

  return (
    <div className="relative w-full min-h-screen bg-brand-dark text-white overflow-hidden">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-brand-dark/90 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={goToLanding} className="p-1.5 text-gray-400 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">M</span>
            </div>
            <span className="text-sm font-bold">Mike's Plumbing & HVAC</span>
          </div>
          <div className="w-8" />
        </div>
      </div>

      {/* Content area */}
      <div className="w-full min-h-screen">
        {state.activeTab === 'home' && renderHome()}
        {state.activeTab === 'projects' && (
          <ProjectDashboard
            projectData={state.projectData}
            onAddressSubmit={submitAddress}
          />
        )}
        {state.activeTab === 'quote' && (
          <QuoteTool
            onGenerateQuote={generateQuote}
            quoteResult={state.quoteResult}
            onClearQuote={clearQuote}
          />
        )}
        {state.activeTab === 'referrals' && <ReferralSection />}
        {state.activeTab === 'account' && renderAccount()}
      </div>

      {/* Loading overlay */}
      {state.isLoading && (
        <div className="fixed inset-0 bg-brand-dark/90 backdrop-blur-sm z-30" />
      )}

      {/* Bottom nav */}
      <BottomNav activeTab={state.activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default DemoPortal;
