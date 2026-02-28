export const profileConfigs = {
    STUDENT: {
        pageTitle: "Settings",
        tabs: [
            { key: "personal", label: "Personal" },
            { key: "profile", label: "Profile" },
            { key: "social", label: "Social Links" },
            { key: "account", label: "Account Setting" },
        ],
        sections: [
            {
                title: "Basic Information",
                withPhoto: true,
                grid: "md:grid-cols-2",
                fields: [
                    { name: "fullName", label: "Full name", type: "text", readOnly: true },
                    { name: "headline", label: "Tittle/headline", type: "text" },

                    {
                        name: "experience",
                        label: "Experience",
                        type: "select",
                        placeholder: "Select...",
                        options: [
                            { value: "0-1", label: "0–1 year" },
                            { value: "1-3", label: "1–3 years" },
                            { value: "3-5", label: "3–5 years" },
                            { value: "5+", label: "5+ years" },
                        ],
                    },
                    {
                        name: "education",
                        label: "Educations",
                        type: "select",
                        placeholder: "Select...",
                        options: [
                            { value: "BACHELOR", label: "Bachelor" },
                            { value: "MASTER", label: "Master" },
                            { value: "DOCTORATE", label: "Doctorate" },
                        ],
                    },

                    { name: "website", label: "Personal Website", type: "text", icon: "link", span: 2, placeholder: "Website url..." },
                ],
            },

            {
                title: "Additional",
                withPhoto: false,
                grid: "md:grid-cols-2",
                fields: [
                    { name: "email", label: "Email Address", type: "text", readOnly: true },
                    { name: "universityName", label: "University Name", type: "text", readOnly: true },

                    { name: "phoneNumber", label: "Contact Phone", type: "text" },

                    {
                        name: "degree",
                        label: "Degree",
                        type: "select",
                        placeholder: "Select...",
                        options: [
                            { value: "BACHELOR", label: "Bachelor" },
                            { value: "MASTER", label: "Master" },
                            { value: "DOCTORATE", label: "Doctorate" },
                        ],
                    },

                    { name: "gpa", label: "GPA", type: "number" },
                    { name: "yearOfEnrollment", label: "Year of Enrollment", type: "number" },

                    { name: "aboutUs", label: "Information about me", type: "textarea", span: 2 },
                ],
            },
        ],
        showResumes: true,
    },

    UNIVERSITY: {
        pageTitle: "Settings",
        tabs: [
            { key: "personal", label: "Personal" },
            { key: "profile", label: "Profile" },
            { key: "social", label: "Social Links" },
            { key: "account", label: "Account Setting" },
        ],
        sections: [
            {
                title: "Basic Information",
                withPhoto: true,
                grid: "md:grid-cols-2",
                fields: [
                    { name: "name", label: "University name", type: "text" },
                    { name: "headline", label: "Tittle/headline", type: "text" },

                    { name: "website", label: "Website", type: "text", icon: "link", span: 2, placeholder: "Website url..." },

                    { name: "email", label: "Email", type: "text", readOnly: true },
                    { name: "phoneNumber", label: "Phone", type: "text" },

                    { name: "aboutUs", label: "About university", type: "textarea", span: 2 },
                ],
            },
        ],
        showResumes: false,
    },

    COMPANY: {
        pageTitle: "Settings",
        tabs: [
            { key: "personal", label: "Personal" },
            { key: "profile", label: "Profile" },
            { key: "social", label: "Social Links" },
            { key: "account", label: "Account Setting" },
        ],
        sections: [
            {
                title: "Basic Information",
                withPhoto: true,
                grid: "md:grid-cols-2",
                fields: [
                    { name: "name", label: "Company name", type: "text" },
                    { name: "headline", label: "Tittle/headline", type: "text" },

                    {
                        name: "industry",
                        label: "Industry",
                        type: "select",
                        placeholder: "Select...",
                        options: [
                            { value: "it", label: "IT" },
                            { value: "finance", label: "Finance" },
                            { value: "education", label: "Education" },
                            { value: "other", label: "Other" },
                        ],
                    },
                    {
                        name: "companySize",
                        label: "Company size",
                        type: "select",
                        placeholder: "Select...",
                        options: [
                            { value: "1-10", label: "1–10" },
                            { value: "11-50", label: "11–50" },
                            { value: "51-200", label: "51–200" },
                            { value: "200+", label: "200+" },
                        ],
                    },

                    { name: "website", label: "Website", type: "text", icon: "link", span: 2, placeholder: "Website url..." },
                    { name: "aboutUs", label: "About company", type: "textarea", span: 2 },
                ],
            },
        ],
        showResumes: true,
    },
};