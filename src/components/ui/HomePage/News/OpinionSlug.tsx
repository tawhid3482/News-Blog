/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const OpinionSlug = ({ opinion }: { opinion: any }) => {
  const { title, author, category, tags, content, createdAt } = opinion || {};

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-[#0896EF] leading-tight">
        {title}
      </h1>

      {/* Content */}
      <article className="prose prose-sm sm:prose lg:prose-lg max-w-none text-justify text-lg">
        {content?.split("\n").map((para: string, idx: number) => (
          <p key={idx}>{para}</p>
        ))}
      </article>

      {/* Author Info, Dates, Category, Tags */}
      <div className="pt-6 border-t border-gray-200 space-y-4">
        {/* Author Info and Dates */}
        <div className="flex items-center justify-between text-gray-600 text-sm">
          <div className="flex items-center gap-3">
            <Image
              width={40}
              height={40}
              src={author?.profilePhoto}
              alt={author?.name}
              className="h-10 w-10 rounded-full object-cover border"
            />
            <div>
              <p className="font-medium text-gray-800">{author?.name}</p>
              <p>{author?.email}</p>
            </div>
          </div>
          <div className="text-right">
            <p>
              Published:{" "}
              <span className="text-gray-800">{formatDate(createdAt)}</span>
            </p>
          </div>
        </div>

        {/* Category */}
        <div>
          <span className="inline-block bg-[#0896EF] text-white px-3 py-1 rounded-full text-xs font-medium">
            {category?.name}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag: any) => (
            <span
              key={tag.id}
              className="bg-blue-100 text-[#0896EF] px-2 py-1 rounded-full text-xs font-semibold"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpinionSlug;
