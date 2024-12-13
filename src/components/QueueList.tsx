import { useState, useEffect } from 'react'

export function QueueList() {
  const [queues, setQueues] = useState([])

  useEffect(() => {
    const fetchQueues = async () => {
      const response = await fetch('/api/queue')
      const data = await response.json()
      setQueues(data)
    }

    fetchQueues()
    // Refresh queues every 30 seconds
    const interval = setInterval(fetchQueues, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Filas Disponíveis</h2>
      <div className="grid gap-4">
        {queues.map((queue: any) => (
          <div key={queue.id} className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl">{queue.name}</h3>
            <p className="text-gray-400">{queue.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
