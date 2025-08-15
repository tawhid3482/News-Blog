/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Forms from "@/components/Forms/Forms";
import NInput from "@/components/Forms/NInput";
import NSelect from "@/components/Forms/NSelect";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryApi";
import {
  useGetSingleAllMyOpinionQuery,
  useUpdateOpinionMutation,
} from "@/redux/features/opinion/opinionApi";
import React, { use, useState } from "react";
import toast from "react-hot-toast";

const UpdateOpinion = ({ params }: { params: Promise<{ id: string }> }) => {
 const { id } = use(params);

  // Fetch opinion and categories
  const { data: opinion, isLoading: isOpinionLoading } =
    useGetSingleAllMyOpinionQuery(id);

  const { data: categories, isLoading: isCategoryLoading } =
    useGetAllCategoryQuery({});

  const [updateOpinion] = useUpdateOpinionMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isOpinionLoading || isCategoryLoading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading post and categories...
      </div>
    );
  }

  const handlePost = async (data: any) => {
    const postData = {
      title: data.title,
      slug: data.slug,
      content: data.content,
      categoryId: data.categoryId,
      tags: data.tags.split(",")?.map((tag: string) => ({ name: tag.trim() })),
    };
    console.log(postData)

    try {
      setIsSubmitting(true);
      const res = await updateOpinion({ data: postData, opinionId: id }).unwrap();

      if (res) {
        toast.success("Opinion updated successfully!");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update opinion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Update Opinion</h2>
      <Forms
        onSubmit={handlePost}
        defaultValues={{
          title: opinion?.title || "",
          slug: opinion?.slug || "",
          summary: opinion?.summary || "",
          content: opinion?.content || "",
          tags: opinion?.tags?.map((tag: any) => tag.name).join(", ") || "",
          categoryId: opinion?.categoryId || "",
        }}
      >
        <NInput name="title" label="Title" required />
        <NInput name="slug" label="Slug" required />
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
        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-4 px-6 py-2 w-full rounded text-white transition cursor-pointer ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#0896EF] hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Updating..." : "Update Opinion"}
        </button>
      </Forms>
    </div>
  );
};

export default UpdateOpinion;
