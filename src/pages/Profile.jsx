import React from "react";
import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();

  React.useEffect(() => {
    if (location.state?.fromProfile && location.state?.msg) {
      alert(location.state.msg);
      // Limpia el state de navegación para no repetir el alert en refresh
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location.state]);

  // Aquí tu lógica para mostrar/permitir “Agregar” si hay token
  const token = localStorage.getItem("access_token");
  const puedeAgregar = !!token;

  // … renderiza tu grid de pizzas y el botón Agregar usando `puedeAgregar`
  return (
    <main className="container">
      {/* ... tus cards de pizzas ... */}
      {/* ejemplo */}
      {/* <button disabled={!puedeAgregar} onClick={handleAgregar}>Agregar</button> */}
    </main>
  );
}
