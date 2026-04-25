export const searchConfig = {
    students: {
        placeholder: "Search student",
        fields: []
    },

    universities: {
        placeholder: "Search university",
        fields: [
            {
                name: "location",
                type: "select",
                options: ["Almaty", "Astana"]
            }
        ]
    },

    companies: {
        placeholder: "Search company",
        fields: [
            {
                name: "location",
                type: "select",
                options: ["Almaty", "Astana"]
            }
        ]
    }
};

// export const searchRules = {
//     STUDENT: {
//         students: {
//             key: "name",

//         },
//         universities: {
//             key: "name",
//         },
//         companies: {
//             key: "name",
//         },
//     },

//     UNIVERSITY: {
//         students: {
//             key: "name",

//         },
//         universities: {
//             key: "name",
//         },
//         companies: {
//             key: "name",
//         },
//     },

//     COMPANY: {
//         students: {
//             key: "searchQuery",
//         },
//         universities: {
//             key: "name",
//         },
//         companies: {
//             key: "name",
//         },
//     },
// };