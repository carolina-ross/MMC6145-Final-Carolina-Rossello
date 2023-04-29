import { NextResponse } from 'next/server'
import { getIronSession } from "iron-session/edge";
import sessionOptions from './config/session'
import { useRouter } from 'next/router'

export async function middleware(req) {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, sessionOptions);

  const { user } = session;

  if (!user) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res;
}

export const config = {
  matcher: ["/collections"]
}