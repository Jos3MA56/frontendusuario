import { Link, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Magic from './pages/Magic.jsx'
import MagicCallback from './pages/MagicCallback.jsx'

export default function App() {
  return (
    <div>
      <nav style={{display:'flex', gap:12, padding:12, borderBottom:'1px solid #ddd'}}>
        <Link to="/">Inicio</Link>
        <Link to="/register">Registro</Link>
        <Link to="/login">Login (JWT)</Link>
        <Link to="/magic">Enlace mágico</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/magic" element={<Magic />} />
        <Route path="/magic-callback" element={<MagicCallback />} />
      </Routes>
    </div>
  )
}