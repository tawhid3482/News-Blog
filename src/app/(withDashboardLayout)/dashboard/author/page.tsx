/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MessageCircle, ThumbsUp, Eye, FileText } from "lucide-react";
import Image from "next/image";
import { useGetAuthorStatsQuery } from "@/redux/features/author/authorApi";


const reactionEmojis: Record<string, string> = {
  LIKE: "👍",
  LOVE: "❤️",
  LAUGH: "😂",
  SAD: "😢",
  ANGRY: "😡",
};

export default function AuthorDashboardOverview() {
  const { data: stats, isLoading } = useGetAuthorStatsQuery({});

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const summaryData = stats?.summary || [];
  const recentPosts = stats?.recentPosts || [];
  const lastComment = stats?.lastComment || null;
  const lastReaction = stats?.lastReaction || null;
  const analyticsData = stats?.monthlyAnalytics || [];

  return (
    <div className="p-4 sm:p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {summaryData?.map((item: any, idx: number) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-2xl shadow flex items-center gap-4"
          >
            <div className="p-3 bg-[#0896EF1A] rounded-full text-[#0896EF] min-w-[40px] flex justify-center items-center">
              {item.icon === "FileText" && <FileText />}
              {item.icon === "Eye" && <Eye />}
              {item.icon === "ThumbsUp" && <ThumbsUp />}
              {item.icon === "MessageCircle" && <MessageCircle />}
            </div>
            <div>
              <p className="text-sm text-gray-500">{item.label}</p>
              <h4 className="text-xl font-bold">{item.value}</h4>
            </div>
          </div>
        ))}
      </section>

      {/* Recent Activities */}
      <section className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-[#0896EF]">
          📊 Recent Activities
        </h2>
        <div className="grid grid-cols-1  lg:grid-cols-3 gap-6">
          {/* Latest Posts */}
          <div className="bg-[#F9FAFB] p-4 rounded-xl shadow-inner h-full">
            <h4 className="text-sm font-semibold text-[#0896EF] mb-2">
              Latest 3 Posts
            </h4>
            <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
              {recentPosts.length > 0 ? (
                recentPosts?.map((post: any, i: number) => (
                  <li key={i}>
                    <span className="font-medium">{post.title}</span> (
                    {post.status})
                  </li>
                ))
              ) : (
                <p>No posts found.</p>
              )}
            </ul>
          </div>

          {/* Last Comment */}
          <div className="bg-[#F9FAFB] p-4 rounded-xl shadow-inner h-full">
            <h4 className="text-sm font-semibold text-[#0896EF] mb-2">
              Last Comment Received
            </h4>
            {lastComment ? (
              <div className="flex items-start gap-3">
                <Image
                  src={lastComment.userImage || "/default-avatar.png"}
                  alt={lastComment.userName}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="text-gray-700 text-sm italic mb-1">
                    “{lastComment.content}”
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    — {lastComment.userName}
                  </p>
                </div>
              </div>
            ) : (
              <p>No comments yet.</p>
            )}
          </div>

          {/* Last Reaction */}
          <div className="bg-[#F9FAFB] p-4 rounded-xl shadow-inner h-full">
            <h4 className="text-sm font-semibold text-[#0896EF] mb-2">
              Last Reaction Received
            </h4>
            {lastReaction ? (
              <div className="flex items-start gap-3">
                <Image
                  src={lastReaction.userImage || "/default-avatar.png"}
                  alt={lastReaction.userName}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="text-gray-700 text-sm mb-1">
                    {reactionEmojis[lastReaction.reactionType] || "👍"}{" "}
                    <span className="font-medium">
                      {lastReaction.reactionType}
                    </span>{" "}
                    on “{lastReaction.postTitle}”
                  </p>

                  <p className="text-xs text-gray-500 font-medium">
                    — {lastReaction.userName}
                  </p>
                </div>
              </div>
            ) : (
              <p>No reactions yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-[#0896EF]">
          📈 Monthly Analytics
        </h2>
        <div className="w-full h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analyticsData}>
              <XAxis dataKey="month" stroke="#888" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="#0896EF" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
