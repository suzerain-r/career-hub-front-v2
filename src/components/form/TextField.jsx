import React from "react";

const base =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-900 outline-none " +
    "placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 " +
    "disabled:bg-gray-100 disabled:text-gray-500";

export default function TextField({
                                      label,
                                      name,
                                      value,
                                      onChange,
                                      placeholder,
                                      disabled,
                                      readOnly,
                                      icon,
                                      type = "text",
                                  }) {
    return (
        <div className="w-full">
            <label className="mb-2 block text-sm font-medium text-gray-900">{label}</label>

            <div className="relative">
                {icon === "link" && (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">
            <svg width="18" height="18" viewBox="0 0 20 20">
              <path d="M8.5 11.5l3-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path
                  d="M7 13a3 3 0 0 1 0-4.243l2.121-2.121A3 3 0 0 1 13.364 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
              />
              <path
                  d="M13 7a3 3 0 0 1 0 4.243l-2.121 2.121A3 3 0 0 1 6.636 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
              />
            </svg>
          </span>
                )}

                <input
                    type={type}
                    name={name}
                    value={value ?? ""}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled || readOnly}
                    className={`${base} ${icon ? "pl-11" : ""}`}
                />
            </div>
        </div>
    );
}