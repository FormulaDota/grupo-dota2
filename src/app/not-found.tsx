import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          404 - Page Not Found
        </h2>
        <p className="text-gray-400 mb-8">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
