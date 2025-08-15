/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Forms from "@/components/Forms/Forms";
import ImgInput from "@/components/Forms/ImgInput";
import NInput from "@/components/Forms/NInput";
import NSelect from "@/components/Forms/NSelect";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryApi";
import {
  useGetSinglePostQuery,
  useUpdateNewsMutation,
} from "@/redux/features/post/postApi";
import React, { use, useState } from "react";
import toast from "react-hot-toast";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  // Fetch single news post
  const { data: news, isLoading: isNewsLoading } = useGetSinglePostQuery({
    postId: id,
  });

  // Fetch all categories
  const { data: categories, isLoading: isCategoryLoading } =
    useGetAllCategoryQuery({});

  const [updateNews] = useUpdateNewsMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If data is loading
  if (isNewsLoading || isCategoryLoading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading post and categories...
      </div>
    );
  }

  // Handle post update
  const handlePost = async (data: any) => {
    const formData = new FormData();
    const file = data.image?.[0];

    const postData = {
      title: data.title,
      slug: data.slug,
      summary: data.summary,
      content: data.content,
      categoryId: data.categoryId,
      tags: data.tags.split(",")?.map((tag: string) => ({ name: tag.trim() })),
    };

    formData.append("data", JSON.stringify(postData));
    if (file) formData.append("file", file);

    try {
      setIsSubmitting(true);
      const res = await updateNews({ data: formData, postId: id }).unwrap();

      if (res) {
        toast.success("News updated successfully");
      }
    } catch (error) {
      console.error("News update failed:", error);
      toast.error("Failed to update news");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Update News</h2>
        <Forms
          onSubmit={handlePost}
          defaultValues={{
            title: news?.title || "",
            slug: news?.slug || "",
            summary: news?.summary || "",
            content: news?.content || "",
            tags: news?.tags?.map((tag: any) => tag.name).join(", ") || "",
            categoryId: news?.categoryId || "",
            file: "",
          }}
        >
          <NInput name="title" label="Title" required />
          <NInput name="slug" label="Slug" required />
          <NInput name="summary" label="Summary" required />
          <NInput name="content" label="Content" type="textarea" required />
          <NInput name="tags" label="Tags (comma-separated)" required />

          <NSelect
            name="categoryId"
            label="Category"
            required
            options={
              categories?.map((cat: any) => ({
                label: cat.name,
                value: cat.id,
              })) || []
            }
          />

          <ImgInput name="image" label="Post Image (optional)" />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-4 px-6 py-2 w-full rounded text-white transition cursor-pointer ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0896EF] hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Update News"}
          </button>
        </Forms>
      </div>
    </div>
  );
};

export default Page;
