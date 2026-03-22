// Clean mock Firebase - No env needed
let mockCurrentUser: any = null;

export const auth = {
  currentUser: mockCurrentUser,
  
  signInWithPopup: async () => {
    // Mock Google sign-in (1.5s delay)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    mockCurrentUser = {
      uid: 'mock-user-123',
      displayName: 'Dr. James Wilson',
      email: 'dr.james@healthsaas.com',
      photoURL: 'https://ui-avatars.com/api/?name=James+Wilson&background=ff6b35&color=fff&size=128',
      getIdToken: () => Promise.resolve('mock-jwt-token')
    };
    
    return { 
      user: mockCurrentUser 
    };
  },
  
  signOut: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    mockCurrentUser = null;
  }
} as any;

export const googleProvider = {} as any;
