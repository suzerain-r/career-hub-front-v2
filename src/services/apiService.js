import { getIdFromToken } from "../utils/jwtDecode.js";

const baseUrl = "http://localhost:8080";

const getToken = () => localStorage.getItem("authToken");

const handleUnauthorized = () => {
    localStorage.removeItem("authToken");
    if (!window.location.pathname.startsWith("/auth")) {
        window.location.href = "/auth";
    }
};

export const authFetch = async (url, options = {}) => {
    const token = getToken();
    const headers = { ...(options.headers || {}) };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const isFormData = options.body instanceof FormData;
    if (options.body && !isFormData && !headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
    }

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
        handleUnauthorized();
        throw new Error("Unauthorized");
    }

    return response;
};

const homeService = {
    getStudentsCount: async () => {
        const response = await authFetch(`${baseUrl}/student/search`);
        return response.json();
    },

    getCompaniesCount: async () => {
        const response = await authFetch(`${baseUrl}/company/search`);
        return response.json();
    },

    getUniversitiesCount: async () => {
        const response = await authFetch(`${baseUrl}/university/search`);
        return response.json();
    },

    getAverageRatingsForUniversities: async (universityList) => {
        try {
            const promises = universityList.map((university) =>
                authFetch(`${baseUrl}/review/getAverageRating/${university.ownerId}`)
                    .then((response) => response.json().then((data) => ({ id: university.ownerId, averageRating: data?.averageRating || 0 })))
            );

            const ratings = await Promise.all(promises);
            const ratingsMap = ratings.reduce((map, rating) => {
                map[rating.id] = rating.averageRating;
                return map;
            }, {});

            return universityList.map((university) => ({
                ...university,
                averageRating: ratingsMap[university.ownerId] || 0,
            }));
        } catch (error) {
            console.error("Error fetching ratings:", error);
        }
    }


};

export default homeService;



////
export const fetchStudents = async (query) => {
    const response = await authFetch(`${baseUrl}/student/search?${query}`);
    console.log(query)
    return response.json();
};

export const fetchCompanies = async (query) => {
    const response = await authFetch(`${baseUrl}/company/search?${query}`);
    return response.json();

};

export const fetchUniversities = async (query) => {
    const response = await authFetch(`${baseUrl}/university/search?${query}`);
    return response.json();

};


////
export const fetchFavorites = async (userId) => {
    const response = await authFetch(`${baseUrl}/company/favouriteStudent/${userId}`);
    return response.json();
};


export const togFavorite = async (userId, studentId, isFavorite) => {
    await authFetch(`${baseUrl}/company/favouriteStudent/${userId}?studentOwnerId=${studentId}`, {
        method: isFavorite ? 'DELETE' : 'POST',
    });
};


////
export const fetchReviews = async (id) => {
    const response = await authFetch(`${baseUrl}/review/getAll/${id}`);
    return response.json();
};

export const fetchSenders = async (reviewList) => {
    try {
        const promises = reviewList.map((review) =>
            authFetch(`${baseUrl}/${review.senderRole.toLowerCase()}/${review.senderId}`)
                .then(response => response.json())
                .then(data => ({
                    ...review,
                    senderName: data.name,
                }))
        );
        return await Promise.all(promises);
    }
    catch (error) {
        console.error("Error fetching sender information:", error);
    }
}

export const addReview = async (review) => {
    return await authFetch(`${baseUrl}/review/add`, {
        method: 'POST',
        body: JSON.stringify(review),
    });
};


////
export const fetchUniversity = async (id) => {
    const response = await authFetch(`${baseUrl}/university/${id}`);
    return response.json();
}

export const fetchStudent = async (id) => {
    const response = await authFetch(`${baseUrl}/student/${id}`);
    return response.json();
}

export const fetchCompany = async (id) => {
    const response = await authFetch(`${baseUrl}/company/${id}`);
    return response.json();
}


////
export const updateStudentProfile = async (profile) => {
    try {
        const response = await authFetch(`${baseUrl}/student/${getIdFromToken()}`, {
            method: "PUT",
            body: JSON.stringify(profile),
        });


        if (response.ok) {
            return { success: true };
        } else {
            const errorData = await response.json();
            return { success: false, message: errorData };
        }
    } catch (error) {
        console.error("Error saving profile:", error);
        return { success: false, message: error.message };
    }
};


export const updateUniversityProfile = async (profile) => {
    try {
        const response = await authFetch(`${baseUrl}/university/update/${getIdFromToken()}`, {
            method: "PUT",
            body: JSON.stringify(profile),
        });

        if (response.ok) {
            return { success: true };
        } else {
            const errorData = await response.json();
            return { success: false, message: errorData };
        }
    } catch (error) {
        console.error("Error saving university profile:", error);
        return { success: false, message: "Network error" };
    }
};


export const updateCompanyProfile = async (profile) => {
    try {
        const response = await authFetch(`${baseUrl}/company/update/${getIdFromToken()}`, {
            method: "PUT",
            body: JSON.stringify(profile),
        });

        if (response.ok) {
            return { success: true };
        } else {
            const errorData = await response.json();
            return { success: false, message: errorData };
        }
    } catch (error) {
        console.error("Error saving company profile:", error);
        return { success: false, message: "Network error" };
    }
};



////
export const fetchStudentsOfUniversity = async () => {
    const response = await authFetch(`${baseUrl}/student/getByUniversityId/${getIdFromToken()}`);
    return response.json();
}

export const deleteStudent = async (userId) => {
    try {
        const response = await authFetch(`${baseUrl}/auth/student/delete/${userId}`, {
            method: "DELETE",
        });
        return response.ok;
    } catch (error) {
        console.error("Error deleting student:", error);
        return false;
    }
};

////
export const uploadProfilePhoto = async (userId, file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await authFetch(`${baseUrl}/auth/users/${userId}/profilePhoto`, {
            method: "POST",
            body: formData,
        });
        return response.ok;
    } catch (error) {
        console.error("Error uploading profile photo:", error);
        return false;
    }
};

////
export const indexResume = async ({ studentId, skills, experience }) => {
    try {
        const response = await authFetch(`${baseUrl}/student/api/resumes`, {
            method: "POST",
            body: JSON.stringify({
                studentId: String(studentId),
                skills: skills || [],
                experience: experience || [],
            }),
        });
        return response.ok;
    } catch (error) {
        console.error("Error indexing resume:", error);
        return false;
    }
};


////
export const fetchProfilePhotoUrl = async (userId) => {
    try {
        const response = await authFetch(`${baseUrl}/auth/users/${userId}/profilePhoto`);
        if (!response.ok) return null;
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error("Error fetching profile photo:", error);
        return null;
    }
};
