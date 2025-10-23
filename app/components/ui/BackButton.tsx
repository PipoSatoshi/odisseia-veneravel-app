'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function BackButton() {
  const router = useRouter();
  const [role, setRole] = useState<'driver' | 'admin' | null>(null);
  
  // Esta linha verifica se existe histórico de navegação no browser
  const canGoBack = typeof window !== 'undefined' && window.history.length > 1;

  useEffect(() => {
    const fetchRole = async () => {
      const supabase = createClientComponentClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
        if (profile) setRole(profile.role);
      }
    };
    fetchRole();
  }, []);

  const handleClick = () => {
    // Se houver histórico, volta atrás
    if (canGoBack) {
      router.back();
    // Se não houver histórico, vai para o dashboard do utilizador
    } else if (role) {
      router.push(`/${role}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 left-4 z-10 rounded-full bg-[#9C9B9B] h-12 w-12 flex items-center justify-center text-xl text-[#1D1D1B] hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-white"
      aria-label="Voltar"
    >
      &larr;
    </button>
  );
}