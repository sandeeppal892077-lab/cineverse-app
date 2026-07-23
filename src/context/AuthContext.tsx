'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  toggleWatchlist: (titleId: string) => void;
  toggleFavorite: (titleId: string) => void;
  rateTitle: (titleId: string, rating: number) => void;
  addToHistory: (titleId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: User = {
  id: '1',
  name: 'Alex Morgan',
  email: 'alex@cineverse.com',
  avatar: '',
  watchlist: ['1', '5', '8'],
  favorites: ['2', '6', '11', '15'],
  ratings: { '1': 8.5, '2': 9, '11': 9.5 },
  history: [
    { titleId: '5', timestamp: 1700000000000, progress: 65 },
    { titleId: '8', timestamp: 1700000000000, progress: 30 },
    { titleId: '14', timestamp: 1700000000000, progress: 100 },
  ],
  isAdmin: true,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(MOCK_USER);

  const isAuthenticated = !!user;

  const login = useCallback(async (email: string, _password: string) => {
    setUser({ ...MOCK_USER, email });
    return true;
  }, []);

  const signup = useCallback(async (name: string, email: string, _password: string) => {
    setUser({ ...MOCK_USER, name, email });
    return true;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const toggleWatchlist = useCallback((titleId: string) => {
    setUser(prev => {
      if (!prev) return prev;
      const wl = prev.watchlist.includes(titleId)
        ? prev.watchlist.filter(id => id !== titleId)
        : [...prev.watchlist, titleId];
      return { ...prev, watchlist: wl };
    });
  }, []);

  const toggleFavorite = useCallback((titleId: string) => {
    setUser(prev => {
      if (!prev) return prev;
      const favs = prev.favorites.includes(titleId)
        ? prev.favorites.filter(id => id !== titleId)
        : [...prev.favorites, titleId];
      return { ...prev, favorites: favs };
    });
  }, []);

  const rateTitle = useCallback((titleId: string, rating: number) => {
    setUser(prev => {
      if (!prev) return prev;
      return { ...prev, ratings: { ...prev.ratings, [titleId]: rating } };
    });
  }, []);

  const addToHistory = useCallback((titleId: string) => {
    setUser(prev => {
      if (!prev) return prev;
      const hist = prev.history.filter(h => h.titleId !== titleId);
      return { ...prev, history: [{ titleId, timestamp: Date.now(), progress: 0 }, ...hist].slice(0, 50) };
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, toggleWatchlist, toggleFavorite, rateTitle, addToHistory }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
