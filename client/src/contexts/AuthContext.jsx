import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const { data } = await api.get('/api/auth/me');
                setUser(data);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkUser();
    }, []);

    const login = async (email, password) => {
        try {
            setError(null);
            const { data } = await api.post('/api/auth/login', { email, password });
            setUser(data);
            const targetPath = data.role === 'EMPLOYER' ? '/admin/dashboard' : '/employee/log';
            navigate(targetPath);
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao fazer login.');
            console.error(err);
        }
    };

    const logout = async () => {
        try {
            await api.post('/api/auth/logout');
            setUser(null);
            navigate('/login');
        } catch (err) {
            console.error('Erro ao fazer logout', err);
        }
    };

    const value = { user, login, logout, loading, error, setLoading };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);