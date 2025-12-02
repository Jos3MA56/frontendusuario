import React, { useState } from "react";

export default function FirmaDigital() {
  const [mensaje, setMensaje] = useState("");
  const [firma, setFirma] = useState("");
  const [resultado, setResultado] = useState("");

  // URL de tu backend (ya la usas en Login, Magic, etc.)
  const apiBase = (import.meta.env.VITE_API_BASE || "").replace(/\/+$/, "");

  // === FIRMAR ===
  const firmarMensaje = async (e) => {
    e.preventDefault();
    setResultado("");

    if (!mensaje.trim()) {
      return alert("Escribe un mensaje para firmar.");
    }

    try {
      const res = await fetch(`${apiBase}/firma/firmar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje }),
      });

      const data = await res.json();

      if (!res.ok) {
        return alert(data.error || "No se pudo firmar el mensaje.");
      }

      setFirma(data.firma);
      setResultado("Mensaje firmado correctamente ✔");
    } catch (err) {
      console.error(err);
      alert("Error al conectar con el servidor.");
    }
  };

  // === VERIFICAR ===
  const verificarFirma = async () => {
    if (!mensaje.trim() || !firma.trim()) {
      return alert("Necesitas mensaje y firma para verificar.");
    }

    try {
      const res = await fetch(`${apiBase}/firma/verificar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje, firma }),
      });

      const data = await res.json();

      if (!res.ok) {
        return alert(data.error || "No se pudo verificar la firma.");
      }

      if (data.valido) {
        setResultado("✔ La firma es VÁLIDA (el mensaje NO ha sido alterado).");
      } else {
        setResultado("✖ La firma NO es válida (el mensaje fue modificado).");
      }
    } catch (err) {
      console.error(err);
      alert("Error al conectar con el servidor.");
    }
  };

  return (
    <main className="hero gradient">
      <section className="panel panel--wide">
        <h1 className="title-xl">Firma Digital</h1>
        <p className="subtitle-lg">
          Escribe un mensaje, fírmalo con el servidor y verifica su integridad.
        </p>

        {/* FORMULARIO PARA FIRMAR */}
        <form className="stack" onSubmit={firmarMensaje}>
          <label className="label">
            Mensaje:
            <textarea
              className="field"
              rows={4}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Escribe un texto (ej. contrato, documento, reporte...)"
            />
          </label>

          <button type="submit" className="btn btn--primary btn--lg">
            Firmar mensaje
          </button>
        </form>

        {/* FIRMA GENERADA */}
        <div className="stack" style={{ marginTop: "1.5rem" }}>
          <label className="label">
            Firma digital generada:
            <textarea
              className="field"
              rows={3}
              value={firma}
              onChange={(e) => setFirma(e.target.value)}
              placeholder="Aquí aparecerá la firma generada por el servidor..."
            />
          </label>

          <button className="btn btn--secondary btn--lg" onClick={verificarFirma}>
            Verificar firma
          </button>
        </div>

        {/* RESULTADO DE LA VERIFICACIÓN */}
        {resultado && (
          <div
            className="alert"
            style={{
              marginTop: "1rem",
              background: "white",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            {resultado}
          </div>
        )}

        <p className="muted" style={{ marginTop: "1rem" }}>
          La firma digital se crea en el servidor usando criptografía asimétrica.
          <br />
          Si modificas el mensaje, la firma deja de ser válida.
        </p>
      </section>
    </main>
  );
}
