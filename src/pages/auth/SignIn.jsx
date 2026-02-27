import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService.js';
import { getRoleFromToken } from "../../utils/jwtDecode.js";
import AuthHeader from "../../components/AuthHeader.jsx";
import AuthFormWrapper from "../../components/AuthFormWrapper.jsx";
import PasswordInput from "../../components/PasswordInput.jsx";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result.success) {
            const role = getRoleFromToken().toUpperCase();
            navigate(role === 'ADMIN' ? '/admin' : '/');
        } else {
            console.log('Login failed:', result.message);
        }
    };

    return (
        <div className="min-h-screen">
            <AuthHeader />

            <AuthFormWrapper>
                <h2 className="text-2xl mb-8 font-mono">Sign In</h2>

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

                <div className="flex justify-between items-center mb-6 text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                            className="w-4 h-4 accent-[#0A65CC]"
                        />
                        <span className="text-gray-600">Remember me</span>
                    </label>

                    <button type="button" className="text-[#0A65CC] hover:underline cursor-pointer">
                        Forgot password?
                    </button>
                </div>

                <button
                    type="submit"
                    onClick={handleLogin}
                    className="w-full py-3 bg-[#0A65CC] text-white rounded hover:bg-[#084fa3] transition font-mono"
                >
                    Sign In →
                </button>
            </AuthFormWrapper>
        </div>
    );
};

export default SignIn;