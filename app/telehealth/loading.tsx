// app/telehealth/loading.tsx
"use client";

export default function TeleHealthLoading() {
  return (
    <div className="space-y-4">
      {/* Hero Skeleton */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-400 to-orange-200 px-6 sm:px-8 py-6 sm:py-7 mb-6">
        <div className="relative z-10">
          <div className="h-8 w-40 bg-white/20 rounded-lg mb-3 animate-pulse" />
          <div className="h-4 w-64 bg-white/10 rounded-lg animate-pulse" />
        </div>
        <div className="relative z-10 flex gap-2.5 flex-wrap mt-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-white/25 bg-white/15 backdrop-blur-sm px-4 py-2.5 min-w-[70px]"
            >
              <div className="w-10 h-6 bg-white/20 rounded animate-pulse mx-auto" />
              <div className="w-14 h-3 bg-white/20 rounded animate-pulse mx-auto mt-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-10 w-24 bg-gray-200 rounded-xl animate-pulse shrink-0" />
        ))}
      </div>

      {/* Search Skeleton */}
      <div className="bg-white rounded-2xl border px-5 py-3.5 mb-5">
        <div className="h-10 bg-gray-200 rounded-xl animate-pulse" />
      </div>

      {/* Cards Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl border p-5 h-32 animate-pulse" />
        ))}
      </div>
    </div>
  );
}