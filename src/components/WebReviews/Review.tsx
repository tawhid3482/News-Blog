/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useShowAllReviewQuery } from "@/redux/features/review/reviewApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const Review = () => {
  const { data: reviews, isLoading } = useShowAllReviewQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  if (isLoading)
    return (
      <div className="text-center py-10 text-gray-500">Loading reviews...</div>
    );
  if (!reviews || reviews.length === 0)
    return (
      <div className="text-center py-10 text-gray-500">
        No reviews available.
      </div>
    );

  return (
    <div className="w-full max-w-7xl  mx-auto p-10">
      <h2 className="text-2xl font-bold text-center text-[#0896EF] mb-6">
        What Our Readers Say
      </h2>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        spaceBetween={30}
        slidesPerView={2}
      >
        {reviews.map((review: any) => (
          <SwiperSlide key={review.id}>
            <div className="bg-white shadow-lg rounded-2xl p-5 border border-[#0896EF] w-[560px] h-56 ">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  width={40}
                  height={40}
                  src={review.reviewer?.profilePhoto}
                  alt={review.reviewer?.name}
                  className="w-20 h-20 rounded-full border border-[#0896EF]"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {review.reviewer?.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {review.reviewer?.email}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{review.content}"</p>
              <div className="mt-4 text-yellow-500">
                {"⭐".repeat(review.rating)}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Review;
