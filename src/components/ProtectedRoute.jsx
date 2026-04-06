import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { session } = useAuth()

  // Still loading session
  if (session === undefined) return null

  if (!session) return <Navigate to="/login" replace />

  return children
}

