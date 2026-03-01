import React, { useState } from "react";

function ResumeIcon() {
    return (
        <svg width="26" height="26" viewBox="0 0 24 24" className="text-blue-600">
            <path
                d="M6 2h9l3 3v17H6V2Zm8 1.5V6h2.5L14 3.5ZM8 9h8v1.6H8V9Zm0 3h8v1.6H8V12Zm0 3h6v1.6H8V15Z"
                fill="currentColor"
            />
        </svg>
    );
}

function Kebab({ onClick }) {
    return (
        <button type="button" onClick={onClick} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
            <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                    d="M12 5.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm0 7a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm0 7a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
                    fill="currentColor"
                />
            </svg>
        </button>
    );
}

function ResumeCard({ item, onDelete }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative rounded-2xl bg-gray-50 p-4 ring-1 ring-gray-100">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <ResumeIcon />
                    <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-500">{item.size}</div>
                    </div>
                </div>

                <div className="relative">
                    <Kebab onClick={() => setOpen((v) => !v)} />
                    {open && (
                        <div className="absolute right-0 top-10 z-10 w-44 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-200">
                            <button
                                type="button"
                                className="flex w-full items-center gap-2 px-4 py-3 text-sm text-blue-700 hover:bg-blue-50"
                                onClick={() => {
                                    setOpen(false);
                                    alert("Edit Resume");
                                }}
                            >
                                ✎ <span>Edit Resume</span>
                            </button>
                            <button
                                type="button"
                                className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                                onClick={() => {
                                    setOpen(false);
                                    onDelete(item.id);
                                }}
                            >
                                🗑 <span>Delete</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ResumeSection() {
    const [resumes, setResumes] = useState([
        { id: 1, title: "Professional Resume", size: "3.5 MB" },
        { id: 2, title: "Product Designer", size: "4.7 MB" },
        { id: 3, title: "Visual Designer", size: "1.3 MB" },
    ]);

    return (
        <div className="mt-14">
            <h2 className="text-2xl font-semibold text-gray-900">Your Cv/Resume</h2>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {resumes.map((r) => (
                    <ResumeCard key={r.id} item={r} onDelete={(id) => setResumes((p) => p.filter((x) => x.id !== id))} />
                ))}

                <label className="cursor-pointer rounded-2xl border-2 border-dashed border-gray-200 bg-white p-5 hover:bg-gray-50">
                    <input type="file" accept=".pdf" className="hidden" />
                    <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                            <span className="text-xl leading-none">+</span>
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-gray-900">Add Cv/Resume</div>
                            <div className="text-sm text-gray-500">Browse file or drop here. only pdf</div>
                        </div>
                    </div>
                </label>
            </div>
        </div>
    );
}