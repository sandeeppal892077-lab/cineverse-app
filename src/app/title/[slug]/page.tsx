'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Play, Plus, Heart, Share2, Star, Clock, Calendar, Globe,
  Award, Users, ChevronRight, Film, Bookmark,
} from 'lucide-react';
import { getTitleBySlug, mockTitles } from '@/data/mockData';
import { cn, formatRuntime, formatDate, getRatingColor } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import TitleCard from '@/components/TitleCard';
import StarRating from '@/components/StarRating';

export default function TitleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const title = getTitleBySlug(slug);
  const { isAuthenticated, toggleWatchlist, toggleFavorite, rateTitle, user } = useAuth();

  if (!title) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold text-white mb-2">Title Not Found</h1>
          <p className="text-cv-muted mb-4">The title you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  const inWatchlist = user?.watchlist.includes(title.id) || false;
  const inFavorites = user?.favorites.includes(title.id) || false;
  const userRating = user?.ratings[title.id] || 0;
  const related = title.relatedTitles
    .map(id => mockTitles.find(t => t.id === id))
    .filter(Boolean);
  const totalSeasons = title.seasons?.length || 0;
  const totalEpisodes = title.seasons?.reduce((acc, s) => acc + s.episodes.length, 0) || 0;

  return (
    <div className="min-h-screen">
      {/* Backdrop */}
      <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh]">
        <Image src={title.backdrop} alt={title.name} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-cv-bg via-cv-bg/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-cv-bg/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative -mt-48 z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-shrink-0 mx-auto lg:mx-0"
          >
            <div className="w-48 sm:w-56 lg:w-64 aspect-[2/3] rounded-2xl overflow-hidden ring-2 ring-cv-border/50 shadow-2xl shadow-black/50">
              <Image src={title.poster} alt={title.name} width={256} height={384} className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 min-w-0"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white mb-2">
              {title.name}
            </h1>

            {title.tagline && (
              <p className="text-lg text-cv-gold italic mb-4">&quot;{title.tagline}&quot;</p>
            )}

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="badge bg-cv-primary/20 text-cv-primary border border-cv-primary/40">
                {title.type.replace(/-/g, ' ')}
              </span>
              <div className="flex items-center gap-1.5">
                <Star className="w-5 h-5 text-cv-gold fill-cv-gold" />
                <span className="text-lg font-bold text-white">{title.imdbRating}</span>
                <span className="text-sm text-cv-muted">/10</span>
              </div>
              <span className="text-sm text-cv-muted">{title.year}</span>
              {title.runtime && <span className="text-sm text-cv-muted">{formatRuntime(title.runtime)}</span>}
              <span className="text-sm text-cv-muted">{title.ageRating}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {title.genres.map(g => (
                <Link key={g} href={`/browse?genre=${g}`} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-white/80 rounded-full transition-all">
                  {g}
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <Link href={`/watch/${slug}`} className="flex items-center gap-2 btn-primary">
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
                  <button className="flex items-center gap-2 btn-secondary">
                    <Share2 className="w-5 h-5" /> Share
                  </button>
                </>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white mb-2">Synopsis</h3>
              <p className="text-sm text-cv-text-dim leading-relaxed">{title.synopsis}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="glass-card p-3">
                <span className="text-xs text-cv-muted block">Release Date</span>
                <span className="text-sm font-medium text-white">{formatDate(title.releaseDate)}</span>
              </div>
              {title.runtime && (
                <div className="glass-card p-3">
                  <span className="text-xs text-cv-muted block">Runtime</span>
                  <span className="text-sm font-medium text-white">{formatRuntime(title.runtime)}</span>
                </div>
              )}
              <div className="glass-card p-3">
                <span className="text-xs text-cv-muted block">Language</span>
                <span className="text-sm font-medium text-white">{title.languages.join(', ')}</span>
              </div>
              <div className="glass-card p-3">
                <span className="text-xs text-cv-muted block">Country</span>
                <span className="text-sm font-medium text-white capitalize">{title.country}</span>
              </div>
            </div>

            {title.awards && title.awards.length > 0 && (
              <div className="mb-6">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
                  <Award className="w-4 h-4 text-cv-gold" /> Awards
                </h3>
                <div className="flex flex-wrap gap-2">
                  {title.awards.map(a => (
                    <span key={a} className="px-3 py-1.5 bg-cv-gold/10 border border-cv-gold/30 text-cv-gold text-xs font-medium rounded-full">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Rating */}
        {isAuthenticated && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 mt-8">
            <h3 className="text-lg font-display font-bold text-white mb-3">Your Rating</h3>
            <StarRating rating={userRating} interactive onRate={(r) => rateTitle(title.id, r)} size="lg" />
            {userRating > 0 && <p className="text-sm text-cv-text-dim mt-2">You rated this {userRating}/10</p>}
          </motion.div>
        )}

        {/* Seasons & Episodes */}
        {title.seasons && title.seasons.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-8">
            <h2 className="text-xl font-display font-bold text-white mb-4">
              Seasons & Episodes
              <span className="text-sm font-normal text-cv-muted ml-2">
                {totalSeasons} season{totalSeasons !== 1 ? 's' : ''} &middot; {totalEpisodes} episode{totalEpisodes !== 1 ? 's' : ''}
              </span>
            </h2>
            <div className="space-y-4">
              {title.seasons.map(season => (
                <div key={season.id} className="glass-card p-4">
                  <h3 className="font-medium text-white mb-3">Season {season.number}: {season.title}</h3>
                  <div className="space-y-2">
                    {season.episodes.map(ep => (
                      <div key={ep.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all">
                        <span className="text-sm text-cv-muted w-6 text-right">{ep.number}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">{ep.title}</p>
                          <p className="text-xs text-cv-muted truncate">{ep.synopsis}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {ep.isFiller && <span className="badge bg-orange-500/20 text-orange-400">Filler</span>}
                          {ep.isCanon && <span className="badge bg-green-500/20 text-green-400">Canon</span>}
                          <span className="text-xs text-cv-muted">{ep.runtime}m</span>
                          <Star className="w-3 h-3 text-cv-gold fill-cv-gold" />
                          <span className="text-xs text-cv-muted">{ep.imdbRating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Cast */}
        {title.cast.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8">
            <h2 className="flex items-center gap-2 text-xl font-display font-bold text-white mb-4">
              <Users className="w-5 h-5" /> Cast
            </h2>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {title.cast.map(person => (
                <div key={person.id} className="flex-shrink-0 w-32 text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-cv-primary/30 to-cv-purple/30 border border-cv-border flex items-center justify-center mb-2">
                    <span className="text-2xl font-bold text-white">{person.name.charAt(0)}</span>
                  </div>
                  <p className="text-sm font-medium text-white truncate">{person.name}</p>
                  <p className="text-xs text-cv-muted truncate">{person.character}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Crew */}
        {title.crew.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-8">
            <h2 className="text-xl font-display font-bold text-white mb-4">Crew</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {title.crew.map(person => (
                <div key={person.id} className="glass-card p-3">
                  <p className="text-sm font-medium text-white">{person.name}</p>
                  <p className="text-xs text-cv-muted">{person.role}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-12">
            <h2 className="text-xl font-display font-bold text-white mb-4">You May Also Like</h2>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {related.map((t, i) => t && <TitleCard key={t.id} title={t} index={i} variant="wide" />)}
            </div>
          </motion.div>
        )}
      </div>

      <div className="h-16" />
    </div>
  );
}
