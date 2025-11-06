import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function MagicRequest() {
  const navigate = useNavigate();

  const onSend = async (e) => {
    e.preventDefault();
    const correo = new FormData(e.currentTarget).get("email");
    if (!correo) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}auth/magic-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo }),
      });
      if (!res.ok) throw new Error();
      alert("Enlace enviado ✅ Revisa tu correo.");
      navigate("/login");
    } catch {
      alert("No se pudo enviar el enlace mágico.");
    }
  };

  return (
    <main className="hero gradient">
      <section className="panel panel--wide">
        <h1 className="title-xl">Enlace Mágico</h1>
        <p className="subtitle-lg">Ingresa tu correo para recibir un enlace de inicio de sesión</p>

        <form className="stack" onSubmit={onSend}>
          <input className="field" type="email" name="email" placeholder="Correo electrónico" required />
          <button className="btn btn--purple btn--lg" type="submit">Enviar enlace mágico</button>
          <div className="muted">
            <Link to="/login" className="link">Volver a Login</Link>
          </div>
        </form>
      </section>
    </main>
  );
}
