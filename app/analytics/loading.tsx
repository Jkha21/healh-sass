// app/analytics/loading.tsx
"use client";

export default function AnalyticsLoading() {
  return (
    <div className="space-y-6">
      {/* Hero Skeleton */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-400 to-orange-200 px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-7 mb-4 sm:mb-6">
        <div className="relative z-10">
          <div className="h-7 w-40 bg-white/20 rounded-lg mb-2 animate-pulse sm:w-48" />
          <div className="h-4 w-64 bg-white/10 rounded-lg animate-pulse sm:w-96" />
        </div>
        
        {/* Health Score Skeleton */}
        <div className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2">
          <div className="rounded-xl border border-white/25 bg-white/15 backdrop-blur-sm px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 text-center min-w-[100px]">
            <div className="w-12 h-3 bg-white/20 rounded animate-pulse mx-auto mb-1" />
            <div className="w-10 h-7 bg-white/20 rounded animate-pulse mx-auto mb-1" />
            <div className="w-14 h-3 bg-white/20 rounded animate-pulse mx-auto" />
          </div>
        </div>
      </div>

      {/* Filter Row Skeleton */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 mb-6">
        {/* Period Tabs Skeleton */}
        <div className="flex bg-white border border-[#e8c8a8] rounded-xl p-1 gap-1">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-9 w-12 sm:w-14 bg-gray-200 rounded-[9px] animate-pulse"
            />
          ))}
        </div>

        {/* Export Button Skeleton */}
        <div className="h-10 w-32 bg-white border border-[#e8c8a8] rounded-xl animate-pulse lg:w-28" />
      </div>

      {/* Metrics Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse" />
              <div className="w-12 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-32 bg-gray-100 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Patients Trends Chart Skeleton */}
      <div className="rounded-2xl bg-white border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] overflow-hidden mb-6">
        <div className="px-6 py-5 border-b border-orange-100">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-3 w-64 bg-gray-100 rounded animate-pulse" />
        </div>
        <div className="p-6">
          {/* Chart Area Skeleton */}
          <div className="h-80 bg-gray-100 rounded-xl animate-pulse relative">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between p-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-2 w-8 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 right-0 h-8 flex justify-around px-12">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="h-2 w-6 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
            {/* Chart bars placeholder */}
            <div className="absolute inset-0 flex items-end justify-around px-16 pb-8 pt-6">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div
                  key={i}
                  className="w-8 bg-gray-200 rounded-t-lg animate-pulse"
                  style={{ height: `${Math.random() * 150 + 50}px` }}
                />
              ))}
            </div>
          </div>
          
          {/* Legend Skeleton */}
          <div className="flex justify-center gap-6 mt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Diagnostics Panel Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Top Diagnoses Table Skeleton */}
        <div className="rounded-2xl bg-white border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] overflow-hidden">
          <div className="px-6 py-5 border-b border-orange-100">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-56 bg-gray-100 rounded animate-pulse" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-orange-50/50 border-b border-orange-100">
                <tr>
                  {[1, 2, 3, 4].map((i) => (
                    <th key={i} className="px-6 py-3 text-left">
                      <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="border-b border-orange-50">
                    {[1, 2, 3, 4].map((j) => (
                      <td key={j} className="px-6 py-3">
                        <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Donut Chart Skeleton */}
        <div className="rounded-2xl bg-white border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] overflow-hidden">
          <div className="px-6 py-5 border-b border-orange-100">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-48 bg-gray-100 rounded animate-pulse" />
          </div>
          <div className="p-6">
            {/* Donut Chart Placeholder */}
            <div className="relative w-48 h-48 mx-auto">
              <div className="w-full h-full rounded-full bg-gray-100 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mx-auto mb-1" />
                  <div className="h-3 w-20 bg-gray-100 rounded animate-pulse mx-auto" />
                </div>
              </div>
            </div>
            
            {/* Legend Skeleton */}
            <div className="mt-6 space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
                  </div>
                  <div className="h-3 w-12 bg-gray-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}