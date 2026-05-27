
import Navbar from "@/components/layouts/Navbar";
import { useUpdateUser } from "@/hooks/Client/useUpdateUser";
import { Link } from "react-router-dom";

export default function EditProfile() {
    const {
        form,
        errors,
        loading,
        loadingOptions,
        handleChange,
        updateUser,
        fieldError
    } = useUpdateUser();

    if (loadingOptions) return <> <Navbar /> <div className="container py-5">Cargando perfil...</div></>;

    return (
        <> 
        <Navbar />
            <div className="container py-5 mt-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div
                            className="card border-0 shadow-lg"
                            style={{
                                borderRadius: "20px",
                                overflow: "hidden",
                                background: "white"
                            }}
                        >
                            {/* HEADER */}
                            <div
                                className="card-header border-0 py-4"
                                style={{
                                    background: "linear-gradient(135deg, var(--color-main), var(--color-secondary))",
                                    color: "white"
                                }}
                            >
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h2 className="fw-bold mb-1">Editar Mi Perfil</h2>
                                        <p className="mb-0 opacity-75">
                                            Actualiza tu información personal
                                        </p>
                                    </div>

                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "60px",
                                            height: "60px",
                                            borderRadius: "50%",
                                            background: "rgba(255,255,255,0.2)",
                                            fontSize: "1.5rem"
                                        }}
                                    >
                                        👤
                                    </div>
                                </div>
                            </div>

                            {/* BODY */}
                            <div className="card-body p-5">
                                {errors.general && (
                                    <div
                                        className="alert border-0 shadow-sm"
                                        style={{
                                            backgroundColor: "#ffe5e5",
                                            color: "#b00020",
                                            borderRadius: "12px"
                                        }}
                                    >
                                        {errors.general}
                                    </div>
                                )}

                                <form onSubmit={updateUser}>
                                    {/* DATOS PERSONALES */}
                                    <div className="mb-4">
                                        <h5
                                            className="fw-bold mb-4"
                                            style={{ color: "var(--color-main)" }}
                                        >
                                            Información Personal
                                        </h5>

                                        <div className="row">
                                            {/* Nombre */}
                                            <div className="col-md-6 mb-4">
                                                <label className="form-label fw-semibold">
                                                    Nombre
                                                </label>

                                                <input
                                                    type="text"
                                                    name="client.name"
                                                    className={`form-control custom-input ${errors["client.name"] ? "is-invalid" : ""
                                                        }`}
                                                    value={form.client.name}
                                                    onChange={handleChange}
                                                />

                                                <div className="invalid-feedback">
                                                    {fieldError(errors["client.name"])}
                                                </div>
                                            </div>

                                            {/* Apellido */}
                                            <div className="col-md-6 mb-4">
                                                <label className="form-label fw-semibold">
                                                    Apellido
                                                </label>

                                                <input
                                                    type="text"
                                                    name="client.surname"
                                                    className={`form-control custom-input ${errors["client.surname"] ? "is-invalid" : ""
                                                        }`}
                                                    value={form.client.surname}
                                                    onChange={handleChange}
                                                />

                                                <div className="invalid-feedback">
                                                    {fieldError(errors["client.surname"])}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            {/* Email */}
                                            <div className="col-md-6 mb-4">
                                                <label className="form-label fw-semibold">
                                                    Correo Electrónico
                                                </label>

                                                <input
                                                    type="email"
                                                    name="email"
                                                    className={`form-control custom-input ${errors.email ? "is-invalid" : ""
                                                        }`}
                                                    value={form.email}
                                                    onChange={handleChange}
                                                />

                                                <div className="invalid-feedback">
                                                    {fieldError(errors.email)}
                                                </div>
                                            </div>

                                            {/* Teléfono */}
                                            <div className="col-md-6 mb-4">
                                                <label className="form-label fw-semibold">
                                                    Teléfono
                                                </label>

                                                <input
                                                    type="text"
                                                    name="client.telephone"
                                                    className={`form-control custom-input ${errors["client.telephone"]
                                                            ? "is-invalid"
                                                            : ""
                                                        }`}
                                                    value={form.client.telephone}
                                                    onChange={handleChange}
                                                />

                                                <div className="invalid-feedback">
                                                    {fieldError(errors["client.telephone"])}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* PASSWORD */}
                                    <div className="mb-5">
                                        <h5
                                            className="fw-bold mb-4"
                                            style={{ color: "var(--color-main)" }}
                                        >
                                            Seguridad
                                        </h5>

                                        <label className="form-label fw-semibold">
                                            Nueva Contraseña
                                        </label>

                                        <input
                                            type="password"
                                            name="password"
                                            className={`form-control custom-input ${errors.password ? "is-invalid" : ""
                                                }`}
                                            value={form.password}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                        />

                                        <small
                                            className="d-block mt-2"
                                            style={{ color: "var(--color-text)" }}
                                        >
                                            Déjalo vacío para mantener tu contraseña actual.
                                        </small>

                                        <div className="invalid-feedback">
                                            {fieldError(errors.password)}
                                        </div>
                                    </div>

                                    {/* BOTONES */}
                                    <div className="d-flex justify-content-end gap-3">
                                        <Link
                                            to="/client/profile"
                                            className="btn px-4 py-2"
                                            style={{
                                                border: "2px solid var(--color-secondary)",
                                                color: "var(--color-secondary)",
                                                borderRadius: "12px",
                                                fontWeight: "600"
                                            }}
                                        >
                                            Cancelar
                                        </Link>

                                        <button
                                            type="submit"
                                            className="btn px-4 py-2"
                                            disabled={loading}
                                            style={{
                                                background: "var(--color-secondary)",
                                                border: "none",
                                                color: "white",
                                                borderRadius: "12px",
                                                fontWeight: "600",
                                                boxShadow: "0 4px 15px rgba(0,0,0,0.15)"
                                            }}
                                        >
                                            {loading
                                                ? "Guardando..."
                                                : "Actualizar Perfil"}
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