'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

interface QueueEntry {
  id: string
  user: {
    steamId: string
    discordId: string
  }
  currentMmr: number
  targetMmr: number
  status: string
  isPresent: boolean
}

export function QueueList() {
  const { data: session } = useSession()
  const [queueEntries, setQueueEntries] = useState<QueueEntry[]>([])

  useEffect(() => {
    const fetchQueue = async () => {
      const response = await fetch('/api/queue')
      const data = await response.json()
      setQueueEntries(data)
    }

    fetchQueue()
    // Refresh queue every 30 seconds
    const interval = setInterval(fetchQueue, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-gray-700">
            <th className="p-4">Position</th>
            <th className="p-4">Steam ID</th>
            <th className="p-4">Discord</th>
            <th className="p-4">Current MMR</th>
            <th className="p-4">Target MMR</th>
            <th className="p-4">Status</th>
            <th className="p-4">Present</th>
          </tr>
        </thead>
        <tbody>
          {queueEntries.map((entry, index) => (
            <tr 
              key={entry.id}
              className={`border-b border-gray-700 ${
                entry.status === 'IN_PROGRESS' ? 'bg-blue-900/20' : ''
              }`}
            >
              <td className="p-4">{index + 1}</td>
              <td className="p-4">{entry.user.steamId}</td>
              <td className="p-4">{entry.user.discordId}</td>
              <td className="p-4">{entry.currentMmr}</td>
              <td className="p-4">{entry.targetMmr}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded ${
                  entry.status === 'WAITING' ? 'bg-yellow-600' :
                  entry.status === 'IN_PROGRESS' ? 'bg-blue-600' :
                  'bg-green-600'
                }`}>
                  {entry.status}
                </span>
              </td>
              <td className="p-4">
                <span className={`w-3 h-3 rounded-full inline-block ${
                  entry.isPresent ? 'bg-green-500' : 'bg-red-500'
                }`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
