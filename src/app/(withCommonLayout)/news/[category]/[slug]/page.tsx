/* eslint-disable @typescript-eslint/no-explicit-any */

import Slug from "@/components/ui/HomePage/News/Slug";

interface Props {
  params: { slug: string };
}

const getNewsData = async (slug: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post?slug=${slug}`, {
      cache: "no-store",
    });
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
  params: { slug: string };
}) {
  const data = await getNewsData(params.slug);
  const firstNews = data

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
      url: `http://localhost:3000/news/${params.slug}/${firstNews.slug}`,
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

const NewsDetailsPage = async ({ params }: Props) => {
  const data = await getNewsData(params.slug);
  const { slug } = await params;
  const newsSlug = slug;

  const newsItem = data?.find((item: any) => item.slug === newsSlug);

  if (!newsItem) return <p>No news found.</p>;

  return (
    <>
      <Slug newsItem={newsItem} />
    </>
  );
};

export default NewsDetailsPage;
