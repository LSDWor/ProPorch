import React from 'react';
import { Home, Layers, Receipt, Gift, UserCircle } from './Icons';
import { TabId } from '../types';

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
  { id: 'projects', label: 'Projects', icon: <Layers className="w-5 h-5" /> },
  { id: 'quote', label: 'Quote', icon: <Receipt className="w-5 h-5" /> },
  { id: 'referrals', label: 'Referrals', icon: <Gift className="w-5 h-5" /> },
  { id: 'account', label: 'Account', icon: <UserCircle className="w-5 h-5" /> },
];

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-brand-dark/95 backdrop-blur-xl border-t border-white/10 safe-area-bottom">
      <div className="max-w-md mx-auto flex justify-around py-2 px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-amber-400'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <div className={`transition-all ${isActive ? 'scale-110' : ''}`}>
                {tab.icon}
              </div>
              <span className={`text-[10px] font-semibold ${isActive ? 'text-amber-400' : ''}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 bg-amber-400 rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
