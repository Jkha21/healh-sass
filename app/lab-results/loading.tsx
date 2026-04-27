// app/lab-results/loading.tsx
"use client";

export default function LabResultsLoading() {
  return (
    <div className="space-y-6">
      {/* Hero Skeleton */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-400 to-orange-200 px-6 sm:px-8 py-6 sm:py-7 mb-6">
        <div className="relative z-10">
          <div className="h-8 w-32 bg-white/20 rounded-lg mb-3 animate-pulse" />
          <div className="h-4 w-64 bg-white/10 rounded-lg animate-pulse" />
        </div>
        
        {/* Stat Badges Skeleton */}
        <div className="relative z-10 flex gap-2.5 flex-wrap mt-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-white/25 bg-white/15 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-2.5 text-center min-w-[58px]"
            >
              <div className="w-8 h-6 bg-white/20 rounded animate-pulse mx-auto" />
              <div className="w-10 h-3 bg-white/20 rounded animate-pulse mx-auto mt-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Critical Alert Banner Skeleton */}
      <div className="flex items-start gap-3 bg-red-50/50 border border-red-200 rounded-xl px-4 py-3.5 mb-5">
        <div className="w-6 h-6 bg-red-200 rounded-full animate-pulse shrink-0" />
        <div className="flex-1">
          <div className="h-4 w-48 bg-red-200 rounded animate-pulse mb-2" />
          <div className="h-3 w-72 bg-red-100 rounded animate-pulse" />
        </div>
      </div>

      {/* Status Filter Tabs Skeleton */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-1 px-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-9 w-24 bg-gray-200 rounded-xl animate-pulse shrink-0"
          />
        ))}
      </div>

      {/* Toolbar Skeleton */}
      <div className="bg-white rounded-2xl border border-orange-900/[.06] shadow-[0_8px_32px_rgba(232,85,32,.08)] px-4 sm:px-5 py-3.5 mb-5 space-y-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Search Input Skeleton */}
          <div className="flex items-center gap-2 bg-[#fdf8f2] border border-[#e8c8a8] rounded-xl px-3.5 py-2.5 flex-1 min-w-[160px]">
            <div className="w-4 h-4 bg-[#e8c8a8]/50 rounded" />
            <div className="flex-1 h-4 bg-[#e8c8a8]/30 rounded animate-pulse" />
          </div>
          
          {/* Category Select Skeleton */}
          <div className="h-11 w-40 border border-[#e8c8a8] rounded-xl bg-white animate-pulse" />
          
          {/* Count Skeleton */}
          <div className="h-4 w-24 bg-orange-100 rounded animate-pulse hidden sm:block" />
          
          {/* Button Skeleton */}
          <div className="w-28 h-11 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 animate-pulse ml-auto" />
        </div>
      </div>

      {/* Category Chips Skeleton */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 -mx-1 px-1">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            className="h-9 w-20 bg-gray-200 rounded-xl animate-pulse shrink-0"
          />
        ))}
      </div>

      {/* Result Cards Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((cardIdx) => (
          <div
            key={cardIdx}
            className="bg-white rounded-2xl border border-orange-900/[.07] shadow-[0_4px_20px_rgba(232,85,32,.06)] overflow-hidden"
          >
            {/* Top accent bar */}
            <div className="h-[3px] w-full bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse" />
            
            {/* Card Header Skeleton */}
            <div className="px-5 pt-4 pb-3.5">
              <div className="flex items-start gap-3">
                {/* Category Icon Skeleton */}
                <div className="w-11 h-11 rounded-xl bg-gray-200 animate-pulse shrink-0" />
                
                {/* Title Block Skeleton */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                      <div className="h-5 w-14 bg-gray-200 rounded-full animate-pulse" />
                    </div>
                    <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                  </div>
                  <div className="h-5 w-48 bg-gray-200 rounded animate-pulse mb-1" />
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-1 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
              
              {/* Patient Row Skeleton */}
              <div className="flex items-center justify-between gap-3 mt-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gray-200 animate-pulse" />
                  <div>
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-1" />
                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
                <div className="h-5 w-24 bg-gray-200 rounded-full animate-pulse" />
              </div>
            </div>
            
            {/* Expand Section Skeleton */}
            <div className="px-5 py-2.5 bg-orange-50/60 border-y border-orange-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                  <div className="hidden sm:flex items-center gap-1.5">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
                    ))}
                  </div>
                </div>
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            
            {/* Footer Skeleton */}
            <div className="px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-1 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-28 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-8 w-16 bg-gray-200 rounded-lg animate-pulse" />
                <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}