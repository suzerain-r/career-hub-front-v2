const SearchBar = ({
    filters,
    fields,
    placeholder,
    onFilterChange,
    onOpenFilters,
    onSearch
}) => {
    return (
        <div className="bg-white shadow-md rounded-lg flex flex-col sm:flex-row gap-4 p-4">

            <input
                type="text"
                placeholder={placeholder}
                value={filters.search || ""}
                onChange={(e) => onFilterChange("search", e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />

            {fields.map((field) => {
                if (field.type === "select") {
                    return (
                        <select
                            key={field.name}
                            value={filters[field.name] || ""}
                            onChange={(e) =>
                                onFilterChange(field.name, e.target.value)
                            }
                            className="border border-gray-300 rounded-md px-4 py-2"
                        >
                            <option value="">All {field.name}</option>

                            {field.options.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    );
                }
                return null;
            })}

            <div className="flex justify-between">
                <button
                    onClick={onOpenFilters}
                    className="lg:hidden border border-[#0A65CC] text-[#0A65CC] px-6 py-2 rounded-md"
                >
                    Filters
                </button>

                <button
                    onClick={onSearch}
                    className="bg-[#0A65CC] text-white px-10 py-2 rounded-md cursor-pointer hover:bg-blue-500"
                >
                    Find
                </button>
            </div>

        </div>
    );
};

export default SearchBar;