import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  token: string | null;
  setAuth: (token: string, user: { name: string; email: string }) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  setAuth: (token, user) => set({ token, user, isAuthenticated: true }),
  logout: () => set({ token: null, user: null, isAuthenticated: false }),
}));

export default useAuthStore;
