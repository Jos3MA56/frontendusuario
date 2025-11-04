import React from "react";
import api from "../api/client.js";

const initialState = {
  nombre: "",
  apPaterno: "",
  apMaterno: "",
  correo: "",
  telefono: "",
  direccion: { calle: "", numero: "", colonia: "", ciudad: "" },
  pagoPreferido: "efectivo",
};

export default function Profile() {
  const [form, setForm] = React.useState(initialState);
  const [serverData, setServerData] = React.useState(initialState);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [err, setErr] = React.useState("");
  const [profile, setProfile] = React.useState(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/auth/me");
        const filled = {
          nombre: data?.nombre || "",
          apPaterno: data?.apPaterno || "",
          apMaterno: data?.apMaterno || "",
          correo: data?.correo || "",
          telefono: data?.telefono || "",
          direccion: {
            calle: data?.direccion?.calle || "",
            numero: data?.direccion?.numero || "",
            colonia: data?.direccion?.colonia || "",
            ciudad: data?.direccion?.ciudad || "",
          },
          pagoPreferido: data?.pagoPreferido || "efectivo",
        };
        setForm(filled);
        setServerData(filled);
        setLoading(true);
        setError("");
        setProfile(data?.user || data || null);
        } catch (e) {
          setError(e?.response?.data?.mensaje || e?.message || "Error al cargar perfil");
        } finally {
          setLoading(false);
        }
      }
    )();
  }, []);

  const setField = (name, value) => setForm((f) => ({ ...f, [name]: value }));
  const setAddr = (name, value) =>
    setForm((f) => ({ ...f, direccion: { ...f.direccion, [name]: value } }));

  const usarGuardados = () => {
    setForm(serverData);
    setMsg("");
    setErr("");
  };

  const cancelar = () => {
    setForm(serverData);
    setMsg("");
    setErr("");
  };

  const validar = () => {
    if (!form.nombre || !form.apPaterno) return "Nombre y apellido paterno son obligatorios.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) return "Correo inválido.";
    if (form.telefono && !/^\d{10}$/.test(form.telefono)) return "El teléfono debe tener 10 dígitos.";
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = validar();
    if (v) {
      setErr(v);
      setMsg("");
      return;
    }
    try {
      setSaving(true);
      setErr("");
      setMsg("");

      const payload = {
        nombre: form.nombre.trim(),
        apPaterno: form.apPaterno.trim(),
        apMaterno: form.apMaterno.trim(),
        telefono: form.telefono.trim(),
        direccion: {
          calle: form.direccion.calle.trim(),
          numero: form.direccion.numero.trim(),
          colonia: form.direccion.colonia.trim(),
          ciudad: form.direccion.ciudad.trim(),
        },
        pagoPreferido: form.pagoPreferido,
      };

      await api.put("/users/me", payload);
      setServerData({ ...form });
      setMsg("Cambios guardados correctamente.");
    } catch (e2) {
      setErr(e2?.response?.data?.mensaje || "No se pudieron guardar los cambios.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: 24, textAlign: "center" }}>Cargando perfil...</div>;
  }

  return (
    <main className="container">
      <div className="page-title">Perfil</div>

      {/* Tarjeta: Datos del cliente */}
      <section className="card card--yellow">
        <header className="card__header">
          <h3>Datos del cliente</h3>
          <button type="button" className="btn btn--light-danger" onClick={usarGuardados}>
            Usar datos guardados
          </button>
        </header>

        <form className="card__body" onSubmit={onSubmit}>
          <div className="grid grid--2">
            <div className="field-group">
              <label>Nombre(s)</label>
              <input
                className="field"
                value={form.nombre}
                onChange={(e) => setField("nombre", e.target.value)}
                required
              />
            </div>
            <div className="field-group">
              <label>Apellido paterno</label>
              <input
                className="field"
                value={form.apPaterno}
                onChange={(e) => setField("apPaterno", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid--2">
            <div className="field-group">
              <label>Apellido materno</label>
              <input
                className="field"
                value={form.apMaterno}
                onChange={(e) => setField("apMaterno", e.target.value)}
              />
            </div>
            <div className="field-group">
              <label>Correo</label>
              <input className="field" value={form.correo} disabled />
            </div>
          </div>

          <div className="grid grid--2">
            <div className="field-group">
              <label>Teléfono</label>
              <input
                className="field"
                placeholder="10 dígitos"
                maxLength={10}
                inputMode="numeric"
                value={form.telefono}
                onChange={(e) => setField("telefono", e.target.value.replace(/\D/g, ""))}
              />
            </div>
            <div className="field-group">
              <label>Método de pago preferido</label>
              <div className="radios">
                <label className="radio">
                  <input
                    type="radio"
                    name="pago"
                    checked={form.pagoPreferido === "efectivo"}
                    onChange={() => setField("pagoPreferido", "efectivo")}
                  />
                  Efectivo
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="pago"
                    checked={form.pagoPreferido === "tarjeta"}
                    onChange={() => setField("pagoPreferido", "tarjeta")}
                  />
                  Tarjeta
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="pago"
                    checked={form.pagoPreferido === "transferencia"}
                    onChange={() => setField("pagoPreferido", "transferencia")}
                  />
                  Transferencia
                </label>
              </div>
            </div>
          </div>

          <div className="divider" />

          <h4>Dirección de entrega</h4>
          <div className="grid grid--2">
            <div className="field-group">
              <label>Calle</label>
              <input
                className="field"
                value={form.direccion.calle}
                onChange={(e) => setAddr("calle", e.target.value)}
              />
            </div>
            <div className="field-group">
              <label>Número</label>
              <input
                className="field"
                value={form.direccion.numero}
                onChange={(e) => setAddr("numero", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid--2">
            <div className="field-group">
              <label>Colonia</label>
              <input
                className="field"
                value={form.direccion.colonia}
                onChange={(e) => setAddr("colonia", e.target.value)}
              />
            </div>
            <div className="field-group">
              <label>Ciudad</label>
              <input
                className="field"
                value={form.direccion.ciudad}
                onChange={(e) => setAddr("ciudad", e.target.value)}
              />
            </div>
          </div>

          <footer className="card__footer">
            <button type="submit" className="btn btn--green" disabled={saving}>
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
            <button type="button" className="btn btn--danger" onClick={cancelar} disabled={saving}>
              Cancelar
            </button>
          </footer>

          {err && <p className="alert alert--error">{err}</p>}
          {msg && <p className="alert alert--success">{msg}</p>}
        </form>
      </section>

      {/* Tarjeta: Resumen (opcional, estilo similar a la captura) */}
      <section className="card card--yellow">
        <header className="card__header">
          <h3>Resumen</h3>
        </header>
        <div className="card__body">
          <div className="summary-row">
            <strong>Correo:</strong> <span>{form.correo || "—"}</span>
          </div>
          <div className="summary-row">
            <strong>Teléfono:</strong> <span>{form.telefono || "—"}</span>
          </div>
          <div className="summary-row">
            <strong>Entrega a:</strong>{" "}
            <span>
              {[form.direccion.calle, form.direccion.numero, form.direccion.colonia, form.direccion.ciudad]
                .filter(Boolean)
                .join(" ")}
              {!form.direccion.calle && !form.direccion.colonia ? "—" : ""}
            </span>
          </div>
          <div className="badge">🌶️ Tip: completa tu dirección para pedidos rápidos</div>
        </div>
      <section className="panel" style={{maxWidth: 820, margin: "32px auto"}}>
      <h1>Perfil</h1>

      {loading && <p>Cargando…</p>}
      {error && <p className="error">{error}</p>}

      {profile && (
        <pre style={{marginTop:12, background:"#0b1220", color:"#cbd5e1", padding:12, borderRadius:10}}>
{JSON.stringify(profile, null, 2)}
        </pre>
      )}
    </section>
      </section>
    </main>
  );
}

/* --- estilos mínimos en línea para parecerse a tus capturas ---
   Si ya tienes styles globales, puedes moverlos a styles.css con las mismas clases. */
