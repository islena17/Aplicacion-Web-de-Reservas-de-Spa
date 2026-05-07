import "../../../css/home.css"
import homeHero from '@images/homeHero.jpg';
export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center min-vh-100">

          <div className="col-lg-6">
            <span className="hero-badge">
              Relájate · Reserva · Disfruta
            </span>

            <h1 className="hero-title">
              Encuentra el spa perfecto para desconectar
            </h1>

            <p className="hero-text">
              Reserva tratamientos, circuitos termales y experiencias wellness
              en los mejores spas cerca de ti.
            </p>

            <div className="d-flex flex-wrap gap-3 mt-4">
              <a href="#" className="btn hero-btn-primary">
                Reservar ahora
              </a>

              <a href="#" className="btn hero-btn-secondary">
                Ver spas
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>50+</strong>
                <span>Spas</span>
              </div>

              <div>
                <strong>120+</strong>
                <span>Servicios</span>
              </div>

              <div>
                <strong>4.8★</strong>
                <span>Valoración</span>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mt-5 mt-lg-0">
            <div className="hero-card">
              <img
                src={homeHero}
                alt="Spa relajante"
                className="hero-img"
              />

              <div className="floating-card">
                <i className="bi bi-calendar-check"></i>
                <div>
                  <strong>Reserva rápida</strong>
                  <span>Elige fecha y hora</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}