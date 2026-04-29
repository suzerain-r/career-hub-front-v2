import React, { useCallback, useEffect } from "react";
import StarRating from "./StarRating.jsx";
import { fetchReviews, fetchSenders } from "../../../services/apiService.js";

const ReviewSection = ({
    reviews,
    setReviews,
    role,
    review,
    setReview,
    onReviewSubmit,
    userId,
    selfRole,
}) => {

    // =========================
    // PERMISSION LOGIC
    // =========================
    const canWriteReview = useCallback(() => {
        if (!selfRole || !role) return false;

        if (selfRole === "COMPANY") {
            return role === "STUDENT" || role === "UNIVERSITY";
        }

        if (selfRole === "STUDENT" || selfRole === "UNIVERSITY") {
            return role === "COMPANY";
        }

        return false;
    }, [selfRole, role, userId]);

    // =========================
    // LOAD REVIEWS
    // =========================
    const loadReviews = useCallback(async () => {
        const data = await fetchReviews(userId);

        const list = data?.content || [];

        const enriched = await fetchSenders(list);

        setReviews(enriched);
    }, [userId, setReviews]);

    useEffect(() => {
        loadReviews();
    }, [loadReviews]);

    // =========================
    // SEND REVIEW (optimistic UI)
    // =========================
    const handleSend = async () => {
        if (!review.reviewText || !review.rating) return;

        await onReviewSubmit();

        const temp = {
            ...review,
            id: Date.now(),
            senderName: "You",
            senderRole: selfRole,
        };

        setReviews((prev) => [temp, ...prev]);

        setReview({
            reviewText: "",
            rating: 0,
        });

        loadReviews();
    };

    return (
        <div className="mt-10 mx-auto w-full max-w-6xl px-6 mb-10">

            {/* TITLE */}
            <h2 className="text-2xl font-medium text-gray-900 mb-6">
                Reviews
            </h2>

            {/* CARD */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">



                {/* LIST */}
                <div className="space-y-4 max-h-80 overflow-y-auto mb-6 pr-2">
                    {reviews?.length === 0 && (
                        <p className="text-sm text-gray-500">
                            No reviews yet
                        </p>
                    )}

                    {reviews?.map((r) => (
                        <div
                            key={r.id}
                            className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                        >
                            <div className="flex justify-between items-center mb-1">
                                <p className="text-sm font-medium text-gray-900">
                                    {r.senderName || "Unknown"}
                                </p>

                                <p className="text-xs text-gray-500">
                                    ⭐ {r.rating}/5
                                </p>
                            </div>

                            <p className="text-sm text-gray-600">
                                {r.reviewText}
                            </p>
                        </div>
                    ))}
                </div>

                {/* FORM */}
                {canWriteReview() && (
                    <div className="space-y-4 border-t border-gray-200 pt-5">

                        <input
                            type="text"
                            name="reviewText"
                            placeholder="Write your review..."
                            value={review.reviewText}
                            onChange={(e) =>
                                setReview((p) => ({
                                    ...p,
                                    reviewText: e.target.value,
                                }))
                            }
                            className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
                        />

                        <div className="flex items-center justify-between">
                            <StarRating
                                rating={review.rating}
                                onRatingChange={(value) =>
                                    setReview((p) => ({
                                        ...p,
                                        rating: value,
                                    }))
                                }
                            />

                            <button
                                onClick={handleSend}
                                className="
                                    bg-[#0A65CC]
                                    text-white
                                    px-8 py-2
                                    rounded-md
                                    text-sm font-medium
                                    hover:bg-blue-600
                                    active:bg-blue-700
                                    transition
                                "
                            >
                                Send
                            </button>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default ReviewSection;