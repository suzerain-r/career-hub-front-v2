import React from "react";

const AboutUsTextArea = ({ value, handleChange, isEditing }) => {
    return (
        <div className="w-full">
            <label className="mb-2 block text-sm font-semibold text-gray-800">
                Information about me
            </label>

            <textarea
                name="aboutUs"
                placeholder=""
                value={value}
                onChange={handleChange}
                disabled={!isEditing}
                className={[
                    "w-full resize-none rounded-xl border px-4 py-3 text-base outline-none",
                    "border-gray-200 bg-white text-gray-900",
                    "focus:border-gray-400 focus:ring-2 focus:ring-gray-200",
                    "disabled:bg-gray-100 disabled:text-gray-500",
                    "h-40", // ~160px, близко к твоим 150px
                ].join(" ")}
            />
        </div>
    );
};

export default AboutUsTextArea;