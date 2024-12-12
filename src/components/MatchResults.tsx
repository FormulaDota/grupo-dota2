'use client'

import { useState, useEffect } from 'react'

interface QueueEntry {
  id: string
  user: {
    steamId: string
    discordId: string
  }
  currentMmr: number
  targetMmr: number
  status: string
}

export function MatchResults() {
  const [activeEntries, setActiveEntries] = useState<QueueEntry[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchActiveEntries()
  }, [])

  const fetchActiveEntries = async () => {
    const response = await fetch('/api/admin/active-entries')
    const data = await response.json()
    setActiveEntries(data)
  }

  const submitMatchResult = async (
    entryId: string,
    result: 'WIN' | 'LOSS',
    tokenUsed: boolean
  ) => {
    setLoading(true)
    try {
      await fetch('/api/admin/match-result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          entryId,
          result,
          tokenUsed,
        }),
      })
      await fetchActiveEntries()
    } catch (error) {
      console.error('Failed to submit match result:', error)
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      {activeEntries.map((entry) => (
        <div key={entry.id} className="bg-gray-700 p-4 rounded-lg">
          <div className="mb-4">
            <p>Player: {entry.user.steamId}</p>
            <p>Discord: {entry.user.discordId}</p>
            <p>Progress: {entry.currentMmr} / {entry.targetMmr} MMR</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => submitMatchResult(entry.id, 'WIN', false)}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
            >
              Win (+25)
            </button>
            <button
              onClick={() => submitMatchResult(entry.id, 'LOSS', false)}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
              Loss (-25)
            </button>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                onChange={(e) => {
                  const result = e.target.checked ? 'WIN' : 'LOSS'
                  submitMatchResult(entry.id, result, true)
                }}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>Double Points Token</span>
            </label>
          </div>
        </div>
      ))}
      
      {activeEntries.length === 0 && (
        <p className="text-gray-400">No active matches in progress</p>
      )}
    </div>
  )
}
