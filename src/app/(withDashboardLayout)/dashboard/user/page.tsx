"use client";

import {
  useGetSingleUserQuery,
  useGetUserStatsQuery,
} from "@/redux/features/user/userApi";
import Image from "next/image";
import Link from "next/link";

// Emoji mapping for reactions
const reactionEmojis: Record<string, string> = {
  LOVE: "❤️",
  SAD: "😢",
  LIKE: "👍",
  ANGRY: "😡",
  WOW: "😲",
  FUNNY: "😂",
};

export default function UserDashboard() {
  const { data: user, isLoading } = useGetSingleUserQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: stats, isLoading: loadingStats } = useGetUserStatsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  if (isLoading || !user || loadingStats || !stats) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center text-lg font-semibold text-gray-600">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10 max-w-6xl mx-auto">
      {/* Welcome Section */}
      <div className="bg-white shadow-xl rounded-2xl p-6 md:flex items-center gap-6">
        <Image
          src={user.profilePhoto || "/default-user.png"}
          alt="Profile"
          width={90}
          height={90}
          className="rounded-full border-4 border-gray-200 shadow-md"
        />
        <div>
          <h2 className="text-3xl font-bold">Welcome back, {user.name} 👋</h2>
          <p className="text-sm text-gray-500">
            Glad to see you again at <strong>TIS-News</strong>!
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <InfoCard label="Total Reactions" value={stats.reactionCount} />
        <InfoCard label="Total Comments" value={stats.commentCount} />
        <InfoCard
          label="Reading Time"
          value={`${stats.totalReadingTime} mins`}
        />
        <InfoCard
          label="Member Since"
          value={new Date(user?.createdAt).toLocaleDateString()}
        />
      </div>

      {/* Reaction Breakdown and Last Review/Add Review */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Reactions */}
        <div className="bg-white shadow-xl rounded-2xl p-6 flex-1">
          <h4 className="text-lg font-semibold mb-4">Your Reactions</h4>
          <div className="flex flex-wrap gap-3">
            {Object.entries(stats.reactionTypeCounts)?.map(([type, count]) => (
              <span
                key={type}
                className="flex items-center gap-2 bg-gray-100 text-sm font-medium px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition"
              >
                <span>{reactionEmojis[type] || "⭐"}</span>
                <span>{type}</span>
                <span className="text-gray-600 font-semibold">
                  ({String(count)})
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Last Review or Add Review */}
        <div className="bg-white shadow-xl rounded-2xl p-6 flex-1 flex flex-col justify-center items-center text-center max-w-md mx-auto lg:mx-0">
          {stats.lastReview ? (
            <>
              <h4 className="text-lg font-semibold mb-2">Your Last Review</h4>
              <p className="text-gray-800 mb-4 text-lg">
                {stats.lastReview.content}
              </p>
              <p className="text-gray-800 mb-4 text-lg ">
                You given:{" "}
                <span className="ml-1">{stats.lastReview.rating} ⭐</span>
              </p>
              <p className="text-gray-500 text-sm">
                <strong>Date:</strong>{" "}
                {new Date(stats.lastReview.createdAt).toLocaleString()}
              </p>
            </>
          ) : (
            <Link href={"/dashboard/user/review"}>
              <button className="px-6 py-2 bg-[#0896EF] text-white rounded-lg hover:bg-indigo-700 transition">
                Add a Review
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Last Interaction */}
      {/* Last Interaction */}
      {stats.lastInteraction && (
        <div className="bg-white shadow-xl rounded-2xl p-6 space-y-2">
          <h4 className="text-lg font-semibold mb-2">Your Last Interaction</h4>
          <p className="text-gray-700">
            <strong>Type:</strong> {stats.lastInteraction.type}{" "}
            {stats.lastInteraction.subtype &&
              `(${
                reactionEmojis[stats.lastInteraction.subtype] ||
                stats.lastInteraction.subtype
              })`}
          </p>
          <p className="text-gray-700">
            <strong>Post:</strong> {stats.lastInteraction.postTitle}
          </p>
          <p className="text-gray-500 text-sm">
            <strong>Date:</strong>{" "}
            {new Date(stats.lastInteraction.createdAt).toLocaleString()}
          </p>
        </div>
      )}

      {/* Last Comment */}
      {stats.lastComment && (
        <div className="bg-white shadow-xl rounded-2xl p-6 space-y-2">
          <h4 className="text-lg font-semibold mb-2">Your Last Comment</h4>
          <p className="text-gray-700">
            <strong>Post:</strong> {stats.lastComment.postTitle}
          </p>
          <p className="text-gray-700">
            <strong>Content:</strong> {stats.lastComment.content}
          </p>
          <p className="text-gray-500 text-sm">
            <strong>Date:</strong>{" "}
            {new Date(stats.lastComment.createdAt).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}

// Reusable Card Component
function InfoCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-5 text-center hover:shadow-xl transition">
      <div className="text-3xl font-extrabold text-[#0896EF]">{value}</div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
    </div>
  );
}
