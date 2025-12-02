import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function ResetRequest() {
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const correo = (f.get("email") || "").trim();
    if (!correo) return alert("Ingresa tu correo");

    try {
      const base = (import.meta.env.VITE_API_BASE || "").replace(/\/+$/, "");
      const url = `${base}/auth/reset/request`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return alert(data.error || "No se pudo procesar la solicitud");
      }

      alert("Si el correo existe en el sistema, se ha enviado un enlace para restablecer la contraseña ✅");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <main className="hero gradient">
      <section className="panel panel--wide">
        <h1 className="title-xl">Recuperar contraseña</h1>
        <p className="subtitle-lg">
          Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
        </p>

        <form className="stack" onSubmit={onSubmit}>
          <input
            className="field"
            type="email"
            name="email"
            placeholder="Correo electrónico"
            required
          />
          <button className="btn btn--primary btn--lg" type="submit">
            Enviar enlace de recuperación
          </button>

          <div className="muted">
            <Link to="/login" className="link">
              Volver a login
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
