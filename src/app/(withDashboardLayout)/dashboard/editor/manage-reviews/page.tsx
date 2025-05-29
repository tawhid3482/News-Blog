/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  useGetAllReviewQuery,
  useUpdateReviewStatusMutation,
} from "@/redux/features/review/reviewApi";
import Image from "next/image";
import React from "react";

const ManageReviews = () => {
  const { data: reviews, isLoading } = useGetAllReviewQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [updateReviewStatus] = useUpdateReviewStatusMutation();

  const handleToggle = async (
    id: string,
    field: "isApproved" | "isDeleted",
    currentValue: boolean
  ) => {
    try {
      await updateReviewStatus({
        id,
        data: { [field]: !currentValue },
      }).unwrap();
    } catch (error) {
      console.error("Failed to update review:", error);
    }
  };

  if (isLoading) return <p className="text-center text-lg">loading</p>;

  return (
    <div className="p-6 w-lg md:w-full">
      <h2 className="text-2xl font-semibold mb-4">
        Total Reviews: {reviews?.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-md shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Reviewer</th>
              <th className="p-3 text-left">Rating</th>
              <th className="p-3 text-left">Review Content</th>
              <th className="p-3 text-left">Approved</th>
              <th className="p-3 text-left">Deleted</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {reviews?.map((review: any) => (
              <tr
                key={review.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3 flex items-center gap-2">
                  <Image
                    width={40}
                    height={40}
                    src={review.reviewer?.profilePhoto}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{review.reviewer?.name}</p>
                    <p className="text-sm text-gray-500">
                      {review.reviewer?.email}
                    </p>
                  </div>
                </td>
                <td className="p-3">{review.rating} ⭐</td>
                <td className="p-3">{review.content}</td>
                <td className="p-3">
                  <button
                    onClick={() =>
                      handleToggle(review.id, "isApproved", review.isApproved)
                    }
                    className={`px-3 py-1 rounded text-white ${
                      review.isApproved ? "bg-[#0896EF]" : "bg-gray-600"
                    }`}
                  >
                    {review.isApproved ? "Approved" : "Unapproved"}
                  </button>
                </td>
                <td className="p-3">
                  <button
                    onClick={() =>
                      handleToggle(review.id, "isDeleted", review.isDeleted)
                    }
                    className={`px-3 py-1 rounded text-white ${
                      review.isDeleted ? "bg-red-500" : "bg-gray-600"
                    }`}
                  >
                    {review.isDeleted ? "Deleted" : "Not"}
                  </button>
                </td>
                <td className="p-3 text-sm text-gray-700">
                  {new Date(review.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageReviews;
