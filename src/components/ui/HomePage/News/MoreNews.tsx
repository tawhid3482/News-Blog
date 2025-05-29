/* eslint-disable @typescript-eslint/no-explicit-any */
// components/news/MoreNewsGrid.tsx

import Link from "next/link";
import Image from "next/image";

const truncateWords = (text: string, wordLimit: number) => {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

const MoreNewsGrid = ({ moreNews }: { moreNews: any[] }) => {
  return (
    <div className="mt-8 p-5">
      {/* More News */}
      {moreNews?.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-center">More News</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {moreNews?.map((item: any) => (
              <Link
                key={item.slug}
                href={`/news/${item.category.slug}/${item.slug}`}
              >
                <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-[340px]">
                  <div className="relative w-full h-48">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-md font-semibold mb-1 line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-1 line-clamp-2">
                      {truncateWords(item.summary, 20)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoreNewsGrid;
