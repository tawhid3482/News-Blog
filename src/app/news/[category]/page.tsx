/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLink,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

interface Params {
  params: {
    category: string;
  };
}

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
    newsType: "world",
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
    newsType: "world",
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
    newsType: "world",
  },
  {
    id: 4,
    title: "Scientists Discover New Exoplanet in Habitable Zone",
    description:
      "Astronomers have identified a new Earth-like planet that may have conditions suitable for life.",
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    slug: "new-exoplanet-discovery",
    date: "2025-05-13",
    newsType: "world",
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
    newsType: "world",
  },
];

const truncateWords = (text: string, wordLimit: number) => {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

const reactionEmojis = ["👍", "❤️", "😂", "😮", "😢", "😡"] as const;
type ReactionType = (typeof reactionEmojis)[number];

const NewsCategoryPage = ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = use(params);
  const filteredNews = dummyNews.filter(
    (news) => news.newsType.toLowerCase() === category.toLowerCase()
  );

  if (!filteredNews.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <p className="text-4xl font-bold text-[#0896EF]">
          No news found for this category.
        </p>
      </div>
    );
  }

  const mainNews = filteredNews[0];
  const relevantNews = filteredNews.slice(1, 4); // পরবর্তী ৩টি

  // ✅ Corrected: Filter same category, exclude main/relevant
  const excludedIds = [mainNews.id, ...relevantNews.map((news) => news.id)];

  const otherNews = filteredNews.filter(
    (news) => !excludedIds.includes(news.id)
  );

  const [reactions, setReactions] = useState<Record<ReactionType, number>>({
    "👍": 0,
    "❤️": 0,
    "😂": 0,
    "😮": 0,
    "😢": 0,
    "😡": 0,
  });
  const [showPicker, setShowPicker] = useState(false);
  const [, setHovering] = useState(false);

  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  let hoverTimeout: NodeJS.Timeout;

  const handleReaction = (type: ReactionType) => {
    setReactions((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout);
    setHovering(true);
    setShowPicker(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      setHovering(false);
      setShowPicker(false);
    }, 200);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        {category.charAt(0).toUpperCase() + category.slice(1)} News
      </h2>

      {/* Featured News */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main News */}
        <div className="lg:w-2/3 w-full h-full relative">
          <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative w-full h-72 md:h-[520px] md:w-2/3">
              <Link href={`/news/${mainNews.newsType}/${mainNews.slug}`}>
                <Image
                  src={mainNews.imageUrl}
                  alt={mainNews.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover rounded-l-lg"
                />
              </Link>
            </div>

            <div className="p-6 flex flex-col justify-between relative md:w-1/3">
              <h3 className="text-2xl font-bold mb-2">{mainNews.title}</h3>
              <hr className="my-2" />
              <p className="text-gray-700 mb-2">
                {truncateWords(mainNews.description, 30)}
              </p>
              <Link href={`/news/${mainNews.newsType}/${mainNews.slug}`}>
                <button className="text-[#0896EF] text-sm hover:text-blue-800">
                  See more
                </button>
              </Link>

              <p className="text-sm text-gray-400 mt-2">{mainNews.date}</p>

              {/* Reactions */}
              <div className="mt-4 relative">
                <div
                  className="inline-block relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="text-sm text-gray-600 hover:text-blue-500">
                    👍 Like (
                    {Object.values(reactions).reduce((a, b) => a + b, 0)})
                  </button>

                  {showPicker && (
                    <div
                      className="absolute z-10 flex gap-2 p-2 mt-2 bg-white shadow-lg rounded-lg border"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {reactionEmojis.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={(e) => {
                            e.preventDefault();
                            handleReaction(emoji);
                            setShowPicker(false);
                          }}
                          className="text-xl hover:scale-125 transition-transform"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-2 flex gap-2 flex-wrap text-sm text-gray-700">
                  {reactionEmojis.map(
                    (emoji) =>
                      reactions[emoji] > 0 && (
                        <span key={emoji}>
                          {emoji} {reactions[emoji]}
                        </span>
                      )
                  )}
                </div>
              </div>

              {/* Comments */}
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Comments</h4>

                <button
                  onClick={() => setShowComments(!showComments)}
                  className="text-[#0896EF] hover:underline mb-2 text-sm"
                >
                  {showComments
                    ? "Hide Comments"
                    : `View Comments (${comments.length})`}
                </button>

                {showComments && (
                  <>
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full border p-2 rounded mb-2"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (newComment.trim()) {
                          setComments([...comments, newComment.trim()]);
                          setNewComment("");
                        }
                      }}
                      className="bg-[#0896EF] text-white px-4 py-1 rounded hover:bg-[#2f576f]"
                    >
                      Post
                    </button>
                    <ul className="mt-4 space-y-4 max-h-64 overflow-y-auto">
                      {comments.map((c, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                          <div className="bg-gray-100 p-3 rounded-lg w-full">
                            <p className="text-sm text-gray-800">{c}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Just now
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              {/* Share */}
              <div className="mt-4">
                <p className="text-md text-gray-500">Share this news:</p>
                <div className="flex gap-3 mt-2 flex-wrap">
                  {/* Copy Link */}
                  <button
                    className="text-[#0896EF] hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      navigator.clipboard.writeText(window.location.href);
                    }}
                    aria-label="Copy Link"
                  >
                    <FaLink className="text-xl" />
                  </button>

                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                    aria-label="Share on Facebook"
                  >
                    <FaFacebook className="text-xl" />
                  </a>

                  {/* Instagram (Note: Instagram does not support direct URL sharing via a link) */}
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:underline"
                    aria-label="Visit Instagram"
                  >
                    <FaInstagram className="text-xl" />
                  </a>

                  {/* Twitter */}
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                    aria-label="Share on Twitter"
                  >
                    <FaTwitter className="text-xl" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                      window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                    aria-label="Share on LinkedIn"
                  >
                    <FaLinkedin className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Relevant News */}
        <div className="lg:w-1/3 w-full">
          <h3 className="text-2xl font-bold mb-4 text-center lg:text-left">
            Relevant News
          </h3>
          <div className="flex flex-col gap-4">
            {relevantNews.length > 0 ? (
              relevantNews.map((news) => (
                <Link
                  key={news.slug}
                  href={`/news/${news?.newsType}/${news.slug}`}
                >
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

      {/* Other News */}
      {otherNews.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-center">More News</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherNews.map((news) => (
              <Link
                key={news.slug}
                href={`/news/${news?.newsType}/${news.slug}`}
              >
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

export default NewsCategoryPage;
