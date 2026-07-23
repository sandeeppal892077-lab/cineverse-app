'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Grid3x3, List, LayoutGrid } from 'lucide-react';
import { mockTitles } from '@/data/mockData';
import { FilterState, Title } from '@/types';
import TitleCard from '@/components/TitleCard';
import FilterPanel from '@/components/FilterPanel';
import { cn } from '@/lib/utils';

const INITIAL_FILTERS: FilterState = {
  genre: [], language: [], country: [], year: null,
  minRating: 0, sortBy: 'popularity', type: [], ageRating: [],
  runtime: [0, 300],
};

function BrowseContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || '';
  const initialGenre = searchParams.get('genre') || '';
  const [filters, setFilters] = useState<FilterState>({
    ...INITIAL_FILTERS,
    type: initialType ? [initialType] : [],
    genre: initialGenre ? [initialGenre] : [],
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    let results: Title[] = [...mockTitles];

    if (filters.type.length > 0) results = results.filter(t => filters.type.includes(t.type));
    if (filters.genre.length > 0) results = results.filter(t => t.genres.some(g => filters.genre.includes(g)));
    if (filters.language.length > 0) results = results.filter(t => t.languages.some(l => filters.language.includes(l)));
    if (filters.country.length > 0) results = results.filter(t => filters.country.includes(t.country));
    if (filters.ageRating.length > 0) results = results.filter(t => filters.ageRating.includes(t.ageRating));
    if (filters.year) results = results.filter(t => t.year === filters.year);
    if (filters.minRating > 0) results = results.filter(t => t.imdbRating >= filters.minRating);

    switch (filters.sortBy) {
      case 'rating': results.sort((a, b) => b.imdbRating - a.imdbRating); break;
      case 'newest': results.sort((a, b) => b.year - a.year); break;
      case 'oldest': results.sort((a, b) => a.year - b.year); break;
      case 'title-az': results.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'title-za': results.sort((a, b) => b.name.localeCompare(a.name)); break;
      default: break;
    }

    return results;
  }, [filters]);

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
              {initialType ? initialType.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : initialGenre ? `${initialGenre} Titles` : 'Browse All'}
            </h1>
            <p className="text-sm text-cv-muted mt-1">{filtered.length} titles found</p>
          </div>

          <div className="flex items-center gap-2">
            <FilterPanel filters={filters} onChange={setFilters} />
            <div className="hidden sm:flex items-center bg-cv-card rounded-xl border border-cv-border p-1">
              <button onClick={() => setViewMode('grid')} className={cn('p-1.5 rounded-lg transition-all', viewMode === 'grid' ? 'bg-cv-primary text-white' : 'text-cv-muted hover:text-white')}>
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode('list')} className={cn('p-1.5 rounded-lg transition-all', viewMode === 'list' ? 'bg-cv-primary text-white' : 'text-cv-muted hover:text-white')}>
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 rounded-full bg-cv-card flex items-center justify-center mb-4">
              <Grid3x3 className="w-10 h-10 text-cv-muted" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No titles found</h3>
            <p className="text-sm text-cv-muted">Try adjusting your filters</p>
          </div>
        ) : viewMode === 'grid' ? (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          >
            {filtered.map((title, i) => (
              <TitleCard key={title.id} title={title} index={i} />
            ))}
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filtered.map((title, i) => (
              <motion.div
                key={title.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <a href={`/title/${title.slug}`} className="flex items-center gap-4 p-3 rounded-xl bg-cv-card/50 hover:bg-cv-card border border-cv-border/50 hover:border-cv-border transition-all group">
                  <div className="w-12 rounded-lg overflow-hidden flex-shrink-0 relative" style={{ aspectRatio: '2/3' }}>
                    <img src={title.poster} alt={title.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white group-hover:text-cv-primary transition-colors truncate">{title.name}</h3>
                    <p className="text-xs text-cv-muted mt-0.5">{title.year} &middot; {title.type.replace('-', ' ')}</p>
                    <p className="text-xs text-cv-text-dim mt-1 line-clamp-2">{title.synopsis}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className={cn('text-lg font-bold', title.imdbRating >= 8 ? 'text-green-400' : title.imdbRating >= 6 ? 'text-yellow-400' : 'text-orange-400')}>
                      {title.imdbRating}
                    </div>
                    <div className="text-[10px] text-cv-muted">IMDb</div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cv-border border-t-cv-primary rounded-full animate-spin" />
      </div>
    }>
      <BrowseContent />
    </Suspense>
  );
}
