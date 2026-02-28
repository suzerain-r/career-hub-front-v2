import React from "react";

export default function UploadBox({ title = "Profile Picture", hint, file, onFile }) {
    return (
        <div>
            <div className="text-sm font-medium text-gray-900">{title}</div>

            <label className="mt-3 block cursor-pointer">
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => onFile?.(e.target.files?.[0] || null)}
                />

                <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white ring-1 ring-gray-200">
                        <svg width="26" height="26" viewBox="0 0 24 24" className="text-gray-400">
                            <path
                                d="M12 3v10m0 0l-4-4m4 4l4-4M5 15v4h14v-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <div className="mt-4 text-sm font-semibold text-gray-900">{file ? file.name : "Browse photo or drop here"}</div>
                    <div className="mt-2 max-w-xs text-sm text-gray-500">
                        {hint || "A photo larger than 400 pixels work best. Max photo size 5 MB."}
                    </div>
                </div>
            </label>
        </div>
    );
}