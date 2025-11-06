import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

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
        </nav>
      </div>
    </header>
  );
}
