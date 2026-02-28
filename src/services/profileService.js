import { fetchStudent, fetchUniversity, updateStudentProfile } from "./apiService.js";

// TODO: добавь свои методы (примерные имена)
import { fetchCompany, updateUniversityProfile, updateCompanyProfile } from "./apiService.js";

export async function loadProfile(role, userId) {
    if (role === "STUDENT") {
        const s = await fetchStudent(userId);
        const u = await fetchUniversity(s.universityId);
        return {
            data: {
                ...s,
                fullName: `${s.firstName || ""} ${s.lastName || ""}`.trim(),
                universityName: u?.name || "",
                headline: s.headline || "",
                experience: s.experience || "",
                education: s.education || s.degree || "",
                website: s.website || "",
            },
            extra: { university: u },
        };
    }

    if (role === "UNIVERSITY") {
        const u = await fetchUniversity(userId); // если у тебя ownerId = userId, иначе поменяй
        return {
            data: {
                ...u,
                name: u.name || "",
                email: u.email || "",
                phoneNumber: u.phoneNumber || "",
                headline: u.headline || "",
                website: u.website || "",
                aboutUs: u.aboutUs || "",
            },
            extra: {},
        };
    }

    if (role === "COMPANY") {
        const c = await fetchCompany(userId);
        return {
            data: {
                ...c,
                name: c.name || "",
                headline: c.headline || "",
                industry: c.industry || "",
                companySize: c.companySize || "",
                website: c.website || "",
                aboutUs: c.aboutUs || "",
            },
            extra: {},
        };
    }

    throw new Error("Unknown role: " + role);
}

export async function saveProfile(role, values) {
    if (role === "STUDENT") return updateStudentProfile(values);
    if (role === "UNIVERSITY") return updateUniversityProfile(values);
    if (role === "COMPANY") return updateCompanyProfile(values);
    throw new Error("Unknown role: " + role);
}