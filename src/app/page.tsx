import { Navbar } from '@/components/Navbar'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Evolua seu MMR com a
              <span className="text-red-600"> FormulaDota</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Aumente seu ranking com nossa equipe profissional. 
              Serviço seguro, rápido e com garantia de satisfação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/services"
                className="bg-red-600 text-white px-8 py-3 rounded-md hover:bg-red-700 transition-colors text-lg font-semibold"
              >
                Ver Serviços
              </Link>
              <Link
                href="/about"
                className="bg-gray-800 text-white px-8 py-3 rounded-md hover:bg-gray-700 transition-colors text-lg font-semibold"
              >
                Saiba Mais
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-red-600 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Rápido e Eficiente</h3>
              <p className="text-gray-300">Resultados rápidos com nossa equipe de jogadores profissionais.</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-red-600 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">100% Seguro</h3>
              <p className="text-gray-300">Sua conta protegida com nosso sistema de segurança avançado.</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-red-600 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Garantia de Qualidade</h3>
              <p className="text-gray-300">Satisfação garantida ou seu dinheiro de volta.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
