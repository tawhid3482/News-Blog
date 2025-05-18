/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useCreatePostMutation,
  useGetAllPostQuery,
} from "@/redux/features/post/postApi";
import Image from "next/image";
import { useState } from "react";

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
  const { data, isLoading } = useGetAllPostQuery("");
  const [createPost] = useCreatePostMutation();
  const newsItem = data?.data?.find((item: any) => item.slug === newsSlug);

  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [showAllReactions, setShowAllReactions] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState("");
  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 animate-pulse">
        {/* Title placeholder */}
        <div className="h-10 bg-gray-300 rounded w-3/4 mb-6"></div>
        {/* Summary placeholder */}
        <div className="h-6 bg-gray-300 rounded w-1/2 mb-6"></div>
        {/* Image placeholder */}
        <div className="w-full h-64 md:h-96 bg-gray-300 rounded mb-6"></div>
        {/* Content lines */}
        <div className="space-y-3">
          <div className="h-5 bg-gray-300 rounded w-full"></div>
          <div className="h-5 bg-gray-300 rounded w-full"></div>
          <div className="h-5 bg-gray-300 rounded w-5/6"></div>
          <div className="h-5 bg-gray-300 rounded w-4/6"></div>
        </div>
      </div>
    );
  }
  if (!newsItem) {
    return <p>Data not found</p>;
  }

  const reactionCounts = reactions.map((reaction) => {
    const count =
      newsItem.reactions?.filter(
        (r: any) => r.type.toLowerCase() === reaction.type
      ).length || 0;
    return { ...reaction, count };
  });

  const handleReaction = (type: string) => {
    setUserReaction(type);
    setShowAllReactions(false);

    // Ideally: dispatch API call to backend
    createPost({ postId: newsItem.id, reaction: type });
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      // You should call your comment API here
      newsItem.comments.push({
        content: newComment,
        createdAt: new Date().toISOString(),
        userId: "me",
        id: Math.random().toString(),
        postId: newsItem.id,
      });
      setNewComment("");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-2">{newsItem.title}</h1>
      <p className="text-gray-600 text-lg mb-1">{newsItem.summary}</p>
      <p className="text-sm text-gray-500 mb-4">
        Published: {new Date(newsItem.createdAt).toLocaleString()}
      </p>

      <div className="relative w-full h-[350px] md:h-[500px] rounded-xl overflow-hidden mb-6 shadow">
        <Image
          src={newsItem.coverImage}
          alt={newsItem.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      {/* Tags */}
      <div className="my-5">
        <div className="flex flex-wrap gap-2">
          {newsItem.tags.map((tag: any) => (
            <span
              key={tag.id}
              className="px-3 py-1 bg-gray-200 text-sm rounded-full"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>

      <p className="text-lg leading-8 mb-6 whitespace-pre-line">
        {newsItem.content}
      </p>

      <div className="flex items-center gap-4 mb-3">
        <div
          className="relative"
          onMouseEnter={() => setShowAllReactions(true)}
          onMouseLeave={() => setShowAllReactions(false)}
        >
          <button className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200">
            {userReaction
              ? reactions.find((r) => r.type === userReaction)?.emoji
              : "👍 Like"}
          </button>

          {showAllReactions && (
            <div className="absolute -top-12 left-0 bg-white border shadow px-3 py-2 rounded-full flex gap-2 z-20">
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
          onClick={() => setShowCommentInput((prev) => !prev)}
          className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          💬 Comment
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        {reactionCounts
          .filter((r) => r.count > 0)
          .map((r) => `${r.emoji} ${r.count}`)
          .join("  ") || "No reactions yet"}
      </p>

      <div className="bg-gray-50 rounded-md p-4 mb-10">
        {/* Show input only if toggled */}
        {showCommentInput && (
          <>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-3 border rounded-md mb-2"
              placeholder="Write a comment..."
            />
            <button
              onClick={handleCommentSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Post Comment
            </button>
          </>
        )}

        {/* Comments always visible */}
        <div className="mt-6 space-y-4">
          {newsItem.comments.map((comment: any, index: number) => (
            <div
              key={comment.id || index}
              className="flex items-center  gap-2 bg-white  p-3 rounded-md"
            >
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="">
                <p className="text-gray-700">{comment.content}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Author Info */}
      <div className="border-t pt-6 mt-6 text-sm text-gray-500 ">
        <div className="flex items-center  gap-4">
          <Image
            src={newsItem.author.profilePhoto}
            width={40}
            height={40}
            alt="author"
            className="rounded-full"
          />
          <div>
            <p className="font-semibold text-gray-800">
              {newsItem.author.name}
            </p>
            <p>{newsItem.author.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailsPage;
