/* eslint-disable @typescript-eslint/no-explicit-any */
// CategoryModal.tsx
import { useCreateCategoryMutation } from "@/redux/features/category/categoryApi";
import toast from "react-hot-toast";
import Forms from "@/components/Forms/Forms";
import NSelect from "@/components/Forms/NSelect";

const ALL_CATEGORIES = [
  "WORLD",
  "NATIONAL",
  "POLITICS",
  "SPORTS",
  "SCIENCE",
  "EDUCATION",
  "WAR",
  "ECONOMY",
  "TECHNOLOGY",
  "HEALTH",
  "ENTERTAINMENT",
  "INVESTIGATION",
  "OTHER"
];

const CategoryModal = ({
  onClose,
  existingCategories,
}: {
  onClose: () => void;
  existingCategories: string[];
}) => {
  const [createCategory] = useCreateCategoryMutation();

  const availableOptions = ALL_CATEGORIES.filter(
    (cat) => !existingCategories.includes(cat)
  );

  const handleCategory = async (data: any) => {
    const { name } = data;
    const slug = name.toLowerCase();
    try {
      const res = await createCategory({ name, slug }).unwrap();
      if (res?.id) {
        onClose();
        toast.success("Category created successfully");
      } else {
        toast.error("Category not created");
      }
    } catch (err: any) {
      console.log(err);
      toast.error("Failed to create category");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Create Category</h2>
        <Forms onSubmit={handleCategory}>
          <NSelect
            name="name"
            label="Category Name"
            options={availableOptions?.map((opt) => ({
              label: opt,
              value: opt,
            }))}
            required
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-[#0896EF] text-white cursor-pointer"
            >
              Create
            </button>
          </div>
        </Forms>
      </div>
    </div>
  );
};

export default CategoryModal;
