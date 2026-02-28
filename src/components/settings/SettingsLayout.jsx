import React from "react";
import SettingsTabs from "./SettingsTabs.jsx";

export default function SettingsLayout({ pageTitle, tabs, activeTab, setActiveTab, children }) {
    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6">
                <h1 className="text-3xl font-semibold text-gray-900 py-10" >{pageTitle}</h1>
                <SettingsTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
            </div>

            <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">{children}</div>
        </div>
    );
}