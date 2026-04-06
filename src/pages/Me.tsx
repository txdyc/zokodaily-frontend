import React from 'react';
import { Bell, Verified, Store, Bookmark, History, Settings, PartyPopper, Copy, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export function Me() {
  return (
    <div className="pb-24">
      <main className="max-w-md mx-auto px-6 pt-8 space-y-10">
        {/* User Profile Section */}
        <section className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="relative">
                <img 
                  alt="User Avatar" 
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-primary-fixed" 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 right-0 bg-secondary-container p-1 rounded-full border-2 border-surface">
                  <Verified className="w-3.5 h-3.5 text-on-secondary-container fill-on-secondary-container" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-on-surface">Akosua Mensah</h2>
                <p className="text-sm font-medium text-secondary">Premium Member</p>
              </div>
            </div>
            
            <button className="relative bg-surface-container-lowest p-3 rounded-2xl shadow-sm hover:bg-surface-container transition-colors group">
              <Bell className="w-6 h-6 text-on-surface group-hover:scale-110 transition-transform" />
              <span className="absolute top-2 right-2 w-4 h-4 bg-tertiary rounded-full border-2 border-surface-container-lowest flex items-center justify-center">
                <span className="text-[10px] text-white font-bold">3</span>
              </span>
            </button>
          </div>
        </section>

        {/* Stats Bento Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="heritage-gradient p-5 rounded-xl text-white">
            <p className="text-xs font-semibold opacity-80 uppercase tracking-widest">Rewards</p>
            <p className="text-2xl font-bold mt-1">2,450</p>
            <p className="text-[10px] mt-2 bg-white/20 inline-block px-2 py-0.5 rounded-full">Cedis Equivalent</p>
          </div>
          <div className="bg-secondary-container p-5 rounded-xl text-on-secondary-container">
            <p className="text-xs font-semibold opacity-80 uppercase tracking-widest">Impact</p>
            <p className="text-2xl font-bold mt-1">Level 4</p>
            <p className="text-[10px] mt-2 bg-on-secondary-container/10 inline-block px-2 py-0.5 rounded-full">Community Star</p>
          </div>
        </div>

        {/* Menu List Section */}
        <nav className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-outline px-1">Personal Dashboard</h3>
          <div className="space-y-2">
            <MenuLink icon={Store} title="My Businesses" subtitle="Manage your listings & insights" />
            <MenuLink icon={Bookmark} title="My Bookmarks" subtitle="12 Saved articles & events" />
            <MenuLink icon={History} title="Browsing History" subtitle="Recently viewed services" />
            <MenuLink icon={Settings} title="Settings" subtitle="Security, notifications & dark mode" />
          </div>
        </nav>

        {/* Referral Card */}
        <div className="bg-surface-container-low p-6 rounded-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="font-bold text-lg mb-1">Invite a Friend</h4>
            <p className="text-sm text-outline mb-4">Share Ghana Life and get 500 GHS in rewards for every sign up.</p>
            <button className="heritage-gradient text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 flex items-center gap-2">
              <Copy className="w-4 h-4" />
              Copy Link
            </button>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <PartyPopper className="w-32 h-32" />
          </div>
        </div>
      </main>
    </div>
  );
}

function MenuLink({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle: string }) {
  return (
    <button className="w-full flex items-center justify-between p-5 bg-surface-container-lowest rounded-xl hover:bg-primary/5 transition-all group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-left">
          <span className="block font-bold text-on-surface">{title}</span>
          <span className="text-xs text-outline">{subtitle}</span>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-outline group-hover:translate-x-1 transition-transform" />
    </button>
  );
}
