import Image from "next/image";
import { notFound } from "next/navigation";

const dummyNews = [
  {
    id: 1,
    title: "Trump Pledges to Lift Syria Sanctions After $142bn Saudi Arms Deal",
    description:
      "The US president gets a 'lavender-carpet' reception on a whirlwind visit of Gulf countries mainly focused on shoring up investment adsf wefasd wafasd trewafsdf wefadfwet ewa asd fwefa fewafasdf ewf afdwea wefsdf werfasf sdgfwe gweafasdf wefadfweae ewa gwarfwe asdgfwera awefsdgfwe sdfdgwera awegfsegf wer af a e sdf iw nsg sdfioalsio  fiohfds fi sdhsgi sd foif wsif hwsadi ilsdaos giswh israhf saisd oisdois hoihg son.",
    imageUrl:
      "https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/a09c/live/c1f82ba0-3002-11f0-96c3-cf669419a2b0.jpg",
    slug: "trump-syria-saudi-deal",
    date: "2025-05-14",
    newsType: "international",
  },
  {
    id: 2,
    title: "BBC Cameraman Captures Israeli Strike on Hospital",
    description:
      "Israel says it targeted Hamas militants hiding among civilians at the Khan Younis hospital.",
    imageUrl:
      "https://c8.alamy.com/comp/2BEAFRR/tv-news-studio-with-broadcaster-and-breaking-world-background-vector-illustration-breaking-news-on-tv-broadcasting-journalist-2BEAFRR.jpg",
    slug: "gaza-hospital-strike",
    date: "2025-05-14",
    newsType: "international",
  },
  {
    id: 3,
    title: "Lionel Messi Scores Stunning Goal to Secure Victory",
    description:
      "Messi continues to show brilliance with a last-minute goal in Champions League.",
    imageUrl:
      "https://www.shutterstock.com/image-photo/tv-live-news-program-professional-600nw-2160015507.jpg",
    slug: "messi-goal",
    date: "2025-05-14",
    newsType: "international",
  },
  {
    id: 4,
    title: "Scientists Discover New Exoplanet in Habitable Zone",
    description:
      "Astronomers have identified a new Earth-like planet that may have conditions suitable for life.",
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    slug: "new-exoplanet-discovery",
    date: "2025-05-13",
    newsType: "international",
  },
  {
    id: 5,
    title: "Stock Markets Rally Amid Economic Recovery Hopes",
    description:
      "Markets respond positively to signs of recovery in major global economies after prolonged slowdowns.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjCAfVgATBaPFFWX2WWJF6x-gVW4P1mdvfKA&s",
    slug: "market-rally",
    date: "2025-05-12",
    newsType: "business",
  },
];

interface Props {
  params: {
    slug: string;
  };
}

const NewsDetailsPage = async ({ params }: Props) => {
  // Ensure async handling of params.slug
  const newsSlug = await params?.slug;
  const newsItem = dummyNews.find((item) => item.slug === newsSlug);

  if (!newsItem) {
    notFound(); // If newsItem is not found, show 404 page
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">{newsItem.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{newsItem.date}</p>
      <div className="w-full h-80 relative mb-6 rounded-md overflow-hidden">
        <Image
          src={newsItem.imageUrl}
          alt={newsItem.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <p className="text-lg text-gray-700 leading-8 whitespace-pre-line">
        {newsItem.description}
      </p>
    </div>
  );
};

export default NewsDetailsPage;
