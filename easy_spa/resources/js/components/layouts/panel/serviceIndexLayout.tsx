// components/layouts/panel/servicesLayout.tsx

import { useNavigate } from 'react-router-dom';
import Pagination from '@/components/layouts/Pagination';
import { Service } from '@/types';

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
    showBackButton?: boolean;
    backPath?: string;
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
    showBackButton = true,
    backPath
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
                            className="custom-main-btn create-btn"
                            onClick={() => navigate(createPath)}
                        >
                            <i className="bi bi-plus-circle"></i> Nuevo servicio
                        </button>

                        {showBackButton && backPath && (
                            <button
                                className="custom-main-btn back-btn"
                                onClick={() => navigate(backPath)}
                            >
                                <i className="bi bi-arrow-left"></i>
                                Volver
                            </button>
                        )}
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
                                            <th className="px-4 py-3">Capacidad</th>
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
                                                        '-'}
                                                </td>

                                                <td className="px-4 py-3">
                                                    {service.length_minutes} min
                                                </td>

                                                <td className="px-4 py-3">{service.price} €</td>
                                                <td className="px-4 py-3">{service.capacity}</td>

                                                <td className="px-4 py-3">
                                                    <span
                                                        className={`badge ${service.is_active ? 'bg-success' : 'bg-secondary'
                                                            }`}
                                                    >
                                                        {service.is_active ? 'Activo' : 'Inactivo'}
                                                    </span>
                                                </td>

                                                <td className="text-end px-3">
                                                    <div className="d-flex justify-content-end gap-3">

                                                        <button
                                                            type="button"
                                                            className="custom-action-wrapper"
                                                            onClick={() => navigate(getShowPath(service))}
                                                        >
                                                            <i className="bi bi-eye action-icon text-secondary"></i>
                                                            <span className="action-label view-label">Ver</span>
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="custom-action-wrapper"
                                                            onClick={() => navigate(getEditPath(service))}
                                                        >
                                                            <i className="bi bi-pencil-square action-icon"></i>
                                                            <span className="action-label edit-label">Editar</span>
                                                        </button>

                                                        {onDelete && (
                                                            <button
                                                                type="button"
                                                                className="custom-action-wrapper"
                                                                onClick={() => onDelete(service.slug)}
                                                            >
                                                                <i className="bi bi-trash action-icon text-danger"></i>
                                                                <span className="action-label delete-label">Eliminar</span>
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