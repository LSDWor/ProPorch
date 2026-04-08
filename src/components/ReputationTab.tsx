import React, { useState } from 'react';
import { mockReviews, reputationStats } from '../data/mockData';
import { Star, Send, Copy, AlertCircle, TrendingUp, MessageSquare, ExternalLink, Link } from './Icons';

const ReputationTab: React.FC = () => {
  const [smsPhone, setSmsPhone] = useState('');
  const [emailAddr, setEmailAddr] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const stats = reputationStats;

  const handleCopyLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const renderStars = (rating: number, size: string = 'w-4 h-4') => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} className={`${size} ${s <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
      ))}
    </div>
  );

  return (
    <div className="animate-fade-in pb-20 space-y-6">
      {/* Google Rating Hero */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <span className="text-5xl font-bold text-gray-900">{stats.overallRating}</span>
        </div>
        <div className="flex justify-center mb-2">
          {renderStars(Math.round(stats.overallRating), 'w-5 h-5')}
        </div>
        <p className="text-gray-500 text-sm font-medium">{stats.totalReviews} Google Reviews</p>

        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="text-sm text-gray-500">Area Average: <span className="font-bold text-gray-900">{stats.areaAverage}</span></span>
        </div>

        {stats.overallRating < stats.areaAverage && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 border border-red-200 rounded-full text-xs font-bold">
            <AlertCircle className="w-3.5 h-3.5" />
            Below Area Average
          </div>
        )}
      </div>

      {/* Review Velocity */}
      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Review Velocity
          </h3>
          <span className="text-xs text-gray-500 font-medium">{stats.reviewsThisMonth}/{stats.reviewGoal} this month</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(stats.reviewsThisMonth / stats.reviewGoal) * 100}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">Last month: {stats.lastMonthReviews} reviews</p>
      </div>

      {/* Get More Reviews */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Get More Reviews</h3>
        <div className="space-y-3">
          {/* SMS */}
          <div className="flex gap-2">
            <input
              type="tel"
              placeholder="Phone number"
              value={smsPhone}
              onChange={(e) => setSmsPhone(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl p-3 text-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            />
            <button className="bg-black text-white px-4 rounded-2xl font-semibold text-sm flex items-center gap-1.5 hover:bg-gray-800 transition-colors">
              <Send className="w-3.5 h-3.5" /> SMS
            </button>
          </div>
          {/* Email */}
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              value={emailAddr}
              onChange={(e) => setEmailAddr(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl p-3 text-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            />
            <button className="bg-black text-white px-4 rounded-2xl font-semibold text-sm flex items-center gap-1.5 hover:bg-gray-800 transition-colors">
              <Send className="w-3.5 h-3.5" /> Email
            </button>
          </div>
          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl p-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {copiedLink ? (
              <><span className="text-green-600">✓ Copied!</span></>
            ) : (
              <><Link className="w-4 h-4" /> Copy Review Link</>
            )}
          </button>
        </div>
      </div>

      {/* Quick Response Templates */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Quick Response Templates</h3>
        <div className="space-y-3">
          {[
            { title: "Thank You", preview: "Thank you so much for your kind review! We truly appreciate..." },
            { title: "Apologize", preview: "We sincerely apologize for your experience. Please contact us at..." },
            { title: "Follow Up", preview: "Thank you for your feedback. We'd love to discuss how we can improve..." },
          ].map((template, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-all">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-sm text-gray-900">{template.title}</span>
                <Copy className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 line-clamp-1">{template.preview}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reputation Health */}
      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Reputation Health</h3>
        <div className="space-y-4">
          {[
            { label: 'Response Rate', value: stats.responseRate, suffix: '%', color: 'bg-green-500' },
            { label: 'Avg Response Time', value: stats.avgResponseTime, suffix: ' hrs', color: 'bg-blue-500' },
            { label: 'Sentiment Score', value: stats.sentimentScore, suffix: '%', color: 'bg-purple-500' },
          ].map((metric, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm text-gray-600">{metric.label}</span>
                <span className="text-sm font-bold text-gray-900">{metric.value}{metric.suffix}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${metric.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${Math.min(metric.value, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reviews Feed */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Recent Reviews</h3>
        <div className="space-y-4">
          {mockReviews.map(review => (
            <div key={review.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-sm text-gray-900">{review.reviewerName}</p>
                  <p className="text-xs text-gray-400">{review.timeAgo}</p>
                </div>
                {renderStars(review.rating, 'w-3.5 h-3.5')}
              </div>
              <p className="text-sm text-gray-600 mb-3">{review.text}</p>
              {review.hasReply ? (
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <p className="text-xs text-gray-400 font-medium mb-1">Your Reply</p>
                  <p className="text-xs text-gray-600">{review.replyText}</p>
                </div>
              ) : (
                <button className="text-xs font-semibold text-blue-600 flex items-center gap-1 hover:text-blue-800 transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" /> Reply
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* High-Ticket Upsell */}
      <div className="bg-black rounded-2xl p-6 text-center shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/30 rounded-full -ml-10 -mb-10 blur-2xl"></div>

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-2">Want us to manage your reputation?</h3>
          <p className="text-gray-400 text-sm mb-6">We'll handle review responses, campaigns, and growth strategy.</p>
          <div className="text-white text-3xl font-bold mb-2">From $299<span className="text-lg text-gray-400">/mo</span></div>
          <button className="bg-white text-black px-8 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all active:scale-95 shadow-lg w-full flex items-center justify-center gap-2">
            Learn More <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReputationTab;
