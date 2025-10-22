import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Importa o nosso novo cliente Supabase

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', session.user.id)
                    .single();
                
                setUser({ ...session.user, role: profile?.role || 'EMPLOYEE' });
            }
            setLoading(false);
        };
        
        getSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                if (session?.user) {
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('role')
                        .eq('id', session.user.id)
                        .single();

                    setUser({ ...session.user, role: profile?.role || 'EMPLOYEE' });
                } else {
                    setUser(null);
                }
                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    };

    const value = {
        user,
        login,
        logout,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);