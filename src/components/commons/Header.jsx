import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { getIdFromToken, getRoleFromToken } from "../../utils/jwtDecode.js";
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { fetchProfilePhotoUrl } from "../../services/apiService.js";

const Header = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (showMobileMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [showMobileMenu]);

    const handleSignIn = () => {
        navigate("/auth?mode=sign-in");
    };

    const [isAuth, setIsAuth] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        const role = getRoleFromToken();
        setIsAuth(!!role);

        if (role) {
            const userId = getIdFromToken();
            if (userId) {
                fetchProfilePhotoUrl(userId)
                    .then((url) => { if (url) setAvatarUrl(url); })
                    .catch((e) => console.error(e));
            }
        }
    }, []);

    const AvatarButton = ({ className, onClick }) => (
        avatarUrl ? (
            <img
                src={avatarUrl}
                alt="avatar"
                onClick={onClick}
                className={`rounded-full object-cover border-2 border-[#0A65CC] cursor-pointer hover:scale-110 transition ${className}`}
            />
        ) : (
            <UserCircleIcon
                onClick={onClick}
                className={`text-[#0A65CC] cursor-pointer hover:scale-110 transition ${className}`}
            />
        )
    );


    const menuItems = [
        { label: "Home", path: "/" },
        { label: "Students", path: "/students" },
        { label: "Universities", path: "/universities" },
        { label: "Companies", path: "/companies" },
    ];

    const location = useLocation();

    const isActive = (path) => {
        if (path === "/") return location.pathname === "/";

        return (
            location.pathname === path ||
            location.pathname.startsWith(path + "/")
        );
    };

    return (
        <div className='absolute top-0 left-0 w-full z-10'>
            <div className='mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32'>
                <div className="flex items-center gap-2">
                    <img src={assets.logo} className="w-9 h-9" alt="" />
                    <span className="text-xl font-mono">
                        CareerHub
                    </span>
                </div>

                <ul className='hidden md:flex gap-7'>
                    {menuItems.map((item) => (
                        <li
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`cursor-pointer transition ${isActive(item.path)
                                ? "text-[#0A65CC] font-medium"
                                : "hover:text-[#0A65CC]"
                                }`}
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-3 ">
                    {
                        isAuth ? (
                            <AvatarButton
                                onClick={() => navigate("/profile")}
                                className="w-15 h-15"
                            />
                        ) : (
                            <button
                                className="hidden md:block bg-[#0A65CC] text-white px-6 py-2 rounded hover:bg-blue-400 cursor-pointer"
                                onClick={handleSignIn}
                            >
                                Sign up
                            </button>
                        )
                    }
                    <img onClick={() => setShowMobileMenu(true)} src={assets.menu_icon}
                        className='md:hidden w-7 cursor-pointer' alt='' />
                </div>
            </div>

            <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${showMobileMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <div
                    onClick={() => setShowMobileMenu(false)}
                    className="absolute inset-0 bg-black/40"
                />


                <div className={`absolute right-0 top-0 h-full w-3/4 max-w-xs bg-[#0A65CC] transform transition-transform duration-300 ease-out flex flex-col ${showMobileMenu ? "translate-x-0" : "translate-x-full"}`}>
                    <div className='flex justify-between p-5 cursor-pointer'>
                        <ArrowLeftIcon
                            onClick={() => setShowMobileMenu(false)}
                            className="w-9 h-9 text-white"
                        />
                        {
                            isAuth && (
                                avatarUrl ? (
                                    <img
                                        src={avatarUrl}
                                        alt="avatar"
                                        onClick={() => {
                                            navigate("/profile");
                                            setShowMobileMenu(false);
                                        }}
                                        className="w-9 h-9 rounded-full object-cover border-2 border-white cursor-pointer hover:scale-110 transition"
                                    />
                                ) : (
                                    <UserCircleIcon
                                        onClick={() => {
                                            navigate("/profile");
                                            setShowMobileMenu(false);
                                        }}
                                        className="w-9 h-9 text-white cursor-pointer hover:scale-110 transition"
                                    />
                                )
                            )
                        }
                    </div>

                    <div className="flex flex-col items-center justify-between h-full text-white">

                        <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg'>
                            {/* <a onClick={() => setShowMobileMenu(false)} className='px-4 py-2'>Home</a>
                            <a onClick={() => setShowMobileMenu(false)} className='px-4 py-2'>Students</a>
                            <a onClick={() => setShowMobileMenu(false)} className='px-4 py-2'>Universities</a>
                            <a onClick={() => setShowMobileMenu(false)} className='px-4 py-2'>Companies</a> */}
                            {menuItems.map((item) => (
                                <li
                                    key={item.path}
                                    onClick={() => navigate(item.path)}
                                    className={`cursor-pointer transition ${isActive(item.path)
                                        ? "text-gray-800 font-medium"
                                        : "hover:text-gray-800"
                                        }`}
                                >
                                    {item.label}
                                </li>
                            ))}
                        </ul>

                        {
                            !isAuth && (
                                <button
                                    onClick={() => {
                                        handleSignIn();
                                        setShowMobileMenu(false);
                                    }}
                                    className="bg-white text-[#0A65CC] px-8 py-2 mb-6 rounded-xl font-semibold hover:bg-gray-200 transition"
                                >
                                    Sign up
                                </button>
                            )
                        }

                    </div>

                </div>
            </div>
        </div>

    )
}

export default Header;
