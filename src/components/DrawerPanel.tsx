import React, { useState, useEffect } from 'react';
import { ProjectData, QuoteData } from '../types';
import { Share, X } from './Icons';
import OverviewTab from './OverviewTab';
import QuoteTab from './QuoteTab';
import ReputationTab from './ReputationTab';
import FeedbackTab from './FeedbackTab';

interface DrawerPanelProps {
  data: ProjectData;
  onGenerateQuote: (serviceType: string) => void;
  quoteResult: QuoteData | null;
  onClearQuote: () => void;
}

type TabId = 'overview' | 'quote' | 'reputation' | 'feedback';

const TABS: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'quote', label: 'Quote' },
  { id: 'reputation', label: 'Reputation' },
  { id: 'feedback', label: 'Feedback' },
];

const DrawerPanel: React.FC<DrawerPanelProps> = ({ data, onGenerateQuote, quoteResult, onClearQuote }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  useEffect(() => {
    requestAnimationFrame(() => setIsMounted(true));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'In Progress': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'Materials Delivered': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const renderAddress = () => {
    const fullAddress = data.address || '';
    const cleanAddr = fullAddress.replace(/, USA$/, '').replace(/, United States$/, '');
    const zipRegex = /\b\d{5}(?:-\d{4})?$/;
    const zipMatch = cleanAddr.match(zipRegex);
    let zip = '';
    let remainder = cleanAddr;

    if (zipMatch) {
      zip = zipMatch[0];
      remainder = cleanAddr.substring(0, zipMatch.index).trim();
    }

    const firstCommaIndex = remainder.indexOf(',');
    if (firstCommaIndex !== -1) {
      const street = remainder.substring(0, firstCommaIndex).trim();
      let cityState = remainder.substring(firstCommaIndex + 1).trim().replace(/,$/, '');

      return (
        <div className="flex flex-col items-start gap-0.5 mt-1">
          <h2 className="text-2xl font-bold text-gray-900 leading-tight">{street}</h2>
          <p className="text-lg font-medium text-gray-600 leading-tight">{cityState}</p>
          {zip && <p className="text-base text-gray-500 font-medium leading-tight">{zip}</p>}
        </div>
      );
    }

    return <h2 className="text-2xl font-bold text-gray-900 leading-tight">{fullAddress}</h2>;
  };

  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(false);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'ProPorch Project',
          text: `Track the ${data.installType} installation at ${data.address}. Status: ${data.status}`,
          url: window.location.href,
        });
      } catch (_err) {
        // cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch (_err) {
        // silent fail
      }
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isExpanded && (
        <div
          className="absolute inset-0 z-30 bg-black/10 transition-opacity duration-300"
          onClick={handleBackdropClick}
        />
      )}

      <div
        className={`absolute bottom-0 left-0 right-0 w-full md:max-w-md md:mx-auto bg-white rounded-t-[30px] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)] transition-transform duration-500 z-40 h-[85vh] flex flex-col overflow-hidden ${
          isMounted
            ? (isExpanded ? 'translate-y-0' : 'translate-y-[calc(100%-130px)]')
            : 'translate-y-full'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)' }}
      >
        {/* PERSISTENT HEADER */}
        <div
          className="w-full bg-white/95 backdrop-blur-xl z-50 border-b border-gray-100 flex flex-col cursor-pointer shrink-0"
          onClick={toggleExpanded}
        >
          {/* Handle Bar */}
          <div className="w-full flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>

          {/* Header Content */}
          <div className="px-6 pb-4 pt-1">
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(data.status)} uppercase tracking-wide`}>
                  {data.status}
                </span>
                {data.installType && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold border bg-gray-100 text-gray-600 border-gray-200 uppercase tracking-wide">
                    {data.installType}
                  </span>
                )}
              </div>

              <button
                onClick={handleShare}
                className="p-1.5 -mr-1.5 text-gray-400 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
              >
                <Share className="w-5 h-5 text-gray-700 hover:text-gray-900" />
              </button>
            </div>
            {renderAddress()}
          </div>
        </div>

        {/* TABS */}
        <div className="shrink-0 border-b border-gray-100 bg-white px-6">
          <div className="flex gap-1">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab(tab.id);
                  if (!isExpanded) setIsExpanded(true);
                }}
                className={`px-3 py-2.5 text-xs font-semibold transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'text-gray-900 border-black'
                    : 'text-gray-400 border-transparent hover:text-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 bg-white relative">
          {activeTab === 'overview' && <OverviewTab data={data} />}
          {activeTab === 'quote' && (
            <QuoteTab
              onGenerateQuote={onGenerateQuote}
              quoteResult={quoteResult}
              onClearQuote={onClearQuote}
            />
          )}
          {activeTab === 'reputation' && <ReputationTab />}
          {activeTab === 'feedback' && <FeedbackTab />}
        </div>
      </div>
    </>
  );
};

export default DrawerPanel;
