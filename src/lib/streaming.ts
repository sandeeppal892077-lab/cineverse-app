export interface StreamingSource {
  id: string;
  label: string;
  embedUrl: (tmdbId: number, type: 'movie' | 'tv', title?: string, season?: number, episode?: number) => string;
  enabled: boolean;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export const STREAMING_SOURCES: StreamingSource[] = [
  {
    id: 'vidking',
    label: 'VidKing',
    embedUrl: (tmdbId, type, _title, season, episode) => {
      if (type === 'tv') {
        const s = season || 1;
        const e = episode || 1;
        return `https://www.vidking.net/embed/tv/${tmdbId}/${s}/${e}?autoPlay=true`;
      }
      return `https://www.vidking.net/embed/movie/${tmdbId}?autoPlay=true`;
    },
    enabled: true,
  },
  {
    id: 'peestream',
    label: 'PeeStream',
    embedUrl: (tmdbId, type, title, season, episode) => {
      const slug = slugify(title || 'movie');
      if (type === 'tv') {
        return `https://peestream.in/media/tmdb-tv-${tmdbId}-${slug}`;
      }
      return `https://peestream.in/media/tmdb-movie-${tmdbId}-${slug}`;
    },
    enabled: true,
  },
  {
    id: 'vidsrc',
    label: 'VidSrc',
    embedUrl: (tmdbId, type, _title, season, episode) => {
      const base = 'https://vidsrc-embed.ru/embed';
      if (type === 'tv') {
        return `${base}/tv?tmdb=${tmdbId}&ds_lang=en`;
      }
      return `${base}/movie?tmdb=${tmdbId}`;
    },
    enabled: true,
  },
];

export function getSourceById(id: string): StreamingSource | undefined {
  return STREAMING_SOURCES.find(s => s.id === id);
}
