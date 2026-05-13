import React from 'react';
import logo_easy_spa from '@images/logo_easy_spa.png';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#ffffff', borderTop: '1px solid #eee', marginTop: 'auto' }}>
      <div className="container py-5">
        <div className="row g-4">
          
          {/* Columna 1: Logo y Eslogan */}
          <div className="col-12 col-md-4">
            <h4 style={{ color: '#94beac', fontWeight: 'bold', marginBottom: '15px' }}>
             <img src={logo_easy_spa} />
            </h4>
            <p className="text-muted" style={{ fontSize: '0.9rem', maxWidth: '300px' }}>
              Tu refugio de paz a un solo clic. Reserva las mejores experiencias de bienestar en los spas más exclusivos.
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="col-6 col-md-4">
            <h6 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Explorar</h6>
            <ul className="list-unstyled">
                 <li className="mb-2"><Link to="/" className="text-decoration-none text-muted small hover-link">Home</Link></li>
              <li className="mb-2"><Link to="/spas" className="text-decoration-none text-muted small hover-link">Listado de Spas</Link></li>
              <li className="mb-2"><Link to="/services" className="text-decoration-none text-muted small hover-link">Servicios</Link></li>
              
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div className="col-6 col-md-4">
            <h6 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Contacto</h6>
            <ul className="list-unstyled text-muted small">
              <li className="mb-2"><i className="bi bi-envelope me-2"></i> info@easyspa.com</li>
              <li className="mb-2"><i className="bi bi-geo-alt me-2"></i> Madrid, España</li>
              <li className="mb-2"><i className="bi bi-instagram me-2"></i> @easyspa_ig</li>
            </ul>
          </div>

        </div>

        <hr className="my-4" style={{ opacity: 0.1 }} />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>
            &copy; {currentYear} EasySpa. Todos los derechos reservados.
          </p>

        </div>
      </div>
    </footer>
  );
}