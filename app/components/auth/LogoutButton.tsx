'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    // O router.refresh() é importante para garantir que o estado é limpo
    router.refresh(); 
  };

  return (
    <button
      onClick={handleLogout}
      className="absolute top-4 right-4 z-10 rounded bg-[#1D1D1B] py-1 px-3 text-sm text-[#9C9B9B] border border-[#9C9B9B] hover:bg-[#9C9B9B] hover:text-[#1D1D1B] focus:outline-none focus:ring-2 focus:ring-white"
    >
      Logout
    </button>
  );
}