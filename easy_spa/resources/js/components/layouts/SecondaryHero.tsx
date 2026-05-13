type SecondaryHeroProps = {
  title: string;
  image: string;
  subtitle?: string;
  height?: string;
};

export default function SecondaryHero({
  title,
  image,
  subtitle,
  height = '320px',
}: SecondaryHeroProps) {
  return (
    <section
      className="position-relative d-flex align-items-center"
      style={{
        height,
        overflow: 'hidden',
        marginTop: '80px'
      }}
    >
      {/* Imagen fondo */}
      <img
        src={image}
        alt={title}
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          objectFit: 'cover',
        }}
      />

      {/* Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            'linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45))',
        }}
      />

      {/* Contenido */}
      <div className="container position-relative text-white">
        <div style={{ maxWidth: '700px' }}>
          <h1
            className="fw-bold mb-3"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              lineHeight: 1.1,
            }}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className="mb-0"
              style={{
                fontSize: '1.1rem',
                opacity: 0.95,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}