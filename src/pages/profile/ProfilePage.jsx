import React, { useEffect, useMemo, useState, useCallback } from "react";
import { getIdFromToken, getRoleFromToken } from "../../utils/jwtDecode.js";
import SettingsLayout from "../../components/profile/settings/SettingsLayout.jsx";
import ProfileForm from "../../components/profile/settings/ProfileForm.jsx";
import MyStudentsSection from "../../components/profile/settings/MyStudentsSection.jsx";
import ResumeSection from "../../components/profile/settings/ResumeSection.jsx";
import { profileConfigs } from "../../config/profileConfig.js";
import { loadProfile, saveProfile } from "../../services/profileService.js";
import { uploadProfilePhoto, fetchProfilePhotoUrl } from "../../services/apiService.js";
import Header from "../../components/commons/Header.jsx";
import Footer from "../../components/commons/Footer.jsx";


export default function ProfilePage() {
    const userId = getIdFromToken();
    const role = getRoleFromToken(); // STUDENT | UNIVERSITY | COMPANY

    const config = useMemo(() => profileConfigs[role], [role]);

    const [activeTab, setActiveTab] = useState("personal");
    const [isEditing, setIsEditing] = useState(false);

    // Аватарка: локальный файл (только для превью) + blob URL с сервера
    const [photoFile, setPhotoFile] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);

    const [values, setValues] = useState({});
    const [savedValues, setSavedValues] = useState({});

    // Загружаем профиль и аватарку при монтировании
    useEffect(() => {
        (async () => {
            const res = await loadProfile(role, userId);
            setValues(res.data);
            setSavedValues(res.data);
        })().catch((e) => console.error(e));

        (async () => {
            const url = await fetchProfilePhotoUrl(userId);
            if (url) setAvatarUrl(url);
        })().catch((e) => console.error(e));
    }, [role, userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((p) => ({ ...p, [name]: value }));
    };

    const handleEdit = () => setIsEditing(true);

    const handleCancel = () => {
        setValues(savedValues);
        setIsEditing(false);
    };

    const handleSave = async () => {
        const ok = await saveProfile(role, values);
        if (ok) {
            setSavedValues(values);
            setIsEditing(false);
            alert("Saved!");
        } else {
            alert("Error!");
        }
    };

    // Загрузка аватарки — сразу при выборе файла
    const handlePhotoFile = useCallback(async (file) => {
        if (!file) return;
        setPhotoFile(file);

        const success = await uploadProfilePhoto(userId, file);
        if (success) {
            // Получаем свежий blob URL с сервера
            const url = await fetchProfilePhotoUrl(userId);
            if (url) {
                // Освобождаем старый blob URL во избежание утечек памяти
                setAvatarUrl((prev) => {
                    if (prev) URL.revokeObjectURL(prev);
                    return url;
                });
            }
            setPhotoFile(null); // сбрасываем локальный файл — теперь используем серверный url
        } else {
            alert("Failed to upload photo. Please try again.");
        }
    }, [userId]);

    if (!config) return <div className="p-6">Unknown role</div>;

    const renderContent = () => {
        if (activeTab === "students" && role === "UNIVERSITY") {
            return <MyStudentsSection />;
        }

        if (activeTab === "resume" && role === "STUDENT") {
            return <ResumeSection />;
        }

        // personal tab (default)
        return (
            <>
                {/* Edit / Cancel button */}
                <div className="mb-6 flex justify-end">
                    {isEditing ? (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                        >
                            Cancel
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleEdit}
                            className="inline-flex items-center gap-2 rounded-xl border border-blue-600 px-6 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50 active:bg-blue-100"
                        >
                            ✏️ Edit
                        </button>
                    )}
                </div>

                <ProfileForm
                    config={config}
                    values={values}
                    onChange={handleChange}
                    isEditing={isEditing}
                    photoFile={photoFile}
                    setPhotoFile={handlePhotoFile}
                    avatarUrl={avatarUrl}
                    onSave={handleSave}
                />
            </>
        );
    };

    return (
        <>
            <Header />
            <SettingsLayout
                pageTitle={config.pageTitle}
                tabs={config.tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            >
                {renderContent()}
            </SettingsLayout>
            <Footer />
        </>
    );
}