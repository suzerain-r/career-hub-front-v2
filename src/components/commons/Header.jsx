import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import { XMarkIcon } from '@heroicons/react/24/outline';
import { logout } from "../../services/authService.js";
import { fetchProfilePhotoUrl } from "../../services/apiService.js";
import { getIdFromToken } from "../../utils/jwtDecode.js";

const Header = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const userMenuRef = useRef(null);

    const location = useLocation();
    const navigate = useNavigate();

    const isAuthenticated = !!localStorage.getItem("authToken");

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

    useEffect(() => {
        setShowMobileMenu(false);
        setShowUserMenu(false);
    }, [location.pathname]);

    useEffect(() => {
        let objectUrl = null;
        let cancelled = false;

        if (!isAuthenticated) {
            setAvatarUrl(null);
            return;
        }

        const userId = getIdFromToken();
        if (!userId) return;

        fetchProfilePhotoUrl(userId).then((url) => {
            if (cancelled) {
                if (url) URL.revokeObjectURL(url);
                return;
            }
            objectUrl = url;
            setAvatarUrl(url);
        });

        return () => {
            cancelled = true;
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [isAuthenticated]);

    useEffect(() => {
        if (!showUserMenu) return;

        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showUserMenu]);

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        setAvatarUrl(null);
        navigate("/auth");
    };

    const handleSignIn = () => {
        navigate("/auth");
    };

    const avatarSrc = avatarUrl || assets.profile;

    const userAvatar = (
        <div className="relative hidden md:block" ref={userMenuRef}>
            <button
                type="button"
                onClick={() => setShowUserMenu((v) => !v)}
                className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 hover:border-[#0A65CC] transition-colors cursor-pointer bg-white"
                aria-label="User menu"
            >
                <img
                    src={avatarSrc}
                    alt="avatar"
                    className="w-full h-full object-cover"
                />
            </button>

            <div
                className={`absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden origin-top-right transition-all duration-150 ${
                    showUserMenu
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                }`}
            >
                <button
                    onClick={() => { setShowUserMenu(false); navigate("/profile"); }}
                    className="w-full text-left px-4 py-3 text-sm text-gray-800 hover:bg-gray-50 cursor-pointer"
                >
                    Profile
                </button>
                <div className="h-px bg-gray-100" />
                <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 cursor-pointer"
                >
                    Logout
                </button>
            </div>
        </div>
    );

    return (
        <div className='absolute top-0 left-0 w-full z-10'>
            <div className='mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32'>
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <img src={assets.logo} className="w-9 h-9" alt="" />
                    <span className="text-xl font-mono">
                        CareerHub
                    </span>
                </div>

                <ul className='hidden md:flex gap-7'>
                    <a onClick={() => navigate("/")} className='cursor-pointer hover:text-[#0A65CC]'>Home</a>
                    <a onClick={() => navigate("/students")} className='cursor-pointer hover:text-[#0A65CC]'>Students</a>
                    <a onClick={() => navigate("/universities")} className='cursor-pointer hover:text-[#0A65CC]'>Universities</a>
                    <a onClick={() => navigate("/companies")} className='cursor-pointer hover:text-[#0A65CC]'>Companies</a>
                </ul>

                <div className="flex items-center gap-3">
                    {isAuthenticated ? (
                        userAvatar
                    ) : (
                        <button
                            onClick={handleSignIn}
                            className='hidden md:block border border-[#0A65CC] px-6 py-2 rounded text-[#0A65CC] hover:bg-gray-100 cursor-pointer'
                        >
                            Sign in
                        </button>
                    )}

                    <img
                        onClick={() => setShowMobileMenu(true)}
                        src={assets.menu_icon}
                        className='md:hidden w-7 cursor-pointer'
                        alt=''
                    />
                </div>
            </div>

            <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${showMobileMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <div
                    onClick={() => setShowMobileMenu(false)}
                    className="absolute inset-0 bg-black/40"
                />

                <div className={`absolute right-0 top-0 h-full w-3/4 max-w-xs bg-[#0A65CC] transform transition-transform duration-300 ease-out ${showMobileMenu ? "translate-x-0" : "translate-x-full"}`}>
                    <div className='flex justify-end p-5 cursor-pointer'>
                        <XMarkIcon
                            onClick={() => setShowMobileMenu(false)}
                            className="w-9 h-9 text-white"
                        />
                    </div>

                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg text-white'>
                        <a onClick={() => navigate("/")} className='px-4 py-2 cursor-pointer'>Home</a>
                        <a onClick={() => navigate("/students")} className='px-4 py-2 cursor-pointer'>Students</a>
                        <a onClick={() => navigate("/universities")} className='px-4 py-2 cursor-pointer'>Universities</a>
                        <a onClick={() => navigate("/companies")} className='px-4 py-2 cursor-pointer'>Companies</a>

                        <div className="mt-6 w-full px-4 flex flex-col gap-3">
                            {isAuthenticated ? (
                                <>
                                    <button
                                        onClick={() => navigate("/profile")}
                                        className='w-full bg-white text-[#0A65CC] py-2 rounded font-medium cursor-pointer'
                                    >
                                        Profile
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className='w-full border border-white text-white py-2 rounded font-medium cursor-pointer'
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={handleSignIn}
                                    className='w-full bg-white text-[#0A65CC] py-2 rounded font-medium cursor-pointer'
                                >
                                    Sign in
                                </button>
                            )}
                        </div>
                    </ul>

                </div>
            </div>
        </div>

    )
}

export default Header;
