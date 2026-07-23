'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X, Mic, Clock, TrendingUp, Film, Tv, Sparkles } from 'lucide-react';
import { searchTitles, mockTitles } from '@/data/mockData';
import { Title } from '@/types';
import { cn } from '@/lib/utils';
import TitleCard from '@/components/TitleCard';
import { useDebounce } from '@/hooks';

const TRENDING_SEARCHES = ['Dune', 'Spider-Man', 'Demon Slayer', 'Breaking Bad', 'One Piece', 'Nolan'];
const TYPE_ICONS: Record<string, React.ElementType> = { movie: Film, 'web-series': Tv, anime: Sparkles };

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Title[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      setResults(searchTitles(debouncedQuery));
      setShowSuggestions(false);
    } else {
      setResults([]);
      setShowSuggestions(true);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = (q: string) => {
    setQuery(q);
    if (q && !recentSearches.includes(q)) {
      setRecentSearches(prev => [q, ...prev].slice(0, 10));
    }
  };

  const clearRecent = () => setRecentSearches([]);

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cv-muted" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search movies, series, anime, actors, directors..."
              className="w-full pl-12 pr-20 py-4 bg-cv-card border border-cv-border rounded-2xl text-white placeholder-cv-muted focus:outline-none focus:ring-2 focus:ring-cv-primary/50 focus:border-cv-primary transition-all text-lg"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {query && (
                <button onClick={() => setQuery('')} className="p-2 text-cv-muted hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
              <button className="p-2 text-cv-muted hover:text-white transition-colors">
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto space-y-8"
            >
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="flex items-center gap-2 text-sm font-medium text-white">
                      <Clock className="w-4 h-4" /> Recent Searches
                    </h3>
                    <button onClick={clearRecent} className="text-xs text-cv-primary hover:text-cv-primary-hover">Clear All</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map(s => (
                      <button key={s} onClick={() => handleSearch(s)} className="px-4 py-2 bg-cv-card hover:bg-cv-border text-sm text-cv-text-dim hover:text-white rounded-full transition-all">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="flex items-center gap-2 text-sm font-medium text-white mb-3">
                  <TrendingUp className="w-4 h-4 text-cv-primary" /> Trending Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_SEARCHES.map(s => (
                    <button key={s} onClick={() => handleSearch(s)} className="px-4 py-2 bg-cv-card hover:bg-cv-border text-sm text-cv-text-dim hover:text-white rounded-full transition-all">
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-white mb-3">Popular on CineVerse</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {mockTitles.slice(0, 10).map((t, i) => (
                    <TitleCard key={t.id} title={t} index={i} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        {!showSuggestions && (
          <div>
            {results.length > 0 ? (
              <>
                <p className="text-sm text-cv-muted mb-4">{results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {results.map((t, i) => (
                    <TitleCard key={t.id} title={t} index={i} />
                  ))}
                </div>
              </>
            ) : query.length > 0 ? (
              <div className="text-center py-20">
                <SearchIcon className="w-12 h-12 text-cv-muted mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No results found</h3>
                <p className="text-sm text-cv-muted">Try a different search term or check for typos</p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
