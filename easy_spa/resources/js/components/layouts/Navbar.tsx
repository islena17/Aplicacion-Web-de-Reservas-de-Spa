import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import "../../../css/home.css";
import { Link } from "react-router-dom";
import logo_easy_spa from "@images/logo_easy_spa.png";
import { useLogout } from "@/hooks/Auth/useLogout";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuth();
  const role = user?.role?.name;
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar custom-navbar py-3 fixed-top">
      <div className="container-fluid px-5">
        <Link className="navbar-brand fw-bold" to="/">
          <img src={logo_easy_spa} />
        </Link>

        <button
          className="navbar-toggler d-lg-none"
          type="button"
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`navbar-content ${open ? "open" : ""}`}>
          <ul className="navbar-nav-custom">
            <li><Link className="nav-link active" to="/">Home</Link></li>
            <li><Link className="nav-link" to="/spas">Spas</Link></li>
            <li><Link className="nav-link" to="/services">Servicios</Link></li>
          </ul>

          <div className="navbar-buttons">
            {!user && (
              <>
                <Link className="btn btn-login" to="/login">Login</Link>
                <Link className="btn btn-register" to="/register">Registrarse</Link>
              </>
            )}

            {role === "Admin" && (
              <Link className="btn btn-login btn-panel" to="/admin">
                Panel de Administración
              </Link>
            )}

            {role === "WebMaster" && (
              <Link className="btn btn-login btn-panel" to="/dashboard">
                Panel WebMaster
              </Link>
            )}

            {role === "Client" && user?.client?.id && (
              <Link className="btn btn-login btn-panel" to="/client/profile">
                <i className="bi bi-person-gear"></i> Perfil
              </Link>
            )}

            {user && (
              <button className="btn btn-logout" onClick={logout}>
                <i className="bi bi-door-open"></i> Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}