export interface StreamingSource {
  id: string;
  label: string;
  embedUrl: (tmdbId: number, type: 'movie' | 'tv', season?: number, episode?: number) => string;
  enabled: boolean;
}

export const STREAMING_SOURCES: StreamingSource[] = [
  {
    id: 'vidking',
    label: 'VidKing',
    embedUrl: (tmdbId, type, season, episode) => {
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
    embedUrl: (tmdbId, type, season, episode) => {
      if (type === 'tv') {
        const s = season || 1;
        const e = episode || 1;
        return `https://peestream.in/embed/${tmdbId}?s=${s}&e=${e}`;
      }
      return `https://peestream.in/embed/${tmdbId}`;
    },
    enabled: true,
  },
  {
    id: 'vidsrc',
    label: 'VidSrc',
    embedUrl: (tmdbId, type, season, episode) => {
      const base = 'https://vidsrc-embed.ru/embed';
      if (type === 'tv') {
        const s = season || 1;
        const e = episode || 1;
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
