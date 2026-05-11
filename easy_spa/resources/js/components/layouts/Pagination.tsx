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
    return (
        <div className="d-flex align-items-center gap-2 mt-4">

            <button
                className="btn btn-outline-dark"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Anterior
            </button>

            {Array.from({ length: lastPage }, (_, index) => {
                const page = index + 1;

                return (
                    <button
                        key={page}
                        className={`btn ${
                            currentPage === page
                                ? "btn-dark"
                                : "btn-outline-dark"
                        }`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                );
            })}

            <button
                className="btn btn-outline-dark"
                disabled={currentPage === lastPage}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Siguiente
            </button>

        </div>
    );
}