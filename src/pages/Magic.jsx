import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Magic() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const tokenParam = params.get("token");
    const emailParam = params.get("email") || params.get("correo");

    if (!tokenParam || !emailParam) {
      alert("Enlace inválido o incompleto");
      navigate("/login", { replace: true });
      return;
    }

    (async () => {
      const base = (import.meta.env.VITE_API_BASE || "").replace(/\/+$/, "");
      const url = `${base}/auth/magic/verify`;

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          credentials: "include", // setea refresh cookie httpOnly
          body: JSON.stringify({ correo: emailParam, token: tokenParam }),
        });

        const ct = res.headers.get("content-type") || "";
        const data = ct.includes("application/json") ? await res.json() : {};

        if (!res.ok) {
          alert(data.error || "El enlace ha expirado o no es válido");
          return navigate("/login", { replace: true });
        }

        // 🔑 Usa SIEMPRE la MISMA clave que lee Profile.jsx:
        localStorage.setItem("access_token", data.accessToken);

        alert("Inicio de sesión exitoso ✅");
        navigate("/profile", { replace: true }); // o "/" si prefieres ir al inicio
      } catch (e) {
        alert("Error al verificar el enlace.");
        navigate("/login", { replace: true });
      }
    })();
  }, []);

  return (
    <main className="hero gradient">
      <section className="panel panel--wide">
        <h1 className="title-xl">Verificando enlace mágico…</h1>
        <p className="subtitle-lg">Por favor espera un momento ⏳</p>
      </section>
    </main>
  );
}
