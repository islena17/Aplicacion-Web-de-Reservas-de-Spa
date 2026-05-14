// components/layouts/panel/servicesLayout.tsx

import { useNavigate } from 'react-router-dom';
import Pagination from '@/components/layouts/Pagination';

interface Service {
    id: number;
    name: string;
    slug: string;
    length_minutes: number;
    price: number;
    is_active: boolean;
    category?: {
        name: string;
    };
    service_category?: {
        name: string;
    };
}

interface Props {
    title?: string;
    description?: string;
    services: Service[];
    loading: boolean;
    error: string;
    page: number;
    lastPage: number;
    setPage: (page: number) => void;
    createPath: string;
    getShowPath: (service: Service) => string;
    getEditPath: (service: Service) => string;
    onDelete?: (serviceSlug: string) => void;
}

export default function ServicesIndexLayout({
    title = 'Servicios',
    description = 'Gestiona los servicios de tu spa.',
    services,
    loading,
    error,
    page,
    lastPage,
    setPage,
    createPath,
    getShowPath,
    getEditPath,
    onDelete,
}: Props) {
    const navigate = useNavigate();

    const safeServices = Array.isArray(services) ? services : [];

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

                    <div className="d-flex align-items-center gap-2">
                        <button
                            className="btn"
                            onClick={() => navigate(createPath)}
                            style={{
                                backgroundColor: '#E0C38D',
                                color: '#fff',
                                borderRadius: '12px',
                                padding: '10px 18px',
                                fontWeight: 700,
                            }}
                        >
                            <i className="bi bi-plus-lg"></i> Nuevo servicio
                        </button>

                        <button
                            className="btn d-flex align-items-center gap-2"
                            onClick={() => navigate(-1)}
                            style={{
                                backgroundColor: '#F2E6D0',
                                color: '#7a6440',
                                borderRadius: '12px',
                                padding: '10px 16px',
                                fontWeight: 600,
                                border: 'none',
                            }}
                        >
                            <i className="bi bi-arrow-left"></i>
                            Volver
                        </button>
                    </div>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}

                {loading ? (
                    <div className="text-center py-5">Cargando servicios...</div>
                ) : safeServices.length === 0 ? (
                    <div className="text-center py-5 text-muted">
                        No hay servicios registrados.
                    </div>
                ) : (
                    <div
                        className="card border-0 shadow-sm"
                        style={{ borderRadius: '20px', overflow: 'hidden' }}
                    >
                        <div className="card-body p-4">
                            <div className="table-responsive">
                                <table className="table align-middle mb-0">
                                    <thead style={{ backgroundColor: '#F7F7F7' }}>
                                        <tr>
                                            <th className="px-4 py-3">Nombre</th>
                                            <th className="px-4 py-3">Categoría</th>
                                            <th className="px-4 py-3">Duración</th>
                                            <th className="px-4 py-3">Precio</th>
                                            <th className="px-4 py-3">Activo</th>
                                            <th className="text-end px-4">Acciones</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {safeServices.map((service) => (
                                            <tr key={service.id}>
                                                <td className="px-4 fw-semibold">{service.name}</td>

                                                <td className="px-4 py-3">
                                                    {service.category?.name ??
                                                        service.service_category?.name ??
                                                        '-'}
                                                </td>

                                                <td className="px-4 py-3">
                                                    {service.length_minutes} min
                                                </td>

                                                <td className="px-4 py-3">{service.price} €</td>

                                                <td className="px-4 py-3">
                                                    <span
                                                        className={`badge ${service.is_active ? 'bg-success' : 'bg-secondary'
                                                            }`}
                                                    >
                                                        {service.is_active ? 'Activo' : 'Inactivo'}
                                                    </span>
                                                </td>

                                                <td className="text-end px-4">
                                                    <div className="d-flex justify-content-end gap-2">
                                                        <button
                                                            className="btn btn-sm"
                                                            onClick={() => navigate(getShowPath(service))}
                                                            style={{
                                                                backgroundColor: '#F2E6D0',
                                                                color: '#7a6440',
                                                                borderRadius: '10px',
                                                            }}
                                                        >
                                                            Ver
                                                        </button>

                                                        <button
                                                            className="btn btn-sm"
                                                            onClick={() => navigate(getEditPath(service))}
                                                            style={{
                                                                backgroundColor: '#E0C38D',
                                                                color: '#fff',
                                                                borderRadius: '10px',
                                                            }}
                                                        >
                                                            Editar
                                                        </button>

                                                        {onDelete && (
                                                            <button
                                                                className="btn btn-sm btn-danger"
                                                                onClick={() => onDelete(service.slug)}
                                                                style={{ borderRadius: '10px' }}
                                                            >
                                                                Eliminar
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                <Pagination
                    currentPage={page}
                    lastPage={lastPage}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
}