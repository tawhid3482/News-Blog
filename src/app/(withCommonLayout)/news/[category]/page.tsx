/* eslint-disable @typescript-eslint/no-explicit-any */
import NewsSection from "@/components/UI/HomePage/News/News";
import Pagination from "@/components/UI/Pagination/Pagination";

type PageProps = {
  params: { category: string };
  searchParams: { page?: string };
};


const getNewsData = async (category: string, page: number = 1) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/post?category=${category.toUpperCase()}&page=${page}&limit=13`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return null;
    }

    const news = await res.json();
    return {
      data: news?.data || [],
      meta: news?.meta || { total: 0, page: 1, limit: 13 },
    };
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
};

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const { category } =  params;
  const data = await getNewsData(category);

  const firstNews = data?.data[0];

  if (!firstNews) {
    return {
      title: "Latest News - TIS-News",
      description: "Stay updated with the latest news articles.",
    };
  }

  return {
    title: firstNews.title,
    description: firstNews.summary,
    openGraph: {
      title: firstNews.title,
      description: firstNews.summary,
      url: `https://tis-news.vercel.app/news/${category}`,
      siteName: "MySite",
      images: [
        {
          url: firstNews.coverImage,
          width: 1200,
          height: 630,
          alt: firstNews.title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: firstNews.title,
      description: firstNews.summary,
      images: [firstNews.coverImage],
    },
  };
}

const NewsCategoryPage = async ({ params, searchParams }: PageProps) => {
  const { category } = await params;
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1");

  const result = await getNewsData(category, currentPage);

  const filteredNews = result?.data || [];
  const totalItems = result?.meta?.total || 0;
  const limit = result?.meta?.limit || 13;
  const totalPages = Math.ceil(totalItems / limit);

  if (filteredNews.length === 0) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-2xl text-[#0896EF]">
          No news found for this category.
        </p>
      </div>
    );
  }

  const mainNews = filteredNews[0];
  const relevantNews = filteredNews.slice(1, 4);
  const excludedIds = [mainNews.id, ...relevantNews.map((n: any) => n.id)];
  const otherNews = filteredNews.filter(
    (n: any) => !excludedIds.includes(n.id)
  );

  return (
    <div>
      <h2 className="text-3xl font-medium uppercase">{category} News</h2>
      <NewsSection
        mainNews={mainNews}
        relevantNews={relevantNews}
        moreNews={otherNews}
      />
      <div className="flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={`/news/${category}`}
        />
      </div>
    </div>
  );
};

export default NewsCategoryPage;
