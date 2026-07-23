'use client';

import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { mockTitles } from '@/data/mockData';
import StarRating from '@/components/StarRating';

export default function RatingsPage() {
  const { user, rateTitle } = useAuth();
  if (!user) return <div className="min-h-screen flex items-center justify-center pt-24"><p className="text-cv-muted">Please sign in</p></div>;

  const ratedTitles = Object.entries(user.ratings).map(([id, rating]) => ({
    title: mockTitles.find(t => t.id === id),
    rating,
  })).filter(r => r.title);

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="flex items-center gap-3 text-2xl font-display font-bold text-white mb-6">
          <Star className="w-6 h-6 text-cv-gold fill-cv-gold" /> My Ratings
        </h1>
        {ratedTitles.length === 0 ? (
          <div className="text-center py-20">
            <Star className="w-12 h-12 text-cv-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No ratings yet</h3>
            <p className="text-sm text-cv-muted mb-4">Rate titles to see them here</p>
            <Link href="/browse" className="btn-primary">Browse Titles</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {ratedTitles.map(({ title, rating }) => title && (
              <Link key={title.id} href={`/title/${title.slug}`} className="flex items-center gap-4 p-4 rounded-xl bg-cv-card/50 hover:bg-cv-card border border-cv-border/50 transition-all group">
                <div className="w-16 h-24 rounded-lg overflow-hidden flex-shrink-0 relative bg-cv-card">
                  <img src={title.poster} alt={title.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white group-hover:text-cv-primary truncate transition-colors">{title.name}</p>
                  <p className="text-xs text-cv-muted mt-0.5">{title.year} &middot; {title.type.replace(/-/g, ' ')}</p>
                  <div className="mt-2">
                    <StarRating rating={rating} interactive onRate={(r) => rateTitle(title.id, r)} size="sm" />
                  </div>
                </div>
                <span className="text-2xl font-bold text-cv-gold">{rating}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
