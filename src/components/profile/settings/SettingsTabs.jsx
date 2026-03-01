import React from "react";

export default function SettingsTabs({ tabs, activeTab, onChange }) {
    return (
        <div className="mt-6 border-b border-gray-200">
            <div className="flex flex-wrap items-center gap-6">
                {tabs.map((t) => {
                    const active = activeTab === t.key;
                    return (
                        <button
                            key={t.key}
                            type="button"
                            onClick={() => onChange(t.key)}
                            className={[
                                "relative flex items-center gap-2 pb-3 text-sm font-medium",
                                active ? "text-blue-600" : "text-gray-500 hover:text-gray-800",
                            ].join(" ")}
                        >
                            {t.label}
                            {active && <span className="absolute -bottom-px left-0 h-0.5 w-full bg-blue-600" />}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}