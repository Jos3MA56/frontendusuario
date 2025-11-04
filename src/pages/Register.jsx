import { useState } from 'react'
import { api } from '../lib/api.js'

export default function Register() {
  const [form, setForm] = useState({
    correo: '', password: '', nombre: '',
    apPaterno: '', apMaterno: '', telefono: '',
    edad: '', isActive: true
  })
  const [sending, setSending] = useState(false)

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (sending) return
    setSending(true)
    try {
      const payload = {
        correo: form.correo,
        passwordHash: form.password,         // el backend la hashea
        nombre: form.nombre || '',
        apPaterno: form.apPaterno || '',
        apMaterno: form.apMaterno || '',
        telefono: form.telefono || '',
        edad: form.edad ? Number(form.edad) : undefined,
        isActive: form.isActive
      }

      const res = await fetch(api('auth/register'), {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'No se pudo registrar')
      alert('Registro exitoso ✅')
      setForm({
        correo:'', password:'', nombre:'',
        apPaterno:'', apMaterno:'', telefono:'',
        edad:'', isActive: true
      })
    } catch (err) {
      alert(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <main style={{padding:16, maxWidth:480}}>
      <h2>Registro</h2>
      <form onSubmit={onSubmit}>
        <label>Correo</label>
        <input name="correo" value={form.correo} onChange={onChange} type="email" required style={{width:'100%', marginBottom:8}} />

        <label>Nombre</label>
        <input name="nombre" value={form.nombre} onChange={onChange} type="text" style={{width:'100%', marginBottom:8}} />

        <label>Apellido paterno</label>
        <input name="apPaterno" value={form.apPaterno} onChange={onChange} type="text" style={{width:'100%', marginBottom:8}} />

        <label>Apellido materno</label>
        <input name="apMaterno" value={form.apMaterno} onChange={onChange} type="text" style={{width:'100%', marginBottom:8}} />

        <label>Teléfono</label>
        <input name="telefono" value={form.telefono} onChange={onChange} type="tel" pattern="\d{10}" placeholder="10 dígitos" style={{width:'100%', marginBottom:8}} />

        <label>Edad</label>
        <input name="edad" value={form.edad} onChange={onChange} type="number" min="0" style={{width:'100%', marginBottom:8}} />

        <label>Password</label>
        <input name="password" value={form.password} onChange={onChange} type="password" required style={{width:'100%', marginBottom:8}} />

        <label style={{display:'flex', alignItems:'center', gap:8, margin:'8px 0'}}>
          <input type="checkbox" name="isActive" checked={form.isActive} onChange={onChange} />
          Activo
        </label>

        <button disabled={sending}>{sending ? 'Enviando...' : 'Registrarme'}</button>
      </form>
    </main>
  )
}