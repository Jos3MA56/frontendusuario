import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const correo = f.get("email");
    const password = f.get("password");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // para cookie refresh httpOnly
        body: JSON.stringify({ correo, password }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.error || "Credenciales inválidas");
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/profile");
    } catch (err) {
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <main className="hero gradient">
      <section className="panel panel--wide">
        <h1 className="title-xl">Login</h1>
        <p className="subtitle-lg">Inicia sesión en tu cuenta</p>

        <form className="stack" onSubmit={onSubmit}>
          <input className="field" type="email" name="email" placeholder="Correo" required />
          <div className="field--wrap">
            <input
              className="field"
              type={show ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              required
            />
            <button type="button" className="eye eye--inside" onClick={() => setShow(!show)}>👁️</button>
          </div>
          <button className="btn btn--primary btn--lg" type="submit">Iniciar sesión</button>
        </form>

        <div className="muted">
          ¿Prefieres no usar contraseña?{" "}
          <Link to="/magic/request" className="link">Accede con un enlace mágico ✨</Link>
        </div>

        <div className="muted">
          ¿No tienes cuenta? <Link to="/register" className="link">Regístrate</Link>
        </div>
      </section>
    </main>
  );
}
