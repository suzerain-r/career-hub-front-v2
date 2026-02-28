import React, { useEffect, useMemo, useState } from "react";
import { getIdFromToken, getRoleFromToken } from "../../utils/jwtDecode.js";
import { fetchStudent, fetchUniversity, updateStudentProfile } from "../../services/apiService.js";

const tabs = [
    { key: "personal", label: "Personal" },
    { key: "profile", label: "Profile" },
    { key: "social", label: "Social Links" },
    { key: "account", label: "Account Setting" },
];

const baseInput =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-900 outline-none placeholder:text-gray-400 " +
    "focus:border-blue-500 focus:ring-2 focus:ring-blue-100 " +
    "disabled:bg-gray-100 disabled:text-gray-500";

const baseSelect =
    "w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-[15px] text-gray-900 outline-none " +
    "focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100 disabled:text-gray-500";

const labelCls = "mb-2 block text-sm font-medium text-gray-900";

function ChevronDown() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" className="text-gray-500">
            <path
                d="M5.5 7.5L10 12l4.5-4.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function LinkIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 20 20" className="text-blue-600">
            <path
                d="M8.5 11.5l3-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
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
    );
}

function UserIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" className="text-blue-600">
            <path
                d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z"
                fill="currentColor"
            />
        </svg>
    );
}
function GlobeIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" className="text-gray-500">
            <path
                d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm7.93 9h-3.17a15.6 15.6 0 0 0-1.35-6.02A8.02 8.02 0 0 1 19.93 11ZM12 4.07A13.7 13.7 0 0 1 14.6 11H9.4A13.7 13.7 0 0 1 12 4.07ZM4.07 13h3.17a15.6 15.6 0 0 0 1.35 6.02A8.02 8.02 0 0 1 4.07 13ZM7.24 11H4.07A8.02 8.02 0 0 1 8.59 4.98 15.6 15.6 0 0 0 7.24 11Zm2.16 2h5.2A13.7 13.7 0 0 1 12 19.93 13.7 13.7 0 0 1 9.4 13Zm6.01 6.02A15.6 15.6 0 0 0 16.76 13h3.17a8.02 8.02 0 0 1-4.52 6.02Z"
                fill="currentColor"
            />
        </svg>
    );
}
function GearIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" className="text-gray-500">
            <path
                d="M19.14 12.94a7.53 7.53 0 0 0 .05-.94 7.53 7.53 0 0 0-.05-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.2 7.2 0 0 0-1.63-.94l-.36-2.54A.5.5 0 0 0 12.9 1h-3.8a.5.5 0 0 0-.49.42l-.36 2.54a7.2 7.2 0 0 0-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L1.71 7.48a.5.5 0 0 0 .12.64l2.03 1.58a7.53 7.53 0 0 0-.05.94c0 .32.02.63.05.94L1.83 14.52a.5.5 0 0 0-.12.64l1.92 3.32a.5.5 0 0 0 .6.22l2.39-.96c.5.38 1.05.7 1.63.94l.36 2.54a.5.5 0 0 0 .49.42h3.8a.5.5 0 0 0 .49-.42l.36-2.54c.58-.24 1.13-.56 1.63-.94l2.39.96a.5.5 0 0 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64ZM11 15a3 3 0 1 1 3-3 3 3 0 0 1-3 3Z"
                fill="currentColor"
            />
        </svg>
    );
}

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

function KebabButton({ onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 active:bg-gray-200"
            aria-label="menu"
        >
            <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                    d="M12 5.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm0 7a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm0 7a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
                    fill="currentColor"
                />
            </svg>
        </button>
    );
}

