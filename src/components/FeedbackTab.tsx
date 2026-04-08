import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquare, Send } from './Icons';

type FeedbackState = 'rating' | 'positive' | 'negative' | 'submitted';

const FeedbackTab: React.FC = () => {
  const [feedbackState, setFeedbackState] = useState<FeedbackState>('rating');
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

  const handleRating = (value: number) => {
    setRating(value);
    if (value >= 4) {
      setFeedbackState('positive');
    } else {
      setFeedbackState('negative');
    }
  };

  const handleSubmit = () => {
    setTimeout(() => {
      setFeedbackState('submitted');
    }, 500);
  };

  const handleReset = () => {
    setFeedbackState('rating');
    setRating(0);
    setFeedbackText('');
  };

  if (feedbackState === 'submitted') {
    return (
      <div className="flex flex-col h-full justify-center min-h-[50vh] animate-fade-in text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-500 mb-8">Your feedback has been submitted successfully.</p>
        <button
          onClick={handleReset}
          className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-lg"
        >
          Submit Another
        </button>
      </div>
    );
  }

  if (feedbackState === 'positive' || feedbackState === 'negative') {
    const isPositive = feedbackState === 'positive';
    return (
      <div className="flex flex-col h-full animate-fade-in pt-4">
        <div className="text-center mb-6">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${isPositive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
            {isPositive ? <CheckCircle2 className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {isPositive ? "That's great to hear!" : "We're sorry to hear that."}
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            {isPositive ? "What did you like most about the service?" : "Please tell us how we can do better."}
          </p>
        </div>

        <textarea
          className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-base mb-6 focus:ring-2 focus:ring-black focus:border-transparent outline-none resize-none min-h-[140px]"
          placeholder="Type your feedback here..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        />

        <div className="flex gap-3 mt-auto mb-8">
          <button
            onClick={handleReset}
            className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            Skip
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            Submit <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Rating state
  return (
    <div className="flex flex-col h-full justify-center min-h-[50vh] animate-fade-in text-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">How was your experience?</h3>
      <p className="text-gray-500 text-sm mb-8">Your feedback helps us improve our service.</p>

      <div className="flex justify-center gap-4 mb-10">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(star)}
            className="p-2 transition-transform hover:scale-110 active:scale-95 focus:outline-none"
          >
            <Star
              className={`w-10 h-10 ${rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeedbackTab;
