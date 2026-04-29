import React from "react";

export default function UploadBox({title = "Profile Picture", hint, file, onFile, avatarUrl, readOnly = false}) {
    // Preview priority: new local file > existing server avatar > placeholder
    const previewSrc = file ? URL.createObjectURL(file) : avatarUrl ?? null;

    const content = (
        <div className="relative aspect-square w-full rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 overflow-hidden">
            {previewSrc ? (
                <>
                    <img
                        src={previewSrc}
                        alt="Profile avatar"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    {!readOnly && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-sm font-medium py-2 text-center backdrop-blur-sm">
                            Browse photo or drop here
                        </div>
                    )}
                </>
            ) : (
                <div className="flex h-full flex-col items-center justify-center px-6 text-center">
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

                    <div className="mt-4 text-sm font-medium text-gray-900">
                        {readOnly ? "No photo" : "Browse photo or drop here"}
                    </div>

                    {!readOnly && (
                        <div className="mt-2 max-w-xs text-sm text-gray-500">
                            {hint || "A photo larger than 400 pixels work best. Max photo size 5 MB."}
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    return (
        <div>
            <div className="text-sm font-medium text-gray-900">{title}</div>

            {readOnly ? (
                <div className="mt-3 block">{content}</div>
            ) : (
                <label className="mt-3 block cursor-pointer">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => onFile?.(e.target.files?.[0] || null)}
                    />
                    {content}
                </label>
            )}
        </div>
    );
}