/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useGetAdminStatsQuery } from "@/redux/features/admin/adminApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import Image from "next/image";
import StatCard from "@/components/Dashboard/AdminDash/StatCard";
import ChartCard from "@/components/Dashboard/AdminDash/ChartCard";

const mainColor = "#0896EF";

const AdminDash = () => {
  const { data: stats, isLoading } = useGetAdminStatsQuery({});
  if (isLoading) return <div className="p-6 text-center">Loading...</div>;
  if (!stats) return <div className="p-6 text-center">No data found</div>;

  const { userStats, contentStats, trends } = stats;

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={userStats.totalUsers} />
        <StatCard title="Total Admins" value={userStats.totalAdmins} />
        <StatCard title="Total Authors" value={userStats.totalAuthors} />
        <StatCard title="Total Editors" value={userStats.totalEditors} />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-5 gap-6 mt-6">
        <StatCard
          title="New Users This Month"
          value={userStats.newUsersThisMonth}
        />
        <StatCard title="Total Views" value={contentStats.totalViews} />
        <StatCard title="Today's Views" value={contentStats.todaysViews} />
        <StatCard title="Total Reactions" value={contentStats.totalReactions} />
        <StatCard title="Total Comments" value={contentStats.totalComments} />
      </section>

      {/* Content Status */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <StatusCard
          title="Published News"
          value={contentStats.totalPublished}
        />
        <StatusCard
          title="Pending / Draft News"
          value={contentStats.totalPending}
        />
        <StatusCard title="Rejected News" value={contentStats.totalRejected} />
      </section>

      {/* Top 5 News Lists */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <NewsList title="Top 5 Viewed News" news={contentStats.topViewedNews} />
        <NewsList
          title="Top 5 Reacted News"
          news={contentStats.topReactedNews}
        />
        <NewsList
          title="Top 5 Commented News"
          news={contentStats.topCommentedNews}
        />
      </section>

      {/* Bar Charts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ChartCard title="Daily Visitors (Last 7 Days)">
          <VisitorsBarChart data={trends.dailyVisitors} />
        </ChartCard>
        <ChartCard title="Daily Reactions and Comments (Last 7 Days)">
          <ReactionsCommentsBarChart
            reactions={trends.dailyReactions}
            comments={trends.dailyComments}
          />
        </ChartCard>
      </section>

      <section className="mt-6">
        <ChartCard title="User Signup Trend (Last 7 Days)">
          <UserSignupBarChart data={userStats.userSignupTrend} />
        </ChartCard>
      </section>

      {/* Most Active Authors */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Most Active Authors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {userStats.activeAuthors?.map((author: any) => (
            <div
              key={author.authorId}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow cursor-default"
            >
              <Image
                width={200}
                height={200}
                src={author.profilePhoto || "/default-avatar.png"}
                alt={author.authorName}
                className="rounded-full mx-auto mb-3 object-cover"
              />
              <h3 className="text-center font-medium">{author.authorName}</h3>
              <p className="text-center text-sm text-gray-500">
                {author.postCount} posts
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const StatusCard = ({ title, value }: { title: string; value: number }) => (
  <div
    className="bg-white border border-gray-200 p-5 rounded-lg shadow hover:shadow-lg transition-shadow cursor-default"
    style={{ borderColor: mainColor }}
  >
    <h4 className="text-gray-700 font-semibold mb-1">{title}</h4>
    <p className="text-2xl font-bold" style={{ color: mainColor }}>
      {value}
    </p>
  </div>
);

const NewsList = ({
  title,
  news,
}: {
  title: string;
  news: Array<{
    postId?: string;
    id?: string;
    postTitle?: string;
    title?: string;
    slug: string;
    viewsCount?: number;
    reactionsCount?: number;
    commentsCount?: number;
  }>;
}) => (
  <div className="bg-white p-5 rounded-lg shadow">
    <h4 className="font-semibold mb-3" style={{ color: mainColor }}>
      {title}
    </h4>
    <ul className="space-y-3 max-h-72 overflow-y-auto">
      {news.length === 0 && <li className="text-gray-500">No data</li>}
      {news?.map((item) => (
        <li
          key={item.postId ?? item.id}
          className="flex justify-between items-center"
          style={{ cursor: "default" }} // no pointer cursor, no clickable
        >
          <span
            className="text-[#0896EF] max-w-[70%] truncate"
            title={item.postTitle ?? item.title}
          >
            {item.postTitle ?? item.title}
          </span>
          <span className="text-sm text-gray-600">
            {item.viewsCount ?? item.reactionsCount ?? item.commentsCount}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

// Bar Charts
const VisitorsBarChart = ({
  data,
}: {
  data: { date: string; uniqueVisitors: number }[];
}) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="uniqueVisitors" fill={mainColor} />
    </BarChart>
  </ResponsiveContainer>
);

const ReactionsCommentsBarChart = ({
  reactions,
  comments,
}: {
  reactions: { date: string; count: number }[];
  comments: { date: string; count: number }[];
}) => {
  const merged: Record<
    string,
    { date: string; reactions: number; comments: number }
  > = {};
  reactions.forEach(({ date, count }) => {
    merged[date] = {
      ...(merged[date] || { date, reactions: 0, comments: 0 }),
      reactions: count,
    };
  });
  comments.forEach(({ date, count }) => {
    merged[date] = {
      ...(merged[date] || { date, reactions: 0, comments: 0 }),
      comments: count,
    };
  });

  const data = Object.values(merged).sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="reactions" fill="#ef4444" />
        <Bar dataKey="comments" fill={mainColor} />
      </BarChart>
    </ResponsiveContainer>
  );
};

const UserSignupBarChart = ({
  data,
}: {
  data: { date: string; count: number }[];
}) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#10b981" />
    </BarChart>
  </ResponsiveContainer>
);

export default AdminDash;
