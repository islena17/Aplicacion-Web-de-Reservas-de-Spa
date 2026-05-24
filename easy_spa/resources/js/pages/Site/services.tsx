import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import Pagination from "@/components/layouts/Pagination";
import SecondaryHero from "@/components/layouts/SecondaryHero";
import { useAuth } from "@/context/AuthContext";
import useServices from "@/hooks/Public/useServices";
import spasHero from '@images/spasHero.jpg';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export default function ShowServices() {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    // Obtenemos los parámetros de la URL
    const { spaSlug } = useParams<{ spaSlug: string }>();

    // Pasamos el spaSlug al hook para que sepa qué servicios traer
 const [page, setPage] = useState(1);

const {
    services,
    loading,
    error,
    lastPage,
} = useServices(spaSlug, page);


    if (loading) {
        return (
            <>
            <Navbar />
             <SecondaryHero
                title="Nuestros Servicios"
                subtitle="Descubre nuestro catalago de servicios."
                image={spasHero}
            />
            
            <div className="col-12 col-lg-8 text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
            </>
        );
        
    }

    if (error) {
        return (
            <>
            <Navbar />
            <SecondaryHero
                title="Nuestros Servicios"
                subtitle="Descubre nuestro catalago de servicios."
                image={spasHero}
            />
            <div className="col-12 col-lg-8">
                <div className="alert alert-danger border-0 shadow-sm">{error}</div>
            </div>
            </>
        );
    }
    return (
         <>
         <Navbar />
          <SecondaryHero
                title="Nuestros Servicios"
                subtitle="Descubre nuestro catalago de servicios."
                image={spasHero}
            />
            <div className="col-12 d-flex justify-content-center">
        <div className="col-12 col-lg-8 py-5">
            
            <div
                className="card border-0 shadow-sm p-4"
                style={{ borderRadius: '24px' }}
            >
            

                {services.length === 0 ? (
                    <div className="text-center py-5">
                        <i
                            className="bi bi-spa"
                            style={{ fontSize: '3rem', color: '#E0C38D' }}
                        ></i>
                        <h5 className="fw-semibold mt-3 mb-1">
                            No hay servicios disponibles
                        </h5>
                        <p className="text-muted mb-0">
                            Este spa todavía no tiene servicios en esta categoría.
                        </p>
                    </div>
                ) : (
                    <div className="row g-3">
                        {services.map((service) => (
                            <div className="col-12" key={service.id}>
                                <div
                                    className="p-3"
                                    style={{
                                        borderRadius: '18px',
                                        backgroundColor: '#FAFAFA',
                                        border: '1px solid #eee',
                                    }}
                                >
                                    <div className="row g-3 align-items-center">

                                        {/* IMAGEN */}
                                        <div className="col-12 col-md-3">
                                            <div
                                                style={{
                                                    height: '180px',
                                                    borderRadius: '16px',
                                                    overflow: 'hidden',
                                                    backgroundColor: '#EDEDED',
                                                }}
                                            >
                                                <img
                                                    src={
                                                        service.image_url ||
                                                        'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop'
                                                    }
                                                    alt={service.name}
                                                    className="w-100 h-100"
                                                    style={{
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* INFO */}
                                        <div className="col-12 col-md-9">
                                            <div className="d-flex justify-content-between gap-3 flex-wrap h-100">

                                                <div style={{ flex: 1 }}>
                                                    <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                                                        <h5 className="fw-bold mb-0">
                                                            {service.name}
                                                        </h5>

                                                        {service.category && (
                                                            <span
                                                                className="badge"
                                                                style={{
                                                                    backgroundColor: '#F2E6D0',
                                                                    color: '#7a6440',
                                                                    borderRadius: '999px',
                                                                }}
                                                            >
                                                                {service.category.name}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {service.description && (
                                                        <p className="text-muted mb-3">
                                                            {service.description}
                                                        </p>
                                                    )}

                                                    <div className="d-flex flex-wrap gap-3 text-muted small">
                                                        <span>
                                                            <i className="bi bi-clock me-1"></i>
                                                            {service.length_minutes} min
                                                        </span>

                                                        <span>
                                                            <i className="bi bi-people me-1"></i>
                                                            Maximo de personas: {service.capacity}
                                                        </span>
                                                         <span>
                                                            <i className="bi bi-geo-alt"></i>
                                                            {service.spa?.name}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* PRECIO */}
                                                <div className="text-md-end">
                                                    <div
                                                        className="fw-bold mb-3"
                                                        style={{
                                                            color: '#5ebd94',
                                                            fontSize: '1.4rem',
                                                        }}
                                                    >
                                                        {Number(service.price).toFixed(2)} €
                                                    </div>

                                                    <button
                                                        className="btn"
                                                        onClick={() => {
                                                            const reservationUrl = `/client/reservation-data/${service.spa?.slug}/${service.slug}`;

                                                            if (!user) {
                                                                navigate('/login', {
                                                                    state: { from: reservationUrl },
                                                                });
                                                                return;
                                                            }

                                                            navigate(reservationUrl);
                                                        }}
                                                        style={{
                                                            backgroundColor: '#E0C38D',
                                                            color: '#fff',
                                                            borderRadius: '12px',
                                                            padding: '10px 18px',
                                                            fontWeight: 700,
                                                            border: 'none',
                                                        }}
                                                    >
                                                        Reservar
                                                    </button>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}

                         <Pagination
                currentPage={page}
                lastPage={lastPage}
                onPageChange={setPage}
            />
                    </div>
                )}
            </div>
            </div>
        </div>
        <Footer />
         </>
    )
}
