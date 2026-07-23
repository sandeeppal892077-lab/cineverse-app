'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Search, Bell, Menu, X, ChevronDown,
  Film, Sparkles, Bookmark, Star, LogOut, LayoutDashboard,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useMediaQuery } from '@/hooks';
import { CATEGORIES } from '@/data/mockData';

const ICON_MAP: Record<string, React.ElementType> = {
  Film, Tv: Film, Monitor: Film, Sparkles, Palette: Film, Clapperboard: Film,
  BookOpen: Film, BookMarked: Film, Bookmark, Library: Film, Camera: Film,
  Scissors: Film, Baby: Film, Video: Film, Users: Film,
};

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCatOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-transform duration-300 transition-colors',
          scrolled
            ? 'bg-cv-bg/90 backdrop-blur-xl border-b border-cv-border/50 shadow-lg shadow-black/20'
            : 'bg-gradient-to-b from-black/80 to-transparent',
          mounted && scrolled ? '-translate-y-0' : 'translate-y-0',
        )}
      >
        <nav className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-cv-primary flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cv-primary/50 transition-shadow">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-white tracking-tight">
                Cine<span className="text-cv-primary">Verse</span>
              </span>
            </Link>

            {!isMobile && (
              <div className="flex items-center gap-1" ref={catRef}>
                <Link href="/browse" className="px-3 py-1.5 text-sm text-cv-text-dim hover:text-white transition-colors">
                  Browse
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setCatOpen(!catOpen)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-cv-text-dim hover:text-white transition-colors"
                  >
                    Categories <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', catOpen && 'rotate-180')} />
                  </button>
                  <div
                    className={cn(
                      'absolute top-full left-0 mt-2 w-[520px] bg-cv-surface/95 backdrop-blur-xl border border-cv-border rounded-xl p-4 shadow-2xl transition-all duration-200',
                      catOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
                    )}
                  >
                    <div className="grid grid-cols-3 gap-1">
                      {CATEGORIES.map(cat => {
                        const Icon = ICON_MAP[cat.icon] || Film;
                        return (
                          <Link
                            key={cat.id}
                            href={`/browse?type=${cat.id}`}
                            onClick={() => setCatOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-cv-text-dim hover:text-white hover:bg-white/5 transition-all"
                          >
                            <Icon className="w-4 h-4" />
                            {cat.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <Link href="/browse?category=anime" className="px-3 py-1.5 text-sm text-cv-text-dim hover:text-white transition-colors">
                  Anime
                </Link>
                <Link href="/browse?category=comics" className="px-3 py-1.5 text-sm text-cv-text-dim hover:text-white transition-colors">
                  Comics
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/search"
              className="p-2 rounded-lg text-cv-text-dim hover:text-white hover:bg-white/5 transition-all"
            >
              <Search className="w-5 h-5" />
            </Link>

            {isAuthenticated && (
              <button className="p-2 rounded-lg text-cv-text-dim hover:text-white hover:bg-white/5 transition-all relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-cv-primary rounded-full" />
              </button>
            )}

            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/5 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cv-primary to-cv-purple flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                </button>
                <div
                  className={cn(
                    'absolute top-full right-0 mt-2 w-56 bg-cv-surface/95 backdrop-blur-xl border border-cv-border rounded-xl p-2 shadow-2xl transition-all duration-200',
                    profileOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
                  )}
                >
                  <div className="px-3 py-2 border-b border-cv-border mb-1">
                    <p className="text-sm font-medium text-white">{user?.name}</p>
                    <p className="text-xs text-cv-muted">{user?.email}</p>
                  </div>
                  <Link href="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-cv-text-dim hover:text-white hover:bg-white/5 transition-all">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <Link href="/dashboard/watchlist" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-cv-text-dim hover:text-white hover:bg-white/5 transition-all">
                    <Bookmark className="w-4 h-4" /> Watchlist
                  </Link>
                  <Link href="/dashboard/favorites" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-cv-text-dim hover:text-white hover:bg-white/5 transition-all">
                    <Star className="w-4 h-4" /> Favorites
                  </Link>
                  <Link href="/dashboard/ratings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-cv-text-dim hover:text-white hover:bg-white/5 transition-all">
                    <Star className="w-4 h-4 text-cv-gold" /> My Ratings
                  </Link>
                  {user?.isAdmin && (
                    <Link href="/admin" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-cv-text-dim hover:text-white hover:bg-white/5 transition-all">
                      <LayoutDashboard className="w-4 h-4 text-cv-teal" /> Admin
                    </Link>
                  )}
                  <hr className="border-cv-border my-1" />
                  <button onClick={() => { logout(); setProfileOpen(false); }} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-all w-full">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="px-4 py-2 bg-cv-primary hover:bg-cv-primary-hover text-white text-sm font-medium rounded-lg transition-colors"
              >
                Sign In
              </Link>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-cv-text-dim hover:text-white hover:bg-white/5 transition-all"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      <div
        className={cn(
          'fixed inset-0 z-50 md:hidden transition-all duration-300',
          mobileOpen ? 'visible' : 'invisible'
        )}
      >
        <div
          className={cn(
            'absolute inset-0 bg-black/60 transition-opacity duration-300',
            mobileOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            'relative w-72 h-full bg-cv-surface border-r border-cv-border p-6 overflow-y-auto transition-transform duration-300',
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
              <div className="w-8 h-8 rounded-lg bg-cv-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-lg font-bold text-white">Cine<span className="text-cv-primary">Verse</span></span>
            </Link>
            <button onClick={() => setMobileOpen(false)} className="p-1 text-cv-muted">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-1">
            <Link href="/" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-cv-text-dim hover:text-white hover:bg-white/5 transition-all">
              Home
            </Link>
            <Link href="/browse" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-cv-text-dim hover:text-white hover:bg-white/5 transition-all">
              Browse
            </Link>
            {CATEGORIES.slice(0, 8).map(cat => (
              <Link key={cat.id} href={`/browse?type=${cat.id}`} onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-cv-muted hover:text-white hover:bg-white/5 transition-all pl-6">
                {cat.label}
              </Link>
            ))}
            <Link href="/browse?category=anime" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-cv-text-dim hover:text-white hover:bg-white/5 transition-all">
              Anime
            </Link>
            <Link href="/browse?category=comics" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-cv-text-dim hover:text-white hover:bg-white/5 transition-all">
              Comics
            </Link>
            <Link href="/search" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-cv-text-dim hover:text-white hover:bg-white/5 transition-all">
              Search
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
