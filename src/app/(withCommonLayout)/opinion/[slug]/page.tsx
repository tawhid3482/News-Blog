import OpinionSlug from "@/components/UI/HomePage/News/OpinionSlug";

interface Props {
  params: { slug: string };
}

const getOpinionData = async (slug: string) => {
  console.log("Fetching news data for slug:", slug);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/opinion/${slug}`, {
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
  const data = await getOpinionData(params.slug);
  const firstNews = data;

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
      url: `http://localhost:3000/opinion/${params.slug}`,
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

const OpinionSlugPage = async ({ params }: Props) => {
  const data = await getOpinionData(params.slug);
    const newsItem = data;
    console.log("News item for slug:", params.slug, newsItem);

  return (
    <>
      <OpinionSlug opinion={newsItem} />
    </>
  );
};

export default OpinionSlugPage;
