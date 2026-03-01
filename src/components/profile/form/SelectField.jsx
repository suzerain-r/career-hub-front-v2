import React from "react";

const base =
    "w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-[15px] text-gray-900 outline-none " +
    "focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100 disabled:text-gray-500";

export default function SelectField({
    label,
    name,
    value,
    onChange,
    options = [],
    placeholder = "Select...",
    disabled,
}) {
    return (
        <div className="relative w-full">
            <label className="mb-2 block text-sm font-medium text-gray-900">{label}</label>

            <select name={name} value={value ?? ""} onChange={onChange} disabled={disabled} className={base}>
                <option value="">{placeholder}</option>
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>

            <span className="pointer-events-none absolute right-4 top-11.5 text-gray-500">
                <svg width="20" height="20" viewBox="0 0 20 20">
                    <path
                        d="M5.5 7.5L10 12l4.5-4.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
        </div>
    );
}