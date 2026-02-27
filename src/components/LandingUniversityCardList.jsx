import React from 'react';
import { assets } from "../assets/assets.js";

const LandingUniversityCardList = ({ openModal }) => {
    const universities = [
        { id: 1, name: "Harvard University", location: "Cambridge, USA", averageRating: 4.8 },
        { id: 2, name: "Stanford University", location: "California, USA", averageRating: 4.7 },
        { id: 3, name: "University of Oxford", location: "Oxford, UK", averageRating: 4.9 },
        { id: 4, name: "Massachusetts Institute of Technology", location: "Massachusetts, USA", averageRating: 4.8 },
        { id: 5, name: "University of Tokyo", location: "Tokyo, Japan", averageRating: 4.6 }
    ];

    return (
        <div className="container mx-auto py-16 px-6 lg:px-32 w-full overflow-hidden">
            <h1 className="text-2xl sm:text-4xl font-medium mb-2 text-center">
                Top <span className="underline underline-offset-4 decoration-1 font-light">Universities</span>
            </h1>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {universities.map((university) => {

                    return (
                        <div
                            key={university.id}
                            className="
                                border border-gray-50
                                rounded-xl
                                p-5
                                shadow-md
                                hover:shadow-xl
                                hover:border-[#0A65CC]
                                hover:-translate-y-1
                                transition-all duration-300
                                flex flex-col
                                justify-between
                            "
                        >
                            <div className="flex items-start gap-4">
                                <img
                                    src={assets.university_icon}
                                    alt=""
                                    className="w-16 h-16 object-contain shrink-0"
                                />

                                {/* Текстовая колонка flex-1 с min-w-0 */}
                                <div className="flex flex-col flex-1 min-w-0">
                                    <h3 className="text-base font-medium text-gray-800 wrap-break-word">
                                        {university.name}
                                    </h3>

                                    <div className="flex items-center text-sm text-gray-500 mt-1 wrap-break-word">
                                        <span className="mr-1">📍</span>
                                        <span>{university.location}</span>
                                    </div>
                                </div>

                                {/* Рейтинг */}
                                <div className="bg-[#0A65CC] text-white text-xs px-3 py-1 rounded-lg shrink-0 ml-4">
                                    {university.averageRating.toFixed(2)}
                                </div>
                            </div>

                            <button
                                onClick={() => openModal(university)}
                                className="
                                    mt-6
                                    bg-[#E7F0FA]
                                    text-[#0A65CC]
                                    font-semibold
                                    py-3
                                    rounded-md
                                    transition-all duration-300
                                    hover:bg-[#0A65CC]
                                    hover:text-white
                                "
                            >
                                Open Profile
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LandingUniversityCardList;