import { useAuth } from "@/context/AuthContext";
import { useTopServices } from "@/hooks/Public/useTopServices";
import { useNavigate } from "react-router-dom";

export default function TopServices() {
  const { user } = useAuth();
  const { topServices, loading } = useTopServices();
  const navigate = useNavigate();

  if (loading) return <div>Cargando experiencias...</div>;

  return (
    <div className="container py-5">
      <h2
        className="mb-4"
        style={{ color: "var(--color-text)", fontWeight: "bold" }}
      >
        Nuestras Mejores Experiencias
      </h2>

      <div className="row g-4 justify-content-center">
        {topServices.map((service) => (
          <div key={service.id} className="col-md-6 col-lg-4">
            <div
              className="card h-100 border-0 shadow-sm overflow-hidden"
              style={{ borderRadius: "15px" }}
            >
              <img
                src={service.image_url || "/api/placeholder/400/250"}
                className="card-img-top"
                alt={service.name}
                style={{ height: "200px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h5 className="card-title mb-2" style={{ fontWeight: 700 }}>
                  {service.name}
                </h5>

                <p className="text-muted small">
                  {service.reservations_count ?? 0} personas lo han disfrutado
                </p>

                <button
                  className="btn w-100 mt-2"
                  style={{
                    backgroundColor: "var(--color-secondary)",
                    color: "white",
                  }}
                  onClick={() => {
                    const reservationUrl = `/client/reservation-data/${service.spa?.slug}/${service.slug}`;

                    if (!user) {
                      navigate("/login", {
                        state: { from: reservationUrl },
                      });
                      return;
                    }

                    navigate(reservationUrl);
                  }}
                >
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