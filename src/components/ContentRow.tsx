'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Title } from '@/types';
import TitleCard from './TitleCard';
import { useInView } from '@/hooks';
import Link from 'next/link';

interface ContentRowProps {
  title: string;
  titles: Title[];
  variant?: 'default' | 'wide' | 'compact' | 'ranked';
  seeAllLink?: string;
}

export default function ContentRow({ title, titles, variant = 'default', seeAllLink }: ContentRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref, isInView } = useInView(0.1);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = dir === 'left' ? -400 : 400;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    setTimeout(checkScroll, 400);
  };

  if (titles.length === 0) return null;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
        <h2 className="text-lg sm:text-xl font-display font-bold text-white">{title}</h2>
        <div className="flex items-center gap-2">
          {seeAllLink && (
            <Link href={seeAllLink} className="text-sm text-cv-primary hover:text-cv-primary-hover transition-colors mr-2">
              See All
            </Link>
          )}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto pb-2"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {variant === 'ranked'
          ? titles.slice(0, 10).map((t, i) => (
              <div key={t.id} className="w-[300px] flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                <TitleCard title={t} index={i} variant="ranked" />
              </div>
            ))
          : titles.map((t, i) => (
              <div key={t.id} className="flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                <TitleCard title={t} index={i} variant={variant} />
              </div>
            ))}
      </div>
    </motion.section>
  );
}
