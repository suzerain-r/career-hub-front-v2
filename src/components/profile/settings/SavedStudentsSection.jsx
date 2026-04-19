import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";
import { assets } from "../../../assets/assets.js";
import {
    fetchFavorites,
    fetchStudent,
    togFavorite,
    fetchProfilePhotoUrl,
} from "../../../services/apiService.js";
import { getIdFromToken } from "../../../utils/jwtDecode.js";

function ConfirmRemoveModal({ open, student, onClose, onConfirm, submitting }) {
    if (!open || !student) return null;

    const fullName =
        [student.firstName, student.lastName].filter(Boolean).join(" ") ||
        student.email ||
        "this student";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/40"
                onClick={submitting ? undefined : onClose}
            />

            <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-gray-900">Remove from saved?</h3>
                <p className="mt-2 text-sm text-gray-600">
                    Remove <span className="font-medium text-gray-900">{fullName}</span> from
                    your saved candidates? You can add them back later.
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={submitting}
                        className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={submitting}
                        className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                    >
                        {submitting ? "Removing..." : "Remove"}
                    </button>
                </div>
            </div>
        </div>
    );
}

function StudentCard({ student, avatarUrl, onRemove, onViewProfile }) {
    const fullName =
        [student.firstName, student.lastName].filter(Boolean).join(" ") || "—";

    const fields = [
        { key: "degree", label: "Degree" },
        { key: "gpa", label: "GPA" },
    ];

    return (
        <div className="flex flex-row gap-3 p-3 sm:p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-500 transition">
            {avatarUrl ? (
                <img
                    src={avatarUrl}
                    alt=""
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-full object-cover"
                />
            ) : (
                <img
                    src={assets.candidate_icon}
                    alt=""
                    className="w-18 h-18 sm:w-20 sm:h-20 object-contain"
                />
            )}

            <div className="flex justify-between items-center w-full gap-3">
                <div className="flex flex-col">
                    <h3 className="font-medium text-base sm:text-lg">{fullName}</h3>
                    {fields.map((field) => (
                        <p className="text-gray-500 text-sm" key={field.key}>
                            {field.label}: {student[field.key] ?? "—"}
                        </p>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => onRemove(student)}
                        title="Remove from saved"
                        className="p-2 text-red-500 hover:bg-red-50 rounded-md transition"
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>

                    <button
                        type="button"
                        onClick={() => onViewProfile(student)}
                        className="lg:hidden bg-blue-50 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition"
                    >
                        →
                    </button>

                    <button
                        type="button"
                        onClick={() => onViewProfile(student)}
                        className="hidden lg:inline-block bg-blue-50 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition"
                    >
                        View Profile →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function SavedStudentsSection() {
    const navigate = useNavigate();
    const companyId = getIdFromToken();

    const [students, setStudents] = useState([]);
    const [avatars, setAvatars] = useState({}); // { studentId: blobUrl }
    const [loading, setLoading] = useState(true);
    const [removeTarget, setRemoveTarget] = useState(null);
    const [removing, setRemoving] = useState(false);
    const [notice, setNotice] = useState(null);

    const normalizeIds = (raw) => {
        if (!raw) return [];
        const arr = Array.isArray(raw) ? raw : raw.content || [];
        return arr
            .map((item) => {
                if (item === null || item === undefined) return null;
                if (typeof item === "number" || typeof item === "string") return item;
                return item.ownerId ?? item.id ?? null;
            })
            .filter((id) => id !== null && id !== undefined);
    };

    const load = async () => {
        setLoading(true);
        try {
            const raw = await fetchFavorites(companyId);
            const ids = normalizeIds(raw);

            if (ids.length === 0) {
                setStudents([]);
                setAvatars({});
                return;
            }

            const studentResults = await Promise.all(
                ids.map((id) =>
                    fetchStudent(id)
                        .then((s) => ({ id, data: s }))
                        .catch(() => null)
                )
            );
            const list = studentResults
                .filter(Boolean)
                .map((r) => ({ ...r.data, ownerId: r.data?.ownerId ?? r.id }));

            setStudents(list);

            const avatarPairs = await Promise.all(
                list.map((s) =>
                    fetchProfilePhotoUrl(s.ownerId)
                        .then((url) => [s.ownerId, url])
                        .catch(() => [s.ownerId, null])
                )
            );
            const map = {};
            avatarPairs.forEach(([id, url]) => {
                if (url) map[id] = url;
            });
            setAvatars(map);
        } catch (e) {
            console.error("Failed to load saved students:", e);
            setStudents([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
        return () => {
            Object.values(avatars).forEach((url) => {
                if (url) URL.revokeObjectURL(url);
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!notice) return;
        const t = setTimeout(() => setNotice(null), 3500);
        return () => clearTimeout(t);
    }, [notice]);

    const handleRemoveRequest = (student) => setRemoveTarget(student);

    const handleRemoveConfirm = async () => {
        if (!removeTarget) return;
        const studentOwnerId = removeTarget.ownerId;
        setRemoving(true);
        try {
            await togFavorite(companyId, studentOwnerId, true);
            setStudents((prev) => prev.filter((s) => s.ownerId !== studentOwnerId));
            setAvatars((prev) => {
                const url = prev[studentOwnerId];
                if (url) URL.revokeObjectURL(url);
                const next = { ...prev };
                delete next[studentOwnerId];
                return next;
            });
            setNotice({ type: "success", text: "Removed from saved candidates." });
            setRemoveTarget(null);
        } catch (e) {
            console.error(e);
            setNotice({ type: "error", text: "Failed to remove. Try again." });
        } finally {
            setRemoving(false);
        }
    };

    const handleViewProfile = (student) => {
        const id = student.ownerId ?? student.id;
        if (!id) return;
        navigate(`/profile/student/${id}`);
    };

    return (
        <div className="mt-4">
            <div>
                <h2 className="text-2xl font-semibold text-gray-900">Saved Candidates</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Students you bookmarked from the search. Keep an eye on them here.
                </p>
            </div>

            {notice && (
                <div
                    className={`mt-6 rounded-lg px-4 py-3 text-sm ${
                        notice.type === "success"
                            ? "bg-green-50 text-green-700"
                            : notice.type === "error"
                            ? "bg-red-50 text-red-700"
                            : "bg-blue-50 text-blue-700"
                    }`}
                >
                    {notice.text}
                </div>
            )}

            {loading ? (
                <div className="mt-8 text-sm text-gray-500">Loading...</div>
            ) : students.length === 0 ? (
                <div className="mt-8 flex min-h-48 items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 text-sm text-gray-400">
                    No saved candidates yet — bookmark students from the search page.
                </div>
            ) : (
                <div className="mt-8 w-full flex flex-col gap-4">
                    {students.map((s) => (
                        <StudentCard
                            key={s.ownerId}
                            student={s}
                            avatarUrl={avatars[s.ownerId]}
                            onRemove={handleRemoveRequest}
                            onViewProfile={handleViewProfile}
                        />
                    ))}
                </div>
            )}

            <ConfirmRemoveModal
                open={!!removeTarget}
                student={removeTarget}
                onClose={() => !removing && setRemoveTarget(null)}
                onConfirm={handleRemoveConfirm}
                submitting={removing}
            />
        </div>
    );
}
