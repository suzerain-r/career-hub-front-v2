import axios from "axios";
import { getIdFromToken } from "../utils/jwtDecode.js";

const api = axios.create({
    baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("authToken");
            if (!window.location.pathname.startsWith("/auth")) {
                window.location.href = "/auth?mode=sign-in";
            }
        }
        return Promise.reject(error);
    }
);

const unwrap = (res) => res.data;

/* HOME */
const homeService = {
    getStudentsCount: async () => unwrap(await api.get("/student/search")),
    getCompaniesCount: async () => unwrap(await api.get("/company/search")),
    getUniversitiesCount: async () => unwrap(await api.get("/university/search")),

    getAverageRatingsForUniversities: async (list) => {
        try {
            const ratings = await Promise.all(
                list.map((u) =>
                    api
                        .get(`/review/getAverageRating/${u.ownerId}`)
                        .then((r) => ({
                            id: u.ownerId,
                            averageRating: r.data?.averageRating || 0,
                        }))
                )
            );

            const map = ratings.reduce((acc, r) => {
                acc[r.id] = r.averageRating;
                return acc;
            }, {});

            return list.map((u) => ({
                ...u,
                averageRating: map[u.ownerId] || 0,
            }));
        } catch (e) {
            console.error(e);
            return list;
        }
    },
};

export default homeService;

/* SEARCH */
export const fetchStudents = async (query) =>
    unwrap(await api.get(`/student/search?${query}`));

export const fetchCompanies = async (query) =>
    unwrap(await api.get(`/company/search?${query}`));

export const fetchUniversities = async (query) =>
    unwrap(await api.get(`/university/search?${query}`));

/* FAVORITES */
export const fetchFavorites = async (userId) =>
    unwrap(await api.get(`/company/favouriteStudent/${userId}`));

export const togFavorite = async (userId, studentId, isFavorite) =>
    await api({
        url: `/company/favouriteStudent/${userId}`,
        method: isFavorite ? "DELETE" : "POST",
        params: { studentOwnerId: studentId },
    });

/* REVIEWS */
export const fetchReviews = async (id) =>
    unwrap(await api.get(`/review/getAll/${id}`));

export const fetchSenders = async (reviews) => {
    try {
        return await Promise.all(
            reviews.map(async (r) => {
                const { data } = await api.get(
                    `/${r.senderRole.toLowerCase()}/${r.senderId}`
                );

                let senderName = "";

                if (r.senderRole === "STUDENT") {
                    senderName = `${data.firstName} ${data.lastName}`;
                } else {
                    senderName = data.name;
                }

                return { ...r, senderName };
            })
        );
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const addReview = async (review) =>
    unwrap(await api.post("/review/add", review));

/* GET ONE */
export const fetchUniversity = async (id) =>
    unwrap(await api.get(`/university/${id}`));

export const fetchStudent = async (id) =>
    unwrap(await api.get(`/student/${id}`));

export const fetchCompany = async (id) =>
    unwrap(await api.get(`/company/${id}`));

/* UPDATE */
export const updateStudentProfile = async (profile) => {
    try {
        await api.put(`/student/${getIdFromToken()}`, profile);
        return { success: true };
    } catch (e) {
        return {
            success: false,
            message: e.response?.data || "Error",
        };
    }
};

export const updateUniversityProfile = async (profile) => {
    try {
        await api.put(`/university/update/${getIdFromToken()}`, profile);
        return { success: true };
    } catch (e) {
        return {
            success: false,
            message: e.response?.data || "Error",
        };
    }
};

export const updateCompanyProfile = async (profile) => {
    try {
        await api.put(`/company/update/${getIdFromToken()}`, profile);
        return { success: true };
    } catch (e) {
        return {
            success: false,
            message: e.response?.data || "Error",
        };
    }
};

/* UNIVERSITY */
export const fetchStudentsOfUniversity = async () =>
    unwrap(await api.get(`/student/getByUniversityId/${getIdFromToken()}`));

export const deleteStudent = async (userId) => {
    try {
        await api.delete(`/auth/student/delete/${userId}`);
        return true;
    } catch {
        return false;
    }
};

/* FILE */
export const uploadProfilePhoto = async (userId, file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        await api.post(`/auth/users/${userId}/profilePhoto`, formData);
        return true;
    } catch {
        return false;
    }
};

/* ELASTIC */
export const indexResume = async ({ studentId, skills, experience }) => {
    try {
        await api.post("/student/api/resumes", {
            studentId: String(studentId),
            skills: skills || [],
            experience: experience || [],
        });
        return true;
    } catch {
        return false;
    }
};

/* PHOTO */
export const fetchProfilePhotoUrl = async (userId) => {
    try {
        const res = await api.get(
            `/auth/users/${userId}/profilePhoto`,
            { responseType: "blob" }
        );
        return URL.createObjectURL(res.data);
    } catch {
        return null;
    }
};

/* RECOMENDATIONS */

export const fetchRecomendations = async (query) =>
    unwrap(await api.get(`/student/api/recommendations?${query}`));