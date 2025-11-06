import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PIZZAS = [
  { id: 1, nombre: "Margarita", descr: "Tomate, mozzarella y albahaca.", precio: 129,
    img: "https://images.unsplash.com/photo-1601924582971-b0c5be3d79a8?q=80&w=1200&auto=format&fit=crop" },
  { id: 2, nombre: "Pepperoni", descr: "Doble pepperoni y queso.", precio: 149,
    img: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=1200&auto=format&fit=crop" },
  { id: 3, nombre: "Hawaiana", descr: "Jamón, piña y mozzarella.", precio: 145,
    img: "https://images.unsplash.com/photo-1548365328-9f547fb0953c?q=80&w=1200&auto=format&fit=crop" },
  { id: 4, nombre: "Cuatro Quesos", descr: "Mozzarella, parmesano, gouda y azul.", precio: 159,
    img: "https://images.unsplash.com/photo-1604068549290-de188494b7d7?q=80&w=1200&auto=format&fit=crop" },
];

const getToken = () =>
  localStorage.getItem("access_token") || localStorage.getItem("token") || "";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.state?.msg) {
      alert(location.state.msg);
      // limpia el state para que no repita el alert si recargas
      navigate(location.pathname, { replace: true });
    }
  }, []);

  const handleAdd = (pizza) => {
    if (!getToken()) {
      // no logueado → manda a login y recuerda a dónde volver
      return navigate("/login", {
        state: { redirectTo: "/", msg: "Inicia sesión para agregar al carrito 🍕" }
      });
    }
    // aquí va tu lógica real de carrito
    alert(`🍕 Agregada: ${pizza.nombre}`);
  };

  return (
    <main className="shell">
      <section className="container">
        <h2 className="home-section__title">Nuestras pizzas</h2>
        <div className="pizza-grid">
          {PIZZAS.map((p) => (
            <article key={p.id} className="pizza-card">
              <div className="pizza-card__imgwrap">
                <img src={p.img} alt={p.nombre} className="pizza-card__img" />
              </div>
              <div className="pizza-card__body">
                <h3 className="pizza-card__title">{p.nombre}</h3>
                <p className="pizza-card__desc">{p.descr}</p>
                <div className="pizza-card__footer">
                  <span className="pizza-card__price">${p.precio} MXN</span>
                  <button className="btn btn--primary btn--sm" onClick={() => handleAdd(p)}>
                    Agregar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
