import { useAuth } from '../context/AuthContext'
import './Home.css'

export default function Home() {
  const { session, signOut } = useAuth()

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Bienvenido 👋</h1>
        <p className="home-email">{session?.user?.email}</p>
        <p className="home-hint">Estás autenticado correctamente.</p>
        <button className="home-signout" onClick={signOut}>
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}
