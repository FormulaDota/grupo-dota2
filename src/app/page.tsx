'use client'

import { useState } from 'react'

export default function Home() {
  const [groups, setGroups] = useState([])

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Rankeds em grupo Dota 2</h1>
      <div className="grid gap-4">
        {/* Conteúdo principal aqui */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl mb-4">Grupos Disponíveis</h2>
          {/* Lista de grupos será implementada aqui */}
        </div>
      </div>
    </main>
  )
}
