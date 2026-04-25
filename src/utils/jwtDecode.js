import { jwtDecode } from "jwt-decode";

const getToken = () => localStorage.getItem("authToken");

let cachedToken = null;
let cachedDecoded = null;

export const decodeToken = () => {
    const token = getToken();

    if (!token) return null;

    if (token === cachedToken && cachedDecoded) {
        return cachedDecoded;
    }

    try {
        const decoded = jwtDecode(token);
        cachedToken = token;
        cachedDecoded = decoded;
        return decoded;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

export const getRoleFromToken = () => {
    return decodeToken()?.["user-role"] || null;
};

export const getIdFromToken = () => {
    return decodeToken()?.["user-id"] || null;
};

export const isTokenExpired = () => {
    const decoded = decodeToken();
    if (!decoded?.exp) return true;

    return Date.now() >= decoded.exp * 1000;
};

export const clearTokenCache = () => {
    cachedToken = null;
    cachedDecoded = null;
};