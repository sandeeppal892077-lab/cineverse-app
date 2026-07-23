'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bookmark, Heart, Clock, Star, Settings, LogOut, ChevronRight, TrendingUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { mockTitles } from '@/data/mockData';

const MENU_ITEMS = [
  { icon: Bookmark, label: 'Watchlist', href: '/dashboard/watchlist', color: 'text-cv-blue' },
  { icon: Heart, label: 'Favorites', href: '/dashboard/favorites', color: 'text-red-400' },
  { icon: Clock, label: 'History', href: '/dashboard/history', color: 'text-cv-teal' },
  { icon: Star, label: 'My Ratings', href: '/dashboard/ratings', color: 'text-cv-gold' },
];

export default function DashboardPage() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold text-white mb-2">Sign In Required</h1>
          <p className="text-cv-muted mb-4">Please sign in to access your dashboard</p>
          <Link href="/auth/login" className="btn-primary">Sign In</Link>
        </div>
      </div>
    );
  }

  const watchlistTitles = user.watchlist.map(id => mockTitles.find(t => t.id === id)).filter(Boolean);
  const favTitles = user.favorites.map(id => mockTitles.find(t => t.id === id)).filter(Boolean);
  const ratedCount = Object.keys(user.ratings).length;
  const historyCount = user.history.length;

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cv-primary to-cv-purple flex items-center justify-center text-4xl font-bold text-white shadow-lg shadow-cv-primary/20">
              {user.name.charAt(0)}
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl font-display font-bold text-white">{user.name}</h1>
              <p className="text-sm text-cv-muted">{user.email}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-3">
                <span className="text-sm text-cv-text-dim"><strong className="text-white">{user.watchlist.length}</strong> Watchlist</span>
                <span className="text-sm text-cv-text-dim"><strong className="text-white">{user.favorites.length}</strong> Favorites</span>
                <span className="text-sm text-cv-text-dim"><strong className="text-white">{ratedCount}</strong> Rated</span>
                <span className="text-sm text-cv-text-dim"><strong className="text-white">{historyCount}</strong> Watched</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {MENU_ITEMS.map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link href={item.href} className="glass-card p-6 flex flex-col items-center gap-3 hover:bg-cv-card/80 hover:border-cv-primary/30 transition-all group">
                <item.icon className={cn('w-8 h-8', item.color)} />
                <span className="font-medium text-white">{item.label}</span>
                <ChevronRight className="w-4 h-4 text-cv-muted group-hover:text-cv-primary transition-colors" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Continue Watching */}
        {user.history.length > 0 && (
          <div className="mb-12">
            <h2 className="flex items-center gap-2 text-xl font-display font-bold text-white mb-4">
              <Clock className="w-5 h-5 text-cv-teal" /> Continue Watching
            </h2>
            <div className="space-y-3">
              {user.history.slice(0, 5).map(h => {
                const t = mockTitles.find(t => t.id === h.titleId);
                if (!t) return null;
                return (
                  <Link key={h.titleId} href={`/title/${t.slug}`} className="flex items-center gap-4 p-3 rounded-xl bg-cv-card/50 hover:bg-cv-card border border-cv-border/50 transition-all group">
                    <div className="w-16 h-10 rounded-lg overflow-hidden flex-shrink-0 relative bg-cv-card">
                      <img src={t.poster} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white group-hover:text-cv-primary truncate transition-colors">{t.name}</p>
                      <div className="w-full bg-cv-border rounded-full h-1.5 mt-1.5">
                        <div className="bg-cv-primary h-1.5 rounded-full transition-all" style={{ width: `${h.progress || 0}%` }} />
                      </div>
                    </div>
                    <span className="text-xs text-cv-muted flex-shrink-0">{h.progress || 0}%</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Watchlist', value: user.watchlist.length, icon: Bookmark, color: 'bg-cv-blue/10 text-cv-blue' },
            { label: 'Total Favorites', value: user.favorites.length, icon: Heart, color: 'bg-red-500/10 text-red-400' },
            { label: 'Movies Rated', value: ratedCount, icon: Star, color: 'bg-cv-gold/10 text-cv-gold' },
            { label: 'Hours Watched', value: Math.round(historyCount * 1.5), icon: TrendingUp, color: 'bg-cv-teal/10 text-cv-teal' },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }} className="glass-card p-4">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-2', stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-cv-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
