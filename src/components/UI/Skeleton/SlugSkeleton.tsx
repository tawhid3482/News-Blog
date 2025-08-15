import React from 'react';

const SlugSkeleton = () => {
    return (
        <div className="h-screen w-full lg:w-5xl mx-auto px-4 py-10 animate-pulse">
      {/* Title */}
      <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
      {/* Summary */}
      <div className="h-5 bg-gray-200 rounded w-1/2 mb-2"></div>
      {/* Date */}
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>

      {/* Cover Image */}
      <div className="w-full h-[350px] md:h-[500px] bg-gray-300 rounded-xl mb-6"></div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Array.from({ length: 3 })?.map((_, i) => (
          <div key={i} className="px-6 py-2 bg-gray-200 rounded-full w-20 h-6"></div>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-4 mb-6">
        {Array.from({ length: 6 })?.map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
        ))}
      </div>

      {/* Reaction and Comment buttons */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-24 h-10 bg-gray-200 rounded-full"></div>
        <div className="w-40 h-10 bg-gray-200 rounded-full"></div>
      </div>

      {/* Reactions summary */}
      <div className="h-4 bg-gray-200 rounded w-32 mb-6"></div>

      {/* Comment box */}
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <div className="h-24 bg-gray-200 rounded mb-4"></div>
        <div className="h-10 w-32 bg-gray-300 rounded"></div>
      </div>

      {/* Author Info */}
      <div className="flex items-center gap-4 border-t pt-6 mt-6">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="h-3 bg-gray-200 rounded w-48"></div>
        </div>
      </div>
    </div>
    );
};

export default SlugSkeleton;