import React, { useEffect, useMemo, useState } from "react";
import { getIdFromToken, getRoleFromToken } from "../../utils/jwtDecode.js";
import SettingsLayout from "../../components/profile/settings/SettingsLayout.jsx";
import ProfileForm from "../../components/profile/settings/ProfileForm.jsx";
import ResumeSection from "../../components/profile/settings/ResumeSection.jsx";
import { profileConfigs } from "../../config/profileConfig.js";
import { loadProfile, saveProfile } from "../../services/profileService.js";
import Header from "../../components/commons/Header.jsx";

export default function ProfilePage() {
    const userId = getIdFromToken();
    const role = getRoleFromToken(); // STUDENT | UNIVERSITY | COMPANY

    const config = useMemo(() => profileConfigs[role], [role]);

    const [activeTab, setActiveTab] = useState("personal");
    const [isEditing] = useState(true); // как на макете
    const [photoFile, setPhotoFile] = useState(null);

    const [values, setValues] = useState({});

    useEffect(() => {
        (async () => {
            const res = await loadProfile(role, userId);
            setValues(res.data);
        })().catch((e) => console.error(e));
    }, [role, userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((p) => ({ ...p, [name]: value }));
    };

    const handleSave = async () => {
        const ok = await saveProfile(role, values);
        if (ok) alert("Saved!");
        else alert("Error!");
    };

    if (!config) return <div className="p-6">Unknown role</div>;

    return (
        <SettingsLayout
            pageTitle={config.pageTitle}
            tabs={config.tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
        >
            <Header/>
            <ProfileForm
                config={config}
                values={values}
                onChange={handleChange}
                isEditing={isEditing}
                photoFile={photoFile}
                setPhotoFile={setPhotoFile}
                onSave={handleSave}
            />

            {config.showResumes && <ResumeSection />}
        </SettingsLayout>
    );
}