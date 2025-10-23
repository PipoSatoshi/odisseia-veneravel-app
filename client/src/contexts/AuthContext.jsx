import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

// Contexto
export const AuthContext = createContext(null);

// Hook nomeado (é isto que as páginas importam)
export function useAuth() {
  return useContext(AuthContext);
}

// Provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchRole(uid) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', uid)
      .single();
    return profile?.role || 'EMPLOYEE';
  }

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user && mounted) {
          const role = await fetchRole(session.user.id);
          setUser({ ...session.user, role });
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;
        if (session?.user) {
          const role = await fetchRole(session.user.id);
          setUser({ ...session.user, role });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe?.();
    };
  }, []);

  async function login(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async function logout() {
    try {
      // Limpa já o estado para evitar loops/redirecionamentos
      setUser(null);
      setLoading(false);
      await supabase.auth.signOut();
    } catch (e) {
      console.error('Erro ao terminar sessão:', e);
    }
  }

  const value = { user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
