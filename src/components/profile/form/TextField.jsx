import React from "react";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

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
                        <GlobeAltIcon className="w-[18px] h-[18px]" />
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