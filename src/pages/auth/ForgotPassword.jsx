import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from "../../components/AuthHeader.jsx";
import AuthFormWrapper from "../../components/AuthFormWrapper.jsx";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const handleForgotPassword = (e) => {
        e.preventDefault();
        alert(`Reset code sent to ${email}`);
    };

    const handleVerifyCode = (e) => {
        e.preventDefault();
        alert(`Code ${code} verified`);
    };

    return (
        <div className="min-h-screen">
            <AuthHeader />

            <AuthFormWrapper>
                <h2 className="text-2xl font-mono mb-8">Forgot Password</h2>

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

                <button
                    onClick={handleForgotPassword}
                    className="w-full py-3 mb-6 bg-[#0A65CC] text-white rounded hover:bg-[#084fa3] transition font-mono"
                >
                    Reset Password →
                </button>

                <div className="mb-5">
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Confirmation Code"
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0A65CC] transition"
                    />
                </div>

                <button
                    onClick={handleVerifyCode}
                    className="w-full py-3 mb-4 bg-[#0A65CC] text-white rounded hover:bg-[#084fa3] transition font-mono"
                >
                    Verify Code →
                </button>
            </AuthFormWrapper>
        </div>
    );
};

export default ForgotPassword;