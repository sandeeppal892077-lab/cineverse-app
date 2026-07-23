'use client';

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { mockTitles } from '@/data/mockData';
import TitleCard from '@/components/TitleCard';

export default function FavoritesPage() {
  const { user } = useAuth();
  if (!user) return <div className="min-h-screen flex items-center justify-center pt-24"><p className="text-cv-muted">Please sign in</p></div>;

  const titles = user.favorites.map(id => mockTitles.find(t => t.id === id)).filter(Boolean);

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="flex items-center gap-3 text-2xl font-display font-bold text-white mb-6">
          <Heart className="w-6 h-6 text-red-400 fill-red-400" /> Favorites
        </h1>
        {titles.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-12 h-12 text-cv-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No favorites yet</h3>
            <p className="text-sm text-cv-muted mb-4">Heart titles you love to see them here</p>
            <Link href="/browse" className="btn-primary">Browse Titles</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {titles.map((t, i) => t && <TitleCard key={t.id} title={t} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
