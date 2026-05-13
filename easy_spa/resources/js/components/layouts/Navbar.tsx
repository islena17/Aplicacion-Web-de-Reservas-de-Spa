import { useAuth } from "@/context/AuthContext";
import "../../../css/home.css";
import { Link } from "react-router-dom";
import logo_easy_spa from "@images/logo_easy_spa.png";

export default function Navbar() {

    const { user, logout } = useAuth();
    const role = user?.role?.name;
    return (
        
        <nav className="navbar navbar-expand-lg custom-navbar py-3 fixed-top">
            <div className="container-fluid px-5">
                <Link className="navbar-brand fw-bold" to="/">
                    <img src={logo_easy_spa}/>
                </Link>

                {/* Botón hamburguesa para móviles */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >

                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Quitamos la clase 'show' para que no rompa el flujo normal */}
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-3">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/spas">Spas</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/services">Servicios</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Nosotros</Link>
                        </li>
                    </ul>

                    <div className="d-flex gap-2">

                        {!user && (
                            <>
                                <Link className="btn btn-login" to="/login">
                                    Login
                                </Link>

                                <Link className="btn btn-register" to="/register">
                                    Registrarse
                                </Link>
                            </>
                        )}

                        {role === "Admin" && (
                            <Link className="btn btn-sm"
                                style={{
                                    backgroundColor: 'var(--color-secondary)',
                                    color: 'var(--color-text)'
                                }}
                                to="/admin">
                                Panel de Administración
                            </Link>
                        )}

                        {role === "WebMaster" && (
                            <Link className="btn btn-sm btn-warning"
                                style={{
                                    backgroundColor: 'var(--color-secondary)',
                                    color: 'var(--color-text)'
                                }} to="/webmaster">
                                Panel WebMaster
                            </Link>
                        )}

                        {role === "Client" && user?.client?.id && (
                            <Link
                                className="btn btn-sm px-3 py3"
                                style={{
                                    backgroundColor: 'var(--color-secondary)',
                                    color: 'var(--color-text)'
                                }}
                                to={`/client/profile`}
                            >
                              <i className="bi bi-person-gear"></i>  Perfil
                            </Link>
                        )}
                        {user && (
                            <button
                                className="btn btn-sm px-3 py3"
                                onClick={logout}
                                 style={{
                                    backgroundColor: 'var(--color-main)',
                                    color: 'var(--color-text)',
                                    
                                }}
                            >
                                <i className="bi bi-door-open"></i> Logout
                            </button>
                        )}

                    </div>
                </div>
            </div>
        </nav>
    );
}