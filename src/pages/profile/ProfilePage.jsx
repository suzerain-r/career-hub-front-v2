import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getIdFromToken, getRoleFromToken } from "../../utils/jwtDecode.js";
import SettingsLayout from "../../components/profile/settings/SettingsLayout.jsx";
import ProfileForm from "../../components/profile/settings/ProfileForm.jsx";
import MyStudentsSection from "../../components/profile/settings/MyStudentsSection.jsx";
import ResumeSection from "../../components/profile/settings/ResumeSection.jsx";
import SavedStudentsSection from "../../components/profile/settings/SavedStudentsSection.jsx";
import ReviewSection from "../../components/profile/review/ReviewSection.jsx";
import { profileConfigs } from "../../config/profileConfig.js";
import { loadProfile, saveProfile } from "../../services/profileService.js";
import { uploadProfilePhoto, fetchProfilePhotoUrl, fetchReviews, addReview } from "../../services/apiService.js";
import { logout } from "../../services/authService.js";
import Header from "../../components/commons/Header.jsx";
import Footer from "../../components/commons/Footer.jsx";

// student|university|company (URL) -> STUDENT|UNIVERSITY|COMPANY (internal)
const ROLE_URL_TO_ENUM = {
    student: "STUDENT",
    university: "UNIVERSITY",
    company: "COMPANY",
};

export default function ProfilePage() {
    const navigate = useNavigate();
    const { viewRole: viewRoleParam, viewId: viewIdParam } = useParams();

    const viewRole = viewRoleParam ? ROLE_URL_TO_ENUM[viewRoleParam.toLowerCase()] : null;
    const viewId = viewIdParam ? Number(viewIdParam) || viewIdParam : null;

    const selfId = getIdFromToken();
    const selfRole = getRoleFromToken();

    // Режим "чужой профиль" — только когда оба параметра есть и id != selfId
    const isViewOnly = Boolean(viewRole && viewId && String(viewId) !== String(selfId));

    const role = isViewOnly ? viewRole : selfRole;
    const userId = isViewOnly ? viewId : selfId;

    const baseConfig = useMemo(() => profileConfigs[role], [role]);

    const config = useMemo(() => {
        if (!baseConfig) return null;
        if (!isViewOnly) return baseConfig;
        return {
            ...baseConfig,
            tabs: baseConfig.tabs.filter((t) => t.key === "personal"),
        };
    }, [baseConfig, isViewOnly]);

    const [activeTab, setActiveTab] = useState("personal");
    const [isEditing, setIsEditing] = useState(false);

    const [photoFile, setPhotoFile] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);

    const [values, setValues] = useState({});
    const [savedValues, setSavedValues] = useState({});

    const [reviews, setReviews] = useState([]);
    const [review, setReview] = useState({
        reviewText: "",
        rating: 0,
    });

    useEffect(() => {
        // при смене просмотра — возвращаем на personal и гасим редактирование
        setActiveTab("personal");
        setIsEditing(false);
        setAvatarUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return null;
        });

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

    useEffect(() => {
        if (!userId) return;

        fetchReviews(userId)
            .then((data) => setReviews(data?.content || []))
            .catch(console.error);
    }, [userId]);

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

    const handleLogout = () => {
        logout();
        navigate("/auth?mode=sign-in");
    };

    // Загрузка аватарки — сразу при выборе файла
    const handlePhotoFile = useCallback(async (file) => {
        if (!file) return;
        setPhotoFile(file);

        const success = await uploadProfilePhoto(userId, file);
        if (success) {
            const url = await fetchProfilePhotoUrl(userId);
            if (url) {
                setAvatarUrl((prev) => {
                    if (prev) URL.revokeObjectURL(prev);
                    return url;
                });
            }
            setPhotoFile(null);
        } else {
            alert("Failed to upload photo. Please try again.");
        }
    }, [userId]);

    if (!config) return <div className="p-6">Unknown role</div>;

    const renderContent = () => {
        if (!isViewOnly && activeTab === "students" && role === "UNIVERSITY") {
            return <MyStudentsSection />;
        }

        if (!isViewOnly && activeTab === "resume" && role === "STUDENT") {
            return <ResumeSection />;
        }

        if (!isViewOnly && activeTab === "favorites" && role === "COMPANY") {
            return <SavedStudentsSection />;
        }

        // personal tab (default)
        return (
            <>
                {/* Edit / Cancel button — только для своего профиля */}
                {!isViewOnly && (
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
                )}

                <ProfileForm
                    config={config}
                    values={values}
                    onChange={handleChange}
                    isEditing={isEditing && !isViewOnly}
                    photoFile={photoFile}
                    setPhotoFile={handlePhotoFile}
                    avatarUrl={avatarUrl}
                    onSave={handleSave}
                    readOnly={isViewOnly}
                />
            </>
        );
    };

    return (
        <>
            <Header />
            <div className="min-h-screen flex flex-col">
                <SettingsLayout
                    pageTitle={isViewOnly ? "Profile" : config.pageTitle}
                    tabs={config.tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onLogout={isViewOnly ? null : handleLogout}
                >
                    {renderContent()}
                </SettingsLayout>
                {activeTab === "personal" && (
                    <ReviewSection
                        reviews={reviews}
                        setReviews={setReviews}
                        role={role}
                        review={review}
                        setReview={setReview}
                        onReviewSubmit={async () => {
                            await addReview({
                                ...review,
                                recipientId: userId,
                                senderId: selfId,
                                recipientRole: role,
                            });
                        }}
                        userId={userId}
                        selfRole={selfRole}
                    />
                )}
            </div>

            <Footer />
        </>
    );
}
