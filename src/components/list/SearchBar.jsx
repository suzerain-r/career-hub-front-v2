const SearchBar = ({ filters, onFilterChange, onOpenFilters }) => {
    return (
        <div className="bg-white shadow-md rounded-lg flex flex-col sm:flex-row gap-4 p-4">
            <input
                type="text"
                placeholder="Search"
                value={filters.firstName}
                onChange={(e) => onFilterChange('firstName', e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />

            <div className="flex justify-between">
                <button
                    onClick={onOpenFilters}
                    className="lg:hidden border border-[#0A65CC] text-[#0A65CC] px-6 py-2 rounded-md"
                >
                    Filters
                </button>

                <button className="bg-blue-500 text-white px-10 py-2 rounded-md">
                    Find
                </button>
            </div>

        </div>
    );
};

export default SearchBar;