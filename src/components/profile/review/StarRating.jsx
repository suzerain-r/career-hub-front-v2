import React, { useState } from "react";

const StarRating = ({ rating = 0, onRatingChange }) => {
    const [hover, setHover] = useState(0);

    return (
        <div className="flex items-center gap-1">

            {[1, 2, 3, 4, 5].map((star) => {
                const active = star <= (hover || rating);

                return (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onRatingChange?.(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        className="text-2xl transition transform hover:scale-110"
                    >
                        <span
                            className={
                                active
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                            }
                        >
                            ★
                        </span>
                    </button>
                );
            })}

        </div>
    );
};

export default StarRating;