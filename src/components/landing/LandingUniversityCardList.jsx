import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import homeService, { fetchUniversities } from "../../services/apiService.js";

const LandingUniversityCardList = () => {
    const navigate = useNavigate();
    const [universities, setUniversities] = useState([]);

    const loadUniversities = useCallback(async () => {
        try {
            const data = await fetchUniversities();
            const list = data?.content || [];

            const withRatings = await homeService.getAverageRatingsForUniversities(list);

            setUniversities(withRatings.slice(0, 6));
        } catch (e) {
            console.error("Error loading universities:", e);
        }
    }, []);

    const handleViewProfile = useCallback((item) => {
        const id = item.ownerId ?? item.id;
        if (id) navigate(`/university/${id}`);
    }, [navigate]);

    useEffect(() => {
        let isMounted = true;

        (async () => {
            try {
                const data = await fetchUniversities();
                const list = data?.content || [];

                const withRatings = await homeService.getAverageRatingsForUniversities(list);

                if (isMounted) {
                    setUniversities(withRatings.slice(0, 6));
                }
            } catch (e) {
                console.error(e);
            }
        })();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="container mx-auto py-16 px-6 lg:px-32 w-full overflow-hidden">
            <h1 className="text-2xl sm:text-4xl font-medium mb-2 text-center">
                Top <span className="underline underline-offset-4 decoration-1 font-light">Universities</span>
            </h1>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {universities.map((u) => (
                    <div
                        key={u.id}
                        className="border border-gray-50 rounded-xl p-5 shadow-md hover:shadow-xl hover:border-[#0A65CC] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                    >
                        <div className="flex items-start gap-4">
                            <img
                                src={assets.university_icon}
                                alt=""
                                className="w-16 h-16 object-contain shrink-0"
                            />

                            <div className="flex flex-col flex-1 min-w-0">
                                <h3 className="text-base font-medium text-gray-800 break-words">
                                    {u.name}
                                </h3>

                                <div className="flex items-center text-sm text-gray-500 mt-1 break-words">
                                    <span className="mr-1">📍</span>
                                    <span>{u.location}</span>
                                </div>
                            </div>

                            <div className="bg-[#0A65CC] text-white text-xs px-3 py-1 rounded-lg shrink-0 ml-4">
                                {u.averageRating?.toFixed(2) || "0.00"}
                            </div>
                        </div>

                        <button
                            onClick={() => handleViewProfile(u)}
                            className="mt-6 bg-[#E7F0FA] text-[#0A65CC] font-semibold py-3 rounded-md transition-all duration-300 hover:bg-[#0A65CC] hover:text-white"
                        >
                            Open Profile
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LandingUniversityCardList;