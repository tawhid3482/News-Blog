// 'use client';

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';

// interface NewsArticle {
//   title: string;
//   description: string | null;
//   url: string;
//   urlToImage: string | null;
//   publishedAt: string;
// }

// const truncateWords = (text: string, wordLimit: number) => {
//   const words = text.split(' ');
//   return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
// };

// const Text = () => {
//   const [newsData, setNewsData] = useState<NewsArticle[]>([]);
//   const [showFullDesc, setShowFullDesc] = useState(false);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const res = await fetch(
//           `https://newsapi.org/v2/everything?q=bitcoin&apiKey=d2b094d55a8f49ff879a2ee8f91d6f8f`
//         );
//         const data = await res.json();
//         console.log('Fetched news data:', data);
//         setNewsData(data.articles || []);
//       } catch (error) {
//         console.error('Error fetching news:', error);
//       }
//     };

//     fetchNews();
//   }, []);

//   if (!newsData.length) {
//     return <p className="text-center py-10 text-gray-500">Loading news...</p>;
//   }

//   const mainNews = newsData[0];
//   const relevantNews = newsData.slice(1, 4);
//   const otherNews = newsData.slice(4, 16);

//   // Helper to safely get description text or fallback
//   const getDescription = (desc: string | null) =>
//     desc ? desc : 'No description available.';

//   return (
//     <section className="max-w-7xl mx-auto px-4 py-10">
//       <h2 className="text-3xl font-bold mb-8 text-center">Latest News</h2>

//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Featured News */}
//         <div className="lg:w-2/3 w-full lg:h-[520px]">
//           <a href={mainNews.url} target="_blank" rel="noopener noreferrer">
//             <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
//               <Image
//                 src={mainNews.urlToImage || '/no-image.jpg'}
//                 alt={mainNews.title}
//                 width={800}
//                 height={450}
//                 className="w-full md:w-2/3 object-cover lg:h-[520px]"
//               />
//               <div className="p-6 flex flex-col justify-between">
//                 <h3 className="text-2xl font-bold mb-2">{mainNews.title}</h3>
//                 <hr className="my-2" />
//                 <p className="text-gray-700 mb-2">
//                   {showFullDesc
//                     ? getDescription(mainNews.description)
//                     : truncateWords(getDescription(mainNews.description), 30)}
//                 </p>
//                 {/* Only show button if description has more than 30 words */}
//                 {mainNews.description && mainNews.description.split(' ').length > 30 && (
//                   <button
//                     onClick={(e) => {
//                       e.preventDefault();
//                       setShowFullDesc(!showFullDesc);
//                     }}
//                     className="text-blue-600 text-sm hover:text-blue-800"
//                   >
//                     {showFullDesc ? 'See Less' : 'See More'}
//                   </button>
//                 )}
//                 <p className="text-sm text-gray-400 mt-2">
//                   {new Date(mainNews.publishedAt).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//           </a>
//         </div>

//         {/* Relevant News */}
//         <div className="lg:w-1/3 w-full">
//           <h3 className="text-2xl font-bold mb-4 text-center lg:text-left">Relevant News</h3>
//           <div className="flex flex-col gap-4">
//             {relevantNews.map((news, index) => (
//               <a key={index} href={news.url} target="_blank" rel="noopener noreferrer">
//                 <div className="flex flex-col sm:flex-row bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
//                   <div className="relative w-full sm:w-1/3 h-40 sm:h-auto">
//                     <Image
//                       src={news.urlToImage || '/no-image.jpg'}
//                       alt={news.title}
//                       layout="fill"
//                       objectFit="cover"
//                     />
//                   </div>
//                   <div className="p-4 sm:w-2/3">
//                     <h4 className="text-md font-semibold mb-1 line-clamp-2">{news.title}</h4>
//                     <p className="text-sm text-gray-600 mb-1 line-clamp-2">
//                       {truncateWords(getDescription(news.description), 20)}
//                     </p>
//                     <p className="text-xs text-gray-400">
//                       {new Date(news.publishedAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Other News Cards */}
//       <div className="mt-12">
//         <h3 className="text-2xl font-bold mb-6 text-center">More News</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {otherNews.map((news, index) => (
//             <a key={index} href={news.url} target="_blank" rel="noopener noreferrer">
//               <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
//                 <div className="relative w-full h-48">
//                   <Image
//                     src={news.urlToImage || '/no-image.jpg'}
//                     alt={news.title}
//                     layout="fill"
//                     objectFit="cover"
//                   />
//                 </div>
//                 <div className="p-4">
//                   <h4 className="text-lg font-semibold mb-2 line-clamp-2">{news.title}</h4>
//                   <p className="text-sm text-gray-600 mb-2 line-clamp-3">
//                     {truncateWords(getDescription(news.description), 25)}
//                   </p>
//                   <p className="text-xs text-gray-400">
//                     {new Date(news.publishedAt).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>
//             </a>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Text;
