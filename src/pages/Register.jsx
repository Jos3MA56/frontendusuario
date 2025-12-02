import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const onSubmit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const pw1 = (f.get("password") || "").trim();
    const pw2 = (f.get("password2") || "").trim();
    if (pw1 !== pw2) return alert("Las contraseñas no coinciden");

    const datos = {
      nombre: f.get("nombre"),
      apPaterno: f.get("apPaterno"),
      apMaterno: f.get("apMaterno"),
      telefono: f.get("telefono"),
      correo: f.get("correo"),
      fechaNacimiento: f.get("fechaNacimiento") || undefined,
      password: pw1,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Registro exitoso ✅");
        e.target.reset();
      } else {
        alert(data.error || "Error al registrar");
      }
    } catch (err) {
      alert("Error de conexión con el servidor");
    }
  };

  const toggle = (id) => {
    const el = document.getElementById(id);
    if (el) el.type = el.type === "password" ? "text" : "password";
  };

  return (
    <section className="panel">
      <h1 className="panel__title">Registro</h1>
      <form className="stack" onSubmit={onSubmit}>
        <input className="field" name="nombre" placeholder="Nombre" required />
        <input className="field" name="apPaterno" placeholder="Apellido Paterno" required />
        <input className="field" name="apMaterno" placeholder="Apellido Materno" />
        <input className="field" name="telefono" placeholder="Número de teléfono" />
        <input className="field" type="email" name="correo" placeholder="Correo" required />
        <input className="field" type="date" name="fechaNacimiento" required placeholder="Fecha de Nacimiento" />

        <div className="field--wrap">
          <input id="pw1" className="field" type="password" name="password" placeholder="Contraseña" required />
          <button type="button" className="eye eye--inside" onClick={() => toggle("pw1")} aria-label="Mostrar/Ocultar contraseña" >👁️</button>
        </div>

        <div className="field--wrap">
          <input id="pw2" className="field" type="password" name="password2" placeholder="Confirmar contraseña" required />
          <button type="button" className="eye eye--inside" onClick={() => toggle("pw2")} aria-label="Mostrar/Ocultar contraseña" >👁️</button>
        </div>

        <button className="btn" type="submit">Registrar</button>
         <div className="muted">
          ¿Ya tienes cuenta? <Link to="/login" className="link">Inicie Sesion</Link>
        </div>
      </form>
    </section>
  );
}
