/* eslint-disable @typescript-eslint/no-explicit-any */
// components/news/RelevantNewsList.tsx

import Image from "next/image";
import Link from "next/link";

const truncateWords = (text: string, wordLimit: number) => {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

const RelevantNewsList = ({ relevantNews }: { relevantNews: any[] }) => {

  return (
    <div>
      {relevantNews?.length > 0 && (
        <div className=" w-full p-5 lg:p-0">
          <h3 className="text-2xl font-bold mb-4 text-center lg:text-left">
            Relevant News
          </h3>
          <div className="flex flex-col gap-4">
            {relevantNews.slice(0, 3).map((item: any) => (
              <Link
                key={item.slug}
                href={`/news/${item.category.slug}/${item.slug}`}
              >
                <div className="flex flex-col sm:flex-row bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  <div className="relative w-full sm:w-1/3 h-40">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-4 sm:w-2/3">
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

export default RelevantNewsList;
