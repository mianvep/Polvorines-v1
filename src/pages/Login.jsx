import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import './Login.css'

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
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Iniciar sesión</h1>
        <p className="login-subtitle">
          Ingresa tu correo y te enviaremos un enlace mágico para acceder.
        </p>

        {sent ? (
          <div className="login-success">
            <span className="login-success-icon">✉️</span>
            <p>Revisa tu correo <strong>{email}</strong></p>
            <p className="login-success-hint">
              Haz clic en el enlace que te enviamos para ingresar.
            </p>
            <button className="login-resend" onClick={() => setSent(false)}>
              Usar otro correo
            </button>
          </div>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email" className="login-label">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              className="login-input"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
            {error && <p className="login-error">{error}</p>}
            <button
              type="submit"
              className="login-button"
              disabled={loading || !email}
            >
              {loading ? 'Enviando...' : 'Enviar enlace mágico'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
