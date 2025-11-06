// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import MagicRequest from "./pages/MagicRequest.jsx";
import Magic from "./pages/Magic.jsx";
import Profile from "./pages/Profile.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="header-spacer" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/magic/request" element={<MagicRequest />} />
        <Route path="/magic" element={<Magic />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
