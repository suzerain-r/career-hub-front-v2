import {
    fetchStudent,
    fetchUniversity,
    fetchCompany,
    updateStudentProfile,
    updateUniversityProfile,
    updateCompanyProfile,
} from "./apiService.js";

const loaders = {
    STUDENT: async (userId) => {
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
    },

    UNIVERSITY: async (userId) => {
        const u = await fetchUniversity(userId);

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
    },

    COMPANY: async (userId) => {
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
    },
};

const savers = {
    STUDENT: updateStudentProfile,
    UNIVERSITY: updateUniversityProfile,
    COMPANY: updateCompanyProfile,
};

export const loadProfile = async (role, userId) => {
    const loader = loaders[role];

    if (!loader) {
        throw new Error("Unknown role: " + role);
    }

    return await loader(userId);
};

export const saveProfile = async (role, values) => {
    const saver = savers[role];

    if (!saver) {
        throw new Error("Unknown role: " + role);
    }

    return await saver(values);
};