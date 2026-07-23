export interface Title {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  synopsis: string;
  poster: string;
  backdrop: string;
  trailer?: string;
  tmdbId?: number;
  type: TitleType;
  genres: string[];
  year: number;
  runtime?: number;
  imdbRating: number;
  userRating?: number;
  languages: string[];
  country: string;
  studio?: string;
  platform?: string;
  ageRating: string;
  releaseDate: string;
  awards?: string[];
  cast: Person[];
  crew: CrewMember[];
  seasons?: Season[];
  chapters?: Chapter[];
  volumes?: number;
  relatedTitles: string[];
  trending?: boolean;
  newRelease?: boolean;
  featured?: boolean;
  editorsPick?: boolean;
}

export type TitleType =
  | 'movie'
  | 'web-series'
  | 'tv-show'
  | 'anime'
  | 'animated-movie'
  | 'animated-series'
  | 'comic'
  | 'manga'
  | 'manhwa'
  | 'manhua'
  | 'documentary'
  | 'short-film'
  | 'kids'
  | 'live-action'
  | 'reality-show';

export interface Person {
  id: string;
  name: string;
  avatar?: string;
  character?: string;
}

export interface CrewMember {
  id: string;
  name: string;
  role: string;
}

export interface Season {
  id: string;
  number: number;
  title: string;
  episodeCount: number;
  year: number;
  episodes: Episode[];
}

export interface Episode {
  id: string;
  number: number;
  title: string;
  synopsis: string;
  runtime: number;
  airDate: string;
  imdbRating: number;
  thumbnail?: string;
  isFiller?: boolean;
  isCanon?: boolean;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  pages: number;
}

export interface FilterState {
  genre: string[];
  language: string[];
  country: string[];
  year: number | null;
  minRating: number;
  sortBy: string;
  type: string[];
  ageRating: string[];
  runtime: [number, number];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  watchlist: string[];
  favorites: string[];
  ratings: Record<string, number>;
  history: { titleId: string; timestamp: number; progress?: number }[];
  isAdmin: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  titleId: string;
  content: string;
  rating?: number;
  timestamp: number;
  likes: number;
}
