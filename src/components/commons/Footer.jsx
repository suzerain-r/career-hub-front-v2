import React from "react";
import {assets} from "../../assets/assets.js";

const Footer = () => {
    return (
        <div className='mt-10 pt-10 px-4 md:px-20 lg:px-32 bg-gray-800 w-full overflow-hidden'>
            <div className='mx-auto flex flex-col md:flex-row justify-between items-start'>
                <div className='mb-8 md:mb-0'>
                    <div className="flex items-center gap-2">
                        <img src={assets.logo} className="w-9 h-9" alt="" />
                        <span className="text-xl font-mono text-white">
                        CareerHub
                    </span>
                    </div>
                    <p className='text-gray-400 mt-4'>Almaty, Kaskelen, SDU University</p>
                </div>
                <div className='mb-8 md:mb-0'>
                    <h3 className='text-white text-lg font-medium mb-4'>Support</h3>
                    <ul className='flex flex-col gap-2 text-gray-400'>
                        <a href="" className='hover:text-white'>FAQs</a>
                        <a href="" className='hover:text-white'>Privacy Policy</a>
                        <a href="" className='hover:text-white'>Terms & Conditions</a>
                    </ul>
                </div>
            </div>
            <div className='border-t border-gray-700 py-4 mt-10 text-center text-gray-400'>
                 Copyright 2026 © CareerHub. All Rights Reserved.
            </div>
        </div>
    )
}

export default Footer;
