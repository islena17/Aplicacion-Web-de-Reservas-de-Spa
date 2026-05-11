import { useNavigate } from 'react-router-dom';
import { useSpas } from '@/hooks/Public/Spa/useSpas';
import Navbar from '@/components/layouts/Navbar';
import SecondaryHero from '@/components/layouts/SecondaryHero';
import spasHero from '@images/spasHero.jpg';
import Pagination from '@/components/layouts/Pagination';
import { useState } from 'react';

export default function Spas() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    const { spas, loading, error, lastPage } = useSpas();

    if (loading) {
        return (
            <>
                <Navbar />
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                        minHeight: '100vh',
                        backgroundColor: '#f7f7f7',
                    }}
                >
                    <div className="text-center">
                        <div
                            className="spinner-border mb-3"
                            style={{ color: '#94beac' }}
                        />
                        <p style={{ color: '#7a7a7a' }}>
                            Cargando spas...
                        </p>
                    </div>
                </div>
            </>
        );
    }

    if (error) {

        return (
            <>
                <Navbar />
                <div
                    className="container py-5"
                    style={{ minHeight: '100vh' }}
                >
                    <div className="alert alert-danger">
                        {error}
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <SecondaryHero
                title="Nuestros spas"
                subtitle="Descubre experiencias únicas de bienestar."
                image={spasHero}
            />
            <div
                style={{
                    backgroundColor: '#f7f7f7',
                    minHeight: '100vh',
                }}
            >

                {/* CONTENT */}
                <div className="container py-5">
                    {spas.length === 0 ? (
                        <div className="text-center py-5">
                            <h4
                                className="fw-semibold"
                                style={{ color: '#7a7a7a' }}
                            >
                                No hay spas disponibles.
                            </h4>
                        </div>
                    ) : (

                        <div className="row g-4">
                            {spas.map((spa) => (
                                <div className="col-12" key={spa.id}>
                                    <div
                                        className="card border-0"
                                        style={{
                                            borderRadius: '24px',
                                            overflow: 'hidden',
                                            boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                                            backgroundColor: '#fff',
                                        }}
                                    >
                                        <div className="row g-0 align-items-stretch">

                                            {/* INFO IZQUIERDA */}
                                            <div className="col-md-8">
                                                <div className="card-body h-100 d-flex flex-column p-4">

                                                    <div className="mb-3">
                                                        <h2
                                                            className="fw-bold mb-2"
                                                            style={{ color: '#2f2f2f' }}
                                                        >
                                                            {spa.name}
                                                        </h2>

                                                        <div
                                                            className="d-flex align-items-center gap-2 mb-3"
                                                            style={{ color: '#7a7a7a' }}
                                                        >
                                                            <i className="bi bi-geo-alt-fill"></i>
                                                            <span>
                                                                {spa.city || 'Ubicación no indicada'}
                                                            </span>
                                                        </div>

                                                        {/* DESCRIPCIÓN */}
                                                        <p
                                                            style={{
                                                                color: '#555',
                                                                lineHeight: '1.7',
                                                                fontSize: '1rem',
                                                            }}
                                                        >
                                                            {spa.description ||
                                                                'Sin descripción disponible.'}
                                                        </p>
                                                    </div>

                                                    <div className="mt-auto">
                                                        <button
                                                            className="btn"
                                                            onClick={() =>
                                                                navigate(`/spas/${spa.slug}`)
                                                            }
                                                            style={{
                                                                backgroundColor: '#E0C38D',
                                                                color: '#fff',
                                                                borderRadius: '14px',
                                                                padding: '12px 24px',
                                                                fontWeight: 700,
                                                                border: 'none',
                                                            }}
                                                        >
                                                            Ver spa
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* IMAGEN DERECHA */}
                                            <div className="col-md-4">
                                                <div
                                                    style={{
                                                        height: '100%',
                                                        minHeight: '300px',
                                                        overflow: 'hidden',
                                                        backgroundColor: '#d0eee1',
                                                    }}
                                                >
                                                    <img
                                                        src={spa.logo_url}
                                                        alt={spa.name}
                                                        className="w-100 h-100"
                                                        style={{
                                                            objectFit: 'cover',
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <Pagination
                        currentPage={page}
                        lastPage={lastPage}
                        onPageChange={setPage}
                    />
                </div>
            </div>
        </>
    );
}