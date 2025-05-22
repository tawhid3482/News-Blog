/* eslint-disable @typescript-eslint/no-explicit-any */
import NewsSection from "@/components/UI/HomePage/News/News";

interface Params {
  params: {
    category: string;
  };
}

const getNewsData = async (category: string) => {
  try {
    const res = await fetch(
      `${
        process.env.BACKEND_URL
      }/post?category=${category.toUpperCase()}&page=1&limit=20`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      return null;
    }
    const news = await res.json();
    const data = news?.data || [];
    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
};

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}) {
  // এখানে async await safe, error আর হবে না
  const data = await getNewsData(params.category);

  const firstNews = data?.[0];

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
      url: `https://example.com/news/${params.category}`,
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

const NewsCategoryPage = async ({ params }: Params) => {
  const { category } = params;
  const filteredNews = await getNewsData(category);

  if (!filteredNews || filteredNews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <p className="text-4xl font-bold text-[#0896EF]">
          No news found for this category.
        </p>
      </div>
    );
  }

  const mainNews = filteredNews[0];

  const relevantNews = filteredNews.slice(1, 4);
  const excludedIds = [
    mainNews.id,
    ...relevantNews?.map((newsItem: any) => newsItem.id),
  ];
  const otherNews = filteredNews?.filter(
    (newsItem: any) => !excludedIds.includes(newsItem.id)
  );

  return (
    <div>
      <h2 className="text-3xl font-medium text-left uppercase">
        {category} News
      </h2>
      <NewsSection
        mainNews={mainNews}
        relevantNews={relevantNews}
        moreNews={otherNews}
      ></NewsSection>
    </div>
  );
};

export default NewsCategoryPage;
