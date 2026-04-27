export default function PrescriptionsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      {/* Header skeleton */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="h-8 w-48 sm:w-64 bg-slate-200 animate-pulse rounded-lg" />
        <div className="flex gap-2 sm:gap-3">
          <div className="h-10 w-24 bg-slate-200 animate-pulse rounded-full sm:w-28" />
          <div className="h-10 w-28 bg-slate-200 animate-pulse rounded-full sm:w-32" />
        </div>
      </div>

      {/* Search/Filter skeleton */}
      <div className="mb-8">
        <div className="h-12 bg-slate-200 animate-pulse rounded-xl mb-4" />
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="h-12 flex-1 bg-slate-200 animate-pulse rounded-xl" />
          <div className="h-12 w-32 bg-slate-200 animate-pulse rounded-xl" />
        </div>
      </div>

      {/* Prescriptions list skeleton */}
      <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 animate-pulse"
          >
            {/* Top row: Status + Date + Avatar */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
              <div className="flex items-center gap-3 flex-1">
                <div className="h-3 w-20 bg-slate-200 rounded-full" />
                <div className="h-12 w-12 bg-slate-200 rounded-full" />
              </div>
              <div className="h-4 w-24 bg-slate-200 rounded" />
            </div>

            {/* Meds + Dosage */}
            <div className="space-y-3 mb-5">
              <div className="h-5 w-32 bg-slate-200 rounded" />
              <div className="h-4 w-48 sm:w-64 bg-slate-200 rounded" />
              <div className="h-4 w-40 bg-slate-200 rounded" />
            </div>

            {/* Bottom row: Refill + Pharmacy */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-5 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-slate-200 rounded-lg" />
                <div className="h-4 w-20 bg-slate-200 rounded" />
              </div>
              <div className="h-9 w-28 bg-slate-200 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination skeleton (bottom) */}
      <div className="mt-8 flex justify-center">
        <div className="flex gap-2 bg-white p-3 rounded-xl shadow-sm border">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 w-10 bg-slate-200 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}