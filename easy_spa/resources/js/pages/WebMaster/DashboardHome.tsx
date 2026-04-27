import DashboardLayout from "./layouts/DashboardLayout";

export default function DashboardHome() {
  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h1 className="page-title mb-1">Dashboard</h1>
          <p className="page-subtitle mb-0">
            Resumen general de reservas, ingresos y actividad.
          </p>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card stat-card border-start-main">
            <div>
              <p className="stat-label">Ingresos mensuales</p>
              <h3 className="stat-value">€4,800</h3>
            </div>
            <i className="bi bi-currency-euro stat-icon"></i>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-3">
          <div className="card stat-card border-start-success">
            <div>
              <p className="stat-label">Ingresos anuales</p>
              <h3 className="stat-value">€52,300</h3>
            </div>
            <i className="bi bi-graph-up-arrow stat-icon"></i>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-3">
          <div className="card stat-card border-start-info">
            <div>
              <p className="stat-label">Ocupación</p>
              <h3 className="stat-value">68%</h3>
            </div>
            <i className="bi bi-calendar2-check stat-icon"></i>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-3">
          <div className="card stat-card border-start-warning">
            <div>
              <p className="stat-label">Pendientes</p>
              <h3 className="stat-value">12</h3>
            </div>
            <i className="bi bi-clock-history stat-icon"></i>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-xl-8">
          <div className="card panel-card h-100">
            <div className="panel-header">
              <h5 className="mb-0">Resumen de ingresos</h5>
            </div>
            <div className="panel-body chart-placeholder">
              <div className="fake-chart">
                <div className="fake-line"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className="card panel-card h-100">
            <div className="panel-header">
              <h5 className="mb-0">Fuentes de reservas</h5>
            </div>
            <div className="panel-body d-flex align-items-center justify-content-center">
              <div className="donut-demo"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-xl-6">
          <div className="card panel-card h-100">
            <div className="panel-header">
              <h5 className="mb-0">Servicios más reservados</h5>
            </div>
            <div className="panel-body">
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span>Masaje relajante</span>
                  <span>80%</span>
                </div>
                <div className="progress custom-progress">
                  <div className="progress-bar bg-main" style={{ width: "80%" }}></div>
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span>Facial premium</span>
                  <span>60%</span>
                </div>
                <div className="progress custom-progress">
                  <div className="progress-bar bg-soft" style={{ width: "60%" }}></div>
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span>Circuito termal</span>
                  <span>45%</span>
                </div>
                <div className="progress custom-progress">
                  <div className="progress-bar bg-darksoft" style={{ width: "45%" }}></div>
                </div>
              </div>

              <div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Ritual completo</span>
                  <span>30%</span>
                </div>
                <div className="progress custom-progress">
                  <div className="progress-bar bg-main" style={{ width: "30%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-6">
          <div className="card panel-card h-100">
            <div className="panel-header">
              <h5 className="mb-0">Actividad reciente</h5>
            </div>
            <div className="panel-body">
              <div className="activity-item">
                <div className="activity-dot"></div>
                <div>
                  <p className="mb-1 fw-semibold">Nueva reserva confirmada</p>
                  <small className="text-muted">Hace 10 minutos</small>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-dot"></div>
                <div>
                  <p className="mb-1 fw-semibold">Pago recibido de Laura Gómez</p>
                  <small className="text-muted">Hace 45 minutos</small>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-dot"></div>
                <div>
                  <p className="mb-1 fw-semibold">Empleado asignado a cita</p>
                  <small className="text-muted">Hace 1 hora</small>
                </div>
              </div>

              <div className="activity-item mb-0">
                <div className="activity-dot"></div>
                <div>
                  <p className="mb-1 fw-semibold">Nuevo cliente registrado</p>
                  <small className="text-muted">Hace 3 horas</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}