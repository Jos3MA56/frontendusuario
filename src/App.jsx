import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import MagicRequest from "./pages/MagicRequest.jsx";
import Magic from "./pages/Magic.jsx";
import Profile from "./pages/Profile.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import "./styles.css";

import ResetRequest from "./pages/ResetRequest.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import FirmaDigital from "./pages/FirmaDigital.jsx";

export default function App() {
  return (
    <>
      <Header />
      <div className="header-spacer" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/magic/request" element={<MagicRequest />} />
        <Route path="/magic" element={<Magic />} />
        <Route path="/reset/request" element={<ResetRequest />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/firma" element={<FirmaDigital />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
