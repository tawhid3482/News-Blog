/* eslint-disable @typescript-eslint/no-explicit-any */
import Slug from "@/components/UI/HomePage/News/Slug";



const getNewsData = async (slug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/post?slug=${slug}`,
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

// ✅ NO Promise in params here — just a plain object
export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const data = await getNewsData(params.slug);
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
      url: `https://tis-news.vercel.app/news/${params.category}/${firstNews.slug}`,
      siteName: "TIS-News",
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

// ✅ Same for the page component
const NewsDetailsPage = async ({
  params,
}: {
  params: { category: string; slug: string };
}) => {
  const data = await getNewsData(params.slug);
  const newsSlug = params.slug;

  const newsItem = data?.find((item:any) => item.slug === newsSlug);
  if (!newsItem) return <p>No news found.</p>;

  return <Slug newsItem={newsItem} />;
};

export default NewsDetailsPage;
