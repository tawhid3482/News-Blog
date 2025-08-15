/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Forms from "@/components/Forms/Forms";
import ImgInput from "@/components/Forms/ImgInput";
import NInput from "@/components/Forms/NInput";
import NSelect from "@/components/Forms/NSelect";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryApi";
import { useCreatePostMutation } from "@/redux/features/post/postApi";
import toast from "react-hot-toast";
import { useState } from "react";

const CreatePost = () => {
  const [createPost] = useCreatePostMutation();
  const { data: categories, isLoading } = useGetAllCategoryQuery({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePost = async (data: any, reset: () => void) => {
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
      const res = await createPost(formData).unwrap();
      if (res) {
        toast.success("News Created successfully");
        reset(); 
      }
    } catch (error) {
      console.error("Post creation failed:", error);
      toast.error("Failed to create news");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <p className="text-center">Loading..</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
      <Forms
        onSubmit={handlePost}
        defaultValues={{
          title: "",
          slug: "",
          summary: "",
          content: "",
          tags: "",
          categoryId: "",
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
          options={categories?.map((cat: any) => ({
            label: cat.name,
            value: cat.id,
          }))}
        />
        <ImgInput name="image" label="Post Image" required />
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

export default CreatePost;
