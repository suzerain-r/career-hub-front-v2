import React, { useState } from "react";
import { indexResume } from "../../../services/apiService.js";
import { getIdFromToken } from "../../../utils/jwtDecode.js";

function TagInput({ label, placeholder, values, onChange }) {
    const [input, setInput] = useState("");

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

    const removeTag = (tag) => {
        onChange(values.filter((t) => t !== tag));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag();
        } else if (e.key === "Backspace" && !input && values.length > 0) {
            onChange(values.slice(0, -1));
        }
    };

    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>

            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                {values.map((tag) => (
                    <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-blue-500 hover:text-blue-800"
                            aria-label={`Remove ${tag}`}
                        >
                            ×
                        </button>
                    </span>
                ))}

                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={addTag}
                    placeholder={values.length === 0 ? placeholder : ""}
                    className="min-w-[140px] flex-1 bg-transparent py-1 text-sm outline-none"
                />
            </div>

            <p className="mt-1.5 text-xs text-gray-500">
                Press Enter or comma to add. Backspace removes the last one.
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

    const handleSave = async () => {
        if (skills.length === 0 && experience.length === 0) {
            setStatus({ type: "error", text: "Add at least one skill or experience." });
            return;
        }

        setSubmitting(true);
        setStatus(null);

        const ok = await indexResume({ studentId, skills, experience });

        setSubmitting(false);
        if (ok) {
            setStatus({ type: "success", text: "Resume saved to search index." });
        } else {
            setStatus({ type: "error", text: "Failed to save resume. Try again." });
        }
    };

    return (
        <div className="mt-4">
            <div>
                <h2 className="text-2xl font-semibold text-gray-900">My Resume</h2>
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
                        className={`rounded-lg px-4 py-3 text-sm ${
                            status.type === "success"
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
