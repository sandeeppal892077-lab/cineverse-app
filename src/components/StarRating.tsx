'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating?: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

export default function StarRating({ rating = 0, maxStars = 5, size = 'md', interactive = false, onRate }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  const sizeMap = { sm: 'w-3.5 h-3.5', md: 'w-5 h-5', lg: 'w-7 h-7' };
  const stars = interactive && hovered > 0 ? hovered : Math.round(rating / 2);

  return (
    <div className="flex items-center gap-0.5" onMouseLeave={() => interactive && setHovered(0)}>
      {Array.from({ length: maxStars }).map((_, i) => (
        <button
          key={i}
          disabled={!interactive}
          onClick={() => interactive && onRate?.((i + 1) * 2)}
          onMouseEnter={() => interactive && setHovered(i + 1)}
          className={cn(
            'transition-transform',
            interactive && 'hover:scale-125 cursor-pointer',
            !interactive && 'cursor-default'
          )}
        >
          <Star
            className={cn(
              sizeMap[size],
              i < stars
                ? 'text-cv-gold fill-cv-gold'
                : 'text-cv-border fill-cv-border/20'
            )}
          />
        </button>
      ))}
    </div>
  );
}
