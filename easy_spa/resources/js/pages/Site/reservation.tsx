import { useParams } from 'react-router-dom';
import Navbar from '@/components/layouts/Navbar';
import { useClientReservation } from '@/hooks/Client/useClientReservation';


export default function ClientReservation() {
    const { spaSlug, serviceSlug } = useParams<{
        spaSlug: string;
        serviceSlug: string;
    }>();

    const {
        spa,
        service,
        client,
        employees,
        slots,
        form,
        loading,
        loadingSlots,
        loadingSubmit,
        errors,
        handleChange,
        selectSlot,
        submitReservation,
    } = useClientReservation(spaSlug, serviceSlug);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="container py-5 text-center">
                    <div className="spinner-border" style={{ color: '#E0C38D' }} />
                    <p className="text-muted mt-3">Cargando reserva...</p>
                </div>
            </>
        );
    }
    if (errors.general || !spa || !service || !client) {
        return (
            <>
                <Navbar />
                <div className="container py-5">
                    <div className="alert alert-danger">
                        {errors.general || 'No se pudieron cargar los datos de la reserva.'}
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
                        <div className="col-12 col-lg-4">
                            <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '24px' }}>
                                <h4 className="fw-bold mb-3">Resumen</h4>

                                <p className="mb-1 text-muted">Spa</p>
                                <h5 className="fw-bold mb-3">{spa?.name}</h5>

                                <p className="mb-1 text-muted">Servicio</p>
                                <h5 className="fw-bold mb-2">{service?.name}</h5>

                                <div className="text-muted mb-2">
                                    <i className="bi bi-clock me-1"></i>
                                    {service?.length_minutes} min
                                </div>

                                <div className="fw-bold mb-4" style={{ color: '#5ebd94', fontSize: '1.5rem' }}>
                                    {Number(service?.price).toFixed(2)} €
                                </div>

                                <hr />

                                <p className="mb-1 text-muted">Cliente</p>
                                <h6 className="fw-bold mb-1">
                                    {client?.name} {client?.surname}
                                </h6>
                                <p className="text-muted mb-0">{client?.email}</p>
                                <p className="text-muted mb-0">{client?.telephone}</p>
                            </div>
                        </div>

                        <div className="col-12 col-lg-8">
                            <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '24px' }}>
                                <h3 className="fw-bold mb-1">Completa tu reserva</h3>
                                <p className="text-muted mb-4">
                                    Selecciona empleado, fecha y horario disponible.
                                </p>

                                {errors.general && (
                                    <div className="alert alert-danger">{errors.general}</div>
                                )}

                                <form onSubmit={submitReservation}>
                                    <div className="row g-4">
                                        <div className="col-12 col-md-6">
                                            <label className="form-label fw-semibold">Empleado</label>
                                            <select
                                                name="employee_id"
                                                value={form.employee_id}
                                                onChange={handleChange}
                                                className="form-select"
                                            >
                                                <option value="">Cualquier empleado disponible</option>

                                                {(employees ?? []).map((employee) => (
                                                    <option key={employee.id} value={employee.id}>
                                                        {employee.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <label className="form-label fw-semibold">Fecha</label>
                                            <input
                                                type="date"
                                                name="reservation_date"
                                                value={form.reservation_date}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label fw-semibold">Horarios disponibles</label>

                                            {!form.reservation_date ? (
                                                <div className="alert alert-light border">
                                                    Selecciona una fecha para ver disponibilidad.
                                                </div>
                                            ) : loadingSlots ? (
                                                <div className="text-muted">Buscando horarios...</div>
                                            ) : slots.length === 0 ? (
                                                <div className="alert alert-warning">
                                                    No hay disponibilidad para esta fecha.
                                                </div>
                                            ) : (
                                                <div className="d-flex flex-wrap gap-2">
                                                    {(slots ?? []).map((slot, index) => {
                                                        const selected =
                                                            form.start_time === slot.start_time &&
                                                            form.end_time === slot.end_time &&
                                                            String(slot.employee_id ?? '') === form.employee_id;

                                                        return (
                                                            <button
                                                                key={index}
                                                                type="button"
                                                                onClick={() => selectSlot(slot)}
                                                                className="btn"
                                                                style={{
                                                                    borderRadius: '999px',
                                                                    padding: '9px 16px',
                                                                    fontWeight: 600,
                                                                    backgroundColor: selected ? '#E0C38D' : '#fff',
                                                                    color: selected ? '#fff' : '#7a6440',
                                                                    border: '1px solid #E0C38D',
                                                                }}
                                                            >
                                                                {slot.start_time} - {slot.end_time}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label fw-semibold">Observaciones</label>
                                            <textarea
                                                name="observations"
                                                rows={4}
                                                value={form.observations}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Añade cualquier comentario para el spa..."
                                            />
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-end mt-5">
                                        <button
                                            type="submit"
                                            disabled={
                                                loadingSubmit ||
                                                !form.reservation_date ||
                                                !form.start_time ||
                                                !form.end_time
                                                
                                            }
                                            className="btn"
                                            style={{
                                                backgroundColor: '#E0C38D',
                                                color: '#fff',
                                                borderRadius: '14px',
                                                padding: '12px 26px',
                                                fontWeight: 700,
                                                border: 'none',
                                            }}
                                        >
                                            {loadingSubmit ? 'Reservando...' : 'Confirmar reserva'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}