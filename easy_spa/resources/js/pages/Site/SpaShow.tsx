import { useParams } from 'react-router-dom';
import Navbar from '@/components/layouts/Navbar';
import { useSpaShow } from '@/hooks/Public/Spa/useSpaShow';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function SpaShow() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    spa,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    filteredServices,
    categories,
  } = useSpaShow(slug);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container py-5 text-center">
          <div className="spinner-border" style={{ color: '#E0C38D' }} />
          <p className="text-muted mt-3">Cargando spa...</p>
        </div>
      </>
    );
  }

  if (error || !spa) {
    return (
      <>
        <Navbar />
        <div className="container py-5">
          <div className="alert alert-danger">
            {error || 'No se encontró el spa.'}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div style={{ backgroundColor: '#F7F7F7', minHeight: '100vh' }}>
        <div className="container py-5">
          <div className="row g-4">

            {/* IZQUIERDA */}
            <div className="col-12 col-lg-4">
              <div
                className="card border-0 shadow-sm text-center p-4"
                style={{ borderRadius: '24px' }}
              >
                <div className="d-flex justify-content-center mb-4">
                  <div
                    style={{
                      width: '160px',
                      height: '160px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      backgroundColor: '#d0eee1',
                      border: '6px solid #fff',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                    }}
                  >
                    <img
                      src={
                        spa.logo_url ||
                        'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop'
                      }
                      alt={spa.name}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>

                <h2 className="fw-bold mb-2" style={{ color: '#2f2f2f' }}>
                  {spa.name}
                </h2>

                {spa.description && (
                  <p className="text-muted mb-4" style={{ lineHeight: 1.7 }}>
                    {spa.description}
                  </p>
                )}

                <div className="text-start mt-3">
                  {spa.city && (
                    <InfoItem icon="bi bi-geo-alt-fill" label="Ciudad" value={spa.city} />
                  )}

                  {spa.address && (
                    <InfoItem icon="bi bi-signpost-2-fill" label="Dirección" value={spa.address} />
                  )}

                  {spa.postal_code && (
                    <InfoItem icon="bi bi-mailbox2" label="Código postal" value={spa.postal_code} />
                  )}

                  {spa.phone && (
                    <InfoItem icon="bi bi-telephone-fill" label="Teléfono" value={spa.phone} />
                  )}

                  {spa.email && (
                    <InfoItem icon="bi bi-envelope-fill" label="Email" value={spa.email} />
                  )}

                  {(spa.opening_time || spa.closing_time) && (
                    <InfoItem
                      icon="bi bi-clock-fill"
                      label="Horario"
                      value={`${spa.opening_time?.slice(0, 5) ?? '--:--'} - ${spa.closing_time?.slice(0, 5) ?? '--:--'
                        }`}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* DERECHA */}
            <div className="col-12 col-lg-8">
              <div
                className="card border-0 shadow-sm p-4"
                style={{ borderRadius: '24px' }}
              >
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                  <div>
                    <h3 className="fw-bold mb-1" style={{ color: '#2f2f2f' }}>
                      Servicios
                    </h3>
                    <p className="text-muted mb-0">
                      Elige una categoría para filtrar los servicios.
                    </p>
                  </div>

                  <select
                    className="form-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{
                      maxWidth: '260px',
                      borderRadius: '12px',
                      padding: '10px 14px',
                    }}
                  >
                    <option value="">Todas las categorías</option>

                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {filteredServices.length === 0 ? (
                  <div className="text-center py-5">
                    <i
                      className="bi bi-spa"
                      style={{ fontSize: '3rem', color: '#E0C38D' }}
                    ></i>
                    <h5 className="fw-semibold mt-3 mb-1">
                      No hay servicios disponibles
                    </h5>
                    <p className="text-muted mb-0">
                      Este spa todavía no tiene servicios en esta categoría.
                    </p>
                  </div>
                ) : (
                  <div className="row g-3">
                    {filteredServices.map((service) => (
                      <div className="col-12" key={service.id}>
                        <div
                          className="p-3"
                          style={{
                            borderRadius: '18px',
                            backgroundColor: '#FAFAFA',
                            border: '1px solid #eee',
                          }}
                        >
                          <div className="row g-3 align-items-center">

                            {/* IMAGEN */}
                            <div className="col-12 col-md-3">
                              <div
                                style={{
                                  height: '180px',
                                  borderRadius: '16px',
                                  overflow: 'hidden',
                                  backgroundColor: '#EDEDED',
                                }}
                              >
                                <img
                                  src={
                                    service.image_url ||
                                    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop'
                                  }
                                  alt={service.name}
                                  className="w-100 h-100"
                                  style={{
                                    objectFit: 'cover',
                                  }}
                                />
                              </div>
                            </div>

                            {/* INFO */}
                            <div className="col-12 col-md-9">
                              <div className="d-flex justify-content-between gap-3 flex-wrap h-100">

                                <div style={{ flex: 1 }}>
                                  <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                                    <h5 className="fw-bold mb-0">
                                      {service.name}
                                    </h5>

                                    {service.category && (
                                      <span
                                        className="badge"
                                        style={{
                                          backgroundColor: '#F2E6D0',
                                          color: '#7a6440',
                                          borderRadius: '999px',
                                        }}
                                      >
                                        {service.category.name}
                                      </span>
                                    )}
                                  </div>

                                  {service.description && (
                                    <p className="text-muted mb-3">
                                      {service.description}
                                    </p>
                                  )}

                                  <div className="d-flex flex-wrap gap-3 text-muted small">
                                    <span>
                                      <i className="bi bi-clock me-1"></i>
                                      {service.length_minutes} min
                                    </span>

                                    <span>
                                      <i className="bi bi-people me-1"></i>
                                      Capacidad {service.capacity}
                                    </span>
                                  </div>
                                </div>

                                {/* PRECIO */}
                                <div className="text-md-end">
                                  <div
                                    className="fw-bold mb-3"
                                    style={{
                                      color: '#5ebd94',
                                      fontSize: '1.4rem',
                                    }}
                                  >
                                    {Number(service.price).toFixed(2)} €
                                  </div>

                                  <button
                                    className="btn"
                                    onClick={() => {
                                      const reservationUrl = `/client/reservation-data/${spa.slug}/${service.slug}`;

                                      if (!user) {
                                        navigate('/login', {
                                          state: { from: reservationUrl },
                                        });
                                        return;
                                      }

                                      navigate(reservationUrl);
                                    }}
                                    style={{
                                      backgroundColor: '#E0C38D',
                                      color: '#fff',
                                      borderRadius: '12px',
                                      padding: '10px 18px',
                                      fontWeight: 700,
                                      border: 'none',
                                    }}
                                  >
                                    Reservar
                                  </button>
                                </div>

                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div
      className="d-flex align-items-start gap-3 py-3"
      style={{ borderBottom: '1px solid #eee' }}
    >
      <i className={icon} style={{ color: '#E0C38D', fontSize: '1.1rem' }}></i>

      <div>
        <div className="fw-semibold" style={{ color: '#2f2f2f' }}>
          {label}
        </div>
        <div className="text-muted">{value}</div>
      </div>
    </div>
  );
}