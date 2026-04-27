export default function PatientsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50/50 p-0">
      {/* Hero Section Skeleton */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-400 to-orange-200 px-6 sm:px-8 py-7 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 animate-pulse">
        <span className="pointer-events-none absolute -top-12 -right-12 w-52 h-52 rounded-full bg-white/[.07]" />
        <div className="relative z-10 space-y-2">
          <div className="h-8 w-64 sm:w-80 bg-white/20 backdrop-blur-sm rounded-xl" />
          <div className="h-4 w-56 sm:w-72 bg-white/15 backdrop-blur-sm rounded-lg" />
        </div>
        {/* Stat badges skeleton */}
        <div className="grid grid-cols-3 md:flex gap-3 w-full md:w-auto shrink-0">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-xl border border-white/25 bg-white/15 backdrop-blur-sm px-3 sm:px-4 py-2.5 text-center flex-1">
              <div className="h-7 sm:h-8 w-12 mx-auto bg-white/30 rounded-lg" />
              <div className="h-3 w-16 mx-auto bg-white/20 rounded mt-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Toolbar Skeleton */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 bg-white rounded-2xl border border-orange-900/[.06] shadow-[0_8px_32px_rgba(232,85,32,.10)] px-4 sm:px-5 py-4 mb-5 animate-pulse">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          {/* Search input */}
          <div className="flex items-center gap-2 bg-[#fdf8f2] border border-[#e8c8a8] rounded-xl px-3.5 py-2.5 flex-1">
            <div className="w-3.5 h-3.5 bg-[#c8a888]/50 rounded-full" />
            <div className="h-4 w-24 bg-slate-200 rounded" />
          </div>
          {/* Status filter */}
          <div className="h-10 flex-1 bg-white border border-[#e8c8a8] rounded-xl w-full sm:w-auto" />
        </div>

        {/* Right controls skeleton */}
        <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 lg:ml-auto">
          <div className="h-4 w-20 bg-slate-200 rounded" />
          <div className="flex items-center gap-3">
            {/* View toggle skeleton */}
            <div className="flex items-center bg-[#fdf8f2] border border-[#e8c8a8] rounded-[10px] p-0.5 w-28 h-9" />
            {/* Add button skeleton */}
            <div className="h-10 w-28 sm:w-32 bg-gradient-to-r from-orange-500/20 to-orange-400/20 border border-orange-500/30 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Grid/List Content Skeleton - Defaults to grid view */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 animate-pulse">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{ animationDelay: `${i * 0.05}s` }}
            className="relative flex flex-col bg-white rounded-2xl border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] overflow-hidden transition-all duration-200"
          >
            {/* Status bar */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-300 to-orange-500" />
            
            {/* Avatar + Name section */}
            <div className="flex flex-col items-center gap-3.5 px-6 pt-7 pb-5 border-b border-orange-100">
              <div className="w-[72px] h-[72px] rounded-[20px] bg-gradient-to-br from-orange-200/50 to-orange-400/50 shadow-[0_8px_24px_rgba(232,85,32,.25)]" />
              <div className="space-y-1 w-full text-center">
                <div className="h-6 w-32 mx-auto bg-slate-200 rounded-lg" />
                <div className="h-3 w-16 mx-auto bg-slate-200/50 rounded" />
              </div>
              {/* Status badge */}
              <div className="h-6 w-24 bg-gradient-to-r from-green-300/50 to-green-600/50 rounded-full" />
            </div>
            
            {/* Details section */}
            <div className="flex flex-col gap-2.5 px-5 py-4 flex-1">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="flex items-center justify-between h-4">
                  <div className="w-16 h-3 bg-slate-200 rounded" />
                  <div className="w-20 h-3 bg-slate-200 rounded" />
                </div>
              ))}
            </div>
            
            {/* Footer */}
            <div className="flex items-center justify-between gap-2 px-5 py-3.5 border-t border-orange-50">
              <div className="h-3.5 w-20 bg-slate-200 rounded" />
              <div className="h-9 w-20 bg-slate-200 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}