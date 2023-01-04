import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authCheck } from './lib/auth';

export async function middleware(request: NextRequest) {
  const verify = await authCheck(request);
  console.log(verify.role == "admin")
  if(verify.status){
    if(verify.role == "admin" && request.nextUrl.pathname.startsWith("/admin")){
      return NextResponse.next()
    }else if(verify.role == "user" && request.nextUrl.pathname.startsWith("/users")){
      return NextResponse.next()
    }
  }
  return NextResponse.redirect(new URL('/', request.url))  
}

export const config = {
  matcher: ['/users/:path*', '/admin/:path*'],
}