/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/(withCommonLayout)/search/page.tsx

// ❌ remove generateMetadata completely (query param based dynamic metadata not supported out-of-the-box)
export const dynamic = "force-dynamic"; // because you're using search and query params

import { notFound } from "next/navigation";
import NewsSection from "@/components/UI/HomePage/News/News";

const getNewsData = async (searchTerm: string) => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/post?searchTerm=${searchTerm}&page=1&limit=20`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const news = await res.json();
    return news?.data || [];
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
};

const NewsSearchPage = async ({
  searchParams,
}: {
  searchParams: { searchTerm?: string };
}) => {
  const searchTerm = searchParams?.searchTerm || "";
  if (!searchTerm) return notFound(); // or show blank message

  const filteredNews = await getNewsData(searchTerm);

  if (!filteredNews?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <p className="text-4xl font-bold text-[#0896EF]">
          No news found for this search.
        </p>
      </div>
    );
  }

  const mainNews = filteredNews[0];
  const relevantNews = filteredNews.slice(1, 4);
  const excludedIds = [mainNews.id, ...relevantNews.map((n: any) => n.id)];
  const otherNews = filteredNews.filter((n: any) => !excludedIds.includes(n.id));

  return (
    <div>
      <h2 className="text-3xl font-medium text-left uppercase">
        Search result for: {searchTerm}
      </h2>
      <NewsSection
        mainNews={mainNews}
        relevantNews={relevantNews}
        moreNews={otherNews}
      />
    </div>
  );
};

export default NewsSearchPage;
