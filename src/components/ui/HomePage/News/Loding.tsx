// Loading skeleton component
const LoadingSkeleton = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10 animate-pulse">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gray-300 rounded w-48 h-10 mx-auto"></h2>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main News Skeleton */}
        <div className="lg:w-2/3 w-full h-full bg-gray-300 rounded-lg"></div>

        {/* Relevant News Skeleton */}
        <div className="lg:w-1/3 w-full space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row bg-gray-300 rounded-lg overflow-hidden"
            >
              <div className="w-full sm:w-1/3 h-40 bg-gray-400"></div>
              <div className="p-4 sm:w-2/3 space-y-3">
                <div className="h-6 bg-gray-400 rounded w-3/4"></div>
                <div className="h-4 bg-gray-400 rounded w-full"></div>
                <div className="h-4 bg-gray-400 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* More News Skeleton */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-300 rounded-lg h-64"></div>
        ))}
      </div>
    </section>
  );
};

export default LoadingSkeleton;
