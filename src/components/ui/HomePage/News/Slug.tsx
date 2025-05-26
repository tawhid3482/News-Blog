/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { getUserInfo } from "@/services/auth.services";
import {
  useTrackPostViewMutation,
  // useUpdateReadingTimeMutation, ❌ Remove this
} from "@/redux/features/post/postApi";
import { useCreateReactionMutation } from "@/redux/features/reaction/reactionApi";
import { useCreateCommentMutation } from "@/redux/features/comment/commentApi";
import { useRouter } from "next/navigation";

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

const Slug = ({ newsItem }: { newsItem: any }) => {
  const user = getUserInfo();
  const router = useRouter();
  const [trackPostView] = useTrackPostViewMutation();
  const [createReaction, { isLoading: reactionLoading }] =
    useCreateReactionMutation();
  const [createComment, { isLoading: commentLoading }] =
    useCreateCommentMutation();

  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showAllReactions, setShowAllReactions] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && newsItem?.id) {
      trackPostView(newsItem.id);
    }
  }, [hasMounted, newsItem?.id, trackPostView]);

  // ✅ Updated Reading Time Tracker with sendBeacon
  useEffect(() => {
    if (!hasMounted || !newsItem?.id) return;

    const startTime = Date.now();

    const handleBeforeUnload = () => {
      const endTime = Date.now();
      const timeSpentInSeconds = Math.floor((endTime - startTime) / 1000);
      if (timeSpentInSeconds <= 0) return;

      const data = {
        timeSpent: timeSpentInSeconds,
        userId: user?.userId,
      };

      const blob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });

      // ✅ Make sure this matches your actual backend route (use absolute path if needed)
      navigator.sendBeacon(
        `http://localhost:5000/api/s1/post/${newsItem.id}/reading-time`,
        blob
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      handleBeforeUnload(); // flush on component unmount too
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasMounted, newsItem?.id]);

  if (!hasMounted) return null;

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
      const res = await createReaction({ postId: newsItem.id, type }).unwrap();
      if (res) {
        toast.success(`${reactionEmojiMap[type]} reacted!`);
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to react:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (commentLoading || !newComment.trim()) return;

    try {
      const res = await createComment({
        postId: newsItem.id,
        content: newComment,
        userImage: user?.profilePhoto,
      });
      if (res) {
        toast.success("Comment posted!");
        router.refresh();
      }
      setNewComment("");
    } catch (error) {
      console.error("Failed to post comment:", error);
      toast.error("Failed to post comment.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 h-full">
      <h1 className="text-4xl font-bold mb-2">{newsItem.title}</h1>
      <p className="text-gray-800 text-lg mb-1">{newsItem.summary}</p>
      <p className="text-xs text-gray-800 mt-1">
        Published: {format(new Date(newsItem?.createdAt), "yyyy-MM-dd HH:mm")}
      </p>

      <div className="relative w-full h-[350px] md:h-[500px] rounded-xl overflow-hidden mb-6 shadow">
        <Image
          src={newsItem.coverImage}
          alt={newsItem.title}
          layout="fill"
          style={{ objectFit: "cover" }}
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

export default Slug;
