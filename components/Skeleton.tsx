
import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return <div className={`skeleton rounded-lg ${className}`} />;
};

export const AvatarSkeleton = () => (
  <div className="rounded-2xl glass p-1 border-slate-200 dark:border-slate-800">
    <Skeleton className="aspect-[4/5] rounded-xl mb-4" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  </div>
);
