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
    fetchProfilePhotoUrl
} from "../../services/apiService.js";

const ListPage = () => {
    const { type } = useParams();

    const userId = getIdFromToken();
    const userRole = getRoleFromToken();

    const listCon = listConfig[type];
    const searchCon = searchConfig[type];
    const filtersCon = filtersConfig[type];
    const cardCon = cardConfig[type];

    const [list, setList] = useState([]);
    const [avatars, setAvatars] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(3);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [filters, setFilters] = useState({});
    const [searchFilters, setSearchFilters] = useState({});

    const fetchMap = {
        students: fetchStudents,
        universities: fetchUniversities,
        companies: fetchCompanies,
    };

    const fetchData = fetchMap[type];

    // =========================
    // QUERY BUILDER
    // =========================
    const query = useMemo(() => {
        const params = {
            page: currentPage - 1,
            size: pageSize,
        };

        // =========================
        // FILTERS (city и другие)
        // =========================
        Object.entries(filters).forEach(([key, value]) => {
            if (!value) return;

            if (key === "gpa") {
                const [min, max] = value.split(" - ").map(Number);
                params.minGpa = min;
                params.maxGpa = max;
            } else {
                params[key] = value; // city → сюда уже попадёт
            }
        });

        // =========================
        // SEARCH LOGIC (УЛУЧШЕННАЯ)
        // =========================
        // =========================
        // SEARCH LOGIC (FIXED)
        // =========================
        Object.entries(searchFilters).forEach(([key, value]) => {
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

        // COMPANY → students filter
        if (userRole === "COMPANY" && type === "students") {
            params.companyId = userId;
        }

        return new URLSearchParams(params).toString();
    }, [
        filters,
        searchFilters,
        currentPage,
        pageSize,
        type
    ]);

    // =========================
    // FETCH DATA
    // =========================
    useEffect(() => {
        if (!fetchData) return;

        fetchData(query).then((data) => {
            setList(data.content || []);
            setTotalPages(data.totalPages || 1);
        });
    }, [query, fetchData]);

    // =========================
    // AVATAR LOADING
    // =========================
    useEffect(() => {
        let cancelled = false;

        Object.values(avatars).forEach((url) => {
            if (url) URL.revokeObjectURL(url);
        });

        if (!Array.isArray(list) || list.length === 0) {
            setAvatars({});
            return;
        }

        const load = async () => {
            const pairs = await Promise.all(
                list.map((item) => {
                    const id = item.ownerId ?? item.id;
                    if (!id) return [null, null];

                    return fetchProfilePhotoUrl(id)
                        .then((url) => [id, url])
                        .catch(() => [id, null]);
                })
            );

            if (cancelled) return;

            const map = {};
            pairs.forEach(([id, url]) => {
                if (id && url) map[id] = url;
            });

            setAvatars(map);
        };

        load();

        return () => {
            cancelled = true;
        };
    }, [list]);

    // =========================
    // HANDLERS
    // =========================
    const handleFilterChange = (name, value) => {
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearchFilterChange = (name, value) => {
        setSearchFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleClearFilters = () => {
        setFilters({});
        setSearchFilters({});
        setCurrentPage(1);
    };

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
                            onFilterChange={handleSearchFilterChange}
                            onOpenFilters={() => setIsSidebarOpen(true)}
                        />
                    </div>
                </div>

                <div className="px-6 py-8">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

                        <SideBar
                            filters={filters}
                            filterConfig={filtersCon}
                            onFilterChange={handleFilterChange}
                            onClearFilters={handleClearFilters}
                            isOpen={isSidebarOpen}
                            onClose={() => setIsSidebarOpen(false)}
                        />

                        <CardList
                            list={list}
                            icon={assets[cardCon.icon]}
                            title={cardCon.title}
                            fields={cardCon.fields}
                            avatars={avatars}
                            listType={type}
                        />
                    </div>
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>

            <Footer />
        </div>
    );
};

export default ListPage;