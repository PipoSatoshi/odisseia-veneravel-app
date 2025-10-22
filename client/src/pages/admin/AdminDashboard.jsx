import React from 'react';

const AdminDashboard = () => {
    return (
        <div className="p-4 md:p-0">
            <h2 className="text-3xl font-bold mb-6 text-eerie-black dark:text-white">Painel de Controlo do Administrador</h2>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-soft">
                <p className="text-neutral-gray">
                    Aqui serão exibidos todos os filtros, a lista de viagens de todos os motoristas,
                    os botões para criar/editar viagens e para gerar relatórios.
                </p>
                {/* O desenvolvimento do dashboard começaria aqui */}
            </div>
        </div>
    );
};

export default AdminDashboard;