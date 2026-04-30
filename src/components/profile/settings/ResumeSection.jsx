import React, { useEffect, useRef, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { indexResume, fetchResume, updateResume } from "../../../services/apiService.js";
import { getIdFromToken } from "../../../utils/jwtDecode.js";

function TagInput({ label, placeholder, values, onChange }) {
    const [input, setInput] = useState("");
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editingValue, setEditingValue] = useState("");
    const editingRef = useRef(null);

    useEffect(() => {
        if (editingIndex !== -1 && editingRef.current) {
            editingRef.current.focus();
            editingRef.current.select();
        }
    }, [editingIndex]);

    const addTag = () => {
        const v = input.trim();
        if (!v) return;
        if (values.includes(v)) {
            setInput("");
            return;
        }
        onChange([...values, v]);
        setInput("");
    };

    const removeTag = (index) => {
        onChange(values.filter((_, i) => i !== index));
    };

    const startEdit = (index) => {
        setEditingIndex(index);
        setEditingValue(values[index]);
    };

    const cancelEdit = () => {
        setEditingIndex(-1);
        setEditingValue("");
    };

    const commitEdit = () => {
        if (editingIndex === -1) return;
        const v = editingValue.trim();
        if (!v) {
            // пустая правка = удаляем
            removeTag(editingIndex);
            cancelEdit();
            return;
        }
        const duplicate = values.some((t, i) => i !== editingIndex && t === v);
        if (duplicate) {
            cancelEdit();
            return;
        }
        const next = [...values];
        next[editingIndex] = v;
        onChange(next);
        cancelEdit();
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag();
        } else if (e.key === "Backspace" && !input && values.length > 0) {
            onChange(values.slice(0, -1));
        }
    };

    const handleEditKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            commitEdit();
        } else if (e.key === "Escape") {
            e.preventDefault();
            cancelEdit();
        }
    };

    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>

            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                {values.map((tag, i) => (
                    editingIndex === i ? (
                        <span
                            key={`edit-${i}`}
                            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm font-medium text-blue-700 ring-2 ring-blue-300"
                        >
                            <input
                                ref={editingRef}
                                type="text"
                                value={editingValue}
                                onChange={(e) => setEditingValue(e.target.value)}
                                onKeyDown={handleEditKeyDown}
                                onBlur={commitEdit}
                                style={{ width: `${Math.max(editingValue.length, 4)}ch` }}
                                className="max-w-full bg-transparent outline-none"
                            />
                        </span>
                    ) : (
                        <span
                            key={`tag-${i}-${tag}`}
                            className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                        >
                            <button
                                type="button"
                                onClick={() => startEdit(i)}
                                className="max-w-105 truncate text-left hover:underline"
                                title="Click to edit"
                            >
                                {tag}
                            </button>
                            <button
                                type="button"
                                onClick={() => startEdit(i)}
                                className="text-blue-500 hover:text-blue-800"
                                aria-label={`Edit ${tag}`}
                                title="Edit"
                            >
                                <PencilSquareIcon className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => removeTag(i)}
                                className="text-blue-500 hover:text-blue-800"
                                aria-label={`Remove ${tag}`}
                            >
                                ×
                            </button>
                        </span>
                    )
                ))}

                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={addTag}
                    placeholder={values.length === 0 ? placeholder : ""}
                    className="min-w-35 flex-1 bg-transparent py-1 text-sm outline-none"
                />
            </div>

            <p className="mt-1.5 text-xs text-gray-500">
                Press Enter or comma to add. Click on a tag to edit. Backspace removes the last one.
            </p>
        </div>
    );
}

export default function ResumeSection() {
    const studentId = getIdFromToken();

    const [skills, setSkills] = useState([]);
    const [experience, setExperience] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const loadResume = async () => {
            if (!studentId) return;

            const data = await fetchResume(studentId);
            if (!data) return;

            setSkills(data.skills || []);
            setExperience(data.experience || []);
        };

        loadResume();
    }, [studentId]);

    const handleSave = async () => {
        if (skills.length === 0 && experience.length === 0) {
            setStatus({ type: "error", text: "Add at least one skill or experience." });
            return;
        }

        setSubmitting(true);
        setStatus(null);

        try {
            await updateResume(studentId, {
                skills,
                experience,
            });

            await indexResume({ studentId, skills, experience });

            setStatus({ type: "success", text: "Resume saved successfully." });
        } catch (e) {
            setStatus({ type: "error", text: "Failed to save resume. Try again." });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mt-4">
            <div>
                <h2 className="text-2xl font-medium text-gray-900">My Resume</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Your skills and experience are indexed for smart search. Companies find you
                    based on these keywords.
                </p>
            </div>

            <div className="mt-8 flex flex-col gap-6">
                <TagInput
                    label="Skills"
                    placeholder="e.g. Java, Spring Boot, React, PostgreSQL..."
                    values={skills}
                    onChange={setSkills}
                />

                <TagInput
                    label="Experience"
                    placeholder="e.g. Backend intern at X (2024), Open-source contributor..."
                    values={experience}
                    onChange={setExperience}
                />

                {status && (
                    <div
                        className={`rounded-lg px-4 py-3 text-sm ${status.type === "success"
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                            }`}
                    >
                        {status.text}
                    </div>
                )}

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={submitting}
                        className="rounded-xl bg-[#0A65CC] px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {submitting ? "Saving..." : "Save resume"}
                    </button>
                </div>
            </div>
        </div>
    );
}
