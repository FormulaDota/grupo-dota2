import { AdminQueueManager } from '@/components/AdminQueueManager'
import { MatchResults } from '@/components/MatchResults'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Queue Management</h2>
            <AdminQueueManager />
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Match Results</h2>
            <MatchResults />
          </div>
        </div>
      </div>
    </div>
  )
}
