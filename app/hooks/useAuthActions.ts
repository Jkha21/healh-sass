// hooks/useAuthActions.ts
"use client";
import { useRouter } from "next/navigation";
import useAuthStore from "../store/useAuthStore";

export function useAuthActions() {
  const router = useRouter();
  const { signOut: storeSignOut } = useAuthStore();

  const signOut = async () => {
    try {
      // 1. Clear server session cookie
      await fetch('/api/sessionLogin', { method: 'DELETE' });
      // 2. Clear client state  
      await storeSignOut();
      // 3. Go to ROOT (/)
      router.replace("/"); // ✅ ROOT not /login
    } catch (e) {
      console.error("Sign-out failed:", e);
      router.replace("/"); // Fallback to root
    }
  };

  return { signOut };
}
