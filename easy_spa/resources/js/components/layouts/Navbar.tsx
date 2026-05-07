import "../../../css/home.css";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg custom-navbar py-3">
            <div className="container-fluid px-5">
                <a className="navbar-brand fw-bold" href="/">
                    EasySpa
                </a>

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
                            <a className="nav-link active" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Spas</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Servicios</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Reservar</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Nosotros</a>
                        </li>
                    </ul>

                    <div className="d-flex gap-2">
                        <button className="btn btn-login">Login</button>
                        <button className="btn btn-register">Registrarse</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}