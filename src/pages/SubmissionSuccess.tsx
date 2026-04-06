import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle, ArrowRight, List } from 'lucide-react';

export function SubmissionSuccess() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface min-h-screen flex flex-col">
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md flex items-center justify-between px-6 h-16">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="hover:bg-surface-container-low transition-colors p-2 rounded-full active:scale-95">
            <X className="w-6 h-6 text-primary" />
          </button>
          <h1 className="text-xl font-bold text-primary tracking-tight">Submission Successful</h1>
        </div>
      </header>

      <main className="flex-grow pt-24 pb-32 px-6 max-w-2xl mx-auto w-full flex flex-col items-center justify-center text-center">
        <div className="relative mb-10">
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-secondary-container rounded-full opacity-20"></div>
          <div className="absolute -bottom-2 -left-6 w-16 h-16 bg-primary-fixed rounded-full opacity-10"></div>
          <div className="w-32 h-32 rounded-full bg-secondary-container flex items-center justify-center shadow-lg relative z-10">
            <CheckCircle className="w-16 h-16 text-on-secondary-container fill-on-secondary-container" />
          </div>
        </div>

        <div className="space-y-4 mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight text-on-surface leading-tight">
            Business Submitted Successfully!
          </h2>
          <p className="text-lg text-on-surface-variant font-medium leading-relaxed max-w-md mx-auto">
            Thank you for contributing to Ghana Life. Our team will review your listing and it should be live within 24 hours.
          </p>
        </div>

        <section className="w-full bg-surface-container-lowest rounded-2xl p-8 mb-12 shadow-sm relative overflow-hidden text-left">
          <div className="absolute top-0 left-0 w-2 h-full heritage-gradient"></div>
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-sm font-bold uppercase tracking-widest text-secondary mb-2 block">Submission Detail</span>
              <h3 className="text-2xl font-bold text-primary">Accra Central Bistro</h3>
              <p className="text-on-surface-variant text-sm">Osu, Greater Accra Region</p>
            </div>
            <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-xl w-fit">
              <CheckCircle className="w-4 h-4 text-tertiary fill-tertiary" />
              <span className="text-sm font-bold text-on-surface">Status: Pending Review</span>
            </div>
          </div>
          
          <div className="mt-8 relative h-48 w-full overflow-hidden rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg">
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80" 
              alt="Listing Preview" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        </section>

        <div className="w-full flex flex-col gap-4">
          <button 
            onClick={() => navigate('/')}
            className="heritage-gradient text-white font-bold text-lg h-16 rounded-xl flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition-all"
          >
            Back to Home
            <ArrowRight className="w-6 h-6" />
          </button>
          <button className="bg-surface-container-low text-primary font-bold text-lg h-16 rounded-xl flex items-center justify-center gap-2 hover:bg-surface-container-high active:scale-95 transition-all">
            <List className="w-6 h-6" />
            View My Listings
          </button>
        </div>
      </main>
    </div>
  );
}
