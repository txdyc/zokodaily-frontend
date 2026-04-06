import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, User } from 'lucide-react';
import { cn } from '../lib/utils';

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 w-full px-4 pb-6 pt-2 flex justify-around items-center bg-white/80 backdrop-blur-xl z-50">
      <div className="fixed bottom-4 left-4 right-4 rounded-3xl bg-white/90 backdrop-blur-xl flex justify-around items-center py-2 px-2 shadow-2xl shadow-black/5">
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center rounded-2xl px-5 py-2 transition-all active:scale-90",
              isActive ? "bg-primary/10 text-primary" : "text-outline hover:text-primary"
            )
          }
        >
          <Home className="w-6 h-6" />
          <span className="text-[11px] font-semibold tracking-wide uppercase mt-1">Home</span>
        </NavLink>

        <NavLink
          to="/life"
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center rounded-2xl px-5 py-2 transition-all active:scale-90",
              isActive ? "bg-primary/10 text-primary" : "text-outline hover:text-primary"
            )
          }
        >
          <Compass className="w-6 h-6" />
          <span className="text-[11px] font-semibold tracking-wide uppercase mt-1">Life</span>
        </NavLink>

        <NavLink
          to="/me"
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center rounded-2xl px-5 py-2 transition-all active:scale-90",
              isActive ? "bg-primary/10 text-primary" : "text-outline hover:text-primary"
            )
          }
        >
          <User className="w-6 h-6" />
          <span className="text-[11px] font-semibold tracking-wide uppercase mt-1">Me</span>
        </NavLink>
      </div>
    </nav>
  );
}
