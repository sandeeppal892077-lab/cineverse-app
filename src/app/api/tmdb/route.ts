import { NextRequest, NextResponse } from 'next/server';

const TMDB_BASE = 'https://api.themoviedb.org/3';
const TMDB_KEY = process.env.TMDB_API_KEY;

async function fetchTMDB(endpoint: string) {
  if (!TMDB_KEY) return null;
  const res = await fetch(`${TMDB_BASE}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${TMDB_KEY}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  return res.json();
}

const ENDPOINT_MAP: Record<string, string> = {
  trending: '/trending/all/day',
  popular: '/movie/popular',
  top_rated: '/movie/top_rated',
  upcoming: '/movie/upcoming',
  now_playing: '/movie/now_playing',
  movie: '/movie/popular',
  tv: '/tv/popular',
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || 'trending';
  const query = searchParams.get('query');
  const id = searchParams.get('id');
  const page = searchParams.get('page') || '1';

  if (query) {
    const searchType = ['movie', 'tv', 'multi'].includes(type) ? type : 'multi';
    const data = await fetchTMDB(`/search/${searchType}?query=${encodeURIComponent(query)}&page=${page}`);
    return NextResponse.json(data || { results: [] });
  }

  if (id) {
    const mediaType = ['movie', 'tv'].includes(type) ? type : 'movie';
    const data = await fetchTMDB(`/${mediaType}/${id}?append_to_response=credits,videos,similar`);
    return NextResponse.json(data || {});
  }

  const endpoint = ENDPOINT_MAP[type] || '/trending/all/day';
  const data = await fetchTMDB(`${endpoint}?page=${page}`);
  return NextResponse.json(data || { results: [] });
}
