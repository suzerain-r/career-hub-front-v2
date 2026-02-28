
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from './pages/auth/SignIn.jsx'
import Admin from './pages/auth/Admin.jsx'
import CreateStudent from './pages/auth/CreateStudent.jsx'
import ForgotPassword from './pages/auth/ForgotPassword.jsx'
import ResetPassword from './pages/auth/ResetPassword.jsx'
import Landing from './pages/main/Landing.jsx'
import StudentProfile from './pages/profile/StudentProfile.jsx'
import SettingsPage from "./pages/settings/SettingsPage.jsx";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/create-student" element={<CreateStudent />} />
      {/* <Route path="/candidates" element={<Candidates/>}/> */}
      {/* <Route path="/universities" element={<Universities/>}/> */}
      {/* <Route path="/companies" element={<Companies/>}/> */}
       <Route path="/student-profile" element={<StudentProfile/>}/>
        <Route path="/settings" element={<SettingsPage />} />
      {/* <Route path="/university-profile" element={<UniversityProfile/>}/> */}
      {/* <Route path="/company-profile" element={<CompanyProfile/>}/> */}
    </Routes>
  )
}

export default App
