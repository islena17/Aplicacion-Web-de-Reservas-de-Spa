import { useTopServices } from "@/hooks/Public/useTopServices";

export default function TopServices() {
  const { topServices, loading } = useTopServices();

  if (loading) return <div>Cargando experiencias...</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-4" style={{ color: '#4a4a4a', fontWeight: 'bold' }}>Nuestras Mejores Experiencias</h2>
      <div className="row g-4 justify-content-center">
        {topServices.map((service, index) => (
          <div key={service.id} className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm overflow-hidden" style={{ borderRadius: '15px' }}>
              <div className="position-relative">
                <img 
                  src={service.image_url || '/api/placeholder/400/250'} 
                  className="card-img-top" 
                  alt={service.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              </div>
              
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title mb-0" style={{ fontWeight: '700' }}>{service.name}</h5>
                </div>
                <p className="text-muted small">
                   {service.reservations_count} personas lo han disfrutado
                </p>
                <button className="btn w-100 mt-2" style={{ backgroundColor: 'var(--color-secondary)', color: 'white' }}>
                  Reservar Ahora
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}