'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown, RotateCcw } from 'lucide-react';
import { GENRES, COUNTRIES, LANGUAGES } from '@/data/mockData';
import { FilterState } from '@/types';
import { cn } from '@/lib/utils';

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const SORT_OPTIONS = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'rating', label: 'IMDb Rating' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'title-az', label: 'Title A-Z' },
  { value: 'title-za', label: 'Title Z-A' },
];

const AGE_RATINGS = ['G', 'PG', 'PG-13', 'R', 'TV-Y', 'TV-G', 'TV-PG', 'TV-14', 'TV-MA'];

export default function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const [open, setOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggle = (key: keyof FilterState, value: string) => {
    if (key === 'genre' || key === 'language' || key === 'country' || key === 'type' || key === 'ageRating') {
      const arr = filters[key] as string[];
      const updated = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
      onChange({ ...filters, [key]: updated });
    }
  };

  const reset = () => {
    onChange({
      genre: [], language: [], country: [], year: null,
      minRating: 0, sortBy: 'popularity', type: [], ageRating: [],
      runtime: [0, 300],
    });
  };

  const activeCount = filters.genre.length + filters.language.length + filters.country.length + filters.type.length + filters.ageRating.length + (filters.year ? 1 : 0) + (filters.minRating > 0 ? 1 : 0);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 bg-cv-card hover:bg-cv-border rounded-xl text-sm text-white transition-all"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
        {activeCount > 0 && (
          <span className="w-5 h-5 bg-cv-primary rounded-full text-[10px] font-bold flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-cv-surface border-l border-cv-border overflow-y-auto"
            >
              <div className="sticky top-0 bg-cv-surface/95 backdrop-blur-xl border-b border-cv-border p-4 flex items-center justify-between z-10">
                <h2 className="text-lg font-display font-bold text-white">Filters</h2>
                <div className="flex items-center gap-2">
                  {activeCount > 0 && (
                    <button onClick={reset} className="flex items-center gap-1 text-sm text-cv-primary hover:text-cv-primary-hover">
                      <RotateCcw className="w-3.5 h-3.5" /> Reset
                    </button>
                  )}
                  <button onClick={() => setOpen(false)} className="p-1 text-cv-muted hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={e => onChange({ ...filters, sortBy: e.target.value })}
                    className="w-full px-3 py-2.5 bg-cv-card border border-cv-border rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-cv-primary/50"
                  >
                    {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-white mb-2 block">Minimum Rating: {filters.minRating > 0 ? filters.minRating : 'Any'}</label>
                  <input
                    type="range" min={0} max={10} step={0.5}
                    value={filters.minRating}
                    onChange={e => onChange({ ...filters, minRating: parseFloat(e.target.value) })}
                    className="w-full accent-cv-primary"
                  />
                </div>

                {[
                  { key: 'genre', label: 'Genres', items: GENRES },
                  { key: 'language', label: 'Languages', items: LANGUAGES },
                  { key: 'country', label: 'Countries', items: COUNTRIES.map(c => c.label) },
                  { key: 'ageRating', label: 'Age Rating', items: AGE_RATINGS },
                ].map(({ key, label, items }) => (
                  <div key={key}>
                    <button
                      onClick={() => setExpandedSection(expandedSection === key ? null : key)}
                      className="flex items-center justify-between w-full py-2"
                    >
                      <span className="text-sm font-medium text-white">{label}</span>
                      <ChevronDown className={cn('w-4 h-4 text-cv-muted transition-transform', expandedSection === key && 'rotate-180')} />
                    </button>
                    <AnimatePresence>
                      {expandedSection === key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-wrap gap-1.5 pb-2">
                            {items.map(item => {
                              const arr = filters[key as keyof FilterState] as string[];
                              const active = arr.includes(item);
                              return (
                                <button
                                  key={item}
                                  onClick={() => toggle(key as keyof FilterState, item)}
                                  className={cn(
                                    'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                                    active
                                      ? 'bg-cv-primary text-white'
                                      : 'bg-cv-card text-cv-text-dim hover:bg-cv-border hover:text-white'
                                  )}
                                >
                                  {item}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="sticky bottom-0 bg-cv-surface/95 backdrop-blur-xl border-t border-cv-border p-4">
                <button
                  onClick={() => setOpen(false)}
                  className="w-full py-3 bg-cv-primary hover:bg-cv-primary-hover text-white font-semibold rounded-xl transition-colors"
                >
                  Apply Filters {activeCount > 0 && `(${activeCount})`}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
