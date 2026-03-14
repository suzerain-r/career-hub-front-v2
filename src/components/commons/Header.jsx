import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets.js";
import { XMarkIcon } from '@heroicons/react/24/outline';

const Header = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

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
                    <a href="#" className='cursor-pointer hover:text-[#0A65CC]'>Home</a>
                    <a href="#" className='cursor-pointer hover:text-[#0A65CC]'>Students</a>
                    <a href="#" className='cursor-pointer hover:text-[#0A65CC]'>Universities</a>
                    <a href="#" className='cursor-pointer hover:text-[#0A65CC]'>Companies</a>
                </ul>
                <button className='hidden md:block border border-[#0A65CC] px-6 py-2 rounded text-[#0A65CC] hover:bg-gray-100 cursor-pointer'>Sign up</button>
                <img onClick={() => setShowMobileMenu(true)} src={assets.menu_icon}
                    className='md:hidden w-7 cursor-pointer' alt='' />
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
                        <a onClick={() => setShowMobileMenu(false)} className='px-4 py-2'>Home</a>
                        <a onClick={() => setShowMobileMenu(false)} className='px-4 py-2'>Students</a>
                        <a onClick={() => setShowMobileMenu(false)} className='px-4 py-2'>Universities</a>
                        <a onClick={() => setShowMobileMenu(false)} className='px-4 py-2'>Companies</a>
                    </ul>

                </div>
            </div>
        </div>

    )
}

export default Header;
