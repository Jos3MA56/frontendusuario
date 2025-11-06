import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx"; // 🛒 Importa el contexto
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Envolvemos TODA la app con el CartProvider */}
      <CartProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
