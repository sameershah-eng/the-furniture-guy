import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide' | 'tall';
  containerClassName?: string;
  focalPoint?: string;
  fallbackTitle?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  priority = false,
  aspectRatio,
  containerClassName,
  className,
  focalPoint,
  fallbackTitle,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    wide: 'aspect-[16/9]',
    tall: 'aspect-[9/16]',
  };

  if (hasError) {
    return (
      <div
        className={cn(
          'relative w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-gradient-to-br from-[#F5F5F7] via-[#E8D3B9]/30 to-[#DCDDE1]',
          aspectRatio ? aspectClasses[aspectRatio] : '',
          containerClassName
        )}
      >
        <Sparkles className="w-8 h-8 text-[#C9A27E] mb-2 opacity-70 animate-pulse" />
        <p className="font-serif text-lg font-medium text-[#1C1B1F] tracking-tight">
          {fallbackTitle || alt || 'The Furniture Guy'}
        </p>
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#6B6670] mt-1">
          Bespoke Glam Showpiece
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-[#F5F5F7]',
        aspectRatio ? aspectClasses[aspectRatio] : '',
        containerClassName
      )}
    >
      {/* Skeleton / Shimmer placeholder while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#EEE8E1]/60 animate-pulse" />
      )}

      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        style={{
          objectPosition: focalPoint || 'center center',
        }}
        className={cn(
          'w-full h-full object-cover transition-all duration-700 client-photo-treatment',
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105 blur-sm',
          className
        )}
        {...props}
      />
    </div>
  );
};
