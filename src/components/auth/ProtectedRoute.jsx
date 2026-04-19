import { Navigate, useLocation } from "react-router-dom";
import { decodeToken } from "../../utils/jwtDecode.js";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const location = useLocation();
    const decoded = decodeToken();

    if (!decoded) {
        localStorage.removeItem("authToken");
        return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
    }

    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("authToken");
        return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
    }

    if (allowedRoles && !allowedRoles.includes(decoded["user-role"])) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
