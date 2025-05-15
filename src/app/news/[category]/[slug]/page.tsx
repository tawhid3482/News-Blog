"use client";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useState } from "react";

// Dummy news data
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

const reactions = [
  { type: "like", emoji: "👍" },
  { type: "love", emoji: "❤️" },
  { type: "angry", emoji: "😡" },
  { type: "sad", emoji: "😢" },
  { type: "wow", emoji: "😮" },
  { type: "haha", emoji: "😂" },
];

interface Props {
  params: { slug: string };
}

const NewsDetailsPage = ({ params }: Props) => {
  const newsSlug = params.slug;
  const newsItem = dummyNews.find((item) => item.slug === newsSlug);

  const [userReaction, setUserReaction] = useState<string | null>(null);

  const [showAllReactions, setShowAllReactions] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");

  if (!newsItem) return notFound();

  const handleReaction = (type: string) => {
    setUserReaction(type);
    setShowAllReactions(false);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment.trim()]);
      setNewComment("");
    }
  };

  const relevantNews = dummyNews.filter(
    (item) => item.newsType === newsItem.newsType && item.slug !== newsItem.slug
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">{newsItem.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{newsItem.date}</p>
      <div className="w-full h-80 md:h-[450px] lg:h-[580px] relative mb-6 rounded-md overflow-hidden">
        <Image
          src={newsItem.imageUrl}
          alt={newsItem.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <p className="text-lg text-gray-700 leading-8 whitespace-pre-line mb-6">
        {newsItem.description}
      </p>

      {/* Reaction + Comment UI */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className="relative"
          onMouseEnter={() => setShowAllReactions(true)}
          onMouseLeave={() => setShowAllReactions(false)}
        >
          <button className="px-4 py-2 bg-gray-200 rounded-full text-sm font-medium hover:bg-gray-300 transition">
            {userReaction
              ? reactions.find((r) => r.type === userReaction)?.emoji
              : "👍 Like"}
          </button>

          {showAllReactions && (
            <div className="absolute -top-12 left-0 bg-white border px-3 py-2 rounded-full shadow flex gap-2 z-10">
              {reactions.map((r) => (
                <button
                  key={r.type}
                  onClick={() => handleReaction(r.type)}
                  className="text-xl hover:scale-125 transition-transform"
                >
                  {r.emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => setShowComments(!showComments)}
          className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition"
        >
          💬 Comment
        </button>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="mb-10 space-y-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none"
            placeholder="Write a comment..."
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Post Comment
          </button>

          <div className="mt-6 space-y-2">
            {comments.map((cmt, idx) => (
              <div key={idx} className="bg-gray-100 p-3 rounded-md">
                {cmt}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Relevant News Section */}
      {relevantNews.length > 0 ? (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Related News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relevantNews.map((news) => (
              <div
                key={news.id}
                className="border rounded-md overflow-hidden shadow hover:shadow-lg transition"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={news.imageUrl}
                    alt={news.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold">{news.title}</h3>
                  <p className="text-sm text-gray-500">{news.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className=""></div>
      )}
    </div>
  );
};

export default NewsDetailsPage;
