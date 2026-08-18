export function Skeleton({ className = '' }) {
  return (
    <div className={`animate-pulse bg-gray-800 rounded ${className}`} />
  );
}

export function EventSkeleton() {
  return (
    <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-4 w-24 mt-2" />
          <Skeleton className="h-4 w-40 mt-1" />
        </div>
        <Skeleton className="w-16 h-8 rounded-full" />
      </div>
      <Skeleton className="h-4 w-32 mt-3" />
      <Skeleton className="h-4 w-48 mt-1" />
    </div>
  );
}