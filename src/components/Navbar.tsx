'use client'

import Link from 'next/link'
import { useSession, signIn } from 'next-auth/react'
import { Logo } from './Logo'

export function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/services" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Serviços
            </Link>
            <Link 
              href="/about" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Sobre
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Contato
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {session ? (
              <Link
                href="/dashboard"
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <button
                  onClick={() => signIn()}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </button>
                <Link
                  href="/register"
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
