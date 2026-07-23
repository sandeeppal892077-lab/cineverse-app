'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

const FOOTER_LINKS = {
  'Browse': [
    { label: 'Movies', href: '/browse?type=movies' },
    { label: 'TV Shows', href: '/browse?type=tv-shows' },
    { label: 'Web Series', href: '/browse?type=web-series' },
    { label: 'Anime', href: '/browse?category=anime' },
    { label: 'Comics', href: '/browse?category=comics' },
    { label: 'Documentaries', href: '/browse?type=documentary' },
  ],
  'Genres': [
    { label: 'Action', href: '/browse?genre=Action' },
    { label: 'Comedy', href: '/browse?genre=Comedy' },
    { label: 'Drama', href: '/browse?genre=Drama' },
    { label: 'Horror', href: '/browse?genre=Horror' },
    { label: 'Sci-Fi', href: '/browse?genre=Sci-Fi' },
    { label: 'Fantasy', href: '/browse?genre=Fantasy' },
  ],
  'Company': [
    { label: 'About Us', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
  ],
  'Support': [
    { label: 'Help Center', href: '#' },
    { label: 'Terms of Use', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Cookie Settings', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-cv-surface/50 border-t border-cv-border/50 mt-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-cv-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-lg font-bold text-white">Cine<span className="text-cv-primary">Verse</span></span>
            </Link>
            <p className="text-sm text-cv-muted leading-relaxed mb-4">
              Your premium destination for movies, series, anime, comics, and more.
            </p>
            <p className="text-xs text-cv-muted/60">
              &copy; 2024 CineVerse. All rights reserved.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold text-white mb-3">{heading}</h3>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-cv-muted hover:text-cv-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
