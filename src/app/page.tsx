'use client';

import React from 'react';
import HeroBanner from '@/components/HeroBanner';
import ContentRow from '@/components/ContentRow';
import { mockTitles, getTitlesBySection, SECTION_LABELS } from '@/data/mockData';

const ROWS = [
  'trending', 'new-releases', 'movies', 'series', 'anime',
  'top-rated', 'recently-added', 'continue-watching', 'recommended',
  'editors-picks',
];

export default function HomePage() {
  return (
    <div>
      <HeroBanner titles={mockTitles} />

      <div className="relative z-10 -mt-16 space-y-4">
        {ROWS.map(section => {
          const titles = getTitlesBySection(section);
          const isRanked = section === 'top-rated';
          return (
            <ContentRow
              key={section}
              title={SECTION_LABELS[section] || section}
              titles={titles}
              variant={isRanked ? 'ranked' : section === 'movies' ? 'wide' : 'default'}
              seeAllLink={`/browse?category=${section}`}
            />
          );
        })}
      </div>
    </div>
  );
}
