/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLink,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { useGetAllPostQuery } from "@/redux/features/post/postApi";
import LoadingSkeleton from "./Loading";
import { useCreateReactionMutation } from "@/redux/features/reaction/reactionApi";
import toast from "react-hot-toast";
import { useAppSelector } from "@/redux/features/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

const truncateWords = (text: string, wordLimit: number) => {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

const reactionEmojiMap: Record<string, string> = {
  LIKE: "👍",
  LOVE: "❤️",
  FUNNY: "😂",
  WOW: "😮",
  SAD: "😢",
  ANGRY: "😡",
};

// এই ফাংশন দিয়ে রিঅ্যাকশন গুলো গুণবে
const countReactions = (reactions: { type: string }[]) => {
  return reactions.reduce((acc: Record<string, number>, { type }) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
};

const NewsSection = () => {
  const user = useAppSelector(selectCurrentUser);
  console.log(user?.userId);
  const { data, isLoading } = useGetAllPostQuery("");
  const [createReaction, { isLoading: reactionLoading }] =
    useCreateReactionMutation();
  const news = data?.data || [];
  const mainNews = news[0];
  const relevantNews = news.filter(
    (item: any) =>
      item.categoryId === mainNews?.categoryId && item.id !== mainNews.id
  );
  const excludedIds = [
    mainNews?.id,
    ...relevantNews.slice(0, 3).map((n: any) => n.id),
  ];
  const otherNews = news.filter((item: any) => !excludedIds.includes(item.id));

  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  // userReaction state রাখছি নতুন reaction এর জন্য
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [showReactionPicker, setShowReactionPicker] = useState(false);

  if (isLoading) {
    return <LoadingSkeleton></LoadingSkeleton>;
  }

  const mainReactions = countReactions(mainNews?.reactions || []);
  const mainComments = mainNews?.comments || [];

  if (!mainNews) return <p>No news found.</p>;
  const totalReactions = Object.values(mainReactions).reduce(
    (acc, count) => acc + count,
    0
  );

  const userReactionFromData =
    mainNews.reactions?.find((r: any) => r.userId === user?.userId)?.type ||
    null;

  // ডিসপ্লে করার জন্য উপযুক্ত রিয়্যাকশন টাইপ
  const displayedReaction = userReaction || userReactionFromData;

  const handleReact = async (type: string) => {
    if (reactionLoading) return; // লোডিং হলে অপেক্ষা কর

    try {
      await createReaction({ postId: mainNews.id, type }).unwrap();
      toast.success(`${reactionEmojiMap[type]} reacted!`);
      setUserReaction(type);
    } catch (error) {
      console.error("Failed to react:", error);
    }
  };

  const handleComment = () => {};

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Latest News</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main News */}
        <div className="lg:w-2/3 w-full h-full relative">
          <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative w-full h-72 md:h-[520px] md:w-2/3">
              <Link href={`/news/${mainNews.category.slug}/${mainNews.slug}`}>
                <Image
                  src={mainNews.coverImage}
                  alt={mainNews.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover"
                />
              </Link>
            </div>

            <div className="p-6 flex flex-col justify-between relative md:w-1/3">
              <h3 className="text-2xl font-bold mb-2">{mainNews.title}</h3>
              <hr className="my-2" />
              <p className="text-gray-700 mb-2">
                {truncateWords(mainNews.summary || "", 30)}
              </p>
              <Link
                href={`/news/${mainNews.category.slug}/${mainNews.slug}`}
                className="text-[#0896EF] text-sm hover:text-blue-800"
              >
                See more
              </Link>

              <p className="text-sm text-gray-400 mt-2">
                {new Date(mainNews.createdAt).toLocaleDateString()}
              </p>

              {/* Reactions */}
              <div className="mt-4">
                <p className="font-medium mb-1">Reactions</p>

                <div
                  className="relative inline-block"
                  onMouseEnter={() => setShowReactionPicker(true)}
                  onMouseLeave={() => setShowReactionPicker(false)}
                >
                  <button className="text-2xl p-2 rounded hover:bg-gray-100 transition">
                    {displayedReaction
                      ? reactionEmojiMap[displayedReaction]
                      : "👍"}{" "}
                    ({totalReactions})
                  </button>

                  {showReactionPicker && (
                    <div className="absolute top-full left-0 flex gap-2 bg-white shadow-lg border p-2 rounded-xl z-10">
                      {Object.entries(reactionEmojiMap).map(([type, emoji]) => (
                        <button
                          key={type}
                          onClick={() => handleReact(type)}
                          disabled={reactionLoading}
                          className={`text-xl transition transform hover:scale-125 ${
                            displayedReaction === type
                              ? "opacity-100"
                              : "opacity-60"
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Show all reaction counts below */}
                <div className="flex gap-3 text-sm mt-2 flex-wrap">
                  {Object.entries(mainReactions).length === 0 ? (
                    <span className="text-gray-500">No reactions yet</span>
                  ) : (
                    Object.entries(mainReactions).map(([type, count]) => (
                      <div
                        key={type}
                        className="flex items-center gap-1 text-gray-600 border px-2 py-1 rounded-full text-xs"
                      >
                        <span>{reactionEmojiMap[type] || "❓"}</span>
                        <span>{count}</span>
                      </div>
                    ))
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
                    : `View Comments (${mainComments.length})`}
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
                      onClick={handleComment}
                      className="bg-[#0896EF] text-white px-4 py-1 rounded hover:bg-[#2f576f]"
                    >
                      Post
                    </button>

                    {/* এখানে কমেন্ট লিস্ট দেখাবে */}
                    {mainComments.length === 0 ? (
                      <p className="text-gray-500 text-sm mt-2">
                        No comments yet.
                      </p>
                    ) : (
                      <ul className="mt-4 space-y-4 max-h-64 overflow-y-auto">
                        {mainComments.map((c: any, i: any) => (
                          <li key={i} className="flex gap-3 items-start">
                            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                            <div className="bg-gray-100 p-3 rounded-lg w-full">
                              <p className="text-sm text-gray-800">
                                {c?.content}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(c?.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>
              {/* Share */}
              <div className="mt-4">
                <p className="text-md text-gray-500">Share this news:</p>
                <div className="flex gap-3 mt-2 flex-wrap">
                  <button
                    className="text-[#0896EF]"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        typeof window !== "undefined"
                          ? window.location.href
                          : ""
                      )
                    }
                    aria-label="Copy Link"
                  >
                    <FaLink className="text-xl" />
                  </button>

                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${
                      typeof window !== "undefined"
                        ? encodeURIComponent(window.location.href)
                        : ""
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700"
                    aria-label="Share on Facebook"
                  >
                    <FaFacebook className="text-xl" />
                  </a>

                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500"
                    aria-label="Visit Instagram"
                  >
                    <FaInstagram className="text-xl" />
                  </a>

                  <a
                    href={`https://twitter.com/intent/tweet?url=${
                      typeof window !== "undefined"
                        ? encodeURIComponent(window.location.href)
                        : ""
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400"
                    aria-label="Share on Twitter"
                  >
                    <FaTwitter className="text-xl" />
                  </a>

                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${
                      typeof window !== "undefined"
                        ? encodeURIComponent(window.location.href)
                        : ""
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
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
            {relevantNews.slice(0, 3).map((item: any) => (
              <Link
                key={item.slug}
                href={`/news/${item.category.slug}/${item.slug}`}
              >
                <div className="flex flex-col sm:flex-row bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  <div className="relative w-full sm:w-1/3 h-40">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 sm:w-2/3">
                    <h4 className="text-md font-semibold mb-1 line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-1 line-clamp-2">
                      {truncateWords(item.summary, 20)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* More News */}
      {otherNews.length > 0 && (
        <div className="mt-12 ">
          <h3 className="text-2xl font-bold mb-6 text-center">More News</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {otherNews.map((item: any) => (
              <Link
                key={item.slug}
                href={`/news/${item.category.slug}/${item.slug}`}
              >
                <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-[340px]">
                  <div className="relative w-full h-48">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-md font-semibold mb-1 line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-1 line-clamp-2">
                      {truncateWords(item.summary, 20)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
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
