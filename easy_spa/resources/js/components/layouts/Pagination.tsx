import '../../../css/pagination.css';

type PaginationProps = {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  lastPage,
  onPageChange,
}: PaginationProps) {
  if (lastPage <= 1) return null;

  return (
    <nav className="pagination-wrapper" aria-label="Paginación">
      <button
        className="pagination-btn pagination-nav"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <i className="bi bi-chevron-left"></i>
        Anterior
      </button>

      <div className="pagination-pages">
        {Array.from({ length: lastPage }, (_, index) => {
          const page = index + 1;

          return (
            <button
              key={page}
              className={`pagination-btn pagination-page ${
                currentPage === page ? 'active' : ''
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        className="pagination-btn pagination-nav"
        disabled={currentPage === lastPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Siguiente
        <i className="bi bi-chevron-right"></i>
      </button>
    </nav>
  );
}