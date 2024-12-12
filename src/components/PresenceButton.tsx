'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export function PresenceButton() {
  const { data: session } = useSession()
  const [isPresent, setIsPresent] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const checkPresence = async () => {
      if (!session?.user) return
      const response = await fetch('/api/presence')
      const data = await response.json()
      setIsPresent(data.isPresent)
    }

    checkPresence()
  }, [session])

  const togglePresence = async () => {
    if (!session?.user) return
    setLoading(true)
    try {
      const response = await fetch('/api/presence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isPresent: !isPresent }),
      })
      const data = await response.json()
      setIsPresent(data.isPresent)
    } catch (error) {
      console.error('Failed to update presence:', error)
    }
    setLoading(false)
  }

  if (!session?.user) {
    return (
      <div className="text-yellow-400">
        Please sign in to manage your presence in the queue
      </div>
    )
  }

  return (
    <button
      onClick={togglePresence}
      disabled={loading}
      className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
        isPresent
          ? 'bg-green-600 hover:bg-green-700'
          : 'bg-red-600 hover:bg-red-700'
      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading ? 'Updating...' : isPresent ? 'I am Present' : 'Mark as Present'}
    </button>
  )
}
