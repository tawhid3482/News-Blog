/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";

const videoData = [
  {
    id: 1,
    title: "Live Report on Gaza Conflict",
    youtubeUrl: "https://www.youtube.com/embed/VIDEO_ID_1",
  },
  {
    id: 2,
    title: "Bangladesh vs India Cricket Highlights",
    youtubeUrl: "https://www.youtube.com/embed/VIDEO_ID_2",
  },
  {
    id: 3,
    title: "Political Analysis: Upcoming Elections",
    youtubeUrl: "https://www.youtube.com/embed/VIDEO_ID_3",
  },
  {
    id: 4,
    title: "Political Analysis: Upcoming Elections",
    youtubeUrl: "https://www.youtube.com/embed/VIDEO_ID_3",
  },
];

const VideoNews = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center"> Video News</h2>
      <p className="text-center text-gray-600 mb-8">
        Watch today's top headlines and live reports.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {videoData.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-56"
                src={video.youtubeUrl}
                title={video.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                {video.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoNews;
