'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  BookOpen, Bookmark, Star, Eye, ZoomIn, ZoomOut,
  Moon, Sun, ChevronLeft, ChevronRight, ChevronDown,
} from 'lucide-react';
import { getTitleBySlug, mockTitles } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useLocalStorage } from '@/hooks';

type ReadingMode = 'single' | 'double' | 'scroll';

export default function ComicsDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const title = getTitleBySlug(slug);
  const { isAuthenticated, toggleWatchlist, user } = useAuth();
  const [readingMode, setReadingMode] = useLocalStorage<ReadingMode>('comic-reading-mode', 'single');
  const [zoom, setZoom] = useState(100);
  const [darkReader, setDarkReader] = useLocalStorage('dark-reader', true);
  const [currentChapter, setCurrentChapter] = useState(1);

  if (!title) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold text-white mb-2">Comic Not Found</h1>
          <Link href="/browse?category=comics" className="btn-primary mt-4">Browse Comics</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="relative h-[40vh] sm:h-[50vh]">
        <Image src={title.backdrop} alt={title.name} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-cv-bg via-cv-bg/50 to-transparent" />
      </div>

      <div className="relative -mt-32 z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="flex-shrink-0 mx-auto lg:mx-0">
            <div className="w-44 sm:w-52 aspect-[2/3] rounded-2xl overflow-hidden ring-2 ring-cv-border/50 shadow-2xl">
              <Image src={title.poster} alt={title.name} width={208} height={312} className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="badge bg-cv-teal/20 text-cv-teal border border-cv-teal/40">
                <BookOpen className="w-3 h-3 inline mr-1" />
                {title.type === 'manga' ? 'Manga' : title.type === 'manhwa' ? 'Manhwa' : title.type === 'manhua' ? 'Manhua' : 'Comic'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-black text-white mb-2">{title.name}</h1>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center gap-1.5">
                <Star className="w-5 h-5 text-cv-gold fill-cv-gold" />
                <span className="text-lg font-bold text-white">{title.imdbRating}</span>
              </div>
              {title.chapters && <span className="text-sm text-cv-muted">{title.chapters.length} Chapters</span>}
              {title.volumes && <span className="text-sm text-cv-muted">{title.volumes} Volumes</span>}
            </div>

            <p className="text-sm text-cv-text-dim leading-relaxed mb-6">{title.synopsis}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {title.genres.map(g => (
                <span key={g} className="px-3 py-1.5 bg-white/5 border border-white/10 text-sm text-white/80 rounded-full">{g}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 btn-primary">
                <BookOpen className="w-5 h-5" /> Read Chapter 1
              </button>
              {isAuthenticated && (
                <button onClick={() => toggleWatchlist(title.id)} className={cn('flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all', user?.watchlist.includes(title.id) ? 'bg-cv-primary/20 text-cv-primary border border-cv-primary/40' : 'btn-secondary')}>
                  <Bookmark className={cn('w-5 h-5', user?.watchlist.includes(title.id) && 'fill-current')} /> Bookmark
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Reading Controls */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4 mt-8">
          <h3 className="text-lg font-display font-bold text-white mb-4">Reading Controls</h3>
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="text-xs text-cv-muted block mb-1">Mode</label>
              <select
                value={readingMode}
                onChange={e => setReadingMode(e.target.value as ReadingMode)}
                className="px-3 py-2 bg-cv-card border border-cv-border rounded-lg text-sm text-white"
              >
                <option value="single">Single Page</option>
                <option value="double">Double Page</option>
                <option value="scroll">Scroll</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-cv-muted block mb-1">Zoom: {zoom}%</label>
              <div className="flex items-center gap-2">
                <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="p-1.5 bg-cv-card border border-cv-border rounded-lg text-cv-muted hover:text-white">
                  <ZoomOut className="w-4 h-4" />
                </button>
                <input type="range" min={50} max={200} value={zoom} onChange={e => setZoom(Number(e.target.value))} className="w-24 accent-cv-primary" />
                <button onClick={() => setZoom(z => Math.min(200, z + 10))} className="p-1.5 bg-cv-card border border-cv-border rounded-lg text-cv-muted hover:text-white">
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs text-cv-muted block mb-1">Theme</label>
              <button
                onClick={() => setDarkReader(!darkReader)}
                className={cn('flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                  darkReader ? 'bg-cv-card border border-cv-border text-white' : 'bg-yellow-500/20 text-yellow-400'
                )}
              >
                {darkReader ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                {darkReader ? 'Dark' : 'Light'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Chapters */}
        {title.chapters && title.chapters.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-6">
            <h3 className="text-lg font-display font-bold text-white mb-3">Chapters</h3>
            <div className="glass-card divide-y divide-cv-border/50">
              {title.chapters.map(ch => (
                <button
                  key={ch.id}
                  onClick={() => setCurrentChapter(ch.number)}
                  className={cn(
                    'flex items-center justify-between w-full px-4 py-3 text-left hover:bg-white/5 transition-all',
                    currentChapter === ch.number && 'bg-cv-primary/10'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className={cn('w-4 h-4', currentChapter === ch.number ? 'text-cv-primary' : 'text-cv-muted')} />
                    <span className="text-sm text-white">Chapter {ch.number}: {ch.title}</span>
                  </div>
                  <span className="text-xs text-cv-muted">{ch.pages} pages</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Reading Progress Placeholder */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4 mt-6 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white font-medium">Reading Progress</span>
            <span className="text-sm text-cv-muted">Chapter {currentChapter} of {title.chapters?.length || 1}</span>
          </div>
          <div className="w-full bg-cv-border rounded-full h-2">
            <div className="bg-cv-primary h-2 rounded-full transition-all" style={{ width: `${((currentChapter) / (title.chapters?.length || 1)) * 100}%` }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
