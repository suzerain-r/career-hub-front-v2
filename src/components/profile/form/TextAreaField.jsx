import React from "react";

const base =
    "w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-900 outline-none " +
    "focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100 disabled:text-gray-500";

export default function TextAreaField({ label, name, value, onChange, disabled, rows = 6 }) {
    return (
        <div className="w-full">
            <label className="mb-2 block text-sm font-medium text-gray-900">{label}</label>
            <textarea name={name} value={value ?? ""} onChange={onChange} disabled={disabled} rows={rows} className={base} />
        </div>
    );
}