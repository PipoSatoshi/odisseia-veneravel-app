import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Logout() {
const { logout } = useAuth();

useEffect(() => {
const doLogout = async () => {
try {
await logout(); // termina sessão + limpa estado
} finally {
// navegação “forte” para evitar qualquer loop
window.location.replace('/login');
}
};
doLogout();
}, [logout]);

return (
<div className="flex items-center justify-center h-screen">
A terminar sessão...
</div>
);
}