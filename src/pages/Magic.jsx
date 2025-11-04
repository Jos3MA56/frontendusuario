import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Magic() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    const email = params.get("email");
    if (!token || !email) {
      alert("Enlace inválido o incompleto");
      navigate("/login");
      return;
    }

    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}auth/magic/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // setea refresh cookie
          body: JSON.stringify({ correo: email, token }),
        });
        const data = await res.json();
        if (!res.ok) {
          alert(data.error || "El enlace ha expirado");
          return navigate("/login");
        }
        localStorage.setItem("accessToken", data.accessToken);
        alert("Inicio de sesión exitoso ✅");
        navigate("/profile");
      } catch {
        alert("Error al verificar el enlace.");
        navigate("/login");
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
