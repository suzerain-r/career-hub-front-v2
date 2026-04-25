import React, { useCallback } from "react";

const SearchBar = React.memo(({
    filters,
    fields,
    placeholder,
    onFilterChange,
    onOpenFilters
}) => {

    const handleSearchChange = useCallback((e) => {
        onFilterChange("search", e.target.value);
    }, [onFilterChange]);

    const handleSelectChange = useCallback((name) => (e) => {
        onFilterChange(name, e.target.value);
    }, [onFilterChange]);

    return (
        <div className="bg-white shadow-md rounded-lg flex flex-col sm:flex-row gap-4 p-4">

            {/* SEARCH INPUT */}
            <input
                type="text"
                placeholder={placeholder}
                value={filters.search || ""}
                onChange={handleSearchChange}
                className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />

            {/* FILTERS */}
            {fields?.map((field) => {
                if (field.type !== "select") return null;

                return (
                    <select
                        key={field.name}
                        value={filters[field.name] || ""}
                        onChange={handleSelectChange(field.name)}
                        className="border border-gray-300 rounded-md px-4 py-2"
                    >
                        <option value="">
                            All
                        </option>

                        {field.options?.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                );
            })}

            {/* MOBILE FILTER BUTTON */}
            <div className="flex justify-between">
                <button
                    onClick={onOpenFilters}
                    className="lg:hidden border border-[#0A65CC] text-[#0A65CC] px-6 py-2 rounded-md"
                >
                    Filters
                </button>
            </div>

        </div>
    );
});

export default SearchBar;