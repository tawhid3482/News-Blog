/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useCreateReviewMutation } from "@/redux/features/review/reviewApi";
import toast from "react-hot-toast";
import Forms from "@/components/Forms/Forms";
import NSelect from "@/components/Forms/NSelect";
import NInput from "@/components/Forms/NInput";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ratingOptions = ["1", "2", "3", "4", "5"];

const ReviewPage = () => {
  const [createReview] = useCreateReviewMutation();
  const router = useRouter();
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleReview = async (data: any) => {
    try {
      const payload = {
        ...data,
        rating: Number(data.rating),
        isAnonymous,
      };

      const res = await createReview(payload).unwrap();

      if (res?.id) {
        router.refresh();
        router.push("/dashboard/user");
        toast.success("Review submitted successfully!");
      } else {
        toast.error(res.message || "Failed to submit review");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to submit review");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto mt-10 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
        Submit Your Review
      </h2>

      <Forms onSubmit={handleReview}>
        <NInput
          name="content"
          label="Your Review"
          type="textarea"
          placeholder="Write your review here..."
          required
        />

        <NSelect
          name="rating"
          label="Rating"
          options={ratingOptions?.map((r) => ({
            label: `${r} Star`,
            value: r,
          }))}
          required
        />

        <div className="flex items-center gap-2 mt-3">
          <input
            id="anonymous"
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="h-4 w-4 text-primary border-gray-300 rounded"
          />
          <label htmlFor="anonymous" className="text-gray-600 text-sm">
            Submit anonymously
          </label>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-[#0896EF] hover:bg-blue-700 text-white rounded-md transition duration-200 cursor-pointer"
          >
            Submit Review
          </button>
        </div>
      </Forms>
    </div>
  );
};

export default ReviewPage;
