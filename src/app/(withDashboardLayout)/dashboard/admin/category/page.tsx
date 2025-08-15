/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryApi";
import CategoryModal from "./components/categoryModal";

const CategoryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { data: categories = [], isLoading } = useGetAllCategoryQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const filteredCategories = categories.filter((cat: any) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0896EF] hover:bg-blue-700 text-white px-4 py-2 rounded shadow cursor-pointer"
        >
          + Create Category
        </button>
        <input
          type="text"
          placeholder="Search category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded w-64"
        />
      </div>

      {isLoading ? (
        <p>Loading categories...</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filteredCategories?.map((category: any) => (
            <div
              key={category.id}
              className="border border-gray-300 p-4 rounded shadow-sm bg-white flex flex-col justify-between"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-lg">{category.name}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Posts: {category.posts?.length || 0}
              </p>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <CategoryModal
          onClose={() => setIsModalOpen(false)}
          existingCategories={categories?.map((cat: any) => cat.name)}
        />
      )}
    </div>
  );
};

export default CategoryPage;
