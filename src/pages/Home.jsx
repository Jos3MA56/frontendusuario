import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const PIZZAS = [
  { id: 1, nombre: "Margarita", precio: 129, img: "/pizzas/margarita.jpg" },
  { id: 2, nombre: "Pepperoni", precio: 149, img: "/pizzas/pepperoni.jpg" },
  { id: 3, nombre: "Hawaiana", precio: 145, img: "/pizzas/hawaiana.jpg" },
  { id: 4, nombre: "Cuatro Quesos", precio: 159, img: "/pizzas/cuatroquesos.jpg" },
];

export default function Home() {
  const navigate = useNavigate();
  const { add } = useCart();
  const token = localStorage.getItem("access_token");
  const puedeAgregar = !!token;

  const onAgregar = (pizza) => {
    if (!puedeAgregar) {
      return navigate("/login", { state: { redirectTo: "/", msg: "Inicia sesión para agregar pizzas" } });
    }
    add(1); // suma 1 al contador
    // Opcional: feedback
    // alert(`Añadida: ${pizza.nombre}`);
  };

  return (
    <main className="container">
      <h1 className="page-title">Menú de Pizzas</h1>
      <div className="grid grid--4">
        {PIZZAS.map((p) => (
          <article key={p.id} className="card">
            <img src={p.img} alt={p.nombre} className="card__img" />
            <div className="card__body">
              <div className="card__title">{p.nombre}</div>
              <div className="card__price">${p.precio} MXN</div>
              <button className="btn btn--green" onClick={() => onAgregar(p)}>
                Agregar
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
