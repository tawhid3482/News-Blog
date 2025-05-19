"use client";
import React from "react";

const VideoNewsSkeleton = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10 animate-pulse">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gray-300 h-8 w-48 mx-auto rounded"></h2>
      <p className="text-center text-gray-400 mb-8 bg-gray-200 h-5 w-64 mx-auto rounded"></p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="w-full h-56 bg-gray-300"></div>
            <div className="p-4">
              <div className="bg-gray-300 h-6 w-3/4 mb-2 rounded"></div>
              <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoNewsSkeleton;
