/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetAllOpinionQuery } from "@/redux/features/opinion/opinionApi";
import Image from "next/image";
import Link from "next/link";

const truncateWords = (text: string, wordLimit: number) => {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

const Editorials = () => {
  const { data: editorials } = useGetAllOpinionQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Editorials & Opinions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {editorials?.map((editorial: any) => (
          <div
            key={editorial.id}
            className="bg-white shadow-lg rounded-lg p-6 space-y-3"
          >
            <h3 className="text-2xl font-semibold mb-2 text-[#0896EF]">
              <Link
                href={`/opinion/${editorial.slug}`}
                className="text-[#0896EF] hover:text-[#365060]"
              >
                {editorial.title}
              </Link>
            </h3>
            <p className="text-[#0896EF]">
              {truncateWords(editorial.content || "", 45)}
              <span className="text-black">
                <Link href={`/opinion/${editorial.slug}`}>read more</Link>
              </span>
            </p>

            <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
              <Image
                width={24}
                height={24}
                src={editorial.author.profilePhoto}
                alt={editorial.author.name}
                className="w-6 h-6 rounded-full"
              />
              <span>
                By {editorial.author.name} | Date:
                {new Date(editorial.createdAt).toLocaleDateString()}
              </span>
            </div>

            <p className="text-gray-700 mb-4">{editorial.excerpt}</p>

            <Link
              href={`/opinion/${editorial.slug}`}
              className="text-[#0896EF] hover:text-blue-800"
            >
              Read Full Article
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Editorials;
