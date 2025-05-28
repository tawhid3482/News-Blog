/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllMyOpinionQuery } from "@/redux/features/opinion/opinionApi";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getUserInfo } from "@/services/auth.services";

const MyOpinion = () => {
    const user = getUserInfo()
  const { data: opinions, isLoading, isError } = useGetAllMyOpinionQuery({});

  if (isLoading) {
    return <div className="text-center py-10 text-gray-600">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load opinions.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6">My Opinions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {opinions?.map((opinion: any) => (
          <div
            key={opinion.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-100"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-gray-800">
                {opinion.title}
              </h3>
              <Link
                href={`/dashboard/${user.role}/my-opinion/update-opinion/${opinion.id}`}
                className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
              >
                Update
              </Link>
            </div>

            <p className="text-gray-600 text-sm mt-2 line-clamp-3">
              {opinion.content}
            </p>

            <div className="mt-4">
              <span className="text-xs text-gray-500">Category: </span>
              <span className="text-sm font-medium text-gray-700">
                {opinion.category?.name}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {opinion.tags?.map((tag: any) => (
                <span
                  key={tag.id}
                  className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                >
                  {tag.name}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <Image
                width={40}
                height={40}
                src={opinion.author?.profilePhoto || "/default-avatar.png"}
                alt={opinion.author?.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="text-sm text-gray-700">
                <div>{opinion.author?.name}</div>
                <div className="text-xs text-gray-400">
                  {opinion.author?.email}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOpinion;
