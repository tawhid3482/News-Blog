/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import {
  FaFacebook,
  FaInstagram,
  FaLink,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { useCreateReactionMutation } from "@/redux/features/reaction/reactionApi";
import { useCreateCommentMutation } from "@/redux/features/comment/commentApi";
import toast from "react-hot-toast";
import { getUserInfo } from "@/services/auth.services";

const reactionEmojiMap: Record<string, string> = {
  LIKE: "👍🏻",
  LOVE: "❤️",
  FUNNY: "😂",
  WOW: "😮",
  SAD: "😢",
  ANGRY: "😡",
};

const countReactions = (reactions: { type: string }[]) => {
  return reactions.reduce((acc: Record<string, number>, { type }) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
};

const truncateWords = (text: string, wordLimit: number) => {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

const MainNewsCard = ({ mainNews }: { mainNews: any }) => {
  const user = getUserInfo();
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const [createReaction, { isLoading: reactionLoading }] =
    useCreateReactionMutation();
  const [createComment, { isLoading: commentLoading }] =
    useCreateCommentMutation();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(encodeURIComponent(window.location.href));
    }
  }, []);

  const mainReactions = countReactions(mainNews?.reactions || []);
  const mainComments = mainNews?.comments || [];
  const totalReactions = Object.values(mainReactions).reduce(
    (acc, count) => acc + count,
    0
  );
  const userReactionFromData =
    mainNews?.reactions?.find((r: any) => r.userId === user?.userId)?.type ??
    null;

  const displayedReaction = hasMounted
    ? userReactionFromData ?? "LIKE"
    : "LIKE"; // fallback for SSR

  const handleReact = async (type: string) => {
    if (reactionLoading) return;
    try {
      await createReaction({ postId: mainNews.id, type }).unwrap();
      toast.success(`${reactionEmojiMap[type]} reacted!`);
    } catch (error) {
      console.error("Failed to react:", error);
    }
  };

  const handleComment = async () => {
    if (commentLoading || !newComment.trim()) return;
    if (!user?.profilePhoto) {
      toast.error("User information not loaded!");
      return;
    }
    try {
      await createComment({
        postId: mainNews.id,
        content: newComment,
        userImage: user.profilePhoto,
      }).unwrap();
      toast.success("Comment posted!");
      setNewComment("");
    } catch (error) {
      console.error("Failed to post comment:", error);
      toast.error("Failed to post comment.");
    }
  };

  return (
    <div className="w-full h-full relative">
      {/* Main News */}
      <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative w-full h-72 md:h-[520px] md:w-2/3">
          <Link href={`/news/${mainNews?.category?.slug}/${mainNews?.slug}`}>
            <Image
              src={mainNews?.coverImage}
              alt={mainNews?.title}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover"
            />
          </Link>
        </div>

        <div className="p-6 flex flex-col justify-between relative md:w-1/3">
          <h3 className="text-2xl font-bold mb-2">{mainNews?.title}</h3>
          <hr className="my-2" />
          <p className="text-gray-700 mb-2">
            {truncateWords(mainNews?.summary || "", 30)}
          </p>
          <Link
            href={`/news/${mainNews?.category?.slug}/${mainNews?.slug}`}
            className="text-[#0896EF] text-sm hover:text-blue-800 cursor-pointer"
          >
            See more
          </Link>

          <p className="text-xs text-gray-500 mt-1">
            {format(new Date(mainNews?.createdAt), "yyyy-MM-dd HH:mm")}
          </p>

          {/* Reactions */}
          <div className="mt-4">
            <p className="font-medium mb-1">Reactions</p>

            <div
              className="relative inline-block"
              onMouseEnter={() => setShowReactionPicker(true)}
              onMouseLeave={() => setShowReactionPicker(false)}
            >
              <button className="text-2xl p-2 rounded hover:bg-gray-100 transition cursor-pointer">
                {reactionEmojiMap[displayedReaction]} ({totalReactions})
              </button>

              {showReactionPicker && (
                <div className="absolute top-full left-0 flex gap-2 bg-white shadow-lg border p-2 rounded-xl z-10">
                  {Object.entries(reactionEmojiMap)?.map(([type, emoji]) => (
                    <button
                      key={type}
                      onClick={() => handleReact(type)}
                      disabled={reactionLoading}
                      className={`text-xl transition transform hover:scale-125 cursor-pointer ${
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

            {/* Reaction count */}
            <div className="flex gap-3 text-sm mt-2 flex-wrap">
              {Object.entries(mainReactions)?.length === 0 ? (
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
              className="text-[#0896EF] hover:underline mb-2 text-sm cursor-pointer"
            >
              {showComments
                ? "Hide Comments"
                : `View Comments (${mainComments?.length})`}
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
                  className="bg-[#0896EF] text-white px-4 py-1 rounded hover:bg-[#2f576f] cursor-pointer"
                >
                  Post
                </button>

                {mainComments.length === 0 ? (
                  <p className="text-gray-500 text-sm mt-2">No comments yet.</p>
                ) : (
                  <ul className="mt-4 space-y-4 max-h-64 overflow-y-auto">
                    {mainComments.slice(-3).map((c: any, i: number) => (
                      <li key={i} className="flex gap-3 items-start">
                        <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden relative">
                          <Image
                            src={c.userImage}
                            alt="User"
                            width={35}
                            height={35}
                            className="object-cover"
                          />
                        </div>
                        <div className="bg-gray-100 p-3 rounded-lg w-full">
                          <p className="text-sm text-gray-800">{c?.content}</p>
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
              {shareUrl && (
                <>
                  <button
                    className="text-[#0896EF]"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        decodeURIComponent(shareUrl)
                      )
                    }
                    aria-label="Copy Link"
                  >
                    <FaLink className="text-xl" />
                  </button>

                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700"
                  >
                    <FaFacebook className="text-xl" />
                  </a>

                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500"
                  >
                    <FaInstagram className="text-xl" />
                  </a>

                  <a
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400"
                  >
                    <FaTwitter className="text-xl" />
                  </a>

                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    <FaLinkedin className="text-xl" />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNewsCard;
