import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authService.js';
import AuthHeader from "../../components/AuthHeader.jsx";
import AuthFormWrapper from "../../components/AuthFormWrapper.jsx";
import PasswordInput from "../../components/PasswordInput.jsx";

const CreateStudent = () => {
    const role = 'Student';
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        const result = await register(role, null, email, password);
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
                <h2 className="text-2xl mb-8 font-mono">Create Student.</h2>

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
                    Create Student →
                </button>
            </AuthFormWrapper>
        </div>
    );
};

export default CreateStudent;