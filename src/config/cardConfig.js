export const cardConfig = {
    students: {
        icon: "candidate_icon",
        title: ["firstName", "lastName"],
        fields: [
            { key: "degree", label: "Degree" },
            { key: "gpa", label: "GPA" }
        ]
    },

    universities: {
        icon: "university_icon",
        title: ["name"],
        fields: [
            { key: "location", label: "Location" }
        ]
    },

    companies: {
        icon: "company_icon",
        title: ["name"],
        fields: [
            { key: "industry", label: "Industry" },
            { key: "location", label: "Location" }
        ]
    }
};