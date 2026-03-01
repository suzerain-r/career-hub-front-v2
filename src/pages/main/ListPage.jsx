import Header from "../../components/commons/Header.jsx";
import { useEffect, useState } from "react";
import { assets } from "../../assets/assets.js";
import SearchBar from "../../components/list/SearchBar.jsx";
import SideBar from "../../components/list/SideBar.jsx";
import CardList from "../../components/list/CardList.jsx";
import Pagination from "../../components/list/Pagination.jsx";
import Footer from "../../components/commons/Footer.jsx";

const mockStudents = [
    { id: 1, ownerId: 101, firstName: "John", lastName: "Doe", degree: "BACHELOR", gpa: 3.5 },
    { id: 2, ownerId: 102, firstName: "Anna", lastName: "Smith", degree: "MASTER", gpa: 3.8 },
    { id: 3, ownerId: 103, firstName: "David", lastName: "Brown", degree: "DOCTORATE", gpa: 3.2 },
];

const ListPage = () => {

    const [filters, setFilters] = useState({ degree: '', gpa: '' });
    const [searchFilters, setSearchFilters] = useState({ firstName: '' });
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        let filtered = [...mockStudents];

        if (filters.degree) {
            filtered = filtered.filter(s => s.degree === filters.degree);
        }

        if (filters.gpa) {
            const [min, max] = filters.gpa.split(" - ").map(Number);
            filtered = filtered.filter(s => s.gpa >= min && s.gpa <= max);
        }

        if (searchFilters.firstName) {
            filtered = filtered.filter(s =>
                s.firstName.toLowerCase().includes(searchFilters.firstName.toLowerCase())
            );
        }

        setStudents(filtered);
    }, [filters, searchFilters]);

    const toggleFavorite = (id) => {
        setFavorites(prev =>
            prev.includes(id)
                ? prev.filter(f => f !== id)
                : [...prev, id]
        );
    };

    // const userId = getIdFromToken();
    // const userRole = getRoleFromToken();

    // const [filters, setFilters] = useState({
    //     degree: '',
    //     gpa: '',
    // });

    // const [searchFilters, setSearchFilters] = useState({
    //     firstName: '',
    // });

    // const [students, setStudents] = useState([]);
    // const [selectedStudent, setSelectedStudent] = useState(null);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(1);
    // const [pageSize] = useState(5);
    // const [favorites, setFavorites] = useState([]);
    // const [reviews, setReviews] = useState([]);
    // const [university, setUniversity] = useState([])
    // const [review, setReview] = useState({
    //     recipientId: "",
    //     senderId: userId,
    //     reviewText: "",
    //     rating: "",
    //     recipientRole: "STUDENT",
    // });



    // const queryParams = {
    //     page: currentPage - 1,
    //     size: pageSize,
    // }


    // if (filters.degree) queryParams.degree = filters.degree;

    // if (filters.gpa){
    //     const [minGpa, maxGpa] = filters.gpa.split(' - ').map((value) => parseFloat(value));
    //     queryParams.minGpa = minGpa;
    //     queryParams.maxGpa = maxGpa;
    // }

    // if(searchFilters.firstName){
    //     queryParams.firstName = searchFilters.firstName;
    // }


    // const query = new URLSearchParams(queryParams).toString();





    // useEffect(() => {
    //     fetchStudents(query).then(data => {
    //         setStudents(data['content']);
    //         setTotalPages(data['totalPages'])
    //     });
    // }, [filters, currentPage]);

    // useEffect(() => {
    //     {userRole === "COMPANY" && (
    //         fetchFavorites(userId).then((data) => setFavorites(data))
    //     )}
    // }, []);

    // const handleFilterChange = (name, value) => {
    //     setFilters((prevFilters) => ({
    //         ...prevFilters,
    //         [name]: value,
    //     }));
    // };

    // const handleSearchFilterChange = (filterName, value) => {
    //     setSearchFilters((prevFilters) => ({
    //         ...prevFilters,
    //         [filterName]: value,
    //     }));
    // };

    // const handleSearch = () => {
    //     setCurrentPage(1);
    //     fetchStudents(query).then(data => {
    //         setStudents(data['content']);
    //         setTotalPages(data['totalPages'])
    //     });
    // };

    // const handlePageChange = (page) => {
    //     if (page >= 1 && page <= totalPages) {
    //         setCurrentPage(page);
    //     }
    // };

    // const openModal = (student) => {
    //     setSelectedStudent(student);

    // };

    // const closeModal = () => {
    //     setSelectedStudent(null);
    // };

    // const handleClearFilters = () => {
    //     setFilters({ type: '' });
    //     setCurrentPage(1);
    // };



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


    // const handleReview = (e) => {
    //     const { name, value } = e.target;
    //     setReview((prevProfile) => ({
    //         ...prevProfile,
    //         [name]: value,
    //     }));
    // }

    return (
        <div className="min-h-screen">
            <Header />

            {/* Search Section */}
            <section className="bg-gray-100 mt-20 py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6">Candidates</h1>

                    <SearchBar
                        filters={searchFilters}
                        onFilterChange={(name, value) =>
                            setSearchFilters(prev => ({ ...prev, [name]: value }))
                        }
                    />
                </div>
            </section>

            {/* Main Section */}
            <section className="px-4 py-8">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

                    <SideBar
                        filters={filters}
                        onFilterChange={(name, value) =>
                            setFilters(prev => ({ ...prev, [name]: value }))
                        }
                        onClearFilters={() => setFilters({ degree: '', gpa: '' })}
                    />

                    <CardList
                        students={students}
                        candidateIcon={assets.candidate_icon}
                        toggleFavorite={toggleFavorite}
                        isFavorite={(id) => favorites.includes(id)}
                    />
                </div>
            </section>

            <Pagination
                currentPage={currentPage}
                totalPages={1}
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