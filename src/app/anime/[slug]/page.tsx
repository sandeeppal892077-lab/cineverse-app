'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Play, Info, Star, Clock, Calendar, Palette, ChevronDown, ChevronUp,
  Bookmark, Heart, Share2,
} from 'lucide-react';
import { getTitleBySlug, mockTitles } from '@/data/mockData';
import { cn, formatRuntime, formatDate } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import TitleCard from '@/components/TitleCard';

export default function AnimeDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const title = getTitleBySlug(slug);
  const { isAuthenticated, toggleWatchlist, toggleFavorite, user } = useAuth();

  if (!title) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold text-white mb-2">Anime Not Found</h1>
          <Link href="/browse?category=anime" className="btn-primary mt-4">Browse Anime</Link>
        </div>
      </div>
    );
  }

  const inWatchlist = user?.watchlist.includes(title.id) || false;
  const inFavorites = user?.favorites.includes(title.id) || false;
  const isAnime = title.type === 'anime';
  const totalSeasons = title.seasons?.length || 0;
  const totalEpisodes = title.seasons?.reduce((acc, s) => acc + s.episodes.length, 0) || 0;

  return (
    <div className="min-h-screen">
      <div className="relative h-[50vh] sm:h-[60vh]">
        <Image src={title.backdrop} alt={title.name} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-cv-bg via-cv-bg/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-cv-bg/80 to-transparent" />
      </div>

      <div className="relative -mt-40 z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="flex-shrink-0 mx-auto lg:mx-0">
            <div className="w-48 sm:w-56 aspect-[2/3] rounded-2xl overflow-hidden ring-2 ring-cv-border/50 shadow-2xl">
              <Image src={title.poster} alt={title.name} width={224} height={336} className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="badge bg-cv-purple/20 text-cv-purple border border-cv-purple/40">
                {isAnime ? 'Anime' : title.type.replace(/-/g, ' ')}
              </span>
              {title.studio && (
                <span className="badge bg-white/10 text-white/70">
                  <Palette className="w-3 h-3 inline mr-1" />
                  {title.studio}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white mb-2">{title.name}</h1>
            {title.tagline && <p className="text-lg text-cv-gold italic mb-4">&quot;{title.tagline}&quot;</p>}

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center gap-1.5">
                <Star className="w-5 h-5 text-cv-gold fill-cv-gold" />
                <span className="text-lg font-bold text-white">{title.imdbRating}</span>
              </div>
              <span className="text-sm text-cv-muted">{title.year}</span>
              {totalSeasons > 0 && <span className="text-sm text-cv-muted">{totalSeasons} Season{totalSeasons > 1 ? 's' : ''}</span>}
              {totalEpisodes > 0 && <span className="text-sm text-cv-muted">{totalEpisodes} Episodes</span>}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {title.genres.map(g => (
                <Link key={g} href={`/browse?genre=${g}`} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-white/80 rounded-full transition-all">
                  {g}
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="#" className="flex items-center gap-2 btn-primary">
                <Play className="w-5 h-5 fill-white" /> Watch Now
              </Link>
              {isAuthenticated && (
                <>
                  <button onClick={() => toggleWatchlist(title.id)} className={cn('flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all', inWatchlist ? 'bg-cv-primary/20 text-cv-primary border border-cv-primary/40' : 'btn-secondary')}>
                    <Bookmark className={cn('w-5 h-5', inWatchlist && 'fill-current')} />
                    {inWatchlist ? 'In Watchlist' : 'Watchlist'}
                  </button>
                  <button onClick={() => toggleFavorite(title.id)} className={cn('flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all', inFavorites ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'btn-secondary')}>
                    <Heart className={cn('w-5 h-5', inFavorites && 'fill-current')} />
                    {inFavorites ? 'Favorited' : 'Favorite'}
                  </button>
                </>
              )}
            </div>

            <p className="text-sm text-cv-text-dim leading-relaxed mb-6">{title.synopsis}</p>

            {/* Anime-specific info */}
            {isAnime && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {title.studio && (
                  <div className="glass-card p-3">
                    <span className="text-xs text-cv-muted block">Studio</span>
                    <span className="text-sm font-medium text-white">{title.studio}</span>
                  </div>
                )}
                <div className="glass-card p-3">
                  <span className="text-xs text-cv-muted block">Episodes</span>
                  <span className="text-sm font-medium text-white">{totalEpisodes}</span>
                </div>
                <div className="glass-card p-3">
                  <span className="text-xs text-cv-muted block">Status</span>
                  <span className="text-sm font-medium text-white">Ongoing</span>
                </div>
                <div className="glass-card p-3">
                  <span className="text-xs text-cv-muted block">Dub/Sub</span>
                  <span className="text-sm font-medium text-white">Sub | Dub</span>
                </div>
                <div className="glass-card p-3">
                  <span className="text-xs text-cv-muted block">Source</span>
                  <span className="text-sm font-medium text-white">Manga</span>
                </div>
                <div className="glass-card p-3">
                  <span className="text-xs text-cv-muted block">Rating</span>
                  <span className="text-sm font-medium text-white">{title.ageRating}</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Seasons & Episodes with Filler/Canon info */}
        {title.seasons && title.seasons.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8">
            <h2 className="text-xl font-display font-bold text-white mb-4">
              Episodes
              <span className="text-sm font-normal text-cv-muted ml-2">{totalEpisodes} episodes</span>
            </h2>
            {title.seasons.map(season => (
              <div key={season.id} className="glass-card p-4 mb-4">
                <h3 className="font-medium text-white mb-1">Season {season.number}: {season.title}</h3>
                <div className="flex gap-4 text-xs text-cv-muted mb-3">
                  <span>{season.episodeCount} episodes</span>
                  <span>{season.year}</span>
                </div>
                <div className="space-y-2">
                  {season.episodes.map(ep => (
                    <div key={ep.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-all group cursor-pointer">
                      <span className="text-sm text-cv-muted w-6 text-right font-mono">{ep.number}</span>
                      <Play className="w-4 h-4 text-cv-muted group-hover:text-cv-primary transition-colors flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white group-hover:text-cv-primary truncate transition-colors">{ep.title}</p>
                        <p className="text-xs text-cv-muted line-clamp-1">{ep.synopsis}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {ep.isFiller && (
                          <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-[10px] font-bold rounded-md uppercase">Filler</span>
                        )}
                        {ep.isCanon && (
                          <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] font-bold rounded-md uppercase">Canon</span>
                        )}
                        <span className="text-xs text-cv-muted w-10 text-right">{ep.runtime}m</span>
                        <Star className="w-3 h-3 text-cv-gold fill-cv-gold" />
                        <span className="text-xs text-cv-muted w-6">{ep.imdbRating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Characters */}
        {title.cast.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8">
            <h2 className="text-xl font-display font-bold text-white mb-4">Characters & Voice Actors</h2>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {title.cast.map(person => (
                <div key={person.id} className="flex-shrink-0 w-36 text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-cv-purple/30 to-cv-primary/30 border border-cv-border flex items-center justify-center mb-2">
                    <span className="text-2xl font-bold text-white">{person.name.charAt(0)}</span>
                  </div>
                  <p className="text-sm font-medium text-white truncate">{person.character || person.name}</p>
                  <p className="text-xs text-cv-muted">CV: {person.name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Related Anime */}
        {title.relatedTitles.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-12 mb-8">
            <h2 className="text-xl font-display font-bold text-white mb-4">Related Anime</h2>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {title.relatedTitles
                .map(id => mockTitles.find(t => t.id === id))
                .filter(Boolean)
                .map((t, i) => t && <TitleCard key={t.id} title={t} index={i} variant="wide" />)}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
