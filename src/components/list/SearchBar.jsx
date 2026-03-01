const SearchBar = ({ filters, onFilterChange }) => {
    return (
        <div className="bg-white shadow-md rounded-lg flex flex-col sm:flex-row gap-4 p-4">
            <input
                type="text"
                placeholder="Candidate name"
                value={filters.firstName}
                onChange={(e) => onFilterChange('firstName', e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />

            <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:opacity-80 transition">
                Find Candidate
            </button>
        </div>
    );
};

export default SearchBar;