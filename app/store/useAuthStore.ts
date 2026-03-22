import { create } from 'zustand';
import { auth } from '../lib/firebase';
import { User, AuthState } from '../types/auth';
import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  signInWithGoogle: async () => {
    try {
      set({ loading: true, error: null });
      const result = await signInWithPopup(auth, googleProvider);
      set({
        user: result.user as User,
        error: null,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Sign in failed',
        loading: false,
      });
      throw error;
    }
  },

  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      set({ user: null, error: null, loading: false });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  },
}));

export default useAuthStore;