import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);

  const handleLogout = async () => {
    try {
      setSigningOut(true);
      await logout();                         // termina a sessão no Supabase
      navigate('/login', { replace: true });  // força ir para /login
    } catch (e) {
      console.error('Erro ao terminar sessão:', e);
      alert('Não foi possível terminar sessão. Tenta novamente.');
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-eerie-black">
      <header className="bg-white dark:bg-gray-800 shadow-soft sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl text-eerie-black dark:text-white">Odisseia Venerável</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-neutral-gray hidden sm:block">Olá, {user?.email || user?.name}</span>
            <button
              onClick={handleLogout}
              disabled={signingOut}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              title="Logout"
            >
              <FiLogOut className="text-neutral-gray" size={20} />
            </button>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;