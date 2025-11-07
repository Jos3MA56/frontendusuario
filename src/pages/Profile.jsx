import React from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate(); 

  const loadProfile = async () => {
    if (loading) return;
    setLoading(true);

    const token = localStorage.getItem("access_token");
    if (!token) {
      setLoading(false);
      return alert("No has iniciado sesión");
    }

    const base = (import.meta.env.VITE_API_BASE || "").replace(/\/+$/, "");
    const url = `${base}/profile`;

    try {
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const ct = res.headers.get("content-type") || "";
      if (!res.ok) {
        if (ct.includes("application/json")) {
          const err = await res.json();
          throw new Error(err.error || `Error ${res.status}`);
        } else {
          throw new Error(`Error ${res.status}: ${await res.text()}`);
        }
      }

      const data = await res.json();
      setUser(data.user);

      navigate("/"); 
    } catch (e) {
      alert(e.message || "Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="panel">
      <h1 className="panel__title">Perfil</h1>
      <button
        className="btn btn--secondary"
        onClick={loadProfile}
        disabled={loading}
      >
        {loading ? "Cargando..." : "Cargar Perfil"}
      </button>

      {user && (
        <div style={{ marginTop: 16 }}>
          <p>
            <b>Nombre:</b> {user.nombre} {user.apPaterno} {user.apMaterno}
          </p>
          <p>
            <b>Correo:</b> {user.correo}
          </p>
          {user.telefono && (
            <p>
              <b>Teléfono:</b> {user.telefono}
            </p>
          )}
          {user.edad && (
            <p>
              <b>Edad:</b> {user.edad}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
