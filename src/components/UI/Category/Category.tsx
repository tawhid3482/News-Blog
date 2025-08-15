/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
  categories: any[];
}

const Category = ({ categories }: Props) => {
  if (!categories?.length) return <p>No categories found.</p>;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {categories?.map((category) => (
        <div
          key={category.id}
          className="border border-gray-300 p-4 rounded flex justify-between items-center"
        >
          <span className="font-medium">{category.name}</span>
          <div className="space-x-2">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">
              Update
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
