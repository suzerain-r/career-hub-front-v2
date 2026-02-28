import React from "react";

const ProfileInput = ({
                          title,
                          type,
                          placeholder,
                          name,
                          value,
                          handleChange,
                          isEditing = true,
                      }) => {
    return (
        <div className="w-full">
            <label className="mb-2 block text-sm font-semibold text-gray-800">
                {title}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={handleChange}
                disabled={!isEditing}
                className={[
                    "w-full rounded-xl border px-3 py-3 text-base outline-none",
                    "border-gray-200 bg-white text-gray-900",
                    "focus:border-gray-400 focus:ring-2 focus:ring-gray-200",
                    "disabled:bg-gray-100 disabled:text-gray-500",
                    "placeholder:text-gray-400",
                ].join(" ")}
            />
        </div>
    );
};

export default ProfileInput;