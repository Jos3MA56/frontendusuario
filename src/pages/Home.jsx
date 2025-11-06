import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PIZZAS = [
  {
    id: 1,
    nombre: "Margarita",
    descr: "Tomate, mozzarella y albahaca.",
    precio: 129,
    img: "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg"
  },
  {
    id: 2,
    nombre: "Pepperoni",
    descr: "Doble pepperoni y queso.",
    precio: 149,
    img: "https://cdn.pixabay.com/photo/2023/07/10/18/34/pizza-8119829_1280.jpg"
  },
  {
    id: 3,
    nombre: "Hawaiana",
    descr: "Jamón, piña y mozzarella.",
    precio: 145,
    img: "https://cdn.pixabay.com/photo/2022/08/26/07/12/pizza-7411393_1280.jpg"
  },
  {
    id: 4,
    nombre: "Cuatro Quesos",
    descr: "Mozzarella, parmesano, gouda y azul.",
    precio: 159,
    img: "https://cdn.pixabay.com/photo/2017/08/21/14/52/pizza-2668471_1280.jpg"
  }
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
