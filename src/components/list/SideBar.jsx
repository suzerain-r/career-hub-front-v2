const SideBar = ({ filters, onFilterChange, onClearFilters }) => {
    return (
        <aside className="w-full lg:w-1/4 bg-white border border-gray-200 rounded-xl p-6 h-fit">

            <h4 className="mb-4 font-semibold text-lg">Degree</h4>
            <div className="flex flex-col gap-2 mb-6">
                {['BACHELOR', 'MASTER', 'DOCTORATE'].map((degree) => (
                    <label key={degree} className="flex items-center gap-2 text-gray-600">
                        <input
                            type="radio"
                            value={degree}
                            checked={filters.degree === degree}
                            onChange={(e) => onFilterChange('degree', e.target.value)}
                            className="w-4 h-4"
                        />
                        {degree}
                    </label>
                ))}
            </div>

            <h4 className="mb-4 font-semibold text-lg">GPA</h4>
            <div className="flex flex-col gap-2">
                {['0.0 - 2.0', '2.0 - 3.0', '3.0 - 4.0'].map((gpa) => (
                    <label key={gpa} className="flex items-center gap-2 text-gray-600">
                        <input
                            type="radio"
                            value={gpa}
                            checked={filters.gpa === gpa}
                            onChange={(e) => onFilterChange('gpa', e.target.value)}
                            className="w-4 h-4"
                        />
                        {gpa}
                    </label>
                ))}
            </div>

            <button
                onClick={onClearFilters}
                className="mt-6 w-full bg-blue-50 text-blue-500 py-2 rounded-md hover:border hover:border-blue-500 transition"
            >
                Clear Filters
            </button>
        </aside>
    );
};

export default SideBar;