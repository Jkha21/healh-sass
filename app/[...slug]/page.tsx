import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface CatchAllParams {
  params: Promise<{
    slug: (string | undefined)[];
  }>;
}

// Async Server Component (Recommended)
export default async function CatchAll404({ params }: CatchAllParams) {
  // ✅ Await params (Next.js 15+)
  const { slug } = await params;
  
  // Reconstruct path
  const invalidPath = slug 
    ? slug.filter(Boolean).join("/")
    : "unknown";

  console.log(`404: /${invalidPath}`);

  notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-rose-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-lg w-full space-y-8 text-center bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 lg:p-12 border border-white/50">
        
        {/* Icon */}
        <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-xl">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-orange-600 to-gray-900 bg-clip-text text-transparent">
          Page Not Found
        </h1>

        {/* Path Display */}
        <div className="bg-gradient-to-r from-orange-100 to-orange-200 p-4 rounded-2xl border-2 border-orange-200">
          <code className="text-lg font-mono bg-white px-4 py-2 rounded-xl block text-orange-800 font-semibold">
            /{invalidPath}
          </code>
          <p className="text-sm text-orange-700 mt-1">Route doesn't exist</p>
        </div>

        <p className="text-lg text-gray-600">
          The page you're looking for doesn't exist.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Link href="/dashboard" className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:from-orange-600 transition-all h-16 flex items-center justify-center">
            🏠 Dashboard
          </Link>
          <Link href="/" className="px-8 py-4 border-2 border-orange-200 bg-white text-orange-700 font-semibold rounded-2xl hover:bg-orange-50 hover:border-orange-300 transition-all h-16 flex items-center justify-center">
            🌐 Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [];
}