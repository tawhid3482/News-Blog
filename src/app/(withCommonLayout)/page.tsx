import Editorials from "@/components/UI/HomePage/Editorials/Editorials";
import Hero from "@/components/UI/HomePage/HeroSection/HeroSection";
import Newsletter from "@/components/UI/HomePage/Newsletter/Newsletter";
import VideoNews from "@/components/UI/HomePage/VideoNews/VideoNews";
import NewFilter from "@/components/UI/HomePage/News/NewFilter";

const getNewsData = async () => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/post?page=1&limit=20`,
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

export async function generateMetadata() {
  const data = await getNewsData();
  const firstNews = data?.[0];

  if (!firstNews) {
    return {
      title: "Latest News - MySite",
      description: "Stay updated with the latest news articles.",
    };
  }

  return {
    title: firstNews.title,
    description: firstNews.summary,
    openGraph: {
      title: firstNews.title,
      description: firstNews.summary,
      url: `https://example.com/news/${firstNews.slug}`,
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

// ✅ main page function
export default async function HomePage() {
  const data = await getNewsData(); // server side fetch
  return (
    <>
      <Hero />
      <NewFilter data={data} />
      <VideoNews />
      <Newsletter />
      <Editorials />
    </>
  );
}
