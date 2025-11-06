import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = React.useState(false);

  React.useEffect(() => {
    // Detecta si hay token
    const token = localStorage.getItem("access_token");
    setIsLogged(!!token);
  }, [location.pathname]); // se actualiza al cambiar de ruta

  const handleLogout = () => {
    localStorage.removeItem("access_token"); // 🔑 elimina token
    navigate("/login");                      // redirige
  };

  return (
    <header className="header">
      <div className="header__inner">
        {/* Logo */}
        <div className="header__logo">
          <img
            src="/pizzas/pizzamya.jpg"
            alt="Pizza Mya"
            className="header__img"
          />
          <span className="header__brand">Pizza Mya</span>
        </div>

        {/* Navegación */}
        <nav className="header__nav">
          <Link
            to="/"
            className={`nav__link ${location.pathname === "/" ? "active" : ""}`}
          >
            Inicio
          </Link>

          {!isLogged ? (
            <>
              <Link
                to="/login"
                className={`nav__link ${location.pathname === "/login" ? "active" : ""}`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`nav__link ${location.pathname === "/register" ? "active" : ""}`}
              >
                Registro
              </Link>
            </>
          ) : (
            <button className="nav__logout" onClick={handleLogout}>
              Cerrar sesión
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
