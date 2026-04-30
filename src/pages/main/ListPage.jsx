import Header from "../../components/commons/Header.jsx";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets.js";

import SearchBar from "../../components/list/SearchBar.jsx";
import SideBar from "../../components/list/SideBar.jsx";
import CardList from "../../components/list/CardList.jsx";
import Pagination from "../../components/list/Pagination.jsx";
import Footer from "../../components/commons/Footer.jsx";

import { listConfig } from "../../config/listConfig.js";
import { searchConfig } from "../../config/searchConfig.js";
import { filtersConfig } from "../../config/filtersConfig.js";
import { cardConfig } from "../../config/cardConfig.js";

import { getIdFromToken, getRoleFromToken } from "../../utils/jwtDecode.js";

import {
    fetchStudents,
    fetchUniversities,
    fetchCompanies,
    fetchProfilePhotoUrl,
    fetchFavorites,
    togFavorite,
    fetchRecomendations,
    fetchStudent
} from "../../services/apiService.js";

const ListPage = () => {
    const { type } = useParams();

    const userId = getIdFromToken();
    const userRole = getRoleFromToken();

    const listCon = listConfig[type];
    const searchCon = searchConfig[type];
    const filtersCon = filtersConfig[type];
    const cardCon = cardConfig[type];

    const fetchMap = {
        students: fetchStudents,
        universities: fetchUniversities,
        companies: fetchCompanies,
    };

    const fetchData = fetchMap[type];

    // =========================
    // STATE
    // =========================
    const [list, setList] = useState([]);
    const [avatars, setAvatars] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(3);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [filters, setFilters] = useState({});
    const [searchFilters, setSearchFilters] = useState({});
    const [appliedFilters, setAppliedFilters] = useState({});
    const [appliedSearchFilters, setAppliedSearchFilters] = useState({});

    const [favorites, setFavorites] = useState([]);

    // ✅ единый режим вместо 2 boolean
    const [mode, setMode] = useState("default");
    // "default" | "search" | "recommend"

    const [recommendMessage, setRecommendMessage] = useState(null);

    // =========================
    // QUERY
    // =========================
    const query = useMemo(() => {
        const params = {
            page: currentPage - 1,
            size: pageSize,
        };

        Object.entries(appliedFilters).forEach(([key, value]) => {
            if (!value) return;

            if (key === "gpa") {
                const [min, max] = value.split(" - ").map(Number);
                params.minGpa = min;
                params.maxGpa = max;
            } else {
                params[key] = value;
            }
        });

        Object.entries(appliedSearchFilters).forEach(([key, value]) => {
            if (!value) return;

            if (key !== "search") {
                params[key] = value;
                return;
            }

            const words = value.trim().split(/\s+/).filter(Boolean);

            const isStudentPage = type === "students";
            const isUniversityPage = type === "universities";
            const isCompanyPage = type === "companies";

            const isCompany = userRole === "COMPANY";

            // =========================
            // COMPANY SEARCH (ВАЖНО!)
            // =========================
            if (isCompany && isStudentPage) {
                params.searchQuery = value; // ВСЕГДА raw search
                return;
            }

            // =========================
            // STUDENT / UNIVERSITY SEARCH
            // =========================
            if (isStudentPage) {
                if (words.length >= 2) {
                    params.firstName = words[0];
                    params.lastName = words.slice(1).join(" ");
                } else {
                    params.firstName = words[0];
                }
                return;
            }

            if (isUniversityPage || isCompanyPage) {
                params.name = value;
                return;
            }
        });

        if (
            userRole === "COMPANY" &&
            type === "students" &&
            appliedSearchFilters.search?.trim()
        ) {
            params.companyId = userId;
        }

        return new URLSearchParams(params).toString();
    }, [appliedFilters, appliedSearchFilters, currentPage, pageSize, type]);

    // =========================
    // FETCH LIST
    // =========================
    useEffect(() => {
        if (!fetchData) return;

        if (mode === "recommend") return; // ⛔ не перетираем рекомендации

        fetchData(query).then((data) => {
            setList(data.content || []);
            setTotalPages(data.totalPages || 1);
        });
    }, [query, fetchData, mode]);

    // =========================
    // DEFAULT RESET FIX
    // =========================
    useEffect(() => {
        if (mode !== "default") return;

        const params = new URLSearchParams({
            page: 0,
            size: pageSize
        }).toString();

        fetchData?.(params).then((data) => {
            setList(data.content || []);
            setTotalPages(data.totalPages || 1);
        });
    }, [mode, type]);

    // =========================
    // SEARCH
    // =========================
    const handleSearch = () => {
        setMode("search");
        setCurrentPage(1);

        setAppliedFilters(filters);
        setAppliedSearchFilters(searchFilters);
    };

    useEffect(() => {
        const val = searchFilters.search?.trim();

        if (!val) {
            setMode("default");
            setAppliedSearchFilters({});
            setCurrentPage(1);
        }
    }, [searchFilters]);

    // =========================
    // CLEAR FILTERS
    // =========================
    const handleClearFilters = () => {
        setFilters({});
        setSearchFilters({});
        setAppliedFilters({});
        setAppliedSearchFilters({});

        setRecommendMessage(null);
        setMode("default");
        setCurrentPage(1);
    };

    // =========================
    // RECOMMENDATIONS
    // =========================
    const handleRecommendations = async () => {
        if (userRole !== "COMPANY") return;

        setMode("recommend");

        try {
            const params = new URLSearchParams({
                companyId: userId
            }).toString();

            const data = await fetchRecomendations(params);

            setRecommendMessage(data.message || null);

            if (!data.students?.length) {
                setList([]);
                return;
            }

            const full = await Promise.all(
                data.students.map(async (s) => {
                    try {
                        const r = await fetchStudent(s.id);
                        return {
                            ...r,
                            recommendedSkills: s.skills,
                            recommendedExperience: s.experience
                        };
                    } catch {
                        return null;
                    }
                })
            );

            setList(full.filter(Boolean));
        } catch (e) {
            console.error(e);
        }
    };

    // =========================
    // FAVORITES
    // =========================
    useEffect(() => {
        if (userRole === "COMPANY") {
            fetchFavorites(userId).then(setFavorites);
        }
    }, [userId, userRole]);

    const isFavorite = (id) =>
        favorites.includes(id);

    const toggleFavorite = async (id) => {
        const fav = isFavorite(id);

        await togFavorite(userId, id, fav);

        setFavorites((prev) =>
            fav ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        setMode("default");
        setRecommendMessage(null);

        setFilters({});
        setSearchFilters({});
        setAppliedFilters({});
        setAppliedSearchFilters({});
        setCurrentPage(1);
        setList([]);
    }, [type]);

    // =========================
    // AVATARS
    // =========================
    useEffect(() => {
        let cancel = false;

        if (!list.length) {
            setAvatars({});
            return;
        }

        const load = async () => {
            const pairs = await Promise.all(
                list.map(async (item) => {
                    const id = item.ownerId ?? item.id;
                    if (!id) return [null, null];

                    try {
                        const url = await fetchProfilePhotoUrl(id);
                        return [id, url];
                    } catch {
                        return [id, null];
                    }
                })
            );

            if (cancel) return;

            const map = {};
            pairs.forEach(([id, url]) => {
                if (id && url) map[id] = url;
            });

            setAvatars(map);
        };

        load();

        return () => {
            cancel = true;
        };
    }, [list]);

    // =========================
    // RENDER
    // =========================
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1">
                <Header />

                <div className="bg-gray-100 mt-20 py-8 px-6">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-2xl font-medium mb-6">
                            {listCon.title}
                        </h1>

                        <SearchBar
                            filters={searchFilters}
                            fields={searchCon.fields}
                            placeholder={searchCon.placeholder}
                            onFilterChange={(n, v) =>
                                setSearchFilters(prev => ({ ...prev, [n]: v }))
                            }
                            onSearch={handleSearch}
                            onOpenFilters={() => setIsSidebarOpen(true)}
                        />
                    </div>
                </div>

                <div className="px-6 py-8">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

                        <SideBar
                            filters={filters}
                            filterConfig={filtersCon}
                            onFilterChange={(n, v) =>
                                setFilters(prev => ({ ...prev, [n]: v }))
                            }
                            onClearFilters={handleClearFilters}
                            onRecommend={handleRecommendations}
                            isOpen={isSidebarOpen}
                            onClose={() => setIsSidebarOpen(false)}
                            type={type}
                            userRole={userRole}
                        />

                        {mode === "recommend" && list.length === 0 && recommendMessage ? (
                            <div className="w-full text-center text-gray-500 mt-10">
                                {recommendMessage}
                            </div>
                        ) : (
                            <CardList
                                list={list}
                                icon={assets[cardCon.icon]}
                                title={cardCon.title}
                                fields={cardCon.fields}
                                avatars={avatars}
                                listType={type}
                                toggleFavorite={toggleFavorite}
                                isFavorite={isFavorite}
                                userRole={userRole}
                            />
                        )}
                    </div>
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>

            <Footer />
        </div>
    );
};

export default ListPage;