import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Shield,
  Zap,
  Users,
  Star,
  Check,
} from './Icons';

interface LandingProps {
  onEnterDemo: () => void;
}

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop",
];

const Landing: React.FC<LandingProps> = ({ onEnterDemo }) => {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col">
        {/* Background images */}
        <div className="absolute inset-0">
          {HERO_IMAGES.map((img, i) => (
            <div
              key={img}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                i === heroIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60" />
        </div>

        {/* Nav */}
        <nav className="relative z-10 flex items-center justify-between px-6 py-5">
          <div className="text-white font-bold text-xl tracking-tight drop-shadow-md">
            ProPorch
          </div>
          <button
            onClick={onEnterDemo}
            className="text-sm font-semibold text-white/90 hover:text-white transition-colors"
          >
            Try Demo →
          </button>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center pb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 max-w-3xl drop-shadow-lg">
            Your clients deserve a portal.{' '}
            <span className="text-white/90">Give them one.</span>
          </h1>
          
          <p className="text-lg text-white/80 max-w-xl mb-10 leading-relaxed drop-shadow-md font-medium">
            ProPorch gives plumbers, electricians, and contractors a branded client portal with instant quoting, project tracking, and reputation management.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <button
              onClick={onEnterDemo}
              className="flex-1 bg-black text-white font-bold py-4 px-8 rounded-full hover:bg-gray-800 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg"
            >
              Try the Demo
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="flex-1 bg-white/95 backdrop-blur-xl text-gray-900 font-semibold py-4 px-8 rounded-full hover:bg-white transition-all shadow-lg">
              Start Free Trial
            </button>
          </div>

          <p className="text-xs text-white/60 mt-4">No credit card required · 14-day free trial</p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything your business needs</h2>
            <p className="text-gray-500 text-lg">Three powerful tools in one platform</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Client Portal",
                description: "Give clients real-time visibility into project status, team info, materials, and documents — all branded to your business.",
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Instant Quoting",
                description: "Generate professional quotes in seconds. Clients approve and pay deposits right from their phone.",
                color: "bg-amber-100 text-amber-600",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Reputation Engine",
                description: "Monitor your Google reviews, send review requests after every job, and boost your rating to outrank competitors.",
                color: "bg-purple-100 text-purple-600",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card hover:shadow-lg transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by contractors everywhere</h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-gray-500">4.9/5 from 200+ home service businesses</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { name: "Mike R.", role: "Plumber, Austin TX", text: "ProPorch cut our admin time in half. Clients love being able to check their project status without calling." },
            { name: "Sarah L.", role: "Electrician, Denver CO", text: "The instant quoting feature alone paid for itself in the first week. Customers convert way faster." },
            { name: "Dave K.", role: "HVAC Tech, Chicago IL", text: "Our Google rating went from 3.8 to 4.5 in two months. The review requests and response templates are game-changers." },
          ].map((review, i) => (
            <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">"{review.text}"</p>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                <p className="text-gray-500 text-xs">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-500 text-lg">Start free. Scale as you grow.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Starter",
                price: "$29",
                description: "Perfect for solo operators",
                features: ["1 Active Project", "Client Portal", "Basic Quoting", "Email Support"],
                cta: "Start Free Trial",
                popular: false,
              },
              {
                name: "Pro",
                price: "$79",
                description: "For growing teams",
                features: ["Unlimited Projects", "Instant Quoting", "Referral Engine", "Custom Branding", "Priority Support"],
                cta: "Start Free Trial",
                popular: true,
              },
              {
                name: "Business",
                price: "$149",
                description: "For established companies",
                features: ["Everything in Pro", "Multi-team Support", "API Access", "CRM Integration", "Dedicated Manager", "SLA Guarantee"],
                cta: "Contact Sales",
                popular: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 border transition-all ${
                  plan.popular
                    ? 'bg-white border-blue-500 border-2 scale-105 shadow-card'
                    : 'bg-white border-gray-200 shadow-sm'
                }`}
              >
                {plan.popular && (
                  <div className="text-center mb-4">
                    <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-400">/mo</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={plan.popular ? onEnterDemo : undefined}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.popular
                      ? 'bg-black text-white hover:bg-gray-800 active:scale-95 shadow-lg'
                      : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to upgrade your client experience?
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            Join hundreds of contractors who've transformed their business with ProPorch.
          </p>
          <button
            onClick={onEnterDemo}
            className="bg-black text-white font-bold py-4 px-10 rounded-full hover:bg-gray-800 transition-all active:scale-95 inline-flex items-center gap-2 text-lg shadow-lg"
          >
            Try the Demo
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-10 px-6 bg-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-bold text-gray-900 text-lg">ProPorch</div>
          <p className="text-gray-500 text-sm">© 2026 ProPorch, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-gray-500 text-sm hover:text-gray-900 cursor-pointer transition-colors">Privacy</span>
            <span className="text-gray-500 text-sm hover:text-gray-900 cursor-pointer transition-colors">Terms</span>
            <span className="text-gray-500 text-sm hover:text-gray-900 cursor-pointer transition-colors">Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
