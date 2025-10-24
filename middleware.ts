import { NextResponse, type NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl

    // Rotas privadas (protegidas)
    const isProtected =
      pathname.startsWith('/driver') || pathname.startsWith('/admin')

    // Sinal mínimo de sessão (cookies criados pelo Supabase)
    const hasAccessToken =
      Boolean(req.cookies.get('sb-access-token')?.value) ||
      Boolean(req.cookies.get('sb:token')?.value)

    // Sem sessão → redireciona rotas privadas para /
    if (!hasAccessToken && isProtected) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    // A redireção por role a partir de "/" é feita no cliente após login
    return NextResponse.next()
  } catch (e: any) {
    // Nunca quebrar a app: se algo falhar, continua
    console.error('MW runtime error:', e?.message || e)
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/', '/driver/:path*', '/admin/:path*'],
}