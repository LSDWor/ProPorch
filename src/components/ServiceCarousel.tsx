import React, { useState, useEffect } from 'react';
import { ArrowRight } from './Icons';

const SERVICES = [
  {
    id: 1,
    name: "Water Heater",
    sub: "Tankless Upgrade",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80",
    description: "Energy-efficient tankless water heaters.",
    cta: "Get Quote"
  },
  {
    id: 2,
    name: "HVAC Service",
    sub: "AC & Heating",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    description: "Full HVAC installation and maintenance.",
    cta: "Learn More"
  },
  {
    id: 3,
    name: "Electrical",
    sub: "Panel Upgrade",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    description: "200A panel upgrades & whole-home rewiring.",
    cta: "Get Estimate"
  },
  {
    id: 4,
    name: "Bathroom",
    sub: "Full Remodel",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
    description: "Complete bathroom renovation services.",
    cta: "View Gallery"
  },
  {
    id: 5,
    name: "Kitchen",
    sub: "Plumbing Refit",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
    description: "Kitchen plumbing upgrades & fixture install.",
    cta: "See Options"
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
    <div className="mb-4 w-full">
      <div className="flex justify-between items-center mb-3 px-1">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Other Services</h3>
      </div>

      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-lg bg-black group">
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

        <div className="absolute top-4 right-4 z-20">
          <span className="text-white/80 font-bold text-[10px] tracking-widest backdrop-blur-md bg-white/10 px-2 py-1 rounded border border-white/10">
            {String(index + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
          <div className="transform transition-all duration-500 translate-y-0">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1 block">
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

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
          <div
            key={index}
            className="h-full bg-amber-500 origin-left"
            style={{
              width: '100%',
              animation: `scaleProgress ${DURATION}ms linear`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceCarousel;
