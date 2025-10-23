import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  const { pathname } = request.nextUrl;
  
  const heads = new Headers(request.headers);
  heads.set('next-url', request.nextUrl.pathname);

  // Se o user já tem sessão e está a tentar aceder à pág de login, redireciona-o para o seu dashboard
  if (session && pathname === '/') {
    // Esta query é um pouco mais lenta, mas necessária aqui
    const { data: profile } = await supabase.from('profiles').select('role').single();
    const targetUrl = new URL(`/${profile?.role || 'driver'}`, request.url);
    return NextResponse.redirect(targetUrl);
  }
  
  // Se não tem sessão e não está na pág de login, manda-o para o login
  if (!session && pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Deixa o resto da lógica para as páginas, mas passa o URL atual nos headers
  return NextResponse.next({ request: { headers: heads } });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};