function ResumeCard({ title, size, onEdit, onDelete }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative rounded-2xl bg-gray-50 p-4 ring-1 ring-gray-100">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <ResumeIcon />
                    <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-gray-900">{title}</div>
                        <div className="text-sm text-gray-500">{size}</div>
                    </div>
                </div>

                <div className="relative">
                    <KebabButton onClick={() => setOpen((v) => !v)} />
                    {open && (
                        <div className="absolute right-0 top-10 z-10 w-44 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-200">
                            <button
                                type="button"
                                className="flex w-full items-center gap-2 px-4 py-3 text-sm text-blue-700 hover:bg-blue-50"
                                onClick={() => {
                                    setOpen(false);
                                    onEdit?.();
                                }}
                            >
                                ✎ <span>Edit Resume</span>
                            </button>
                            <button
                                type="button"
                                className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                                onClick={() => {
                                    setOpen(false);
                                    onDelete?.();
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

const StudentProfile = () => {
    const userId = getIdFromToken();
    getRoleFromToken();

    const [activeTab, setActiveTab] = useState("personal");
    const [university, setUniversity] = useState("");

    const [profile, setProfile] = useState({
        ownerId: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        universityId: "",
        degree: "",
        gpa: "",
        currentYear: "",
        yearOfEnrollment: "",
        aboutUs: "",
        // дополнительные поля под макет
        headline: "",
        experience: "",
        education: "",
        website: "",
    });

    const [isEditing, setIsEditing] = useState(true); // на макете всегда редактирование
    const [photoFile, setPhotoFile] = useState(null);

    // демо резюме (замени на свои данные)
    const [resumes, setResumes] = useState([
        { id: 1, title: "Professional Resume", size: "3.5 MB" },
        { id: 2, title: "Product Designer", size: "4.7 MB" },
        { id: 3, title: "Visual Designer", size: "1.3 MB" },
    ]);

    useEffect(() => {
        fetchStudent(userId)
            .then((data) => {
                setProfile((prev) => ({
                    ...prev,
                    ownerId: data.ownerId || "",
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    email: data.email || "",
                    phoneNumber: data.phoneNumber || "",
                    universityId: data.universityId || "",
                    degree: data.degree || "",
                    gpa: data.gpa || "",
                    currentYear: data.currentYear || "",
                    yearOfEnrollment: data.yearOfEnrollment || "",
                    aboutUs: data.aboutUs || "",
                }));
                return fetchUniversity(data.universityId);
            })
            .then((u) => setUniversity(u.name))
            .catch((e) => console.error("Error fetching data:", e));
    }, [userId]);

    const fullName = useMemo(() => {
        const fn = (profile.firstName || "").trim();
        const ln = (profile.lastName || "").trim();
        return `${fn} ${ln}`.trim();
    }, [profile.firstName, profile.lastName]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((p) => ({ ...p, [name]: value }));
    };

    const handleSave = async () => {
        const result = await updateStudentProfile(profile);
        if (result) alert("Profile saved successfully!");
        else alert("Error saving profile.");
    };

    const TabIcon = ({ tabKey }) => {
        if (tabKey === "personal") return <UserIcon />;
        if (tabKey === "profile") return <UserIcon />;
        if (tabKey === "social") return <GlobeIcon />;
        return <GearIcon />;
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6">
                <h1 className="text-3xl font-semibold text-gray-900">Setting</h1>

                {/* Tabs */}
                <div className="mt-6 border-b border-gray-200">
                    <div className="flex flex-wrap items-center gap-6">
                        {tabs.map((t) => {
                            const active = activeTab === t.key;
                            return (
                                <button
                                    key={t.key}
                                    type="button"
                                    onClick={() => setActiveTab(t.key)}
                                    className={[
                                        "relative flex items-center gap-2 pb-3 text-sm font-medium",
                                        active ? "text-blue-600" : "text-gray-500 hover:text-gray-800",
                                    ].join(" ")}
                                >
                  <span className={active ? "text-blue-600" : "text-gray-400"}>
                    <TabIcon tabKey={t.key} />
                  </span>
                                    {t.label}
                                    {active && <span className="absolute -bottom-[1px] left-0 h-[2px] w-full bg-blue-600" />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
                {/* Basic info */}
                <h2 className="text-2xl font-semibold text-gray-900">Basic Information</h2>

                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* Left: upload */}
                    <div className="lg:col-span-4">
                        <div className="text-sm font-medium text-gray-900">Profile Picture</div>

                        <label className="mt-3 block cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
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

                                <div className="mt-4 text-sm font-semibold text-gray-900">
                                    {photoFile ? photoFile.name : "Browse photo or drop here"}
                                </div>

                                <div className="mt-2 max-w-xs text-sm text-gray-500">
                                    A photo larger than 400 pixels work best. Max photo size 5 MB.
                                </div>
                            </div>
                        </label>
                    </div>

                    {/* Right: form */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Full name */}
                            <div>
                                <label className={labelCls}>Full name</label>
                                <input
                                    value={fullName}
                                    disabled
                                    className={baseInput}
                                    placeholder="Full name"
                                />
                            </div>

                            {/* Headline */}
                            <div>
                                <label className={labelCls}>Tittle/headline</label>
                                <input
                                    name="headline"
                                    value={profile.headline}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={baseInput}
                                    placeholder=""
                                />
                            </div>

                            {/* Experience */}
                            <div className="relative">
                                <label className={labelCls}>Experience</label>
                                <select
                                    name="experience"
                                    value={profile.experience}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={baseSelect}
                                >
                                    <option value="">Select...</option>
                                    <option value="0-1">0–1 year</option>
                                    <option value="1-3">1–3 years</option>
                                    <option value="3-5">3–5 years</option>
                                    <option value="5+">5+ years</option>
                                </select>
                                <span className="pointer-events-none absolute right-4 top-[46px]">
                  <ChevronDown />
                </span>
                            </div>

                            {/* Education */}
                            <div className="relative">
                                <label className={labelCls}>Educations</label>
                                <select
                                    name="education"
                                    value={profile.education}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={baseSelect}
                                >
                                    <option value="">Select...</option>
                                    <option value="bachelor">Bachelor</option>
                                    <option value="master">Master</option>
                                    <option value="doctorate">Doctorate</option>
                                </select>
                                <span className="pointer-events-none absolute right-4 top-[46px]">
                  <ChevronDown />
                </span>
                            </div>

                            {/* Personal website (full width) */}
                            <div className="md:col-span-2">
                                <label className={labelCls}>Personal Website</label>
                                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2">
                    <LinkIcon />
                  </span>
                                    <input
                                        name="website"
                                        value={profile.website}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`${baseInput} pl-11`}
                                        placeholder="Website url..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Save button like макет */}
                        <div className="mt-8">
                            <button
                                type="button"
                                onClick={handleSave}
                                className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white hover:bg-blue-700 active:bg-blue-800 sm:w-[240px]"
                            >
                                Save Changes
                            </button>
                        </div>

                        {/* Доп поля из твоего текущего профиля (если нужно) */}
                        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className={labelCls}>Email Address</label>
                                <input value={profile.email} disabled className={baseInput} />
                            </div>
                            <div>
                                <label className={labelCls}>University Name</label>
                                <input value={university} disabled className={baseInput} />
                            </div>
                            <div>
                                <label className={labelCls}>Contact Phone</label>
                                <input
                                    name="phoneNumber"
                                    value={profile.phoneNumber}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={baseInput}
                                />
                            </div>
                            <div className="relative">
                                <label className={labelCls}>Degree</label>
                                <select
                                    name="degree"
                                    value={profile.degree}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={baseSelect}
                                >
                                    <option value="">Select...</option>
                                    <option value="BACHELOR">Bachelor</option>
                                    <option value="MASTER">Master</option>
                                    <option value="DOCTORATE">Doctorate</option>
                                </select>
                                <span className="pointer-events-none absolute right-4 top-[46px]">
                  <ChevronDown />
                </span>
                            </div>

                            <div>
                                <label className={labelCls}>GPA</label>
                                <input
                                    name="gpa"
                                    type="number"
                                    value={profile.gpa}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={baseInput}
                                />
                            </div>
                            <div>
                                <label className={labelCls}>Year of Enrollment</label>
                                <input
                                    name="yearOfEnrollment"
                                    type="number"
                                    value={profile.yearOfEnrollment}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={baseInput}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className={labelCls}>Information about me</label>
                                <textarea
                                    name="aboutUs"
                                    value={profile.aboutUs}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={[
                                        "h-40 w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-900 outline-none",
                                        "focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
                                        "disabled:bg-gray-100 disabled:text-gray-500",
                                    ].join(" ")}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resume section */}
                <div className="mt-14">
                    <h2 className="text-2xl font-semibold text-gray-900">Your Cv/Resume</h2>

                    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {resumes.map((r) => (
                            <ResumeCard
                                key={r.id}
                                title={r.title}
                                size={r.size}
                                onEdit={() => alert(`Edit: ${r.title}`)}
                                onDelete={() => setResumes((prev) => prev.filter((x) => x.id !== r.id))}
                            />
                        ))}

                        {/* Add CV card */}
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
            </div>
        </div>
    );
};

export default StudentProfile;