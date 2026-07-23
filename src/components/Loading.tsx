'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeMap = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className={cn('border-2 border-cv-border border-t-cv-primary rounded-full animate-spin', sizeMap[size])} />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-[100] bg-cv-bg flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-12 h-12 border-3 border-cv-border border-t-cv-primary rounded-full animate-spin" />
        <span className="text-sm text-cv-muted font-medium">Loading CineVerse...</span>
      </motion.div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="w-[180px] sm:w-[220px] flex-shrink-0">
      <div className="aspect-[2/3] rounded-xl bg-cv-card animate-pulse" />
      <div className="mt-2 px-1 space-y-1.5">
        <div className="h-4 bg-cv-card rounded animate-pulse w-3/4" />
        <div className="h-3 bg-cv-card rounded animate-pulse w-1/2" />
      </div>
    </div>
  );
}

export function RowSkeleton() {
  return (
    <div className="mb-8 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
      <div className="h-6 bg-cv-card rounded animate-pulse w-48 mb-4" />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
