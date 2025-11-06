import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    // Si fue redirigido desde Home, muestra el mensaje una sola vez
    if (location.state?.msg) {
      alert(location.state.msg);
      navigate(location.pathname, { replace: true });
    }
  }, []);

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

      // ⬇️ Guarda el token con la misma clave que usa Home
      localStorage.setItem("access_token", data.accessToken);

      // ⬇️ Vuelve al destino original (o /profile si no hay redirect)
      const redirectTo = location.state?.redirectTo || "/profile";
      navigate(redirectTo, { replace: true });
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
            <input className="field" type={show ? "text" : "password"} name="password" placeholder="Contraseña" required />
            <button type="button" className="eye eye--inside" onClick={() => setShow(!show)} aria-label="Mostrar/Ocultar contraseña" >👁️</button>
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
