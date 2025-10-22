import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FiLogOut } from 'react-icons/fi';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-eerie-black">
            <header className="bg-white dark:bg-gray-800 shadow-soft sticky top-0 z-10">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl text-eerie-black dark:text-white">
                        Odisseia Venerável
                    </h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-neutral-gray hidden sm:block">Olá, {user?.name}</span>
                        <button onClick={logout} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition" title="Logout">
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