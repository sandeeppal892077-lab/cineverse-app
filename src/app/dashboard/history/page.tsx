'use client';

import React from 'react';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { mockTitles } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function HistoryPage() {
  const { user } = useAuth();
  if (!user) return <div className="min-h-screen flex items-center justify-center pt-24"><p className="text-cv-muted">Please sign in</p></div>;

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="flex items-center gap-3 text-2xl font-display font-bold text-white mb-6">
          <Clock className="w-6 h-6 text-cv-teal" /> Watch History
        </h1>
        {user.history.length === 0 ? (
          <div className="text-center py-20">
            <Clock className="w-12 h-12 text-cv-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No history yet</h3>
            <p className="text-sm text-cv-muted mb-4">Start watching to build your history</p>
            <Link href="/browse" className="btn-primary">Browse Titles</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {user.history.map(h => {
              const t = mockTitles.find(t => t.id === h.titleId);
              if (!t) return null;
              return (
                <Link key={h.titleId} href={`/title/${t.slug}`} className="flex items-center gap-4 p-4 rounded-xl bg-cv-card/50 hover:bg-cv-card border border-cv-border/50 transition-all group">
                  <div className="w-20 h-12 rounded-lg overflow-hidden flex-shrink-0 relative bg-cv-card">
                    <img src={t.poster} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white group-hover:text-cv-primary truncate transition-colors">{t.name}</p>
                    <p className="text-xs text-cv-muted mt-0.5">
                      {new Date(h.timestamp).toLocaleDateString()} &middot; {t.type.replace(/-/g, ' ')}
                    </p>
                    <div className="w-full bg-cv-border rounded-full h-1.5 mt-2">
                      <div className="bg-cv-primary h-1.5 rounded-full" style={{ width: `${h.progress || 0}%` }} />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-cv-muted">{h.progress || 0}%</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
