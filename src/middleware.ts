import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/api/auth/signin', request.url))
    }
    // TODO: Add proper admin check here
    // For now, we'll allow any authenticated user
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
