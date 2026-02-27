import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import Navbar from "./Header.jsx";

const Hero = () => {
    return (
        <div className="min-h-screen mb-4 bg-cover bg-center flex items-center w-full overflow-hidden">

            <div className='container text-center mx-auto py-4 px6 md:px-20 lg:px-32 text-[#0A65CC]'>
                <h2 className='text-5xl p-5 sm:text-6xl md:text-[82px] inline-block font-medium max-w-3xl pt-20'>
                    Find a worker who suits your interests & requirements.</h2>
                <div className='space-x-6 mt-16'>
                    <button className="bg-[#0A65CC] text-white px-8 py-3 rounded hover:bg-blue-400 cursor-pointer">
                        Contact Us
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Hero;
