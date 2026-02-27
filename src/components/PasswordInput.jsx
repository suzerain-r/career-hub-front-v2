import React from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const PasswordInput = ({ value, onChange, placeholder, show, setShow }) => {
    return (
        <div className="mb-5 relative">
            <input
                type={show ? "text" : "password"}
                value={value}
                onChange={onChange}
                required
                placeholder={placeholder}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0A65CC] transition"
            />
            <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#0A65CC] transition"
            >
                {show ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
        </div>
    );
};

export default PasswordInput;