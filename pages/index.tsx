import Head from 'next/head'
import { Inter } from '@next/font/google'
import Router from "next/router";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const postLogin = async (data: Object) => {
    const res = await fetch('/api/login', {
      method: "POST",
      headers: {
        'content-type': 'application/json',
      },
  
      body: JSON.stringify(data)
    })
    const result = await res.json()
    return result
  }

  const handleUserLogin = async () => {
    const data = {
      name: "user",
      role: "user"
    }
    const result = await postLogin(data)
    Router.replace('/users')
  }
  
  const handleAdminLogin = async () => {
    const data = {
      name: "admin",
      role: "admin"
    }
    const result = await postLogin(data)
    console.log(result)
    Router.replace('/admin')
  }

  return (
    <>
      <Head>
        <title>Next Middleware</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className='flex justify-center items-center gap-x-2 h-screen w-screen'>
        <button className='px-3 py-2 bg-red-500 rounded-md text-white font-semibold' onClick={handleUserLogin}>
          login user
        </button>
        <button className='px-3 py-2 bg-red-500 rounded-md text-white font-semibold' onClick={handleAdminLogin}>
          login admin
        </button>
      </main>
    </>
  )
}
