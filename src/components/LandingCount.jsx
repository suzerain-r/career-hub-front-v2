import React from 'react';

const LandingCount = ({ logo, count, type }) => {
    return (
        <div className="
            border border-gray-50
            rounded-xl
            shadow-md
            hover:shadow-lg
            hover:-translate-y-1
            transition-all duration-300
            w-full sm:w-70 lg:w-75
            p-5
            flex items-center gap-4
        ">
            <img
                src={logo}
                alt=""
                className="w-14 h-14 sm:w-17.5 sm:h-17.5 object-contain"
            />
            <div>
                <h2 className="text-xl font-bold text-[#18191c]">
                    {count}
                </h2>
                <p className="text-sm text-gray-500">
                    {type}
                </p>
            </div>
        </div>
        // <div className="count_item">
        //     <img src={logo} className="university_logo" alt={""}/>
        //     <div className="count_info">
        //         <h2>{count}</h2>
        //         <p>{type}</p>
        //     </div>
        // </div>

    )
};

export default LandingCount;
