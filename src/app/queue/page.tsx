import { QueueList } from '@/components/QueueList'
import { PresenceButton } from '@/components/PresenceButton'

export default function QueuePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Queue Status</h1>
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Status</h2>
          <PresenceButton />
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Current Queue</h2>
          <QueueList />
        </div>
      </div>
    </div>
  )
}
