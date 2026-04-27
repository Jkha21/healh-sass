// app/appointments/loading.tsx
"use client";

export default function AppointmentsLoading() {
  return (
    <div className="space-y-6">
      {/* Hero Skeleton */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-400 to-orange-200 px-6 sm:px-8 py-6 sm:py-7 mb-6">
        <div className="relative z-10">
          <div className="h-8 w-48 bg-white/20 rounded-lg mb-3 animate-pulse" />
          <div className="h-4 w-64 bg-white/10 rounded-lg animate-pulse" />
        </div>
        
        {/* Stat Badges Skeleton */}
        <div className="relative z-10 flex gap-2.5 flex-wrap mt-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-white/25 bg-white/15 backdrop-blur-sm px-3.5 py-2 text-center min-w-[64px]"
            >
              <div className="w-8 h-6 bg-white/20 rounded animate-pulse mx-auto" />
              <div className="w-12 h-3 bg-white/20 rounded animate-pulse mx-auto mt-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Toolbar Skeleton */}
      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 bg-white rounded-2xl border border-orange-900/[.06] shadow-[0_8px_32px_rgba(232,85,32,.08)] px-4 sm:px-5 py-3.5 mb-5">
        {/* Search Input Skeleton */}
        <div className="flex items-center gap-2 bg-[#fdf8f2] border border-[#e8c8a8] rounded-xl px-3.5 py-2.5 flex-1 min-w-0">
          <div className="w-4 h-4 bg-[#e8c8a8]/50 rounded" />
          <div className="flex-1 h-4 bg-[#e8c8a8]/30 rounded animate-pulse" />
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Select Dropdown Skeleton */}
          <div className="h-11 w-32 border border-[#e8c8a8] rounded-xl bg-white animate-pulse" />
          
          {/* Count Skeleton */}
          <div className="h-4 w-24 bg-orange-100 rounded animate-pulse hidden sm:block" />
          
          {/* View Toggle Skeleton */}
          <div className="flex items-center bg-[#fdf8f2] border border-[#e8c8a8] rounded-[10px] p-0.5">
            <div className="w-16 h-8 bg-[#e8c8a8]/30 rounded-[8px] animate-pulse" />
            <div className="w-20 h-8 bg-[#e8c8a8]/30 rounded-[8px] animate-pulse ml-0.5" />
          </div>

          {/* Button Skeleton */}
          <div className="w-24 h-11 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 animate-pulse" />
        </div>
      </div>

      {/* Date Groups Skeleton */}
      <div className="space-y-6">
        {[1, 2, 3].map((groupIdx) => (
          <div key={groupIdx} className="mb-6">
            {/* Date Header Skeleton */}
            <div className="flex items-center gap-3 mb-3 px-1">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-40 bg-gray-100 rounded animate-pulse" />
              <div className="flex-1 h-px bg-orange-100" />
              <div className="h-5 w-16 bg-orange-50 rounded-full animate-pulse" />
            </div>

            {/* Appointment Cards Skeleton */}
            <div className="space-y-4">
              {[1, 2, 3].map((cardIdx) => (
                <div
                  key={cardIdx}
                  className="bg-white rounded-2xl border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] p-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Left side - Patient info */}
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
                      <div className="space-y-2 flex-1">
                        <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
                        <div className="h-3 w-48 bg-gray-100 rounded animate-pulse" />
                      </div>
                    </div>
                    
                    {/* Right side - Status and time */}
                    <div className="flex items-center gap-4">
                      <div className="text-right space-y-2">
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                        <div className="h-6 w-16 bg-orange-100 rounded-full animate-pulse" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}