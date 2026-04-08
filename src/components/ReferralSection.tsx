import React, { useState } from 'react';
import { Gift, Copy, Check, Users, ArrowRight, Award, CheckCircle2, Clock } from './Icons';
import { mockReferrals } from '../data/mockData';

const ReferralSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const referralLink = "proporch.app/r/mike-plumbing/john-doe-x7k2";

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-500/20 px-2 py-0.5 rounded-full"><CheckCircle2 className="w-3 h-3" /> Earned</span>;
      case 'signed_up':
        return <span className="flex items-center gap-1 text-[10px] font-bold text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded-full"><Users className="w-3 h-3" /> Signed Up</span>;
      default:
        return <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400 bg-white/10 px-2 py-0.5 rounded-full"><Clock className="w-3 h-3" /> Pending</span>;
    }
  };

  return (
    <div className="px-5 pt-16 pb-24 min-h-screen bg-brand-dark">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Referrals</h2>
        <p className="text-gray-400 text-sm">Earn rewards by referring friends</p>
      </div>

      {/* Reward Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-5 border border-amber-500/20 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full -mr-10 -mt-10 blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
              <Gift className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="font-bold text-lg">$50 Off</p>
              <p className="text-gray-400 text-xs">For each successful referral</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Share your referral link and earn $50 credit for every friend who books a service. Your friend gets $25 off their first job too!
          </p>
        </div>
      </div>

      {/* Share Link */}
      <div className="mb-8">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
          Your Referral Link
        </label>
        <div className="flex items-center gap-2 bg-brand-card border border-white/10 rounded-xl p-2">
          <div className="flex-1 bg-white/5 rounded-lg px-3 py-2.5 overflow-hidden">
            <p className="text-sm text-gray-300 truncate font-mono">{referralLink}</p>
          </div>
          <button
            onClick={handleCopy}
            className={`px-4 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-1.5 transition-all active:scale-95 ${
              copied
                ? 'bg-green-500/20 text-green-400'
                : 'bg-amber-500 text-black hover:bg-amber-400'
            }`}
          >
            {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: 'Referred', value: '3', sub: 'friends' },
          { label: 'Earned', value: '$50', sub: 'in credits' },
          { label: 'Pending', value: '$100', sub: 'potential' },
        ].map((stat) => (
          <div key={stat.label} className="bg-brand-card border border-white/10 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-white">{stat.value}</p>
            <p className="text-[10px] text-gray-500 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Referral List */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Users className="w-4 h-4" /> Your Referrals
        </h3>
        <div className="space-y-2">
          {mockReferrals.map((referral) => (
            <div
              key={referral.id}
              className="flex items-center justify-between p-4 bg-brand-card border border-white/10 rounded-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-sm font-bold">
                  {referral.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{referral.name}</p>
                  <p className="text-xs text-gray-500">{referral.date}</p>
                </div>
              </div>
              {getStatusBadge(referral.status)}
            </div>
          ))}
        </div>
      </div>

      {/* Share CTA */}
      <div className="mt-8 bg-brand-card border border-white/10 rounded-2xl p-5 text-center">
        <Award className="w-8 h-8 text-amber-400 mx-auto mb-3" />
        <h4 className="font-bold mb-1">Know someone who needs a pro?</h4>
        <p className="text-gray-400 text-sm mb-4">Share your link and earn rewards together.</p>
        <button
          onClick={handleCopy}
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-6 rounded-xl font-bold text-sm inline-flex items-center gap-2 active:scale-95 transition-all hover:shadow-glow"
        >
          Share Referral Link
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ReferralSection;
