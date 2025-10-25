// app/api/debug/route.ts
export async function GET() {
  return new Response(
    JSON.stringify({
      ok: true,
      env: process.env.VERCEL_ENV || 'unknown',
      url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'MISSING',
      anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'MISSING',
      time: new Date().toISOString()
    }),
    { status: 200, headers: { 'content-type': 'application/json' } }
  )
}