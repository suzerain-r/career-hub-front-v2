import React from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import SettingsTabs from "./SettingsTabs.jsx";

export default function SettingsLayout({ pageTitle, tabs, activeTab, setActiveTab, onLogout, children }) {
    // Logout показываем только на первом табе (personal)
    const firstTabKey = tabs?.[0]?.key;
    const showLogout = onLogout && activeTab === firstTabKey;

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6">
                <h1 className="text-3xl font-semibold text-gray-900 py-10">{pageTitle}</h1>
                <SettingsTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
            </div>

            <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
                {children}

                {showLogout && (
                    <div className="mt-10 flex justify-end">
                        <button
                            type="button"
                            onClick={onLogout}
                            className="inline-flex items-center gap-2 rounded-xl border border-red-500 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 active:bg-red-100"
                        >
                            <ArrowRightOnRectangleIcon className="w-5 h-5" />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}