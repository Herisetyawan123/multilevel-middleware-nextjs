
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import { SECRET_KEY } from '../utils/secret'


export async function authCheck(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  
  if (!token) return { status: false, role: null }

  const decode = await jwtVerify(token,  new TextEncoder().encode(SECRET_KEY))
  return { status: true, role: decode.payload.role }
}