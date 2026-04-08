import React, { useState, useEffect } from 'react';
import { ArrowRight } from './Icons';

const SERVICES = [
  {
    id: 1,
    name: "Roofing",
    sub: "Full Replacement",
    image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=800&q=80",
    description: "Premium asphalt & metal roofing solutions.",
    cta: "Get Estimate"
  },
  {
    id: 2,
    name: "Gutters",
    sub: "Seamless Systems",
    image: "https://images.unsplash.com/photo-1620626012053-1c129626963b?auto=format&fit=crop&w=800&q=80",
    description: "Custom seamless gutters & guards.",
    cta: "Add Gutters"
  },
  {
    id: 3,
    name: "Siding",
    sub: "Vinyl & Fiber Cement",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    description: "Boost efficiency and curb appeal.",
    cta: "View Styles"
  },
  {
    id: 4,
    name: "Doors",
    sub: "Entry & Patio",
    image: "https://images.unsplash.com/photo-1506377550980-bc82650059c3?auto=format&fit=crop&w=800&q=80",
    description: "Secure, energy-efficient entryways.",
    cta: "Shop Doors"
  },
  {
    id: 5,
    name: "Windows",
    sub: "Modern & Efficient",
    image: "https://images.unsplash.com/photo-1503708928676-1cb796a0891e?auto=format&fit=crop&w=800&q=80",
    description: "High-performance window replacements.",
    cta: "See Catalog"
  }
];

const ServiceCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const DURATION = 5000;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SERVICES.length);
    }, DURATION);
    return () => clearInterval(timer);
  }, []);

  const current = SERVICES[index];

  return (
    <div className="mb-8 w-full">
      <div className="flex justify-between items-center mb-3 px-1">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Other Services</h3>
      </div>
      
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-lg bg-black group">
        {/* Images Background */}
        {SERVICES.map((service, i) => (
          <div 
            key={service.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={service.image} 
              alt={service.name} 
              className="w-full h-full object-cover opacity-70" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          </div>
        ))}

        {/* Sequencing Text Overlay */}
        <div className="absolute top-4 right-4 z-20">
           <span className="text-white/80 font-bold text-[10px] tracking-widest backdrop-blur-md bg-white/10 px-2 py-1 rounded border border-white/10">
             {String(index + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
           </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
          <div className="transform transition-all duration-500 translate-y-0">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1 block">
              {current.sub}
            </span>
            <h4 className="text-2xl font-bold text-white mb-2 tracking-tight">
              {current.name}
            </h4>
            
            <div className="flex items-center justify-between">
               <p className="text-gray-300 text-xs max-w-[60%] line-clamp-1 font-medium">
                 {current.description}
               </p>
               <button className="bg-white text-black text-xs font-bold px-3 py-2 rounded-lg flex items-center hover:bg-gray-200 transition-colors active:scale-95">
                 {current.cta}
                 <ArrowRight className="w-3 h-3 ml-2" />
               </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
          <div 
            key={index}
            className="h-full bg-blue-500 origin-left"
            style={{ 
              width: '100%',
              animation: `scaleProgress ${DURATION}ms linear` 
            }}
          />
        </div>
        
        <style>{`
          @keyframes scaleProgress {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ServiceCarousel;
