import { useEffect, useState } from "react";

export default function Profile() {
  const [access, setAccess] = useState("");
  const [profile, setProfile] = useState(null);

  const pedirAccessConRefresh = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE}auth/refresh`, {
      method: "POST",
      credentials: "include"
    });
    const data = await res.json();
    if (res.ok) setAccess(data.accessToken);
  };

  useEffect(() => {
    pedirAccessConRefresh();
  }, []);

  const cargarPerfil = async () => {
    if (!access) return alert("No hay access token");
    const res = await fetch(`${import.meta.env.VITE_API_BASE}profile`, {
      headers: { Authorization: "Bearer " + access }
    });
    const data = await res.json();
    if (res.ok) setProfile(data.user);
    else alert(data.error || "Error al cargar perfil");
  };

  return (
    <section className="panel">
      <h1>Perfil</h1>
      <button className="btn" onClick={cargarPerfil}>Cargar Perfil</button>
      {profile && (
        <pre style={{marginTop:12, background:"#0b1220", padding:12, borderRadius:10}}>
{JSON.stringify(profile, null, 2)}
        </pre>
      )}
    </section>
  );
}
