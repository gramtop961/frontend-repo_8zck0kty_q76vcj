import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  const [view, setView] = useState('login') // login | register | portal
  const [user, setUser] = useState(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    // try to fetch current user if token exists
    const token = localStorage.getItem('token')
    if (token) {
      fetch(`${baseUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (data) {
            setUser(data)
            setView('portal')
          }
        })
        .catch(() => {})
    }
  }, [])

  const handleAuth = (data) => {
    localStorage.setItem('token', data.token)
    setUser({ name: data.name, email: data.email, role: data.role })
    setView('portal')
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setView('login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      <div className="relative min-h-screen">
        <Navbar user={user} onLogout={logout} />

        <main className="mx-auto max-w-6xl px-4 py-10">
          {view !== 'portal' && (
            <div className="flex items-start justify-center gap-10 flex-wrap">
              {view === 'login' ? (
                <Login onLogin={handleAuth} switchToRegister={() => setView('register')} />
              ) : (
                <Register onRegister={handleAuth} switchToLogin={() => setView('login')} />
              )}

              <section className="flex-1 min-w-[280px] max-w-xl bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6 text-blue-100">
                <h2 className="text-white text-2xl font-semibold mb-4">Welcome to Riverview School</h2>
                <p className="mb-4 text-blue-200/80">A simple portal where students and teachers can sign in to access announcements and resources.</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Secure sign in and sign up</li>
                  <li>Role-based access (student, teacher, admin)</li>
                  <li>Persistent accounts stored in the database</li>
                </ul>
              </section>
            </div>
          )}

          {view === 'portal' && (
            <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6 text-blue-100">
              <h2 className="text-white text-2xl font-semibold mb-4">School Portal</h2>
              <p className="text-blue-200/80 mb-6">Welcome back, {user?.name}! Here are the latest updates:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900/40 border border-white/10 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Announcements</h3>
                  <ul className="text-sm space-y-2 text-blue-200/80">
                    <li>• Parent-Teacher meeting next Friday</li>
                    <li>• Science fair registration now open</li>
                    <li>• Library extended hours during exams</li>
                  </ul>
                </div>
                <div className="bg-slate-900/40 border border-white/10 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Resources</h3>
                  <ul className="text-sm space-y-2 text-blue-200/80">
                    <li>• Academic calendar</li>
                    <li>• Student handbook</li>
                    <li>• Counseling services</li>
                  </ul>
                </div>
                <div className="bg-slate-900/40 border border-white/10 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Your Role</h3>
                  <p className="text-sm text-blue-200/80">You are signed in as <span className="text-white font-medium">{user?.role}</span>.</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
