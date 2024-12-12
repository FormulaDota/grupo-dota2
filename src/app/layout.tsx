import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rankeds em grupo Dota 2',
  description: 'Encontre grupos para jogar Dota 2',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-900 text-white">
        {children}
      </body>
    </html>
  )
}
