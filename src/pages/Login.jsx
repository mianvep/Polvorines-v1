import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { session } = useAuth()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)

  if (session) return <Navigate to="/" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#0d0f14] px-4"
      style={{
        backgroundImage:
          'repeating-linear-gradient(135deg, #0d0f14 0px, #0d0f14 30px, #111318 30px, #111318 60px)',
      }}
    >
      <div className="w-full max-w-md bg-[#12151f] border border-[#242736] rounded-2xl px-10 py-10">

        {/* Logo */}
        <div className="flex justify-center mb-5">
          <div className="text-orange-500">
            <svg width="52" height="56" viewBox="0 0 52 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M26 2L4 12V28C4 40.5 13.6 52.1 26 55C38.4 52.1 48 40.5 48 28V12L26 2Z"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M26 14C26 14 20 22 24 26C24 26 20 27 19 32C22 29 24 30 25 28C25 28 26 35 30 34C28 31 29 29 31 28C33 27 34 25 32 22C30.5 25 30 24 30 22C30 18 26 14 26 14Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-white text-2xl font-black tracking-[0.35em] text-center mb-1 uppercase">
          SGEX
        </h1>
        <p className="text-gray-400 text-sm text-center mb-6">
          Sistema de Gestión de Explosivos
        </p>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent mb-8" />

        {sent ? (
          <div className="flex flex-col items-center gap-3 text-center text-gray-300 py-4">
            <span className="text-4xl">✉️</span>
            <p>
              Revisa tu correo <strong className="text-white">{email}</strong>
            </p>
            <p className="text-gray-500 text-sm">
              Haz clic en el enlace que te enviamos para ingresar.
            </p>
            <button
              className="mt-3 border border-[#2a2d3a] rounded-lg px-5 py-2 text-sm text-gray-400 hover:border-gray-500 hover:text-gray-200 transition-colors cursor-pointer bg-transparent"
              onClick={() => setSent(false)}
            >
              Usar otro correo
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label className="text-[11px] font-semibold tracking-[0.2em] text-gray-500 uppercase">
              Correo Electrónico
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 8l10 7 10-7" />
                </svg>
              </span>
              <input
                type="email"
                className="w-full bg-[#1a1d2a] border border-[#2a2d3a] rounded-xl py-3.5 pl-11 pr-4 text-gray-300 placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors text-sm"
                placeholder="Ingrese su correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !email}
              className="mt-2 w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold tracking-[0.18em] uppercase py-4 rounded-xl flex items-center justify-center gap-2.5 transition-colors cursor-pointer text-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z" />
                <rect x="9" y="11" width="6" height="6" rx="1" />
                <path d="M12 11V8a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v3" />
              </svg>
              {loading ? 'Enviando...' : 'Acceder al Sistema'}
            </button>
          </form>
        )}

        {/* Footer */}
        <div className="mt-8 border-t border-[#1e2130] pt-6 text-center space-y-1">
          <p className="text-[11px] text-gray-600">
            Acceso restringido · Personal autorizado únicamente
          </p>
          <p className="text-[11px] text-gray-600">
            © 2026 CENITEG · Todos los derechos reservados
          </p>
        </div>
      </div>
    </div>
  )
}
