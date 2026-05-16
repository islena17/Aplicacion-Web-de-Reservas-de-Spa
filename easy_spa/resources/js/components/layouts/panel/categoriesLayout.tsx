import { useNavigate } from 'react-router-dom';
import Pagination from '@/components/layouts/Pagination';
import type { ServiceCategory } from '@/types';

interface Props {
    title?: string;
    description?: string;
    categories: ServiceCategory[];
    loading: boolean;
    error: string;
    page: number;
    lastPage: number;
    setPage: (page: number) => void;
    createPath: string;
    showBackButton?: boolean;
    getShowPath: (category: ServiceCategory) => string;
    getEditPath: (category: ServiceCategory) => string;
    onDelete?: (categorySlug: string) => void;
}

export default function CategoriesIndexLayout({
    title = 'Categorías',
    description = 'Gestiona las categorías de servicios.',
    categories,
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
}: Props) {
    const navigate = useNavigate();

    const safeCategories = Array.isArray(categories) ? categories : [];

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
                            <i className="bi bi-plus-lg"></i> Nueva categoría
                        </button>


                        {showBackButton && (
                            <button
                                className="btn d-flex align-items-center gap-2"
                                onClick={() => navigate(-1)}
                                style={{
                                    backgroundColor: "#F2E6D0",
                                    color: "#7a6440",
                                    borderRadius: "12px",
                                    padding: "10px 16px",
                                    fontWeight: 600,
                                    border: "none",
                                }}
                            >
                                <i className="bi bi-arrow-left"></i>
                                Volver
                            </button>
                        )}
                    </div>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                {loading ? (
                    <div className="text-center py-5">Cargando categorías...</div>
                ) : safeCategories.length === 0 ? (
                    <div className="text-center py-5 text-muted">
                        No hay categorías registradas.
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
                                            <th>Slug</th>
                                            <th>Orden</th>
                                            <th>Activa</th>
                                            <th>Servicios</th>
                                            <th className="text-end px-4">Acciones</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {safeCategories.map((category) => (
                                            <tr key={category.id}>
                                                <td className="px-4 fw-semibold">{category.name}</td>
                                                <td>{category.slug}</td>
                                                <td>{category.order}</td>

                                                <td>
                                                    <span
                                                        className={`badge ${category.is_active ? 'bg-success' : 'bg-secondary'
                                                            }`}
                                                    >
                                                        {category.is_active ? 'Activa' : 'Inactiva'}
                                                    </span>
                                                </td>

                                                <td>
                                                    {category.services_count ??
                                                        category.services?.length ??
                                                        0}
                                                </td>

                                                <td className="text-end px-4">
                                                    <div className="d-flex justify-content-end gap-2">
                                                        <button
                                                            className="btn btn-sm"
                                                            onClick={() => navigate(getShowPath(category))}
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
                                                            onClick={() => navigate(getEditPath(category))}
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
                                                                onClick={() => onDelete(category.slug)}
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