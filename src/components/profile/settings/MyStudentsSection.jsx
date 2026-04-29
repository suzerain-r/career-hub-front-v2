import React, { useEffect, useState } from "react";
import { fetchStudentsOfUniversity, deleteStudent } from "../../../services/apiService.js";
import { register } from "../../../services/authService.js";

function AddStudentModal({ open, onClose, onSuccess }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!open) {
            setUsername("");
            setEmail("");
            setPassword("");
            setError("");
            setSubmitting(false);
        }
    }, [open]);

    if (!open) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        const res = await register("student", username, email, password);
        setSubmitting(false);
        if (res.success) {
            onSuccess();
            onClose();
        } else {
            setError(res.message || "Failed to create student");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/40"
                onClick={submitting ? undefined : onClose}
            />

            <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <h3 className="text-xl font-medium text-gray-900">Add student</h3>
                <p className="mt-1 text-sm text-gray-500">
                    The credentials will be sent to the student's email.
                </p>

                <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoFocus
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {error && (
                        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <div className="mt-2 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={submitting}
                            className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="rounded-xl bg-[#0A65CC] px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {submitting ? "Creating..." : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function ConfirmDeleteModal({ open, student, onClose, onConfirm, submitting }) {
    if (!open || !student) return null;

    const fullName = [student.firstName, student.lastName].filter(Boolean).join(" ") || student.email || "this student";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/40"
                onClick={submitting ? undefined : onClose}
            />

            <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <h3 className="text-xl font-medium text-gray-900">Delete student?</h3>
                <p className="mt-2 text-sm text-gray-600">
                    You are about to permanently delete <span className="font-medium text-gray-900">{fullName}</span>. This action cannot be undone.
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
                        {submitting ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}

function StudentRow({ student, onEdit, onDelete }) {
    const fullName = [student.firstName, student.lastName].filter(Boolean).join(" ") || "—";

    return (
        <tr className="border-b border-gray-100 hover:bg-gray-50">
            <td className="px-4 py-4">
                <div className="font-medium text-gray-900">{fullName}</div>
            </td>
            <td className="px-4 py-4 text-sm text-gray-600">{student.email || "—"}</td>
            <td className="px-4 py-4 text-sm text-gray-600">
                {student.degree ? (
                    <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                        {student.degree}
                    </span>
                ) : (
                    "—"
                )}
            </td>
            <td className="px-4 py-4 text-sm text-gray-600">{student.gpa ?? "—"}</td>
            <td className="px-4 py-4 text-sm text-gray-600">{student.currentYear ?? "—"}</td>
            <td className="px-4 py-4">
                <div className="flex items-center justify-end gap-2">
                    {/*<button*/}
                    {/*    type="button"*/}
                    {/*    onClick={() => onEdit(student)}*/}
                    {/*    className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100"*/}
                    {/*>*/}
                    {/*    Edit*/}
                    {/*</button>*/}
                    <button
                        type="button"
                        onClick={() => onDelete(student)}
                        className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default function MyStudentsSection() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addOpen, setAddOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [notice, setNotice] = useState(null);

    const load = async () => {
        setLoading(true);
        try {
            const data = await fetchStudentsOfUniversity();
            const list = Array.isArray(data) ? data : data?.content || [];
            setStudents(list);
        } catch (e) {
            console.error("Failed to load students:", e);
            setStudents([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
        if (!notice) return;
        const t = setTimeout(() => setNotice(null), 3500);
        return () => clearTimeout(t);
    }, [notice]);

    const handleEdit = () => {
        setNotice({
            type: "info",
            text: "Only the student can edit their own profile. As a university, you can add or delete students.",
        });
    };

    const handleDeleteRequest = (student) => {
        setDeleteTarget(student);
    };

    const handleDeleteConfirm = async () => {
        if (!deleteTarget) return;
        const userId = deleteTarget.ownerId || deleteTarget.id;
        setDeleting(true);
        const ok = await deleteStudent(userId);
        setDeleting(false);
        if (ok) {
            setDeleteTarget(null);
            setNotice({ type: "success", text: "Student deleted." });
            load();
        } else {
            setNotice({ type: "error", text: "Failed to delete student." });
        }
    };

    return (
        <div className="mt-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-2xl font-medium text-gray-900">My Students</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Students registered under your university.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => setAddOpen(true)}
                    className="rounded-xl bg-[#0A65CC] px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                    + Add student
                </button>
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
                    No students yet — add your first one.
                </div>
            ) : (
                <div className="mt-8 overflow-x-auto rounded-2xl ring-1 ring-gray-100">
                    <table className="min-w-full divide-y divide-gray-100 bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Name
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Email
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Degree
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    GPA
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Year
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((s) => (
                                <StudentRow
                                    key={s.id || s.ownerId}
                                    student={s}
                                    onEdit={handleEdit}
                                    onDelete={handleDeleteRequest}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <AddStudentModal
                open={addOpen}
                onClose={() => setAddOpen(false)}
                onSuccess={load}
            />

            <ConfirmDeleteModal
                open={!!deleteTarget}
                student={deleteTarget}
                onClose={() => !deleting && setDeleteTarget(null)}
                onConfirm={handleDeleteConfirm}
                submitting={deleting}
            />
        </div>
    );
}
