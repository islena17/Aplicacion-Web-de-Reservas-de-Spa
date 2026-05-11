import DashboardLayout from "../../components/layouts/WMLayout";
import { useSpas } from "@/hooks/WebMaster/Spa/useSpas";
import { useGlobalReservation } from "@/hooks/WebMaster/Reservation/useGlobalReservation";
import { LayoutGrid, CheckCircle, Clock, XCircle, UserX, Award } from "lucide-react";

export default function DashboardHome() {
  const { totalSpas, activeSpasCount, spaTop } = useSpas();
  const { 
    totalReservationP, 
    totalReservationC, 
    totalReservationCd, 
    totalReservationNS, 
    lastReservations, 
    fieldStatus,
    statusClass 
  } = useGlobalReservation();

  return (
    <DashboardLayout>
      {/* Header Personalizado */}
      <div className="mb-4 mt-2">
        <h1 className="h3 fw-bold" style={{ color: "var(--color-text)" }}>Dashboard</h1>
        <p style={{ color: "var(--color-muted)" }}>Resumen general de reservas, ingresos y actividad.</p>
      </div>

      {/* Grid de Estadísticas */}
      <div className="row g-4 mb-5">
        <StatCard label="Total de Spas" value={totalSpas} icon={<LayoutGrid size={22}/>} />
        <StatCard label="Spas Activos" value={activeSpasCount} icon={<CheckCircle size={22}/>} active />
        <StatCard label="Reservas Pendientes" value={totalReservationP} icon={<Clock size={22}/>} />
        <StatCard label="Reservas Confirmadas" value={totalReservationC} icon={<CheckCircle size={22}/>} />
        <StatCard label="Reservas Canceladas" value={totalReservationCd} icon={<XCircle size={22}/>} />
        <StatCard label="No Shows" value={totalReservationNS} icon={<UserX size={22}/>} />
      </div>

      <div className="row g-4">
        {/* Spa con más reservas - Diseño Destacado */}
        <div className="col-12 col-xl-4">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '16px', background: 'linear-gradient(145deg, #ffffff, var(--color-bg-soft))' }}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center text-center p-4">
              <div className="mb-3 d-flex align-items-center justify-content-center" 
                   style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--color-soft)', color: 'var(--color-main)' }}>
                <Award size={32} />
              </div>
              <p className="small text-uppercase fw-bold mb-1" style={{ color: 'var(--color-muted)', letterSpacing: '1px' }}>Spa con más reservas</p>
              <h3 className="fw-bold mb-0" style={{ color: 'var(--color-text)' }}>{spaTop?.name || "Cargando..."}</h3>
              <div className="mt-4 w-100 p-2 rounded-3" style={{ border: '1px dashed var(--color-border)' }}>
                 <span className="small fw-medium" style={{ color: 'var(--color-main)' }}>Rendimiento Superior</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de Reservas */}
        <div className="col-12 col-xl-8">
          <div className="card border-0 shadow-sm" style={{ borderRadius: '16px', overflow: 'hidden' }}>
            <div className="card-header bg-white border-0 p-4">
              <h5 className="fw-bold mb-0" style={{ color: 'var(--color-text)' }}>Últimas 5 reservas</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead style={{ backgroundColor: 'var(--color-bg-soft)' }}>
                    <tr>
                      <th className="ps-4 py-3 border-0 small fw-bold text-muted">CLIENTE</th>
                      <th className="py-3 border-0 small fw-bold text-muted">SERVICIO</th>
                      <th className="py-3 border-0 small fw-bold text-muted">SPA</th>
                      <th className="py-3 border-0 small fw-bold text-muted">ESTADO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lastReservations.map((res: any) => (
                      <tr key={res.id}>
                        <td className="ps-4 py-3 fw-medium" style={{ color: 'var(--color-text)' }}>
                          {res.client?.name} {res.client?.surname}
                        </td>
                        <td className="py-3 text-muted">{res.service?.name}</td>
                        <td className="py-3 text-muted">{res.spa?.name}</td>
                        <td className="py-3">
                          <span className={`badge ${statusClass(res.status)} px-3 py-2`} style={{ borderRadius: '8px', fontWeight: '600', fontSize: '0.75rem' }}>
                            {fieldStatus(res.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>


    </DashboardLayout>
  );
}

// Sub-componente para las tarjetas de estadísticas
function StatCard({ label, value, icon, active = false }: { label: string, value: any, icon: any, active?: boolean }) {
  return (
    <div className="col-12 col-sm-6 col-xl-2">
      <div className="card stat-card-v2 h-100 p-3">
        <div className="d-flex align-items-center justify-content-center mb-3" 
             style={{ 
               width: '40px', 
               height: '40px', 
               borderRadius: '10px', 
               backgroundColor: active ? 'var(--color-main)' : 'var(--color-bg-soft)', 
               color: active ? '#fff' : 'var(--color-main)' 
             }}>
          {icon}
        </div>
        <p className="small fw-bold text-uppercase mb-1" style={{ color: 'var(--color-muted)', fontSize: '0.65rem', letterSpacing: '0.5px' }}>
          {label}
        </p>
        <h4 className="fw-bold mb-0" style={{ color: 'var(--color-text)' }}>{value}</h4>
      </div>
    </div>
  );
}