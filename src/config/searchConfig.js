export const searchConfig = {
    students: {
        placeholder: "Search student",
        fields: []
    },

    universities: {
        placeholder: "Search university",
        fields: [
            {
                name: "city",
                type: "select",
                options: ["Almaty", "Astana"]
            }
        ]
    },

    companies: {
        placeholder: "Search company",
        fields: [
            {
                name: "city",
                type: "select",
                options: ["Almaty", "Astana"]
            }
        ]
    }
};

export const searchRules = {
    STUDENT: {
        students: {
            key: "firstName",
        },
        universities: {
            key: "name",
        },
        companies: {
            key: "name",
        },
    },

    UNIVERSITY: {
        students: {
            key: "firstName",
        },
        universities: {
            key: "name",
        },
        companies: {
            key: "name",
        },
    },

    COMPANY: {
        students: {
            key: "searchQuery",
        },
        universities: {
            key: "name",
        },
        companies: {
            key: "name",
        },
    },
};