'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabaseClient'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
    } catch (e) {
      console.error('Logout error:', (e as any)?.message || e)
    } finally {
      router.push('/')
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm font-medium text-white bg-eerie-black hover:bg-eerie-black-80 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eerie-black"
      aria-label="Terminar sessão"
    >
      Terminar sessão
    </button>
  )
}