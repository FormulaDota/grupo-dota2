import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="bg-gray-800 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-white text-xl font-bold">FormulaDota</span>
            </Link>
          </div>

          <div className="flex items-center">
            <Link
              href="/groups"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Grupos
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
