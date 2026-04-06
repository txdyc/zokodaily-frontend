import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Business } from '../data';
import { MapPin, Star, ChevronRight, Plus, Hospital, Shield, Landmark, Utensils, ShoppingCart, Truck, Landmark as Bank, Grid } from 'lucide-react';
import { getPlaces } from '../lib/api';

const CATEGORIES = [
  { name: 'Hospital', icon: Hospital, color: 'text-tertiary' },
  { name: 'Police', icon: Shield, color: 'text-primary' },
  { name: 'Gov', icon: Landmark, color: 'text-secondary' },
  { name: 'Food', icon: Utensils, color: 'text-secondary' },
  { name: 'Market', icon: ShoppingCart, color: 'text-primary' },
  { name: 'Logistics', icon: Truck, color: 'text-tertiary' },
  { name: 'Banking', icon: Bank, color: 'text-primary' },
  { name: 'More', icon: Grid, color: 'text-outline' },
];

export function Life() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');

    getPlaces(controller.signal)
      .then(setBusinesses)
      .catch((fetchError: Error) => {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Failed to load local services.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="pb-24">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* City Selector */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-5 h-5 text-tertiary fill-tertiary" />
            <h2 className="text-on-surface text-sm font-semibold tracking-wide uppercase">Current City</h2>
          </div>
          <div className="flex items-center justify-between bg-surface-container-low p-4 rounded-xl">
            <span className="text-on-surface text-2xl font-bold tracking-tight">Accra</span>
            <button className="text-primary font-semibold flex items-center gap-1 hover:bg-surface-container-high transition-colors p-2 rounded-lg">
              Change
              <ChevronRight className="w-4 h-4 rotate-90" />
            </button>
          </div>
        </section>

        {/* Service Directory Icons */}
        <section className="mb-12">
          <div className="grid grid-cols-4 gap-4 md:grid-cols-8">
            {CATEGORIES.map((cat) => (
              <div key={cat.name} className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-16 h-16 rounded-2xl bg-surface-container-lowest flex items-center justify-center shadow-sm group-hover:scale-95 transition-transform duration-150">
                  <cat.icon className={`w-8 h-8 ${cat.color}`} />
                </div>
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-tighter">{cat.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Nearby Services Header */}
        <section className="mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-on-surface text-2xl font-extrabold tracking-tight">Nearby Services</h2>
            <p className="text-outline text-sm font-medium">Verified local businesses in your radius</p>
          </div>
          <button className="p-2 text-primary hover:bg-surface-container-low rounded-full transition-colors">
            <Grid className="w-6 h-6" />
          </button>
        </section>

        {/* Merchant List */}
        <section className="space-y-8">
          {loading && Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-surface-container-lowest overflow-hidden flex flex-col md:flex-row gap-6 p-4 rounded-3xl shadow-sm animate-pulse">
              <div className="md:w-1/3 h-48 md:h-auto rounded-3xl bg-surface-container-low" />
              <div className="md:w-2/3 flex flex-col justify-between py-2 gap-4">
                <div className="h-8 w-2/3 rounded bg-surface-container-low" />
                <div className="h-16 rounded bg-surface-container-low" />
                <div className="h-8 w-1/2 rounded bg-surface-container-low" />
              </div>
            </div>
          ))}

          {!loading && error && (
            <div className="rounded-3xl bg-red-50 text-red-700 px-6 py-5">
              <h3 className="text-lg font-bold mb-2">Unable to load local services</h3>
              <p className="text-sm leading-6 break-words">{error}</p>
            </div>
          )}

          {!loading && !error && businesses.map((biz) => (
            <Link 
              key={biz.id} 
              to={`/merchant/${biz.id}`} 
              className="bg-surface-container-lowest overflow-hidden flex flex-col md:flex-row gap-6 p-4 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="md:w-1/3 h-48 md:h-auto overflow-hidden asymmetric-crop">
                <img 
                  src={biz.image} 
                  alt={biz.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:w-2/3 flex flex-col justify-between py-2">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-on-surface text-xl font-bold">{biz.name}</h3>
                    <div className="flex items-center gap-1 bg-secondary-container px-2 py-1 rounded-lg">
                      <Star className="w-3.5 h-3.5 text-on-secondary-container fill-on-secondary-container" />
                      <span className="text-[12px] font-bold text-on-secondary-container">{biz.rating}</span>
                    </div>
                  </div>
                  <p className="text-outline text-sm line-clamp-2 leading-relaxed">{biz.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-on-surface-variant text-xs font-semibold">
                      <MapPin className="w-3.5 h-3.5" />
                      {biz.distance}
                    </div>
                    <div className="flex items-center gap-1 text-on-surface-variant text-xs font-semibold">
                      <Star className="w-3.5 h-3.5" />
                      {biz.hours}
                    </div>
                  </div>
                  <button className="heritage-gradient text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md active:scale-95 transition-transform">
                    Details
                  </button>
                </div>
              </div>
            </Link>
          ))}

          {!loading && !error && businesses.length === 0 && (
            <div className="rounded-3xl bg-surface-container-low px-6 py-10 text-center">
              <h3 className="text-xl font-bold mb-2">No places available</h3>
              <p className="text-on-surface-variant">The Flask API returned an empty places list.</p>
            </div>
          )}
        </section>
      </main>

      {/* FAB */}
      <Link 
        to="/add-business" 
        className="fixed bottom-24 right-6 w-16 h-16 heritage-gradient text-white rounded-full shadow-2xl flex items-center justify-center z-40 active:scale-90 transition-transform"
      >
        <Plus className="w-8 h-8" />
      </Link>
    </div>
  );
}
