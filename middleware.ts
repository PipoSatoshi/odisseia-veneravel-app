export function middleware(req: NextRequest) {
  const res = NextResponse.next()
  try {
    const { pathname } = req.nextUrl
    const isProtected = pathname.startsWith('/driver') || pathname.startsWith('/admin')

    // Sinal mínimo de sessão: cookie do Supabase
    const hasAccessToken =
      Boolean(req.cookies.get('sb-access-token')?.value) ||
      Boolean(req.cookies.get('sb:token')?.value)

    if (!hasAccessToken && isProtected) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    // Redireção por role a partir de "/" fica no cliente (pós-login)
    return res
  } catch (e: any) {
    console.error('MW runtime error:', e?.message || e)
    return res // nunca 500
  }
}

export const config = {
  matcher: ['/', '/driver/:path*', '/admin/:path*'],
}
```