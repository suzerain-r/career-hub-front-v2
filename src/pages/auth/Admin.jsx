import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authService.js';
import AuthHeader from "../../components/AuthHeader.jsx";
import AuthFormWrapper from "../../components/AuthFormWrapper.jsx";
import PasswordInput from "../../components/PasswordInput.jsx";

const Admin = () => {
    const navigate = useNavigate();

    const [role, setRole] = useState('University');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        const result = await register(role, null, email, password); // username = null
        if (result.success) {
            alert('Registration successful');
            navigate('/signin');
        } else {
            alert(`Registration failed: ${result.message}`);
        }
    };

    return (
        <div className="min-h-screen">
            <AuthHeader />

            <AuthFormWrapper>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-4">
                    <h2 className="text-2xl font-mono">Create Account.</h2>

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full sm:w-40 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0A65CC] transition"
                    >
                        <option value="University">University</option>
                        <option value="Company">Company</option>
                    </select>
                </div>

                <div className="mb-5">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email"
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0A65CC] transition"
                    />
                </div>

                <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    show={showPassword}
                    setShow={setShowPassword}
                />

                <button
                    type="submit"
                    onClick={handleRegister}
                    className="w-full py-3 bg-[#0A65CC] text-white rounded hover:bg-[#084fa3] transition font-mono"
                >
                    Create {role} →
                </button>

                <p className="text-sm text-center mt-6 text-gray-600">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate('/signin')}
                        className="text-[#0A65CC] cursor-pointer hover:underline"
                    >
                        Sign In
                    </span>
                </p>
            </AuthFormWrapper>
        </div>
    );
};

export default Admin;