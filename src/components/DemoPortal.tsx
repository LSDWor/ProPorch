import React, { useState, useEffect } from 'react';
import { ChevronLeft, CheckCircle2 } from './Icons';
import { LOADING_STEPS, HERO_IMAGES } from '../data/mockData';
import AddressInput from './AddressInput';
import DrawerPanel from './DrawerPanel';

interface DemoPortalProps {
  demo: any;
}

const SLIDE_DURATION = 5000;
const MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY || 'AIzaSyBXK1h0J34roznmeVyDi5nr0ihr4np6saU';

function getSatelliteUrl(address: string, width = 800, height = 1200) {
  const encoded = encodeURIComponent(address);
  return `https://maps.googleapis.com/maps/api/staticmap?center=${encoded}&zoom=19&size=${width}x${height}&maptype=satellite&key=${MAPS_KEY}`;
}

const DemoPortal: React.FC<DemoPortalProps> = ({ demo }) => {
  const { state, submitAddress, resetSearch, goToLanding, generateQuote, clearQuote } = demo;
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [satLoaded, setSatLoaded] = useState(false);

  // Reset satellite state when address changes
  useEffect(() => {
    setSatLoaded(false);
  }, [state.address]);

  // Cycle background images on home
  useEffect(() => {
    if (state.demoView !== 'home') return;
    const timer = setInterval(() => {
      setCurrentHeroIndex(prev => (prev + 1) % HERO_IMAGES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [state.demoView]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>

      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        {/* Slideshow Backgrounds */}
        {HERO_IMAGES.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              state.demoView === 'home' && index === currentHeroIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        {/* Result state background — satellite view of address */}
        {state.demoView === 'result' && state.address && MAPS_KEY && (
          <>
            {/* Preload satellite image */}
            <img
              src={getSatelliteUrl(state.address)}
              alt=""
              className="hidden"
              onLoad={() => setSatLoaded(true)}
            />
            {/* Fallback while loading */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${satLoaded ? 'opacity-0' : 'opacity-100'}`}
              style={{ backgroundImage: `url(${HERO_IMAGES[0]})` }}
            />
            {/* Satellite view */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${satLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ backgroundImage: `url(${getSatelliteUrl(state.address)})` }}
            />
          </>
        )}
        {state.demoView === 'result' && (!state.address || !MAPS_KEY) && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-100"
            style={{ backgroundImage: `url(${HERO_IMAGES[0]})` }}
          />
        )}

        {/* Overlay gradient for text readability on home */}
        <div className={`absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60 transition-opacity duration-1000 ${state.demoView === 'home' ? 'opacity-100' : 'opacity-0'}`} />

        {/* Darker overlay for loading state */}
        {state.demoView === 'loading' && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-500" />
        )}

        {/* Overlay for result state */}
        {state.demoView === 'result' && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
        )}
      </div>

      {/* Full Width Progress Bar */}
      {state.demoView === 'home' && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
          <div
            key={currentHeroIndex}
            className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            style={{
              animation: `progress ${SLIDE_DURATION}ms linear`
            }}
          />
        </div>
      )}

      {/* Top Navigation / Branding */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6 flex justify-between items-center pointer-events-none">
        {state.demoView === 'result' ? (
          <button
            onClick={resetSearch}
            className="pointer-events-auto w-8 h-8 rounded-full bg-white flex items-center justify-center text-black shadow-lg transition-transform active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        ) : (
          <div className="text-white font-bold text-xl tracking-tight drop-shadow-md">ProPorch</div>
        )}
        {state.demoView === 'home' && (
          <button
            onClick={goToLanding}
            className="pointer-events-auto text-white/70 text-sm font-medium hover:text-white transition-colors"
          >
            ← Back
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full h-full flex flex-col items-center">
        {/* HERO STATE */}
        {state.demoView === 'home' && (
          <div className="w-full h-full flex flex-col justify-center px-6 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6 leading-tight drop-shadow-lg">
              Check your install status.
            </h1>
            <p className="text-white/90 text-center mb-10 max-w-xs mx-auto drop-shadow-md font-medium">
              Enter your property address to view your project timeline and team details.
            </p>
            <AddressInput onSelect={submitAddress} isLoading={false} />
          </div>
        )}

        {/* LOADING STATE - Chain of Thought */}
        {state.demoView === 'loading' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-50 px-6">
            <div className="w-full max-w-xs space-y-4">
              {LOADING_STEPS.map((step: string, index: number) => {
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
                      isCompleted ? 'bg-green-500 border-green-500' :
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
        )}
      </div>

      {/* Drawer - Result state */}
      {state.demoView === 'result' && state.projectData && (
        <DrawerPanel
          data={state.projectData}
          onGenerateQuote={generateQuote}
          quoteResult={state.quoteResult}
          onClearQuote={clearQuote}
        />
      )}
    </div>
  );
};

export default DemoPortal;
