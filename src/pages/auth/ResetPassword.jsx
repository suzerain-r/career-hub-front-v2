import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from "../../components/AuthHeader.jsx";
import AuthFormWrapper from "../../components/AuthFormWrapper.jsx";
import PasswordInput from "../../components/PasswordInput.jsx";

const ResetPassword = () => {
    const [pass, setPass] = useState('');
    const [rePass, setRePass] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [showRePass, setShowRePass] = useState(false);
    const navigate = useNavigate();

    const handleResetPassword = (e) => {
        e.preventDefault();
        if (pass !== rePass) {
            alert("Passwords do not match");
            return;
        }
        alert("Password successfully reset!");
        navigate('/signin');
    };

    return (
        <div className="min-h-screen">
            <AuthHeader />

            <AuthFormWrapper>
                <h2 className="text-2xl font-mono mb-8">Reset Password</h2>

                <PasswordInput
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="New password"
                    show={showPass}
                    setShow={setShowPass}
                />

                <PasswordInput
                    value={rePass}
                    onChange={(e) => setRePass(e.target.value)}
                    placeholder="Verify password"
                    show={showRePass}
                    setShow={setShowRePass}
                />

                <button
                    type="submit"
                    onClick={handleResetPassword}
                    className="w-full py-3 bg-[#0A65CC] text-white rounded hover:bg-[#084fa3] transition font-mono"
                >
                    Reset Password →
                </button>
            </AuthFormWrapper>
        </div>
    );
};

export default ResetPassword;