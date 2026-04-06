import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Business } from '../data';
import { ArrowLeft, Share2, Star, MapPin, Clock, Globe, BookOpen, Navigation, Bookmark, Send, Utensils } from 'lucide-react';
import { getPlaceDetail } from '../lib/api';

export function MerchantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [biz, setBiz] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError('Missing place id.');
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError('');

    getPlaceDetail(id, controller.signal)
      .then(setBiz)
      .catch((fetchError: Error) => {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Failed to load place details.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-surface text-on-surface pb-24">
        <main className="max-w-2xl mx-auto pt-20 px-6">
          <div className="animate-pulse space-y-6">
            <div className="h-72 rounded-3xl bg-surface-container-low" />
            <div className="h-12 rounded bg-surface-container-low" />
            <div className="h-24 rounded bg-surface-container-low" />
            <div className="h-48 rounded-2xl bg-surface-container-low" />
          </div>
        </main>
      </div>
    );
  }

  if (error || !biz) {
    return (
      <div className="bg-surface text-on-surface pb-24">
        <main className="max-w-2xl mx-auto pt-20 px-6">
          <div className="rounded-3xl bg-red-50 text-red-700 px-6 py-5">
            <h2 className="text-xl font-bold mb-2">Business not found</h2>
            <p className="text-sm leading-6 break-words">{error || 'The requested business does not exist.'}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface pb-24">
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center px-4 h-16 w-full max-w-2xl mx-auto">
          <button onClick={() => navigate(-1)} className="text-primary hover:bg-surface-container-low transition-colors active:scale-95 p-2 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-bold tracking-tight text-lg">{biz.name}</h1>
          <button className="text-primary hover:bg-surface-container-low transition-colors active:scale-95 p-2 rounded-full">
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto pt-16">
        <section className="relative h-72 w-full overflow-hidden">
          <img 
            src={biz.image} 
            alt={biz.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <h2 className="text-white text-3xl font-extrabold tracking-tight">{biz.name}</h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-lg text-sm font-bold">
                <Star className="w-4 h-4 mr-1 fill-on-secondary-container" />
                {biz.rating}
              </div>
              <span className="text-white/90 text-sm font-medium">{biz.reviews}+ reviews • {biz.priceRange}</span>
            </div>
          </div>
        </section>

        <nav className="flex border-b border-outline-variant/15 bg-surface sticky top-16 z-40">
          <button className="flex-1 py-4 text-sm font-bold text-primary border-b-2 border-primary">Overview</button>
          <button className="flex-1 py-4 text-sm font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors">Menu</button>
          <button className="flex-1 py-4 text-sm font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors">Reviews</button>
          <button className="flex-1 py-4 text-sm font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors">About</button>
        </nav>

        <section className="p-6 grid grid-cols-5 gap-4 bg-surface-container-lowest">
          <ActionItem icon={Navigation} label="Routes" />
          <ActionItem icon={Bookmark} label="Save" />
          <ActionItem icon={MapPin} label="Nearby" />
          <ActionItem icon={Send} label="Send" />
          <ActionItem icon={Share2} label="Share" />
        </section>

        <section className="px-6 py-4 space-y-4">
          <InfoRow icon={MapPin} text={biz.address} />
          <InfoRow icon={Clock} text={biz.hours} />
          {biz.website && <InfoRow icon={Globe} text={biz.website} isLink />}
          {biz.menuLink && <InfoRow icon={BookOpen} text={biz.menuLink} isLink />}
        </section>

        <section className="px-6 py-4">
          <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-sm">
            <img 
              src={biz.gallery[1] || biz.gallery[0] || biz.image}
              alt={biz.name}
              className="w-full h-full object-cover opacity-60 grayscale"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-white text-on-surface px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-bold active:scale-95 transition-transform">
                <MapPin className="w-4 h-4 text-primary fill-primary" />
                Pin on Map
              </button>
            </div>
          </div>
        </section>

        {biz.featuredDishes.length > 0 && (
          <section className="py-8">
            <div className="px-6 flex justify-between items-center mb-6">
              <h3 className="text-xl font-extrabold tracking-tight">Featured Dishes</h3>
              <button className="text-tertiary font-bold text-sm">View Full Menu</button>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar px-6">
              {biz.featuredDishes.map((dish, i) => (
                <div key={i} className="min-w-[200px] flex flex-col gap-3 group">
                  <div className="h-48 w-full rounded-2xl overflow-hidden">
                    <img 
                      src={dish.image} 
                      alt={dish.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{dish.name}</h4>
                    <p className="text-xs text-on-surface-variant font-medium mt-1">{dish.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <button className="fixed bottom-28 right-6 heritage-gradient text-white flex items-center gap-2 px-6 py-4 rounded-full shadow-2xl z-40 active:scale-95 transition-transform">
        <Utensils className="w-5 h-5" />
        <span className="text-sm font-extrabold uppercase tracking-widest">Reserve a Table</span>
      </button>
    </div>
  );
}

function ActionItem({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center text-primary hover:bg-primary/10 active:scale-95 transition-all">
        <Icon className="w-5 h-5" />
      </button>
      <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">{label}</span>
    </div>
  );
}

function InfoRow({ icon: Icon, text, isLink }: { icon: any, text: React.ReactNode, isLink?: boolean }) {
  return (
    <div className="flex items-start gap-4">
      <Icon className="w-5 h-5 text-primary shrink-0" />
      <div className="flex-1">
        <p className={`text-sm font-medium break-words ${isLink ? 'text-tertiary' : ''}`}>{text}</p>
      </div>
    </div>
  );
}
