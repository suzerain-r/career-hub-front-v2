import { useNavigate } from "react-router-dom";

// "students" | "universities" | "companies" -> role mapping
const LIST_TYPE_TO_ROLE = {
    students: "student",
    universities: "university",
    companies: "company",
};

const CardList = ({
    list,
    icon,
    title,
    fields,
    avatars = {},
    listType,
}) => {
    const navigate = useNavigate();

    const role = LIST_TYPE_TO_ROLE[listType];

    const getTitle = (item) =>
        title
            .map((field) => item?.[field])
            .filter(Boolean)
            .join(" ");

    const getPhotoId = (item) => item?.ownerId ?? item?.id;

    const handleViewProfile = (item) => {
        const id = item?.ownerId ?? item?.id;
        if (!role || !id) return;
        navigate(`/${role}/${id}`);
    };

    return (
        <div className="w-full lg:w-3/4 flex flex-col gap-4">
            {list.map((item) => {
                const photoId = getPhotoId(item);
                const avatarUrl = avatars?.[photoId];

                return (
                    <div
                        key={photoId}
                        className="flex gap-3 p-3 sm:p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-500 transition"
                    >
                        {/* Avatar */}
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt="avatar"
                                className="w-18 h-18 sm:w-20 sm:h-20 rounded-full object-cover"
                            />
                        ) : (
                            <img
                                src={icon}
                                alt=""
                                className="w-18 h-18 sm:w-20 sm:h-20 object-contain"
                            />
                        )}

                        {/* Content */}
                        <div className="flex justify-between w-full gap-3 items-center">
                            <div className="flex flex-col">
                                <h3 className="font-medium text-base sm:text-lg">
                                    {getTitle(item)}
                                </h3>

                                {fields.map((field) => (
                                    <p
                                        key={field.key}
                                        className="text-gray-500 text-sm"
                                    >
                                        {field.label}: {item?.[field.key]}
                                    </p>
                                ))}
                            </div>

                            {/* Action */}
                            <button
                                onClick={() => handleViewProfile(item)}
                                className="
                                    bg-blue-50 text-blue-500
                                    px-4 py-2 rounded-md
                                    hover:bg-blue-500 hover:text-white
                                    transition
                                "
                            >
                                View →
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CardList;