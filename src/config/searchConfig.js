export const searchConfig = {
    students: {
        placeholder: "Search",
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