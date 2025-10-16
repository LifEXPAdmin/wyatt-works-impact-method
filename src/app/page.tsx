'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.4),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.4),transparent_50%)]"></div>
      
      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          
          {/* Logo/Icon */}
          <div className="mb-8">
            <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
              ⚡
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            From Idea to Impact
          </h1>
          
          {/* Subtitle */}
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-300">
            The Wyatt Works Method
          </h2>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your ideas into powerful impact with our proven methodology. 
            An interactive checklist and guideline system designed to implement 
            everything we teach into your personal life and business.
          </p>

          {/* Status Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 mb-12">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-green-400 font-semibold">Coming Soon</span>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: '📋', title: 'Interactive Checklists', desc: 'Step-by-step guidance' },
              { icon: '🎯', title: 'Proven Methodology', desc: 'Battle-tested strategies' },
              { icon: '🚀', title: 'Implementation Tools', desc: 'Turn ideas into action' }
            ].map((feature, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Get Early Access
            </button>
            <p className="text-sm text-gray-500">
              Be the first to experience the Wyatt Works Method
            </p>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-gray-500 text-sm">
              Powered by <span className="text-purple-400 font-semibold">Wyatt Works</span> • 
              <a href="https://wyatt-works.com" className="text-purple-400 hover:text-purple-300 ml-1">Main Site</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}