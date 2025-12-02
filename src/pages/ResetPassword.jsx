import React, { useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    const email = params.get("email") || params.get("correo");

    if (!token || !email) {
      alert("Enlace de recuperación inválido o incompleto");
      navigate("/login", { replace: true });
    }
  }, [params, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = params.get("token");
    const correo = params.get("email") || params.get("correo");

    const f = new FormData(e.currentTarget);
    const pw1 = (f.get("password") || "").trim();
    const pw2 = (f.get("password2") || "").trim();

    if (!pw1 || !pw2) return alert("Completa ambos campos de contraseña");
    if (pw1 !== pw2) return alert("Las contraseñas no coinciden");

    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!regex.test(pw1)) {
      return alert(
        "La contraseña debe tener mínimo 8 caracteres, mayúsculas, minúsculas, número y símbolo."
      );
    }

    try {
      const base = (import.meta.env.VITE_API_BASE || "").replace(/\/+$/, "");
      const url = `${base}/auth/reset/confirm`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, token, password: pw1 }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        return alert(data.error || "No se pudo restablecer la contraseña");
      }

      alert("Contraseña actualizada correctamente ✅ Ahora puedes iniciar sesión.");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <main className="hero gradient">
      <section className="panel panel--wide">
        <h1 className="title-xl">Definir nueva contraseña</h1>
        <p className="subtitle-lg">
          Ingresa tu nueva contraseña. Debe cumplir con los requisitos de seguridad.
        </p>

        <form className="stack" onSubmit={onSubmit}>
          <div className="field--wrap">
            <input
              className="field"
              type="password"
              name="password"
              placeholder="Nueva contraseña"
              required
            />
          </div>

          <div className="field--wrap">
            <input
              className="field"
              type="password"
              name="password2"
              placeholder="Confirmar nueva contraseña"
              required
            />
          </div>

          <button className="btn btn--primary btn--lg" type="submit">
            Guardar nueva contraseña
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
