// app/records/loading.tsx
"use client";

import AppLayout from "@/app/components/common/AppLayout";
import { RecordStats } from "@/app/components/records";

export default function RecordsLoading() {
  return (
    <AppLayout
      title="Records"
      activeItem="records"
      breadcrumbs={[{ label: "Dashboard" }, { label: "Records" }]}
    >
      {/* ══ Hero skeleton ══════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-400 to-orange-200 px-6 sm:px-8 py-6 sm:py-7 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <span className="pointer-events-none absolute -top-12 -right-12 w-52 h-52 rounded-full bg-white/[.06]" />
        <span className="pointer-events-none absolute bottom-0 left-1/3 w-32 h-32 rounded-full bg-white/[.04]" />
        <div className="relative z-10">
          <h1 className="font-display text-2xl sm:text-[26px] font-extrabold text-white leading-tight mb-1 w-64 h-7 bg-white/20 rounded-lg animate-pulse" />
          <div className="text-sm text-white/75 space-y-1">
            <div className="h-4 w-64 bg-white/20 rounded animate-pulse" />
            <div className="h-4 w-48 bg-white/20 rounded animate-pulse" />
          </div>
        </div>
        <RecordStats
          totalCount={0}
          recentCount={0}
          criticalCount={0}
          pendingCount={0}
        />
      </div>

      {/* ══ Toolbar skeleton ═══════════════════════════════════════════ */}
      <div className="bg-white rounded-2xl border border-orange-900/[.06] shadow-[0_8px_32px_rgba(232,85,32,.08)] px-4 sm:px-5 py-3.5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
          {/* Search / filters */}
          <div className="flex-1 min-w-0 sm:min-w-[240px] flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0 animate-pulse" />
            <div className="flex-1 h-8 bg-gray-200 rounded-xl animate-pulse" />
          </div>

          {/* Toggle icons */}
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"
              />
            ))}
          </div>

          {/* View toggle */}
          <div className="h-8 bg-gray-200 w-28 rounded-[10px] animate-pulse" />
        </div>

        {/* Type filter bar skeleton */}
        <div className="mt-3 flex flex-wrap gap-2.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-8 px-4 rounded-xl bg-white/30 border border-white/20 animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* ══ Stats / mini‑cards skeleton ═════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-white/25 backdrop-blur-sm p-4 animate-pulse"
          >
            <div className="h-3 w-24 bg-gray-200 rounded mb-1" />
            <div className="h-5 w-16 bg-gray-200 rounded" />
          </div>
        ))}
      </div>

      {/* ══ Grid skeleton ═══════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] p-4 h-32 animate-pulse"
          >
            <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-1/2 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </AppLayout>
  );
}