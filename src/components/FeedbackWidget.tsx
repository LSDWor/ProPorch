import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquare, Send } from './Icons';

type FeedbackState = 'RATING' | 'POSITIVE' | 'NEGATIVE' | 'SUBMITTED';

const FeedbackWidget: React.FC = () => {
  const [feedbackState, setFeedbackState] = useState<FeedbackState>('RATING');
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

  const handleRating = (value: number) => {
    setRating(value);
    if (value >= 4) {
      setFeedbackState('POSITIVE');
    } else {
      setFeedbackState('NEGATIVE');
    }
  };

  const handleSubmit = () => {
    setFeedbackState('SUBMITTED');
  };

  if (feedbackState === 'SUBMITTED') {
    return (
      <div className="animate-fade-in text-center py-16">
        <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
        <p className="text-gray-400 mb-8">Your feedback has been submitted successfully.</p>
        <button
          onClick={() => { setFeedbackState('RATING'); setRating(0); setFeedbackText(''); }}
          className="bg-white/10 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/20 transition-all"
        >
          Leave Another Review
        </button>
      </div>
    );
  }

  if (feedbackState === 'POSITIVE' || feedbackState === 'NEGATIVE') {
    const isPositive = feedbackState === 'POSITIVE';
    return (
      <div className="animate-fade-in pt-4">
        <div className="text-center mb-6">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${
            isPositive ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-gray-400'
          }`}>
            {isPositive ? <CheckCircle2 className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
          </div>
          <h3 className="text-2xl font-bold">
            {isPositive ? "That's great to hear!" : "We're sorry to hear that."}
          </h3>
          <p className="text-gray-400 text-sm mt-2">
            {isPositive ? "What did you like most?" : "Please tell us how we can improve."}
          </p>
        </div>

        <textarea
          className="w-full bg-brand-card border border-white/10 rounded-2xl p-4 text-sm mb-6 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none resize-none min-h-[140px] text-white placeholder-gray-600"
          placeholder="Type your feedback here..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            onClick={() => { setFeedbackState('RATING'); setRating(0); }}
            className="flex-1 bg-white/5 border border-white/10 text-gray-400 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors"
          >
            Skip
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-glow active:scale-95 transition-all"
          >
            Submit <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in text-center py-8">
      <h3 className="text-2xl font-bold mb-2">How was your experience?</h3>
      <p className="text-gray-400 text-sm mb-8">Your feedback helps us improve.</p>

      <div className="flex justify-center gap-4 mb-10">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(star)}
            className="p-2 transition-transform hover:scale-110 active:scale-95 focus:outline-none"
          >
            <Star
              className={`w-10 h-10 ${
                rating >= star ? 'fill-amber-400 text-amber-400' : 'text-gray-600'
              }`}
            />
          </button>
        ))}
      </div>

      <p className="text-gray-600 text-xs">Tap a star to rate</p>
    </div>
  );
};

export default FeedbackWidget;
