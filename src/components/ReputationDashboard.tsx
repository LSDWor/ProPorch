import React, { useState } from 'react';
import { Star, MessageSquare, Send, CheckCircle2, Clock, TrendingUp, Users, Award, ChevronRight, Copy, Check, ArrowRight } from './Icons';
import { mockReviews, reputationStats } from '../data/mockData';

const ReputationDashboard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const reviewLink = "g.page/mikes-plumbing/review";

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStarArray = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => i < rating);
  };

  const responseRateColor = reputationStats.responseRate >= 80 ? 'text-green-400' : reputationStats.responseRate >= 50 ? 'text-amber-400' : 'text-red-400';
  const isBelowAverage = reputationStats.overallRating < reputationStats.areaAverage;

  return (
    <div className="px-5 pt-16 pb-24 min-h-screen bg-brand-dark">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Reputation</h2>
        <p className="text-gray-400 text-sm">Manage your Google Business reviews</p>
      </div>

      {/* Google Rating Hero */}
      <div className={`rounded-2xl p-5 border mb-6 relative overflow-hidden ${isBelowAverage ? 'bg-gradient-to-br from-amber-500/10 to-red-500/10 border-amber-500/30' : 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/30'}`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full -mr-10 -mt-10 blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">G</span>
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Google Business Profile</p>
                <p className="text-gray-400 text-xs">Mike's Plumbing & HVAC</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="text-center">
              <p className="text-4xl font-extrabold text-white">{reputationStats.overallRating}</p>
              <div className="flex gap-0.5 mt-1">
                {getStarArray(Math.round(reputationStats.overallRating)).map((filled, i) => (
                  <Star key={i} className={`w-3 h-3 ${filled ? 'fill-amber-400 text-amber-400' : 'text-gray-600'}`} />
                ))}
              </div>
            </div>
            <div className="flex-1 border-l border-white/10 pl-4">
              <p className="text-gray-300 font-semibold">{reputationStats.totalReviews} Google Reviews</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-gray-400">Area average:</span>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-white">{reputationStats.areaAverage}</span>
                  <Star className="w-3 h-3 fill-gray-400 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {isBelowAverage && (
            <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <p className="text-amber-200 text-xs font-medium">Below Area Average — Let's boost your rating!</p>
            </div>
          )}
        </div>
      </div>

      {/* Review Velocity */}
      <div className="bg-brand-card border border-white/10 rounded-2xl p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white">Review Velocity</h3>
          <span className="text-xs text-gray-400">This Month</span>
        </div>
        <div className="mb-3">
          <div className="flex items-end justify-between mb-2">
            <span className="text-2xl font-bold text-white">{reputationStats.reviewsThisMonth}</span>
            <span className="text-xs text-gray-400">Goal: {reputationStats.reviewGoal}</span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all"
              style={{ width: `${(reputationStats.reviewsThisMonth / reputationStats.reviewGoal) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-400">Last month:</span>
          <span className={`font-semibold ${reputationStats.reviewsThisMonth > reputationStats.lastMonthReviews ? 'text-green-400' : 'text-red-400'}`}>
            {reputationStats.lastMonthReviews} reviews
          </span>
          {reputationStats.reviewsThisMonth > reputationStats.lastMonthReviews && (
            <TrendingUp className="w-3 h-3 text-green-400" />
          )}
        </div>
      </div>

      {/* Get More Reviews */}
      <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-white">Get More Reviews</h3>
        </div>

        {/* SMS Request */}
        <div className="mb-3">
          <label className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 block">
            SMS Review Request
          </label>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="(555) 123-4567"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-amber-500/50 transition-colors"
            />
            <button className="bg-amber-500 text-black px-5 py-3 rounded-xl font-bold text-sm hover:bg-amber-400 transition-colors flex items-center gap-2">
              <Send className="w-4 h-4" /> Send
            </button>
          </div>
        </div>

        {/* Email Request */}
        <div className="mb-4">
          <label className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 block">
            Email Review Request
          </label>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="customer@email.com"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-amber-500/50 transition-colors"
            />
            <button className="bg-amber-500 text-black px-5 py-3 rounded-xl font-bold text-sm hover:bg-amber-400 transition-colors flex items-center gap-2">
              <Send className="w-4 h-4" /> Send
            </button>
          </div>
        </div>

        {/* Review Link */}
        <div className="mb-4">
          <label className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 block">
            Shareable Review Link
          </label>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2">
            <div className="flex-1 px-3 py-2 overflow-hidden">
              <p className="text-xs text-gray-300 truncate font-mono">{reviewLink}</p>
            </div>
            <button
              onClick={handleCopy}
              className={`px-3 py-2 rounded-lg font-semibold text-xs flex items-center gap-1 transition-all ${
                copied ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
            </button>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
          <p className="text-xs text-gray-400">
            <span className="text-amber-400 font-semibold">Pro Tip:</span> Send a review request within 2 hours of completing a job for the best response rate.
          </p>
        </div>
      </div>

      {/* Quick Response Templates */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Quick Response Templates</h3>
        <div className="space-y-2">
          {[
            { title: 'Thank You (5★)', preview: 'Thank you for the kind words! We\'re glad we could help...', type: 'positive' },
            { title: 'Acknowledge (3-4★)', preview: 'Thanks for the feedback. We\'d love to improve your experience...', type: 'neutral' },
            { title: 'Recovery (1-2★)', preview: 'We\'re sorry about your experience. Please contact us directly...', type: 'negative' },
          ].map((template, i) => (
            <button
              key={i}
              onClick={() => setSelectedTemplate(selectedTemplate === template.title ? null : template.title)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedTemplate === template.title
                  ? 'bg-amber-500/20 border-amber-500/40'
                  : 'bg-brand-card border-white/10 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white">{template.title}</span>
                <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${selectedTemplate === template.title ? 'rotate-90' : ''}`} />
              </div>
              <p className="text-xs text-gray-400 truncate">{template.preview}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Reputation Score Breakdown */}
      <div className="bg-brand-card border border-white/10 rounded-2xl p-5 mb-6">
        <h3 className="font-bold text-white mb-4">Reputation Health</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-400">Response Rate</span>
              <span className={`text-sm font-bold ${responseRateColor}`}>{reputationStats.responseRate}%</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all ${responseRateColor.replace('text-', 'bg-')}`}
                style={{ width: `${reputationStats.responseRate}%` }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-white/5">
            <span className="text-xs text-gray-400">Avg Response Time</span>
            <span className="text-sm font-bold text-white">{reputationStats.avgResponseTime} hrs</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-white/5">
            <span className="text-xs text-gray-400">Review Sentiment</span>
            <span className="text-sm font-bold text-green-400">{reputationStats.sentimentScore}% Positive</span>
          </div>
        </div>

        <div className="mt-4 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
          <p className="text-xs text-amber-200">
            <span className="font-semibold">ProPorch Tip:</span> Responding to reviews within 24hrs boosts your Google ranking by up to 30%.
          </p>
        </div>
      </div>

      {/* Recent Reviews Feed */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Recent Reviews</h3>
        <div className="space-y-3">
          {mockReviews.map((review) => (
            <div key={review.id} className="bg-brand-card border border-white/10 rounded-2xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-sm font-bold">
                    {review.reviewerName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{review.reviewerName}</p>
                    <div className="flex gap-0.5 mt-0.5">
                      {getStarArray(review.rating).map((filled, i) => (
                        <Star key={i} className={`w-3 h-3 ${filled ? 'fill-amber-400 text-amber-400' : 'text-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{review.timeAgo}</span>
              </div>
              <p className="text-gray-300 text-sm mb-3 leading-relaxed">{review.text}</p>
              {review.hasReply && review.replyText && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 ml-13">
                  <p className="text-xs text-gray-400 font-semibold mb-1">Your Response:</p>
                  <p className="text-sm text-gray-300">{review.replyText}</p>
                </div>
              )}
              {!review.hasReply && (
                <button className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 mt-2">
                  <MessageSquare className="w-3 h-3" /> Reply
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* High-Ticket Upsell */}
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-brand-dark border border-white/10 rounded-2xl p-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500" />
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl" />
        
        <Award className="w-8 h-8 text-amber-400 mx-auto mb-3" />
        <h4 className="font-bold text-lg text-white mb-2">Want us to manage your reputation?</h4>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          Our team handles review responses, automated campaigns, and monitoring for you — so you can focus on the work.
        </p>
        <div className="mb-4">
          <span className="text-2xl font-extrabold text-white">From $299</span>
          <span className="text-gray-400">/mo</span>
        </div>
        <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 px-8 rounded-xl text-sm hover:shadow-glow transition-all active:scale-95 inline-flex items-center gap-2">
          Learn More <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ReputationDashboard;
