import { useState } from 'react'
import { api } from '../lib/api.js'

export default function Magic() {
  const [correo, setCorreo] = useState('')
  const [sending, setSending] = useState(false)
  const [devLink, setDevLink] = useState('')

  async function sendLink() {
    if (sending) return
    setSending(true)
    try {
      const res = await fetch(api('auth/magic-link'), {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ correo })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'No se pudo enviar el enlace')
      if (data.link) setDevLink(data.link)
      alert(data.sent ? 'Enlace enviado a tu correo ✉️' : 'Dev: enlace generado (abajo)')
    } catch (err) { alert(err.message) }
    finally { setSending(false) }
  }

  return (
    <main style={{padding:16, maxWidth:520}}>
      <h2>Login por enlace mágico</h2>
      <p>Ingresa tu correo para recibir un enlace sin contraseña.</p>
      <input value={correo} onChange={e=>setCorreo(e.target.value)} type="email" required placeholder="tu@correo.com"
             style={{width:'100%', marginBottom:12, padding:8}} />
      <button onClick={sendLink} disabled={sending}>{sending ? 'Enviando...' : 'Enviar enlace'}</button>

      {devLink && (
        <div style={{marginTop:16, padding:12, border:'1px dashed #aaa'}}>
          <strong>Dev link:</strong>
          <div><a href={devLink}>{devLink}</a></div>
          <small>Solo aparece si no configuras SMTP; en producción se envía por email.</small>
        </div>
      )}
    </main>
  )
}