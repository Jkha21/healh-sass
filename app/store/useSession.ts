// hooks/useSession.ts
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export interface SessionData {
  email?: string;
  name?: string;
  picture?: string;
  sub?: string;
}

export function useSession(requireAuth: boolean = false) {
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check session by calling an API that verifies the cookie
    const checkSession = async () => {
      try {
        const res = await fetch('/api/sessionCheck', {
          method: 'GET',
          credentials: 'include', // Send cookies
        });

        if (res.ok) {
          const data = await res.json();
          setSession(data);
        } else {
          setSession(null);
          
          // Redirect if auth is required
          if (requireAuth) {
            router.replace('/login');
          }
        }
      } catch (error) {
        setSession(null);
        if (requireAuth) {
          router.replace('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [requireAuth, router]);

  return { session, loading, isAuthenticated: !!session };
}
