import {jwtDecode} from 'jwt-decode';



export const decodeToken = () => {
    const token = localStorage.getItem("authToken");
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

export const getRoleFromToken = () => {
    const decoded = decodeToken();
    return decoded ? decoded['user-role'] : null;
};
export const getIdFromToken = () => {
    const decoded = decodeToken();
    return decoded ? decoded['user-id'] : null;
};