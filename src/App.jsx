import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from './pages/main/Landing.jsx'
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import ListPage from "./pages/main/ListPage.jsx";
import AuthPage from "./pages/auth/AuthPage.jsx";
import DetailPage from "./pages/main/DetailPage.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";


const App = () => {
    return (
        <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<Landing />} />
            <Route path="/:type" element={<ListPage />} />
            {/* <Route path="/list" element={<ListPage />} /> */}
            {/* <Route path="/candidates" element={<Candidates/>}/> */}
            {/* <Route path="/universities" element={<Universities/>}/> */}
            {/* <Route path="/companies" element={<Companies/>}/> */}
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/student-profile"
                element={
                    <ProtectedRoute allowedRoles={["STUDENT"]}>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/university-profile"
                element={
                    <ProtectedRoute allowedRoles={["UNIVERSITY"]}>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />
            {/* <Route path="/student-profile" element={<StudentProfile />} /> */}
            {/* <Route path="/university-profile" element={<UniversityProfile/>}/> */}
            {/* <Route path="/company-profile" element={<CompanyProfile/>}/> */}
        </Routes>
    )
}

export default App
