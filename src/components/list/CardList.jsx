
import { assets } from "../../assets/assets.js";

const CardList = ({ students, candidateIcon, toggleFavorite, isFavorite }) => {
    return (
        <div className="w-full lg:w-3/4 flex flex-col gap-6">
            {students.map((student) => (
                <div
                    key={student.id}
                    className="flex flex-col sm:flex-row gap-4 p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-500 transition"
                >
                    <img
                        src={candidateIcon}
                        alt=""
                        className="w-20 h-20 object-contain"
                    />

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-4">

                        <div>
                            <h3 className="text-blue-500 font-semibold text-lg">
                                {student.firstName} {student.lastName}
                            </h3>
                            <p className="text-gray-500 text-sm">
                                Degree: {student.degree}
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => toggleFavorite(student.ownerId)}
                                className="hover:opacity-80"
                            >
                                <img
                                    src={
                                        isFavorite(student.ownerId)
                                            ? assets.favourite_active
                                            : assets.favourite_not_active
                                    }
                                    alt=""
                                />
                            </button>

                            <button className="bg-blue-50 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition">
                                View Profile →
                            </button>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardList;