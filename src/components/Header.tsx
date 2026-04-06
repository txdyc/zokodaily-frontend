import React, { useState } from 'react';
import { Search, Globe, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <header className="sticky top-0 w-full z-40 glass-header border-b border-outline-variant/30">
        <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 heritage-gradient rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-black text-sm">GL</span>
            </div>
            <h1 className="text-xl font-black tracking-tighter text-on-surface uppercase italic">
              Ghana <span className="text-primary not-italic">Life</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLanguage(language === 'EN' ? 'TW' : 'EN')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-low border border-outline-variant/50 hover:bg-surface-container transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-black tracking-widest text-on-surface">{language}</span>
            </button>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-surface-container transition-colors"
            >
              <Search className="w-5 h-5 text-on-surface" />
            </button>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-surface/95 backdrop-blur-xl p-6"
          >
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black tracking-tight">Search Ghana Life</h2>
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
                <input 
                  autoFocus
                  type="text"
                  placeholder="Search articles, businesses, events..."
                  className="w-full bg-surface-container-low border-2 border-outline-variant/30 rounded-2xl py-4 pl-12 pr-4 focus:border-primary focus:outline-none transition-colors font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-outline mb-4">Trending Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Independence Square', 'Best Jollof Accra', 'Chale Wote 2024', 'Cape Coast Tours', 'Tech Hubs'].map((tag) => (
                      <button 
                        key={tag}
                        className="px-4 py-2 rounded-full bg-surface-container-low border border-outline-variant/30 text-sm font-semibold hover:bg-primary/10 hover:border-primary/30 transition-all"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-outline mb-4">Recent Categories</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['Fine Dining', 'Art Galleries', 'Nightlife', 'Real Estate'].map((cat) => (
                      <div key={cat} className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between group cursor-pointer hover:bg-surface-container transition-colors">
                        <span className="font-bold">{cat}</span>
                        <Search className="w-4 h-4 text-outline group-hover:text-primary transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
