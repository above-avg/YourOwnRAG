import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <div className="absolute inset-0 rounded-full border-2 border-ai-primary/20"></div>
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-ai-primary animate-spin"></div>
      <div className="absolute inset-1 rounded-full border border-ai-secondary/40"></div>
      <div className="absolute inset-1 rounded-full border border-transparent border-t-ai-secondary animate-spin animate-reverse" style={{ animationDuration: '1.5s' }}></div>
    </div>
  );
};