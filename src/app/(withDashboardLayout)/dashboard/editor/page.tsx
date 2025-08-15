/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import {
  FaNewspaper,
  FaRegFileAlt,
  FaLock,
  FaCheckCircle,
  FaCommentDots,
  FaRegEyeSlash,
  FaStar,
  FaThumbsUp,
  FaTimesCircle,
} from "react-icons/fa";
import { useGetEditorStatsQuery } from "@/redux/features/editor/editorApi";

const StatItemCard = ({
  icon,
  label,
  value,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  className?: string;
}) => (
  <div
    className={`flex items-center gap-3 bg-white shadow rounded-lg p-4 border border-gray-100 ${className}`}
  >
    <div className="text-2xl text-blue-500">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const ReviewItemCard = ({
  icon,
  label,
  value,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  className?: string;
}) => (
  <div
    className={`flex items-center gap-3 bg-white shadow rounded-lg p-4 border border-gray-100 ${className}`}
  >
    <div className="text-2xl text-yellow-500">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const EditorDashboardOverview = () => {
  const { data: stats, isLoading } = useGetEditorStatsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  if (isLoading || !stats) return <div className="p-4">Loading...</div>;

  // Daily data ready
  const dailyPostData = stats.dailyStats.posts?.map((item:any) => ({
    date: item.date,
    count: item.count,
  }));
  const dailyOpinionData = stats.dailyStats.opinions?.map((item:any) => ({
    date: item.date,
    count: item.count,
  }));
  const dailyReviewData = stats.dailyStats.reviews?.map((item:any) => ({
    date: item.date,
    count: item.count,
  }));

  return (
    <div className="p-4 space-y-6">
      {/* Post Stats Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Post Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatItemCard
            icon={<FaNewspaper />}
            label="Total Posts"
            value={stats.postStats.total}
          />
          <StatItemCard
            icon={<FaCheckCircle className="text-green-600" />}
            label="Published"
            value={stats.postStats.published}
          />
          <StatItemCard
            icon={<FaRegFileAlt className="text-yellow-600" />}
            label="Drafts"
            value={stats.postStats.draft}
          />
          <StatItemCard
            icon={<FaLock className="text-red-600" />}
            label="Blocked"
            value={stats.postStats.blocked}
          />
        </div>
      </section>

      {/* Opinion Stats Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Opinion Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4gap-4">
          <StatItemCard
            icon={<FaCommentDots />}
            label="Total Opinions"
            value={stats.opinionStats.total}
          />
          <StatItemCard
            icon={<FaCheckCircle className="text-green-600" />}
            label="Published"
            value={stats.opinionStats.published}
          />
          <StatItemCard
            icon={<FaRegEyeSlash className="text-red-600" />}
            label="Unpublished"
            value={stats.opinionStats.unpublished}
          />
        </div>
      </section>

      {/* Review Stats Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Review Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ReviewItemCard
            icon={<FaStar />}
            label="Total Reviews"
            value={stats.reviewStats.total}
          />
          <ReviewItemCard
            icon={<FaThumbsUp className="text-green-600" />}
            label="Approved"
            value={stats.reviewStats.approved}
          />
          <ReviewItemCard
            icon={<FaTimesCircle className="text-red-600" />}
            label="Not Approved"
            value={stats.reviewStats.notApproved}
          />
        </div>

        {/* Recent Reviews */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Recent Reviews</h3>
          <ul className="space-y-3">
            {stats.reviewStats.recent?.map((review: any) => (
              <li
                key={review.id}
                className="bg-gray-50 p-3 rounded-md shadow-sm border border-gray-100"
              >
                <p className="italic text-gray-800">"{review.content}"</p>
                <p className="mt-1 text-sm text-gray-600">
                  ⭐ {review.rating} | {formatDate(review.createdAt)} |{" "}
                  {review.isAnonymous ? "Anonymous" : "User"}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Daily Stats Charts */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-4 border border-gray-100">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Daily Post Stats</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dailyPostData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" name="Posts" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow rounded-xl p-4 border border-gray-100">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Daily Opinion Stats</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dailyOpinionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#10b981" name="Opinions" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow rounded-xl p-4 border border-gray-100">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Daily Review Stats</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dailyReviewData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#f59e0b" name="Reviews" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default EditorDashboardOverview;
