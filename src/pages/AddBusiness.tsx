import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Camera, Send } from 'lucide-react';
import { cn } from '../lib/utils';

const CATEGORIES = ['Restaurant', 'Hospital', 'Supermarket', 'Logistics', 'Banking', 'Pharmacy'];

export function AddBusiness() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Restaurant');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/submission-success');
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-32">
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="flex items-center px-4 h-16 w-full max-w-2xl mx-auto">
          <button onClick={() => navigate(-1)} className="text-primary active:scale-95 duration-200 p-2 hover:bg-primary/5 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-bold tracking-tight text-lg ml-2">Add Your Business</h1>
        </div>
      </header>

      <main className="pt-20 px-4 max-w-2xl mx-auto">
        <section className="mb-8">
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tight mb-2">Register your space</h2>
          <p className="text-on-surface-variant leading-relaxed">Join the directory and connect with the community. Fill in the details below to list your business on the Life map.</p>
        </section>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-on-surface-variant ml-1">Business Name</label>
            <input 
              className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary rounded-xl p-4 outline outline-1 outline-outline-variant/15" 
              placeholder="e.g. Accra Central Bistro" 
              type="text" 
              required
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-on-surface-variant ml-1">Business Category</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full font-semibold text-sm transition-all",
                    selectedCategory === cat 
                      ? "bg-primary-fixed text-primary" 
                      : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-on-surface-variant ml-1">Business Location/Address</label>
            <div className="relative rounded-2xl overflow-hidden shadow-sm outline outline-1 outline-outline-variant/15">
              <div className="h-48 w-full bg-surface-container-high flex items-center justify-center relative">
                <img 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale" 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80" 
                  alt="Map"
                  referrerPolicy="no-referrer"
                />
                <button className="relative z-10 bg-white px-6 py-2.5 rounded-full shadow-lg flex items-center gap-2 hover:bg-surface-container-lowest active:scale-95 transition-all text-primary font-bold" type="button">
                  <MapPin className="w-5 h-5 fill-primary" />
                  Pin on Map
                </button>
              </div>
              <textarea 
                className="w-full bg-white border-none focus:ring-0 rounded-b-2xl p-4 min-h-[80px] resize-none text-on-surface transition-all outline-none" 
                placeholder="Street name, landmark, and neighborhood..."
              ></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-on-surface-variant ml-1">Contact Number</label>
              <div className="flex gap-2">
                <div className="flex items-center bg-surface-container-low px-3 rounded-xl outline outline-1 outline-outline-variant/15 text-on-surface-variant text-sm font-bold">+233</div>
                <input className="flex-1 bg-surface-container-low border-none focus:ring-2 focus:ring-primary rounded-xl p-4 outline outline-1 outline-outline-variant/15" placeholder="24 123 4567" type="tel" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-on-surface-variant ml-1">Operating Hours</label>
              <div className="flex items-center bg-surface-container-low px-4 py-4 rounded-xl outline outline-1 outline-outline-variant/15 cursor-pointer hover:bg-surface-container-high transition-all">
                <Clock className="w-5 h-5 text-primary mr-2" />
                <span className="text-on-surface text-sm font-medium">9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-on-surface-variant ml-1">Business Description</label>
            <textarea className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary rounded-xl p-4 min-h-[120px] outline outline-1 outline-outline-variant/15 outline-none" placeholder="Tell us about your services, heritage, and what makes you unique..."></textarea>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-on-surface-variant ml-1">Business Photos</label>
            <div className="border-2 border-dashed border-outline-variant/40 bg-surface-container-low rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container-high transition-all group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <p className="text-on-surface font-bold">Upload Photos</p>
              <p className="text-on-surface-variant text-xs mt-1">PNG, JPG up to 10MB each</p>
            </div>
          </div>

          <button className="w-full heritage-gradient text-white font-extrabold text-lg py-5 rounded-2xl shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-12" type="submit">
            Submit Business Listing
            <Send className="w-6 h-6" />
          </button>
        </form>

        <p className="text-center text-xs text-on-surface-variant mt-8 mb-16 px-8 leading-relaxed">
          By submitting, you agree to our <span className="text-primary font-semibold underline underline-offset-4">Terms of Service</span> and acknowledge that listings are subject to verification.
        </p>
      </main>
    </div>
  );
}
