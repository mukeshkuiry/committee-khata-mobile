import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type AuthState = {
  token: string | null;
  setToken: (token: string | null) => void;
  restoring: boolean;
};

const STORAGE_KEY = 'auth.token';

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [restoring, setRestoring] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function restore() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (!cancelled) setTokenState(saved);
      } finally {
        if (!cancelled) setRestoring(false);
      }
    }
    restore();
    return () => {
      cancelled = true;
    };
  }, []);

  const setToken = (next: string | null) => {
    setTokenState(next);
    if (next) AsyncStorage.setItem(STORAGE_KEY, next);
    else AsyncStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(() => ({ token, setToken, restoring }), [token, restoring]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
