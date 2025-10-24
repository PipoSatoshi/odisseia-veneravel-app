import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { pathname } = req.nextUrl

  const isAuthRoute = pathname === '/'
  const isProtected =
    pathname.startsWith('/driver') || pathname.startsWith('/admin')

  // Sem sessão → proteger rotas
  if (!session && isProtected) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Com sessão → redirecionar / para dashboard
  if (session && isAuthRoute) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .maybeSingle()

    if (profile?.role === 'admin') {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
    if (profile?.role === 'driver') {
      return NextResponse.redirect(new URL('/driver', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/', '/driver/:path*', '/admin/:path*'],
}