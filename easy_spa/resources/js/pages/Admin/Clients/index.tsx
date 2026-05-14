import useClients from "@/hooks/Admin/Client/useClients";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/layouts/AdminLayout";
import Pagination from "@/components/layouts/Pagination";

export default function AdminClientsIndex() {
    const {
        clients,
        loading,
        error,
        lastPage,
        setPage,
        page, } = useClients();

    const navigate = useNavigate();

    if (loading) return <AdminLayout><p>Cargando clientes...</p></AdminLayout>;
    if (error) return <AdminLayout><p className="text-danger">{error}</p></AdminLayout>;

    return (
        <AdminLayout>
            <div style={{ backgroundColor: '#F7F7F7', minHeight: '100vh' }}>
                <div className="container py-4 py-lg-5">

                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                        <div>
                            <h1 className="fw-bold mb-1" style={{ color: '#2f2f2f' }}>
                                Clientes
                            </h1>
                            <p className="text-muted mb-0">
                                Gestiona los clientes de tu spa.
                            </p>
                        </div>
                    </div>

                    {!loading && clients.length === 0 ?   (
                        <div className="text-center py-5 text-muted">
                            No hay clientes registrados.
                        </div>
                    ) : (
                        <div className="card border-0 shadow-sm" style={{ borderRadius: 20 }}>
                            <div className="card-body p-4">
                                <table className="table align-middle">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-3">Cliente</th>
                                            <th className="px-4 py-3">Email</th>
                                            <th className="px-4 py-3">Teléfono</th>
                                            <th className="px-4 py-3">Reservas</th>
                                            <th className="px-4 py-3"></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {clients.map((client) => (
                                            <tr key={client.id}>
                                                <td className="px-4 py-3">{client.name} {client.surname}</td>
                                                <td className="px-4 py-3">{client.email || "-"}</td>
                                                <td className="px-4 py-3">{client.telephone || "-"}</td>
                                                <td className="px-4 py-3">{client.reservations_count ?? 0}</td>
                                                <td className="text-end">
                                                    <div className="d-flex justify-content-end gap-2">
                                                        <button
                                                            className="btn btn-sm"
                                                            onClick={() =>
                                                                navigate(`/admin/clients/${client.id}`)
                                                            }
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
                                                            onClick={() =>
                                                                navigate(`/admin/clients/${client.id}/edit`)
                                                            }
                                                            style={{
                                                                backgroundColor: '#E0C38D',
                                                                color: '#fff',
                                                                borderRadius: '10px',
                                                            }}
                                                        >
                                                            Editar
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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
        </AdminLayout >
    );
}