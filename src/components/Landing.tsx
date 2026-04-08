import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Shield,
  Zap,
  Users,
  Star,
  Check,
  MessageSquare,
  TrendingUp,
  ChevronRight,
} from './Icons';

interface LandingProps {
  onEnterDemo: () => void;
}

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2670&auto=format&fit=crop",
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
    <div className="min-h-screen bg-brand-dark text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col">
        {/* Background images */}
        <div className="absolute inset-0">
          {HERO_IMAGES.map((img, i) => (
            <div
              key={img}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                i === heroIndex ? 'opacity-30' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/60 to-brand-dark" />
        </div>

        {/* Nav */}
        <nav className="relative z-10 flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-bold tracking-tight">ProPorch</span>
          </div>
          <button
            onClick={onEnterDemo}
            className="text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            Try Demo →
          </button>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center pb-20">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-8">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">For Home Service Pros</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 max-w-3xl">
            Your clients deserve a portal.{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
              Give them one.
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-xl mb-10 leading-relaxed">
            ProPorch gives plumbers, electricians, and contractors a branded client portal with instant quoting, project tracking, and a built-in referral engine.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <button
              onClick={onEnterDemo}
              className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 px-8 rounded-full hover:shadow-glow transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Try the Demo
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="flex-1 border border-white/20 text-white font-semibold py-4 px-8 rounded-full hover:bg-white/5 transition-all">
              Start Free Trial
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-4">No credit card required · 14-day free trial</p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Demo Preview Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See it in action</h2>
          <p className="text-gray-400 text-lg">Here's what your clients will experience</p>
        </div>

        {/* Mock Phone */}
        <div className="max-w-sm mx-auto">
          <div className="bg-brand-card rounded-[2.5rem] p-3 shadow-2xl border border-white/10">
            <div className="bg-gradient-to-b from-gray-900 to-brand-dark rounded-[2rem] overflow-hidden">
              {/* Status bar */}
              <div className="flex justify-between items-center px-6 pt-3 pb-2 text-xs text-gray-400">
                <span>9:41</span>
                <div className="flex gap-1">
                  <div className="w-4 h-2 bg-gray-400 rounded-sm" />
                  <div className="w-4 h-2 bg-gray-400 rounded-sm" />
                  <div className="w-6 h-2 bg-green-400 rounded-sm" />
                </div>
              </div>
              
              {/* App header mock */}
              <div className="px-5 pt-4 pb-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-md" />
                  <span className="text-sm font-bold text-white">Mike's Plumbing & HVAC</span>
                </div>
                
                <div className="bg-white/10 rounded-2xl p-4 mb-4 backdrop-blur">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full text-[10px] font-bold">IN PROGRESS</div>
                    <div className="px-2 py-0.5 bg-white/10 text-gray-300 rounded-full text-[10px] font-bold">PLUMBING</div>
                  </div>
                  <p className="text-white font-semibold text-sm">742 Evergreen Terrace</p>
                  <p className="text-gray-400 text-xs">Springfield, IL 62704</p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Schedule', value: 'May 15' },
                    { label: 'Weather', value: '72° ☀️' },
                    { label: 'Crew', value: 'Carlos R.' },
                  ].map(item => (
                    <div key={item.label} className="bg-white/5 rounded-xl p-3 text-center">
                      <p className="text-[10px] text-gray-500 mb-1">{item.label}</p>
                      <p className="text-xs font-semibold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom nav mock */}
              <div className="flex justify-around py-3 border-t border-white/10 px-4">
                {['Home', 'Projects', 'Quote', 'Refer', 'Account'].map((tab, i) => (
                  <div key={tab} className={`text-center ${i === 1 ? 'text-amber-400' : 'text-gray-500'}`}>
                    <div className={`w-5 h-5 mx-auto mb-0.5 rounded ${i === 1 ? 'bg-amber-400/20' : 'bg-white/5'}`} />
                    <span className="text-[9px] font-medium">{tab}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-brand-dark to-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything your business needs</h2>
            <p className="text-gray-400 text-lg">Three powerful tools in one platform</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Client Portal",
                description: "Give clients real-time visibility into project status, team info, materials, and documents — all branded to your business.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Instant Quoting",
                description: "Generate professional quotes in seconds. Clients approve and pay deposits right from their phone.",
                color: "from-amber-500 to-orange-500",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Reputation Engine",
                description: "Monitor your Google reviews, send review requests after every job, and boost your rating to outrank competitors.",
                color: "from-purple-500 to-pink-500",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by contractors everywhere</h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-gray-400">4.9/5 from 200+ home service businesses</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { name: "Mike R.", role: "Plumber, Austin TX", text: "ProPorch cut our admin time in half. Clients love being able to check their project status without calling." },
            { name: "Sarah L.", role: "Electrician, Denver CO", text: "The instant quoting feature alone paid for itself in the first week. Customers convert way faster." },
            { name: "Dave K.", role: "HVAC Tech, Chicago IL", text: "Our Google rating went from 3.8 to 4.5 in two months. The review requests and response templates are game-changers." },
          ].map((review, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">"{review.text}"</p>
              <div>
                <p className="font-semibold text-white text-sm">{review.name}</p>
                <p className="text-gray-500 text-xs">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-brand-dark to-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-400 text-lg">Start free. Scale as you grow.</p>
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
                    ? 'bg-gradient-to-b from-amber-500/10 to-orange-500/5 border-amber-500/30 scale-105 shadow-glow'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="text-center mb-4">
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-gray-400">/mo</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={plan.popular ? onEnterDemo : undefined}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-glow active:scale-95'
                      : 'border border-white/20 text-white hover:bg-white/5'
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
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to upgrade your client experience?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Join hundreds of contractors who've transformed their business with ProPorch.
          </p>
          <button
            onClick={onEnterDemo}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 px-10 rounded-full hover:shadow-glow transition-all active:scale-95 inline-flex items-center gap-2 text-lg"
          >
            Try the Demo
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">P</span>
            </div>
            <span className="font-bold">ProPorch</span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 ProPorch, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-gray-500 text-sm hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="text-gray-500 text-sm hover:text-white cursor-pointer transition-colors">Terms</span>
            <span className="text-gray-500 text-sm hover:text-white cursor-pointer transition-colors">Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
