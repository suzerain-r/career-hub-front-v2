import React, { useCallback } from "react";

const SearchBar = React.memo(({
    filters,
    fields,
    placeholder,
    onFilterChange,
    onSearch,
    onOpenFilters
}) => {

    const handleSearchChange = useCallback((e) => {
        onFilterChange("search", e.target.value);
    }, [onFilterChange]);

    const handleSelectChange = useCallback((name) => (e) => {
        onFilterChange(name, e.target.value);
    }, [onFilterChange]);

    const selectField = fields?.find(f => f.type === "select");

    return (
        <div className="bg-white shadow-md rounded-lg p-4">

            {/* ================= DESKTOP ================= */}
            <div className="hidden sm:flex gap-3 items-center w-full">

                {/* SEARCH INPUT */}
                <input
                    type="text"
                    placeholder={placeholder}
                    value={filters.search || ""}
                    onChange={handleSearchChange}
                    className={`${selectField ? "w-6/8" : "w-7/8"}
                        border border-gray-300 rounded-md px-4 py-2
                        focus:outline-none focus:border-blue-500
                    `}
                />

                {/* SELECT */}
                {selectField && (
                    <select
                        value={filters[selectField.name] || ""}
                        onChange={handleSelectChange(selectField.name)}
                        className="w-1/8 border border-gray-300 rounded-md px-2 py-2"
                    >
                        <option value="">All</option>

                        {selectField.options?.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                )}

                {/* FIND */}
                <button
                    onClick={onSearch}
                    className="w-1/8 bg-[#0A65CC] text-white rounded-md px-4 py-2 hover:bg-blue-400 transition"
                >
                    Find
                </button>

            </div>

            {/* ================= MOBILE ================= */}
            <div className="flex sm:hidden flex-col gap-3 w-full">

                {/* SEARCH INPUT */}
                <input
                    type="text"
                    placeholder={placeholder}
                    value={filters.search || ""}
                    onChange={handleSearchChange}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                />

                {/* MOBILE ACTIONS */}
                <div className="flex items-center justify-between w-full gap-2">

                    {/* Filters */}
                    <button
                        onClick={onOpenFilters}
                        className="flex-1 border border-[#0A65CC] text-[#0A65CC] py-2 rounded-md"
                    >
                        Filters
                    </button>

                    {/* ALL select */}
                    {selectField ? (
                        <select
                            onChange={handleSelectChange(selectField.name)}
                            className="flex-1 border border-gray-300 rounded-md py-2"
                        >
                            <option value="">All</option>

                            {selectField.options?.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <div className="flex-1" />
                    )}

                    {/* Find */}
                    <button
                        onClick={onSearch}
                        className="flex-1 bg-[#0A65CC] text-white py-2 rounded-md"
                    >
                        Find
                    </button>

                </div>

            </div>

        </div>
    );
});

export default SearchBar;