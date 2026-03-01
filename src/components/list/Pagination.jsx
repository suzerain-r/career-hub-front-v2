const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center gap-2 mt-8 px-4">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-3 py-2 border rounded-md bg-gray-100 disabled:opacity-50"
            >
                ←
            </button>

            {[...Array(totalPages).keys()].map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page + 1)}
                    className={`px-3 py-2 border rounded-md ${
                        currentPage === page + 1
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100'
                    }`}
                >
                    {page + 1}
                </button>
            ))}

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