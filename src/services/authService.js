import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/auth",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("authToken");
            window.location.href = "/auth?mode=sign-in";
        }
        return Promise.reject(error);
    }
);

export const login = async (username, password) => {
    try {
        const { data } = await api.post("/login", {
            username,
            password,
        });

        localStorage.setItem("authToken", data.token);

        return { success: true };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Login error",
        };
    }
};

const roleEndpoints = {
    UNIVERSITY: "/university/registration",
    COMPANY: "/company/registration",
    STUDENT: "/student/registration",
};

export const register = async (role, username, email, password) => {
    try {
        const endpoint = roleEndpoints[role.toUpperCase()];

        if (!endpoint) {
            return { success: false, message: "Unknown role" };
        }

        const { data } = await api.post(endpoint, {
            role: role.toUpperCase(),
            username,
            email,
            password,
        });

        return { success: true, data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Registration error",
        };
    }
};

export const logout = () => {
    localStorage.removeItem("authToken");
};