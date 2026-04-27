// app/dashboard/loading.tsx
"use client";

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner Skeleton */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-400 to-orange-200 p-7 mb-7">
        <div className="relative z-10">
          <div className="h-8 w-48 bg-white/20 rounded-lg mb-3 animate-pulse" />
          <div className="h-4 w-72 bg-white/10 rounded-lg animate-pulse" />
        </div>
        
        {/* Date Badge Skeleton */}
        <div className="absolute right-7 top-1/2 -translate-y-1/2 hidden sm:block">
          <div className="rounded-xl border border-white/25 bg-white/15 backdrop-blur-sm px-5 py-2.5 text-center">
            <div className="w-10 h-3 bg-white/20 rounded animate-pulse mx-auto mb-2" />
            <div className="w-8 h-8 bg-white/20 rounded animate-pulse mx-auto mb-1" />
            <div className="w-10 h-3 bg-white/20 rounded animate-pulse mx-auto" />
          </div>
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse" />
              <div className="w-12 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-1" />
            <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Main Content Row Skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5 mb-7">
        {/* Patient List Skeleton */}
        <div className="rounded-2xl bg-white border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] overflow-hidden">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5 border-b border-orange-100">
            <div>
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-3 w-48 bg-gray-100 rounded animate-pulse" />
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
              <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-3.5 py-2">
                <div className="w-3 h-3 bg-[#e8c8a8]/50 rounded" />
                <div className="w-32 h-4 bg-[#e8c8a8]/30 rounded animate-pulse" />
              </div>
              <div className="h-10 w-28 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl animate-pulse" />
            </div>
          </div>

          {/* Filter Tabs Skeleton */}
          <div className="flex gap-1 px-6 pt-3 border-b border-orange-100">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 w-16 bg-gray-200 rounded-t-lg animate-pulse" />
            ))}
          </div>

          {/* Patient Rows Skeleton */}
          <div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3.5 px-6 py-3.5 border-b border-orange-50 last:border-0"
              >
                <div className="w-11 h-11 rounded-full bg-gray-200 animate-pulse shrink-0" />
                <div className="flex-1">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-1" />
                  <div className="h-3 w-40 bg-gray-100 rounded animate-pulse" />
                </div>
                <div className="hidden sm:flex flex-col items-end gap-1.5">
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                  <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side Panel Skeleton */}
        <div className="flex flex-col gap-5">
          {/* Quick Actions Skeleton */}
          <div className="rounded-2xl bg-white border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] p-5">
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse" />
                  <div className="h-3 w-12 bg-gray-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Alerts Skeleton */}
          <div className="rounded-2xl bg-white border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] overflow-hidden">
            <div className="px-6 py-5 border-b border-orange-100">
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-3 w-32 bg-gray-100 rounded animate-pulse" />
            </div>
            <div>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 px-5 py-3.5 border-b border-orange-50 last:border-0"
                >
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse mt-1.5" />
                  <div className="flex-1">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-1" />
                    <div className="h-3 w-48 bg-gray-100 rounded animate-pulse" />
                  </div>
                  <div className="h-3 w-12 bg-gray-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Upcoming Schedule Skeleton */}
        <div className="rounded-2xl bg-white border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] overflow-hidden">
          <div className="px-6 py-5 border-b border-orange-100">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-32 bg-gray-100 rounded animate-pulse" />
          </div>
          <div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-5 py-3 border-b border-orange-50 last:border-0"
              >
                <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                <div className="flex-1">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-1" />
                  <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
                </div>
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Chart Skeleton */}
        <div className="rounded-2xl bg-white border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] overflow-hidden">
          <div className="px-6 py-5 border-b border-orange-100">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-48 bg-gray-100 rounded animate-pulse" />
          </div>
          <div className="p-6">
            <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}