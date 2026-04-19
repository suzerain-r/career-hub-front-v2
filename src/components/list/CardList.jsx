
import { assets } from "../../assets/assets.js";


const CardList = ({ list, icon, title, fields }) => {

    const getTitle = (item, titleFields) => {
        return titleFields
            .map((field) => item[field])
            .filter(Boolean)
            .join(" ");
    };

    return (
        <div className="w-full lg:w-3/4 flex flex-col gap-4">
            {list.map((user) => (
                <div
                    key={user.id}
                    className="flex flex-row gap-3 p-3 sm:p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-500 transition"
                >
                    <img
                        src={icon}
                        alt=""
                        className="w-18 h-18 sm:w-20 sm:h-20 object-contain"
                    />

                    <div className="flex justify-between items-center sm:items-center w-full gap-3">

                        <div className="flex flex-col">
                            <h3 className="font-medium text-base sm:text-lg">
                                {getTitle(user, title)}
                            </h3>
                            {fields.map((field) => (
                                <p className="text-gray-500 text-sm" key={field.key}>
                                    {field.label}: {user[field.key]}
                                </p>
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            {/* <button
                                onClick={() => toggleFavorite(user.ownerId)}
                                className="hover:opacity-80"
                            >
                                <img
                                    src={
                                        isFavorite(student.ownerId)
                                            ? assets.favourite_active
                                            : assets.favourite_not_active
                                    }

                                    alt=""
                                    className="w-6 h-6 sm:w-7 sm:h-7"
                                />
                            </button> */}

                            <button className="lg:hidden bg-blue-50 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition">
                                →
                            </button>

                            <button className="hidden lg:inline-block bg-blue-50 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition">
                                View Profile →
                            </button>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardList;