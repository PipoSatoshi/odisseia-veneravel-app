// app/api/health/route.ts
export async function GET() {
  const hasUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL)
  const hasAnon = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  return new Response(
    JSON.stringify({
      ok: true,
      envOk: hasUrl && hasAnon,
      urlOk: hasUrl,
      anonOk: hasAnon,
      time: new Date().toISOString()
    }),
    {
      status: 200,
      headers: { 'content-type': 'application/json' }
    }
  )
}