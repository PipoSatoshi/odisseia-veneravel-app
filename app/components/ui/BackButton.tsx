'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

export default function BackButton() {
  const router = useRouter()
  const [defaultRoute, setDefaultRoute] = useState('/driver')

  useEffect(() => {
    async function resolveDefaultRoute() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          setDefaultRoute('/driver')
          return
        }
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .maybeSingle()

        if (profile?.role === 'admin') setDefaultRoute('/admin')
        else setDefaultRoute('/driver')
      } catch (e) {
        console.error('BackButton profile error:', (e as any)?.message || e)
        setDefaultRoute('/driver')
      }
    }
    resolveDefaultRoute()
  }, [])

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push(defaultRoute)
    }
  }

  return (
    <button
      onClick={handleBack}
      className="px-4 py-2 text-sm font-medium text-eerie-black bg-silver-40 hover:bg-silver-60 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eerie-black"
      aria-label="Voltar"
    >
      ← Voltar
    </button>
  )
}