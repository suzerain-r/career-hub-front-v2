import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import { ArrowLeftIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { getIdFromToken, getRoleFromToken } from "../../utils/jwtDecode.js";
import { fetchProfilePhotoUrl } from "../../services/apiService.js";

const AvatarButton = React.memo(({ avatarUrl, color = "#0A65CC", onClick, show }) => {
    return avatarUrl ? (
        <img
            src={avatarUrl}
            alt="avatar"
            onClick={onClick}
            style={{ borderColor: color }}
            className={`${show ? "" : "hidden md:block"} w-11 h-11 rounded-full object-cover border-2 cursor-pointer hover:scale-110 transition`}
        />
    ) : (
        <UserCircleIcon
            onClick={onClick}
            style={{ color }}
            className={`${show ? "" : "hidden md:block"} w-11 h-11 cursor-pointer hover:scale-110 transition`}
        />
    );
});

const Header = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const userRole = useMemo(() => getRoleFromToken(), []);
    const userId = useMemo(() => getIdFromToken(), []);
    const isAuth = !!userRole;

    useEffect(() => {
        document.body.style.overflow = showMobileMenu ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [showMobileMenu]);

    useEffect(() => {
        if (!isAuth || !userId) return;

        let isMounted = true;

        fetchProfilePhotoUrl(userId)
            .then((url) => {
                if (url && isMounted) setAvatarUrl(url);
            })
            .catch(console.error);

        return () => {
            isMounted = false;
        };
    }, [isAuth, userId]);

    const menuItems = useMemo(() => [
        { label: "Home", path: "/" },
        { label: "Students", path: "/students" },
        { label: "Universities", path: "/universities" },
        { label: "Companies", path: "/companies" },
    ], []);

    const isActive = useCallback((path) => {
        return path === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(path);
    }, [location.pathname]);

    const handleSignIn = useCallback(() => navigate("/auth?mode=sign-in"), [navigate]);
    const goToProfile = useCallback(() => navigate("/profile"), [navigate]);
    const openMenu = useCallback(() => setShowMobileMenu(true), []);
    const closeMenu = useCallback(() => setShowMobileMenu(false), []);

    return (
        <div className='absolute top-0 left-0 w-full z-10'>
            <div className='mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32'>
                <div className="flex items-center gap-2">
                    <img src={assets.logo} className="w-9 h-9" alt="" />
                    <span className="text-xl font-mono">CareerHub</span>
                </div>

                <ul className='hidden md:flex gap-7'>
                    {menuItems.map((item) => (
                        <li
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`cursor-pointer transition ${
                                isActive(item.path)
                                    ? "text-[#0A65CC] font-medium"
                                    : "hover:text-[#0A65CC]"
                            }`}
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-3">
                    {isAuth ? (
                        <AvatarButton
                            avatarUrl={avatarUrl}
                            onClick={goToProfile}
                        />
                    ) : (
                        <button
                            className="hidden md:block bg-[#0A65CC] text-white px-6 py-2 rounded hover:bg-blue-400 cursor-pointer"
                            onClick={handleSignIn}
                        >
                            Sign up
                        </button>
                    )}

                    <img
                        onClick={openMenu}
                        src={assets.menu_icon}
                        className='md:hidden w-7 cursor-pointer'
                        alt=''
                    />
                </div>
            </div>

            <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
                showMobileMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}>
                <div onClick={closeMenu} className="absolute inset-0 bg-black/40" />

                <div className={`absolute right-0 top-0 h-full w-3/4 max-w-xs bg-[#0A65CC] transform transition-transform duration-300 flex flex-col ${
                    showMobileMenu ? "translate-x-0" : "translate-x-full"
                }`}>
                    <div className='flex justify-between p-5'>
                        <ArrowLeftIcon
                            onClick={closeMenu}
                            className="w-9 h-9 text-white cursor-pointer"
                        />

                        {isAuth && (
                            <AvatarButton
                                avatarUrl={avatarUrl}
                                onClick={goToProfile}
                                color="#FFFFFF"
                                show
                            />
                        )}
                    </div>

                    <div className="flex flex-col items-center justify-between h-full text-white">
                        <ul className='flex flex-col items-center gap-3 mt-5 px-5 text-lg'>
                            {menuItems.map((item) => (
                                <li
                                    key={item.path}
                                    onClick={() => {
                                        navigate(item.path);
                                        closeMenu();
                                    }}
                                    className={`cursor-pointer transition ${
                                        isActive(item.path)
                                            ? "text-gray-800 font-medium"
                                            : "hover:text-gray-800"
                                    }`}
                                >
                                    {item.label}
                                </li>
                            ))}
                        </ul>

                        {!isAuth && (
                            <button
                                onClick={() => {
                                    handleSignIn();
                                    closeMenu();
                                }}
                                className="bg-white text-[#0A65CC] px-8 py-2 mb-6 rounded-xl font-semibold hover:bg-gray-200 transition"
                            >
                                Sign up
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;