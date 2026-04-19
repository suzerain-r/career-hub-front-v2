import Header from "../../components/commons/Header.jsx";
import { useEffect, useState } from "react";
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
import { fetchStudents, fetchUniversities, fetchCompanies, fetchProfilePhotoUrl } from "../../services/apiService.js";

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

    const queryParams = {
        page: currentPage - 1,
        size: pageSize,
    };

    Object.entries(filters).forEach(([key, value]) => {
        if (!value) return;

        if (key === "gpa") {
            const [min, max] = value.split(" - ").map(Number);
            queryParams.minGpa = min;
            queryParams.maxGpa = max;
        } else {
            queryParams[key] = value;
        }
    });

    Object.entries(searchFilters).forEach(([key, value]) => {
        if (value) {
            queryParams[key] = value;
        }
    });

    const query = new URLSearchParams(queryParams).toString();

    useEffect(() => {
        fetchData(query).then(data => {
            setList(data.content);
            setTotalPages(data.totalPages);
        });
    }, [filters, searchFilters, currentPage, type]);

    useEffect(() => {
        let cancelled = false;

        // revoke старые blob-ссылки, чтобы не текли
        Object.values(avatars).forEach((url) => {
            if (url) URL.revokeObjectURL(url);
        });

        if (!Array.isArray(list) || list.length === 0) {
            setAvatars({});
            return;
        }

        const loadAvatars = async () => {
            const pairs = await Promise.all(
                list.map((u) => {
                    const id = u.ownerId ?? u.id;
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

        loadAvatars();

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list]);

    const handleFilterChange = (name, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleSearchFilterChange = (filterName, value) => {
        setSearchFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: value,
        }));
    };

    const handleSearch = () => {
        setCurrentPage(1);
        fetchStudents(query).then(data => {
            setList(data['content']);
            setTotalPages(data['totalPages'])
        });
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleClearFilters = () => {
        setFilters({ type: '' });
        setCurrentPage(1);
    };

    // const isFavorite = (id) => Array.isArray(favorites) && favorites.includes(id);

    // const toggleFavorite = async (id) => {
    //     const currentlyFavorite = isFavorite(id);
    //     await togFavorite(userId, id, currentlyFavorite);
    //     if (!currentlyFavorite) {
    //         setFavorites((prevFavorites) => [...prevFavorites, id]);
    //     }
    //     else {
    //         setFavorites((prevFavorites) => prevFavorites.filter((favId) => favId !== id));
    //     }
    // };

    return (
        <div className="min-h-screen">
            <Header />

            <div className="bg-gray-100 mt-20 py-8 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl font-medium mb-6">{listCon.title}</h1>

                    <SearchBar
                        filters={searchFilters}
                        fields={searchCon.fields}
                        placeholder={searchCon.placeholder}
                        onFilterChange={(name, value) =>
                            setSearchFilters(prev => ({ ...prev, [name]: value }))
                        }
                        onOpenFilters={() => setIsSidebarOpen(true)}
                    />

                </div>
            </div>

            <div className="px-6 py-8">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

                    <SideBar
                        filters={filters}
                        filterConfig={filtersCon}
                        onFilterChange={(name, value) =>
                            setFilters(prev => ({ ...prev, [name]: value }))
                        }
                        onClearFilters={() => setFilters({})}
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
                    // toggleFavorite={toggleFavorite}
                    // isFavorite={(id) => favorites.includes(id)}
                    />
                </div>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            <Footer />


            {/* {selectedStudent && (
                <CandidateModal
                    student={selectedStudent}
                    university={university}
                    closeModal={closeModal}
                    reviews={reviews}
                    onReviewSubmit={async () => {
                        const response = await addReview(review);
                        if (response?.ok) {
                            const updatedReviews = await fetchReviews(selectedStudent.ownerId);
                            const reviewSenders = await fetchSenders(updatedReviews['content']);
                            setReviews(reviewSenders);
                        } else {
                            alert("Error saving review!");
                        }
                    }}
                    role={userRole.toUpperCase()}
                    review={review}
                    setReview={setReview}
                    handleReview={handleReview}
                    fetchReviews={fetchReviews}
                />

            )} */}
        </div>
    );
};

export default ListPage;