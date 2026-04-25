import { XMarkIcon } from '@heroicons/react/24/outline';

const SideBar = ({
    filters,
    filterConfig,
    onFilterChange,
    onClearFilters,
    isOpen,
    onClose
}) => {

    // =========================
    // REUSABLE FILTER BLOCK
    // =========================
    const renderFilters = () => (
        Object.entries(filterConfig).map(([filterName, values]) => (
            <div key={filterName}>
                <h4 className="mb-4 font-medium text-lg capitalize">
                    {filterName}
                </h4>

                <div className="flex flex-col gap-2 mb-6">
                    {values.map((value) => (
                        <label
                            key={value}
                            className="flex items-center gap-2 text-gray-600"
                        >
                            <input
                                type="radio"
                                value={value}
                                checked={filters[filterName] === value}
                                onChange={(e) =>
                                    onFilterChange(filterName, e.target.value)
                                }
                            />
                            {value}
                        </label>
                    ))}
                </div>
            </div>
        ))
    );

    // =========================
    // CLEAR BUTTON
    // =========================
    const renderClear = () => (
        <button
            onClick={onClearFilters}
            className="mt-6 w-full bg-blue-50 text-blue-500 py-2 rounded-md hover:border hover:border-blue-500 transition"
        >
            Clear Filters
        </button>
    );

    return (
        <>
            {/* =========================
                DESKTOP
            ========================= */}
            <div className="lg:w-1/4 hidden lg:block border border-gray-200 rounded-xl p-6 h-fit">
                {renderFilters()}
                {renderClear()}
            </div>

            {/* =========================
                MOBILE
            ========================= */}
            <div
                className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300
                ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            >
                <div
                    className="absolute inset-0 bg-black/40"
                    onClick={onClose}
                />

                <div
                    className={`absolute left-0 top-0 h-full w-3/4 max-w-xs bg-white p-5
                    transform transition-transform duration-300
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <div className="flex justify-end cursor-pointer">
                        <XMarkIcon
                            onClick={onClose}
                            className="w-9 h-9 text-[#0A65CC]"
                        />
                    </div>

                    {renderFilters()}
                    {renderClear()}
                </div>
            </div>
        </>
    );
};

export default SideBar;