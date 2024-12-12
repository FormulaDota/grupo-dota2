'use client'

import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

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

export function AdminQueueManager() {
  const [queueEntries, setQueueEntries] = useState<QueueEntry[]>([])

  useEffect(() => {
    fetchQueue()
  }, [])

  const fetchQueue = async () => {
    const response = await fetch('/api/admin/queue')
    const data = await response.json()
    setQueueEntries(data)
  }

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return

    const items = Array.from(queueEntries)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setQueueEntries(items)

    // Update queue order in the backend
    await fetch('/api/admin/queue/reorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    })
  }

  const updateStatus = async (entryId: string, status: string) => {
    await fetch(`/api/admin/queue/${entryId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    })
    fetchQueue()
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="queue">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {queueEntries.map((entry, index) => (
              <Draggable key={entry.id} draggableId={entry.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-gray-700 p-4 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Steam ID: {entry.user.steamId}</p>
                        <p>Discord: {entry.user.discordId}</p>
                        <p>Progress: {entry.currentMmr} / {entry.targetMmr} MMR</p>
                      </div>
                      <div className="flex space-x-2">
                        <select
                          value={entry.status}
                          onChange={(e) => updateStatus(entry.id, e.target.value)}
                          className="bg-gray-600 text-white rounded px-3 py-1"
                        >
                          <option value="WAITING">Waiting</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="COMPLETED">Completed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
