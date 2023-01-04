import type { NextApiRequest, NextApiResponse } from 'next'
import { SignJWT } from 'jose';
import { SECRET_KEY } from '../../utils/secret'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST"){
    const data = req.body
    console.log(data)
    const token =  await new SignJWT(data)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(new TextEncoder().encode(SECRET_KEY))
    
    res.setHeader('set-cookie', [
      `token=${token}; Path=/;`,
    ]);

    return res.status(200).json({ status: 200, message: 'John Doe', token })
  }
  res.status(400).json({ status: 400, message: 'Method is not allowed' })
}
