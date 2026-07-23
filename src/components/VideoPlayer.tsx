'use client';

import React, { useState } from 'react';
import { STREAMING_SOURCES } from '@/lib/streaming';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  tmdbId: number;
  type: 'movie' | 'tv';
  title: string;
  poster?: string;
  season?: number;
  episode?: number;
}

export default function VideoPlayer({ tmdbId, type, title, poster, season, episode }: VideoPlayerProps) {
  const [sourceId, setSourceId] = useState(STREAMING_SOURCES[0]?.id);
  const [showPlayer, setShowPlayer] = useState(false);

  const source = STREAMING_SOURCES.find(s => s.id === sourceId);
  const embedUrl = source?.embedUrl(tmdbId, type, season, episode);
  const episodeLabel = type === 'tv' ? ` S${season || 1}:E${episode || 1}` : '';

  if (!showPlayer) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-cv-surface/50 group cursor-pointer"
        onClick={() => setShowPlayer(true)}
      >
        {poster && (
          <img src={poster} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-50" />
        )}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-cv-primary/90 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-white text-lg font-semibold">Play {title}{episodeLabel}</p>
            <p className="text-cv-muted text-sm mt-1">Click to start streaming</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-cv-muted">Source:</span>
        {STREAMING_SOURCES.filter(s => s.enabled).map(s => (
          <button
            key={s.id}
            onClick={() => setSourceId(s.id)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
              sourceId === s.id
                ? 'bg-cv-primary text-white'
                : 'bg-white/5 text-cv-text-dim hover:text-white hover:bg-white/10'
            )}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            allow="autoplay; fullscreen"
            title={`${title}${episodeLabel}`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-cv-muted">No streaming source available</p>
          </div>
        )}
      </div>
    </div>
  );
}
