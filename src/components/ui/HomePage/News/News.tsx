"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

const truncateWords = (text: string, wordLimit: number) => {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

const NewsSection = () => {
  const mainNews = dummyNews[0];
  const relevantNews = dummyNews.filter(
    (news) => news.newsType === mainNews.newsType && news.id !== mainNews.id
  );

  const excludedIds = [
    mainNews.id,
    ...relevantNews.slice(0, 3).map((news) => news.id),
  ];
  const otherNews = dummyNews.filter((news) => !excludedIds.includes(news.id));

  const [showFullDesc, setShowFullDesc] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Latest News</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Featured News */}
        <div className="lg:w-2/3 w-full lg:h-[520px]">
          <Link href={`/news/${mainNews.id}`}>
            <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ">
              <Image
                src={mainNews.imageUrl}
                alt={mainNews.title}
                width={800}
                height={450}
                className="w-full md:w-2/3 object-cover lg:h-[520px] "
              />
              <div className="p-6 flex flex-col justify-between">
                <h3 className="text-2xl font-bold mb-2">{mainNews.title}</h3>
                <hr className="my-2" />
                <p className="text-gray-700 mb-2">
                  {showFullDesc
                    ? mainNews.description
                    : truncateWords(mainNews.description, 30)}
                </p>
                {mainNews.description.split(" ").length > 30 && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowFullDesc(!showFullDesc);
                    }}
                    className="text-blue-600 text-sm hover:text-blue-800"
                  >
                    {showFullDesc ? "See Less" : "See More"}
                  </button>
                )}
                <p className="text-sm text-gray-400 mt-2">{mainNews.date}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Relevant News */}
        <div className="lg:w-1/3 w-full">
          <h3 className="text-2xl font-bold mb-4 text-center lg:text-left">
            Relevant News
          </h3>
          <div className="flex flex-col gap-4">
            {relevantNews.length > 0 ? (
              relevantNews.slice(0, 3).map((news) => (
                <Link key={news.id} href={`/news/${news.id}`}>
                  <div className="flex flex-col sm:flex-row bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative w-full sm:w-1/3 h-40 sm:h-auto">
                      <Image
                        src={news.imageUrl}
                        alt={news.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="p-4 sm:w-2/3">
                      <h4 className="text-md font-semibold mb-1 line-clamp-2">
                        {news.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-1 line-clamp-2">
                        {truncateWords(news.description, 20)}
                      </p>
                      <p className="text-xs text-gray-400">{news.date}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 text-center">
                No relevant news found.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Other News Cards */}
      {otherNews.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-center">More News</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherNews.slice(0,12).map((news) => (
              <Link key={news.id} href={`/news/${news.id}`}>
                <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative w-full h-48">
                    <Image
                      src={news.imageUrl}
                      alt={news.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-semibold mb-2 line-clamp-2">
                      {news.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                      {truncateWords(news.description, 25)}
                    </p>
                    <p className="text-xs text-gray-400">{news.date}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default NewsSection;
