/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Forms from "@/components/Forms/Forms";
import NInput from "@/components/Forms/NInput";
import NSelect from "@/components/Forms/NSelect";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryApi";
import { useCreateOpinionMutation } from "@/redux/features/opinion/opinionApi";
import toast from "react-hot-toast";

const OpinionPage = () => {
  const [createOpinion] = useCreateOpinionMutation();
  const { data: categories, isLoading } = useGetAllCategoryQuery({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePost = async (data: any, reset: () => void) => {
    console.log(data);

    try {
      setIsSubmitting(true);
      const res = await createOpinion(data).unwrap();
      if (res) {
        toast.success("opinion created successfully");
        reset();
      }
    } catch (error) {
      console.error("Post creation failed:", error);
      toast.error("Failed to create Opinion");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <p className="text-center">Loading..</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Create New Opinion</h2>
      <Forms
        onSubmit={handlePost}
        defaultValues={{
          title: "",
          slug: "",
          content: "",
          tags: "",
          categoryId: "",
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
          options={categories?.map((cat: any) => ({
            label: cat.name,
            value: cat.id,
          }))}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-4 px-6 py-2 w-full rounded text-white transition cursor-pointer ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#0896EF] hover:bg-blue-700 "
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </Forms>
    </div>
  );
};

export default OpinionPage;
