import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import MagicRequest from "./pages/MagicRequest.jsx";
import Magic from "./pages/Magic.jsx";
import Profile from "./pages/Profile.jsx";   // si ya lo tienes
import Register from "./pages/Register.jsx"; // opcional
import "./styles.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/magic/request" element={<MagicRequest />} />
      <Route path="/magic" element={<Magic />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
