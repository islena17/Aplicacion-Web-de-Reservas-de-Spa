import { useLatestServices } from "@/hooks/Public/useLatestServices";

export default function LatestServices() {
  const { latestServices, loading } = useLatestServices();

  if (loading) return <div className="text-center py-5">Cargando novedades...</div>;

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center mb-4">
        <h2 className="mb-0" style={{ color: '#4a4a4a', fontWeight: 'bold' }}>
          Nuevas Experiencias
        </h2>
        <span className="badge ms-3" style={{ backgroundColor: '#ff6b6b' }}>¡RECIÉN LLEGADOS!</span>
      </div>

      <div className="row g-3 justify-content-center">
        {latestServices.map((service) => (
          <div key={service.id} className="col-12 col-md-6 col-lg-3 d-flex justify-content-center">
            <div className="card h-100 border-0 shadow-sm position-relative overflow-hidden" 
                 style={{ borderRadius: '15px', maxWidth: '350px', width: '100%' }}>
              
              {/* Cinta de "Nuevo" en la esquina */}
              <div className="new-ribbon">NUEVO</div>

              <img 
                src={service.image_url || 'https://via.placeholder.com/400x250'} 
                className="card-img-top" 
                alt={service.name}
                style={{ height: '180px', objectFit: 'cover' }}
              />
              
              <div className="card-body p-4">
                <div className="mb-2">
                  <small className="text-uppercase fw-bold text-muted" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
                    Disponible ahora
                  </small>
                </div>
                <h5 className="card-title" style={{ fontWeight: '700' }}>{service.name}</h5>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="h5 mb-0" style={{ color: '#94beac', fontWeight: 'bold' }}>
                    {service.price}€
                  </span>
                  <button className="btn btn-outline-dark btn-sm rounded-pill px-3">
                    Explorar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}