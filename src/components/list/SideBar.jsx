import { assets } from "../../assets/assets";
import { XMarkIcon } from '@heroicons/react/24/outline';

const SideBar = ({ filters, onFilterChange, onClearFilters, isOpen, onClose }) => {
    return (
        <>
            <div className="lg:w-1/4 hidden lg:block border border-gray-200 rounded-xl p-6 h-fit">

                <h4 className="mb-4 font-medium text-lg">Degree</h4>
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

                <h4 className="mb-4 font-medium text-lg">GPA</h4>
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

            </div>


            {isOpen && (
                <div className="fixed inset-0 z-50 flex">

                    <div className="bg-white w-3/4 max-w-xs h-full p-5">
                        <div className='flex justify-end cursor-pointer'>
                            <XMarkIcon onClick={onClose} className="w-9 h-9 text-[#0A65CC]"/>
                        </div>

                        <h4 className="mb-4 font-medium text-lg">Degree</h4>
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

                        <h4 className="mb-4 font-medium text-lg">GPA</h4>
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
                    </div>
                </div>
            )}
        </>
    );
};

export default SideBar;