import { NextResponse, type NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl

    // Proteger apenas rotas privadas
    const isProtected =
      pathname.startsWith('/driver') || pathname.startsWith('/admin')

    // Sinal mínimo de sessão (cookies do Supabase)
    const hasAccessToken =
      Boolean(req.cookies.get('sb-access-token')?.value) ||
      Boolean(req.cookies.get('sb:token')?.value)

    if (!hasAccessToken && isProtected) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
  } catch (e: any) {
    console.error('MW runtime error:', e?.message || e)
    // Nunca quebrar a app
    return NextResponse.next()
  }
}

export const config = {
  // NÃO inclui '/', só guarda /driver e /admin
  matcher: ['/driver/:path*', '/admin/:path*'],
}