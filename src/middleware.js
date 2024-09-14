import { NextResponse } from 'next/server';

export function middleware(request) {
  const loggedin = request.cookies.get('authjs.session-token')?.value;

  const loggedUserRestrictedPaths = ['/auth/signup', '/auth/signin'];

  const isRestrictedPath = loggedUserRestrictedPaths.includes(request.nextUrl.pathname);

  if (loggedin && isRestrictedPath) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (!loggedin && !isRestrictedPath) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home', '/auth/signup', '/auth/signin'], // Add other protected routes here as needed
};
