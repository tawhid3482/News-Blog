/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { format } from "date-fns";
import { useState } from "react";
import {
  useGetAllPostForSuperUserQuery,
  useManageNewsMutation,
} from "@/redux/features/post/postApi";

const PostTable = () => {
  const { data, isLoading } = useGetAllPostForSuperUserQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [manageNews] = useManageNewsMutation();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleTogglePublish = async (post: any) => {
    const updatedIsPublished = !post.isPublished;
    const updatedStatus = updatedIsPublished ? "PUBLISHED" : "DRAFT";
    setUpdatingId(post.id);
    try {
      await manageNews({
        postId: post.id,
        data: {
          isPublished: updatedIsPublished,
          status: updatedStatus,
          publishedAt: updatedIsPublished ? new Date().toISOString() : null,
        },
      }).unwrap();
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleStatusChange = async (postId: string, status: string) => {
    setUpdatingId(postId);
    try {
      await manageNews({
        postId,
        data: { status },
      }).unwrap();
    } catch (err) {
      console.error("Status change failed", err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading) {
    return <div className="text-center py-10 text-[#0896EF]">Loading...</div>;
  }

  return (
    <div className="p-4 w-lg md:w-2xl lg:w-4xl 2xl:w-7xl">
      <h2 className="text-2xl font-bold text-[#0896EF] mb-6">Manage Posts</h2>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#0896EF] mb-6">
          Total Posts {data?.length}
        </h2>
        <h2 className="text-xl font-bold text-[#0896EF] mb-6">
          Total Unpublish{" "}
          {data?.filter((post: any) => !post.isPublished)?.length}
        </h2>
      </div>
      <div className=" overflow-x-auto lg:overflow-x-visible rounded-md border border-gray-300">
        <table className="min-w-full divide-y divide-gray-300 bg-white text-sm sm:text-base">
          <thead className="bg-[#0896EF] text-white">
            <tr>
              <th className="p-2 text-left">Image</th>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Author</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-center">Views</th>
              <th className="p-2 text-center">Published</th>
              <th className="p-2 text-center">Status</th>
              <th className="p-2 text-center">Change Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((post: any) => (
              <tr
                key={post.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-2 w-32">
                  <div className="relative h-20 w-32">
                    {post.coverImage && (
                      <Image
                        src={post.coverImage}
                        alt="Post image"
                        fill
                        className="object-cover rounded"
                      />
                    )}
                  </div>
                </td>
                <td className="p-2 font-medium">{post.title}</td>
                <td className="p-2">{post.author?.name}</td>
                <td className="p-2">{post.category?.name}</td>
                <td className="p-2">
                  {format(new Date(post.createdAt), "PP")}
                </td>
                <td className="p-2 text-center">{post.viewsCount}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleTogglePublish(post)}
                    disabled={updatingId === post.id}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition cursor-pointer ${
                      post.isPublished ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <span className="sr-only">Toggle Publish</span>
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        post.isPublished ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </td>
                <td className="p-2 text-center capitalize">
                  {post.status.toLowerCase()}
                </td>
                <td className="p-2 text-center">
                  <select
                    className="border rounded px-2 py-1"
                    value={post.status}
                    onChange={(e) =>
                      handleStatusChange(post.id, e.target.value)
                    }
                    disabled={updatingId === post.id}
                  >
                    <option value="DRAFT">DRAFT</option>
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="BLOCKED">BLOCKED</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostTable;
