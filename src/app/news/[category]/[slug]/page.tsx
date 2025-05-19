/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import SlugSkeleton from "@/components/ui/Skeleton/SlugSkeleton";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useCreateCommentMutation } from "@/redux/features/comment/commentApi";
import { useAppSelector } from "@/redux/features/hooks";
import { useGetAllPostQuery } from "@/redux/features/post/postApi";
import { useCreateReactionMutation } from "@/redux/features/reaction/reactionApi";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import Image from "next/image";
import { use, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  params: Promise<{ slug: string }>;
}

const reactionEmojiMap: Record<string, string> = {
  LIKE: "👍🏻",
  LOVE: "❤️",
  FUNNY: "😂",
  WOW: "😮",
  SAD: "😢",
  ANGRY: "😡",
};

const reactions = Object.entries(reactionEmojiMap).map(([type, emoji]) => ({
  type,
  emoji,
}));

const countReactions = (reactions: { type: string }[]) => {
  return reactions.reduce((acc: Record<string, number>, { type }) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
};

const NewsDetailsPage = ({ params }: Props) => {
  const user = useAppSelector(selectCurrentUser);
  const { data: Me } = useGetMeQuery("");
  const mySelf = Me?.data || null;
  const { slug } = use(params);
  const newsSlug = slug;

  const { data, isLoading } = useGetAllPostQuery("");
  const newsItem = data?.data?.find((item: any) => item.slug === newsSlug);

  const [createReaction, { isLoading: reactionLoading }] =
    useCreateReactionMutation();
  const [createComment, { isLoading: commentLoading }] =
    useCreateCommentMutation();

  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showAllReactions, setShowAllReactions] = useState(false);
  if (isLoading) return <SlugSkeleton />;

  if (!newsItem) return <p>No news found.</p>;

  const mainReactions = countReactions(newsItem?.reactions || []);
  const totalReactions = Object.values(mainReactions).reduce(
    (acc, count) => acc + count,
    0
  );

  const totalComments = newsItem?.comments?.length || 0;

  const userReaction =
    newsItem.reactions?.find((r: any) => r.userId === user?.userId)?.type ||
    null;

  const reactionCounts = reactions.map((r) => ({
    ...r,
    count: mainReactions[r.type] || 0,
  }));

  const handleReaction = async (type: string) => {
    if (reactionLoading) return;

    try {
      await createReaction({ postId: newsItem.id, type }).unwrap();
      toast.success(`${reactionEmojiMap[type]} reacted!`);
    } catch (error) {
      console.error("Failed to react:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (commentLoading || !newComment.trim()) return;

    if (!mySelf || !mySelf.profilePhoto) {
      toast.error("User information not loaded!");
      return;
    }

    try {
      await createComment({
        postId: newsItem.id,
        content: newComment,
        userImage: mySelf.profilePhoto,
      });
      toast.success("Comment posted!");
      setNewComment("");
    } catch (error) {
      console.error("Failed to post comment:", error);
      toast.error("Failed to post comment.");
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

      <div className="my-5 flex flex-wrap gap-2">
        {newsItem.tags.map((tag: any) => (
          <span
            key={tag.id}
            className="px-3 py-1 bg-gray-200 text-sm rounded-full"
          >
            #{tag.name}
          </span>
        ))}
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
          <button className="px-4 py-2 bg-blue-100 text-[#0896EF] rounded-full hover:bg-blue-200 cursor-pointer">
            {userReaction ? reactionEmojiMap[userReaction] : "👍🏻 Like"}
          </button>
          <span className="text-2xl ml-2">({totalReactions})</span>
          {showAllReactions && (
            <div className="absolute -top-11 left-0 bg-white border shadow px-3 py-2 rounded-full flex gap-2 z-20">
              {reactions.map((r) => (
                <button
                  key={r.type}
                  onClick={() => handleReaction(r.type)}
                  className="text-xl hover:scale-125 transition-transform cursor-pointer"
                >
                  {r.emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => setShowComments((prev) => !prev)}
          className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 cursor-pointer"
        >
          💬 {showComments ? "Hide" : "Show"} Comments ({totalComments})
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        {reactionCounts
          .filter((r) => r.count > 0)
          .map((r) => `${r.emoji} ${r.count}`)
          .join("  ") || "No reactions yet"}
      </p>

      {showComments && (
        <div className="bg-gray-50 rounded-md p-4 mb-10">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-3 border rounded-md mb-2"
            placeholder="Write a comment..."
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-[#0896EF] text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Post Comment
          </button>

          <div className="mt-6 space-y-4">
            {newsItem.comments?.length === 0 ? (
              <p className="text-gray-500 text-sm mt-2">No comments yet.</p>
            ) : (
              <ul className="mt-4 space-y-4 max-h-64 overflow-y-auto">
                {[...newsItem.comments].reverse().map((c: any, i: number) => (
                  <li key={i} className="flex gap-3 items-start">
                    <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden relative">
                      <Image
                        src={c.userImage}
                        alt="user"
                        width={35}
                        height={35}
                        className="object-cover"
                      />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg w-full">
                      <p className="text-sm text-gray-800">{c.content}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(c.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <div className="border-t pt-6 mt-6 text-sm text-gray-500">
        <div className="flex items-center gap-4">
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
