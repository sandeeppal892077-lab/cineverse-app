'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Star } from 'lucide-react';
import { getTitleBySlug } from '@/data/mockData';
import { formatRuntime, getRatingColor } from '@/lib/utils';
import VideoPlayer from '@/components/VideoPlayer';

export default function WatchPage() {
  const params = useParams();
  const slug = params.slug as string;
  const title = getTitleBySlug(slug);

  if (!title) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold text-white mb-2">Title Not Found</h1>
          <p className="text-cv-muted mb-4">The title you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="px-6 py-3 bg-cv-primary rounded-xl text-white">Go Home</Link>
        </div>
      </div>
    );
  }

  const isMovie = ['movie', 'documentary', 'short-film', 'animated-movie'].includes(title.type);
  const mediaType = (isMovie ? 'movie' : 'tv') as 'movie' | 'tv';
  const firstSeason = title.seasons?.[0];
  const firstEpisode = firstSeason?.episodes[0];
  const season = title.seasons?.length ? (firstSeason?.number || 1) : undefined;
  const episode = firstEpisode?.number || undefined;

  return (
    <div className="min-h-screen bg-black">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href={`/title/${slug}`} className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">{title.name}</span>
          </Link>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-cv-gold fill-cv-gold" />
            <span className="text-sm text-white font-medium">{title.imdbRating}</span>
            <span className="text-sm text-cv-muted">{title.year}</span>
            {title.runtime && <span className="text-sm text-cv-muted">{formatRuntime(title.runtime)}</span>}
          </div>
        </div>
      </div>

      {/* Player */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <VideoPlayer
          tmdbId={title.tmdbId || 0}
          type={mediaType}
          title={title.name}
          poster={title.backdrop}
          season={season}
          episode={episode}
        />

        {/* Info below player */}
        <div className="mt-6">
          <h1 className="text-2xl font-bold text-white">{title.name}</h1>
          {title.tagline && (
            <p className="text-cv-gold italic mt-1">&quot;{title.tagline}&quot;</p>
          )}
          <p className="text-sm text-cv-text-dim mt-3 leading-relaxed max-w-3xl">{title.synopsis}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {title.genres.map(g => (
              <span key={g} className="px-3 py-1 bg-white/5 border border-white/10 text-xs text-white/70 rounded-full">
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
