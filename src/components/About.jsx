import React from 'react';
import {assets} from "../assets/assets.js";

const About = () => {
    return (
        <div
            className="flex flex-col items-center justify-center container mx-auto py-16 px-6 md:px-20 lg:px-32 w-full overflow-hidden" id="#About"><h1
            className="text-2xl sm:text-4xl font-medium mb-2">About <span
            className="underline underline-offset-4 decoration-1 under font-light">Us</span></h1>
            <div className="flex flex-col md:flex-row items-center md:items-start md:gap-20">
                <img src={assets.about_us} alt="" className="w-full sm:w-1/2 max-w-lg"/>
                <div className="flex flex-col items-center md:items-start mt-10 text-gray-600">
                    <div className="grid grid-cols-2 gap-6 md:gap-10 w-full 2xl:pr-28">
                        <div><p className="text-4xl font-medium text-gray-800">10+</p><p>Information_1</p>
                        </div>
                        <div><p className="text-4xl font-medium text-gray-800">10+</p><p>Information_2</p>
                        </div>
                    </div>
                    <p className="my-10 max-w-lg">About us</p>
                    <button
                        className="border border-[#0A65CC] px-8 py-3 text-[#0A65CC] rounded hover:bg-gray-100 transition cursor-pointer">
                        Learn More
                    </button>
                </div>
            </div>
        </div>


    )
};

export default About;
