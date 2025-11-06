import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { count } = useCart();
  const [isLogged, setIsLogged] = React.useState(false);

  React.useEffect(() => {
    setIsLogged(!!localStorage.getItem("access_token"));
  }, [location.pathname]);

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__logo" onClick={() => navigate("/")} style={{cursor:"pointer"}}>
          <img src="/pizzas/pizzamya.jpg" alt="Pizza Mya" className="header__img" />
          <span className="header__brand">Pizza Mya</span>
        </div>

        <nav className="header__nav">
          <Link to="/" className={`nav__link ${location.pathname === "/" ? "active" : ""}`}>
            Inicio
          </Link>

          {/* Ícono carrito con badge */}
          <div className="nav__cart">
            <span className="cart__icon" title="Carrito">🛒</span>
            {count > 0 && <span className="cart__badge">{count}</span>}
          </div>

          {!isLogged ? (
            <>
              <Link to="/login" className={`nav__link ${location.pathname === "/login" ? "active" : ""}`}>
                Login
              </Link>
              <Link to="/register" className={`nav__link ${location.pathname === "/register" ? "active" : ""}`}>
                Registro
              </Link>
            </>
          ) : (
            <button className="nav__logout" onClick={() => { localStorage.removeItem("access_token"); navigate("/login"); }}>
              Cerrar sesión
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
