/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllMyPostQuery } from "@/redux/features/post/postApi";
import { getUserInfo } from "@/services/auth.services";
import Image from "next/image";
import Link from "next/link";

const MyPosts = () => {
  const user = getUserInfo();
  const { data: myNews, isLoading } = useGetAllMyPostQuery({});
  // console.log(myNews)
  if (isLoading) {
    return <div className="text-center py-10 text-lg">Loading.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Your All News</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myNews?.map((post: any) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition flex flex-col"
          >
            <Image
              src={post.coverImage}
              alt={post.title}
              width={600}
              height={500}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                {post.summary}
              </p>

              <div className="flex flex-wrap gap-2 my-2">
                {post.tags?.map((tag: any) => (
                  <span
                    key={tag.id}
                    className="text-xs bg-blue-100 text-[#0896EF] px-2 py-1 rounded-full"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>

              <div className="flex justify-between text-sm text-gray-500 mt-auto pt-4 border-t">
                <span className="capitalize">{post.status.toLowerCase()}</span>
                <span>👁 {post.viewsCount || 0}</span>
                <span>💬 {post.comments?.length || 0}</span>
                <span>👍 {post.reactions?.length || 0}</span>
              </div>

              {/* 🟡 Update Button */}
              <Link
                href={`/dashboard/${user.role}/my-posts/update-news/${post.id}`}
              >
                <button
                  className="mt-4 w-full bg-[#0896EF] text-white text-sm font-medium py-2 rounded hover:bg-[#accce1] transition cursor-pointer"
                  onClick={() => {
                    console.log("Update Post:", post.id);
                  }}
                >
                  Update
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
