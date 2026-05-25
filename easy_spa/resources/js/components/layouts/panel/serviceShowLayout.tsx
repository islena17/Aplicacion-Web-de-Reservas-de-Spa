// components/layouts/panel/serviceShowLayout.tsx

import { useNavigate } from 'react-router-dom';
import type { Service } from '@/types';

interface Props {
  service: Service;
  backPath: string;
  editPath?: string;
  title?: string;
  description?: string;
}

export default function ServiceShowLayout({
  service,
  backPath,
  editPath,
  title = 'Detalle del servicio',
  description = 'Consulta la información del servicio.',
}: Props) {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#F7F7F7', minHeight: '100vh' }}>
      <div className="container py-4 py-lg-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h1 className="fw-bold mb-1" style={{ color: '#2f2f2f' }}>
              {title}
            </h1>
            <p className="text-muted mb-0">{description}</p>
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="custom-main-btn back-btn"
              onClick={() => navigate(backPath)}
            ><i className="bi bi-arrow-left"></i>
              Volver
            </button>

            {editPath && (
              <button
                type="button"
                className="custom-main-btn edit-2-btn"
                onClick={() => navigate(editPath)}
              >
                <i className="bi bi-pencil-square"></i>
                <span>Editar</span>
              </button>
            )}
          </div>
        </div>

        <div className="card border-0 shadow-sm" style={{ borderRadius: '20px' }}>
          <div className="card-header border-0 py-3 px-4 bg-white">
            <h5 className="mb-0 fw-bold">Datos del servicio</h5>
          </div>

          <div className="card-body p-4 p-lg-5 bg-white">
            <div className="row g-4">
              <Info label="Nombre" value={service.name} />
              <Info label="Slug" value={service.slug} />
              <Info
                label="Categoría"
                value={
                  service.category?.name ?? 'No indicado'
                }
              />
              <Info
                label="Duración"
                value={`${service.length_minutes ?? ''} minutos`}
              />
              <Info label="Precio" value={`${service.price ?? ''} €`} />
              <Info label="Imagen" value={service.image ?? service.image_url} />
              <Info
                label="Requiere empleado"
                value={service.requires_employee ? 'Sí' : 'No'}
              />
              <Info
                label="Servicio activo"
                value={service.is_active ? 'Sí' : 'No'}
              />
              <Info label="Descripción" value={service.description} full />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({
  label,
  value,
  full = false,
}: {
  label: string;
  value?: string | number | null;
  full?: boolean;
}) {
  return (
    <div className={full ? 'col-12' : 'col-12 col-md-6'}>
      <label className="form-label fw-semibold">{label}</label>
      <div
        className="p-3"
        style={{
          backgroundColor: '#F7F7F7',
          borderRadius: '12px',
          border: '1px solid #eee',
          minHeight: '48px',
        }}
      >
        <span className="text-muted">{value || 'No indicado'}</span>
      </div>
    </div>
  );
}