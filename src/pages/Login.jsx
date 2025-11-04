import { useState } from 'react'
import { api } from '../lib/api.js'

export default function Login() {
  const [form, setForm] = useState({ correo:'', password:'' })
  const [sending, setSending] = useState(false)
  const onChange = e => setForm(f => ({...f, [e.target.name]: e.target.value}))

  async function onSubmit(e) {
    e.preventDefault()
    if (sending) return
    setSending(true)
    try {
      const res = await fetch(api('auth/login'), {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ email: form.correo, password: form.password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'No se pudo iniciar sesión')
      localStorage.setItem('token', data.token)
      alert('Inicio de sesión exitoso ✅')
    } catch (err) { alert(err.message) }
    finally { setSending(false) }
  }

  return (
    <main style={{padding:16, maxWidth:420}}>
      <h2>Login (JWT)</h2>
      <form onSubmit={onSubmit}>
        <label>Correo</label>
        <input name="correo" value={form.correo} onChange={onChange} type="email" required style={{width:'100%', marginBottom:8}} />
        <label>Password</label>
        <input name="password" value={form.password} onChange={onChange} type="password" required style={{width:'100%', marginBottom:12}} />
        <button disabled={sending}>{sending ? 'Ingresando...' : 'Ingresar'}</button>
      </form>
    </main>
  )
}