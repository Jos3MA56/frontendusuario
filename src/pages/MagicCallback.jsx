import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { api } from '../lib/api.js'

export default function MagicCallback() {
  const nav = useNavigate()
  const { search } = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(search)
    const token = params.get('token')
    if (!token) {
      alert('Falta token en el enlace')
      nav('/magic', { replace: true })
      return
    }
    ;(async () => {
      try {
        const res = await fetch(api('auth/magic-verify'), {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ token })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data?.error || 'No se pudo verificar el enlace')
        localStorage.setItem('token', data.token)
        alert('Sesión iniciada por enlace mágico ✅')
        nav('/', { replace: true })
      } catch (err) {
        alert(err.message)
        nav('/magic', { replace: true })
      }
    })()
  }, [search, nav])

  return (
    <main style={{padding:16}}>
      <h2>Verificando enlace...</h2>
      <p>Un momento por favor.</p>
    </main>
  )
}