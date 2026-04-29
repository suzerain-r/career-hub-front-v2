import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { BookmarkIcon as BookmarkOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid";

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
    toggleFavorite,
    isFavorite,
    userRole
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
                        className="flex justify-between gap-4 sm:gap-3 p-4 sm:p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-500 transition"
                    >


                        {/* Content */}
                        <div className="flex gap-3 items-center">
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



                        </div>
                        <div className="flex items-center gap-3">
                            {userRole === "COMPANY" && listType === "students" && (
                                <button
                                    onClick={() => toggleFavorite(item.ownerId)}
                                >
                                    {isFavorite(item.ownerId) ? (
                                        <BookmarkSolid className="w-6 h-6 text-[#0A65CC]" />
                                    ) : (
                                        <BookmarkOutline className="w-6 h-6 text-gray-400 hover:text-blue-500 transition" />
                                    )}
                                </button>
                            )}

                            {/* Action */}
                            <button
                                onClick={() => handleViewProfile(item)}
                                className="bg-blue-50 text-blue-500
                                px-4 sm:px-6 py-2 rounded-md
                               hover:bg-blue-500 hover:text-white
                                transition
                                flex items-center"
                            >
                                <span className="hidden sm:inline">View →</span>
                                <span className="sm:hidden">→</span>
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CardList;