'use client'

import { signIn } from 'next-auth/react'

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Login</h1>
        <button
          onClick={() => signIn('discord', { callbackUrl: '/' })}
          className="w-full bg-[#5865F2] text-white py-2 px-4 rounded hover:bg-[#4752C4] transition-colors"
        >
          Entrar com Discord
        </button>
      </div>
    </div>
  )
}
