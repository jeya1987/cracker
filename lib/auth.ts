import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  user: { username: string; role: string } | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: any) => void;
  logout: () => void;
  setToken: (token: string | null) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      setAuth: (token: string, user: any) => {
        set({
          token,
          user,
          isAuthenticated: true
        });
        localStorage.setItem('auth_token', token);
        localStorage.setItem('auth_user', JSON.stringify(user));
      },

      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false
        });
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      },

      setToken: (token: string | null) => {
        set({ token });
        if (token) {
          localStorage.setItem('auth_token', token);
        } else {
          localStorage.removeItem('auth_token');
        }
      }
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: (name: string) => {
          try {
            const item = localStorage.getItem(name);
            return item ? JSON.parse(item) : null;
          } catch {
            return null;
          }
        },
        setItem: (name: string, value: any) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name: string) => {
          localStorage.removeItem(name);
        }
      }
    }
  )
);
