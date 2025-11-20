import { LogOut } from 'lucide-react'

function Navbar({ user, onLogout }) {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-white/10 bg-slate-900/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/flame-icon.svg" alt="Logo" className="w-8 h-8" />
          <span className="text-white font-semibold tracking-tight">Riverview School</span>
        </div>
        {user ? (
          <div className="flex items-center gap-4">
            <div className="text-sm text-blue-100">
              <span className="font-medium text-white">{user.name}</span>
              <span className="mx-2 text-blue-300/50">•</span>
              <span className="uppercase text-blue-300/80">{user.role}</span>
            </div>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500 active:bg-blue-700 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        ) : (
          <div className="text-blue-200/80 text-sm">Welcome</div>
        )}
      </div>
    </header>
  )
}

export default Navbar
