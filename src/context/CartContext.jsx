import React from "react";

const CartContext = React.createContext({
  count: 0,
  add: () => {},
  clear: () => {},
});

export function CartProvider({ children }) {
  // 🔹 Estado inicial desde localStorage
  const [count, setCount] = React.useState(() => {
    const n = Number(localStorage.getItem("cart_count"));
    return Number.isFinite(n) && n >= 0 ? n : 0;
  });

  // 🔹 Agregar pizzas
  const add = (qty = 1) => {
    setCount((c) => {
      const next = c + (qty || 1);
      localStorage.setItem("cart_count", String(next));
      return next;
    });
  };

  // 🔹 Vaciar carrito
  const clear = () => {
    localStorage.removeItem("cart_count");
    setCount(0);
  };

  // 🔹 Sincronizar entre pestañas
  React.useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "cart_count") {
        const n = Number(e.newValue);
        setCount(Number.isFinite(n) && n >= 0 ? n : 0);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <CartContext.Provider value={{ count, add, clear }}>
      {children}
    </CartContext.Provider>
  );
}

// 🔹 Hook para usar el carrito en cualquier componente
export function useCart() {
  return React.useContext(CartContext);
}
