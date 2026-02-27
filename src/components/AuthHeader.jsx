import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from "../assets/assets.js";

const AuthHeader = () => {
    const navigate = useNavigate();

    return (
        <div
            className="absolute top-0 left-0 w-full z-10 
                       flex items-center 
                       py-4 px-6 md:px-20 lg:px-32"
        >
            <div
                onClick={() => navigate('/')}
                className="flex items-center gap-2 cursor-pointer"
            >
                <img src={assets.logo} className="w-9 h-9" alt="Logo" />
                <span className="text-xl font-mono">CareerHub</span>
            </div>
        </div>
    );
};

export default AuthHeader;