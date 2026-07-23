'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Info, Plus, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Title } from '@/types';
import { cn, formatRuntime, getRatingColor } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

interface HeroBannerProps {
  titles: Title[];
}

export default function HeroBanner({ titles }: HeroBannerProps) {
  const featured = titles.filter(t => t.featured || t.trending).slice(0, 5);
  const [current, setCurrent] = useState(0);
  const { isAuthenticated, toggleWatchlist, user } = useAuth();
  const title = featured[current];
  const inWatchlist = user?.watchlist.includes(title?.id) || false;

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % featured.length), 8000);
    return () => clearInterval(t);
  }, [featured.length]);

  if (!title) return null;

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={title.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={title.backdrop}
            alt={title.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-cv-bg via-transparent to-transparent" />

      <div className="absolute inset-0 flex items-center">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={title.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-1 bg-cv-primary/20 border border-cv-primary/40 text-cv-primary text-xs font-bold rounded-md uppercase">
                  {title.type.replace('-', ' ')}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-cv-gold fill-cv-gold" />
                  <span className="text-sm font-bold text-white">{title.imdbRating}</span>
                  <span className="text-xs text-cv-muted">/10</span>
                </div>
                <span className="text-sm text-cv-muted">{title.year}</span>
                {title.runtime && <span className="text-sm text-cv-muted">{formatRuntime(title.runtime)}</span>}
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white leading-tight mb-2">
                {title.name}
              </h1>

              {title.tagline && (
                <p className="text-lg text-cv-gold italic mb-4 font-medium">&quot;{title.tagline}&quot;</p>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {title.genres.slice(0, 4).map(g => (
                  <span key={g} className="px-2.5 py-1 bg-white/10 backdrop-blur-sm text-white/80 text-xs rounded-full">
                    {g}
                  </span>
                ))}
              </div>

              <p className="text-sm sm:text-base text-cv-text-dim leading-relaxed mb-6 line-clamp-3">
                {title.synopsis}
              </p>

              <div className="flex items-center gap-3">
                <Link
                  href={`/title/${title.slug}`}
                  className="flex items-center gap-2 px-6 py-3 bg-cv-primary hover:bg-cv-primary-hover text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-cv-primary/30"
                >
                  <Play className="w-5 h-5 fill-white" />
                  Watch Now
                </Link>
                <Link
                  href={`/title/${title.slug}`}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl transition-all"
                >
                  <Info className="w-5 h-5" />
                  More Info
                </Link>
                {isAuthenticated && (
                  <button
                    onClick={() => toggleWatchlist(title.id)}
                    className={cn(
                      'p-3 rounded-xl transition-all',
                      inWatchlist ? 'bg-cv-primary/20 text-cv-primary' : 'bg-white/10 hover:bg-white/20 text-white'
                    )}
                  >
                    <Plus className={cn('w-5 h-5', inWatchlist && 'rotate-45')} />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 flex items-center gap-2">
        <button
          onClick={() => setCurrent(c => (c - 1 + featured.length) % featured.length)}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex gap-1.5">
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                'h-1 rounded-full transition-all',
                i === current ? 'w-8 bg-cv-primary' : 'w-4 bg-white/30 hover:bg-white/50'
              )}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrent(c => (c + 1) % featured.length)}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}
