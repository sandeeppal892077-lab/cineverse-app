'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Plus, Star, Clock, Info } from 'lucide-react';
import { Title } from '@/types';
import { cn, formatRuntime, getRatingColor } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

interface TitleCardProps {
  title: Title;
  index?: number;
  variant?: 'default' | 'wide' | 'compact' | 'ranked';
}

export default function TitleCard({ title, index = 0, variant = 'default' }: TitleCardProps) {
  const { isAuthenticated, toggleWatchlist, toggleFavorite, user } = useAuth();
  const [hovered, setHovered] = useState(false);
  const inWatchlist = user?.watchlist.includes(title.id) || false;
  const inFavorites = user?.favorites.includes(title.id) || false;

  if (variant === 'ranked') {
    return (
      <Link href={`/title/${title.slug}`} className="flex items-center gap-4 group">
        <span className="text-4xl font-display font-black text-cv-border group-hover:text-cv-primary transition-colors w-12 text-right">
          {index + 1}
        </span>
        <div className="relative w-16 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-cv-card">
          <Image src={title.poster} alt={title.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="64px" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-white truncate group-hover:text-cv-primary transition-colors">{title.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={cn('text-xs font-bold', getRatingColor(title.imdbRating))}>{title.imdbRating}</span>
            <span className="text-xs text-cv-muted">{title.year}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={cn(
        'group relative flex-shrink-0',
        variant === 'wide' ? 'w-[320px] sm:w-[380px]' : variant === 'compact' ? 'w-[140px] sm:w-[160px]' : 'w-[180px] sm:w-[220px]'
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/title/${title.slug}`} className="block">
        <div className={cn(
          'relative rounded-xl overflow-hidden bg-cv-card',
          variant === 'compact' ? 'aspect-[2/3]' : variant === 'wide' ? 'aspect-[16/9]' : 'aspect-[2/3]',
          'group-hover:ring-2 group-hover:ring-cv-primary/50 transition-all duration-300'
        )}>
          <Image
            src={title.poster}
            alt={title.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 180px, 220px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute top-2 left-2 flex gap-1">
            {title.trending && (
              <span className="px-2 py-0.5 bg-cv-primary/90 text-white text-[10px] font-bold rounded-md uppercase tracking-wider">
                Trending
              </span>
            )}
            {title.newRelease && (
              <span className="px-2 py-0.5 bg-cv-teal/90 text-white text-[10px] font-bold rounded-md uppercase tracking-wider">
                New
              </span>
            )}
          </div>

          <div className={cn(
            'absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[11px] font-bold border',
            'bg-black/60 backdrop-blur-sm',
            getRatingColor(title.imdbRating)
          )}>
            <Star className="w-3 h-3 fill-current" />
            {title.imdbRating}
          </div>

          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center gap-2"
            >
              <Link
                href={`/title/${title.slug}`}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-cv-primary transition-colors"
              >
                <Play className="w-5 h-5 text-white fill-white" />
              </Link>
              {isAuthenticated && (
                <button
                  onClick={(e) => { e.preventDefault(); toggleWatchlist(title.id); }}
                  className={cn('w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors',
                    inWatchlist ? 'bg-cv-primary/80' : 'bg-white/20 hover:bg-white/30'
                  )}
                >
                  <Plus className={cn('w-5 h-5', inWatchlist && 'rotate-45')} />
                </button>
              )}
            </motion.div>
          )}
        </div>
      </Link>

      <div className="mt-2 px-1">
        <Link href={`/title/${title.slug}`}>
          <h3 className="text-sm font-medium text-white truncate group-hover:text-cv-primary transition-colors">
            {title.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-0.5">
          {title.runtime && (
            <span className="flex items-center gap-1 text-[11px] text-cv-muted">
              <Clock className="w-3 h-3" /> {formatRuntime(title.runtime)}
            </span>
          )}
          <span className="text-[11px] text-cv-muted">{title.year}</span>
          {title.type && (
            <span className="text-[10px] text-cv-muted uppercase tracking-wider">{title.type.replace('-', ' ')}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
