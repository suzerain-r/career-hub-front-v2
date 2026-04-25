import { useMemo } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = useMemo(() => {
        if (!totalPages || totalPages < 1) return [];

        const delta = 2; // сколько страниц показывать слева/справа

        const range = [];
        const start = Math.max(1, currentPage - delta);
        const end = Math.min(totalPages, currentPage + delta);

        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        return range;
    }, [currentPage, totalPages]);

    if (!totalPages || totalPages === 1) return null;

    return (
        <div className="flex justify-center gap-2 mt-8 px-4">

            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-3 py-2 border rounded-md bg-gray-100 disabled:opacity-50"
            >
                ←
            </button>

            {currentPage > 3 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className="px-3 py-2 border rounded-md bg-gray-100"
                    >
                        1
                    </button>
                    <span className="px-2">...</span>
                </>
            )}

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-2 border rounded-md ${
                        currentPage === page
                            ? "bg-[#0A65CC] text-white"
                            : "bg-gray-100"
                    }`}
                >
                    {page}
                </button>
            ))}

            {currentPage < totalPages - 2 && (
                <>
                    <span className="px-2">...</span>
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className="px-3 py-2 border rounded-md bg-gray-100"
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-3 py-2 border rounded-md bg-gray-100 disabled:opacity-50"
            >
                →
            </button>
        </div>
    );
};

export default Pagination;