/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import NewsSection from "./News";
// import NewSkeleton from "../../Skeleton/NewsSkeleton";

import NewSkeleton from "../../Skeleton/NewsSkeleton";
import NewsSection from "./News";

// const NewFilter = ({ data }: { data: any[] }) => {
//   if (!data || data?.length === 0)
//     return (
//       <div className="flex flex-col items-center justify-center h-[80vh]">
//         <NewSkeleton />
//       </div>
//     );

//   const news = data;
//   const mainNews = news[0];
//   const relevantNews = news?.filter(
//     (item: any) =>
//       item?.categoryId === mainNews?.categoryId && item.id !== mainNews.id
//   );
//   const excludedIds = [
//     mainNews?.id,
//     ...relevantNews.slice(0, 3)?.map((n: any) => n.id),
//   ];
//   const otherNews = news?.filter((item: any) => !excludedIds.includes(item.id));

//   return (
//     <div>
//       <h2 className="text-3xl font-bold text-center ">Latest News</h2>
//       {
//         <NewsSection
//           mainNews={mainNews}
//           relevantNews={relevantNews}
//           moreNews={otherNews}
//         ></NewsSection>
//       }
//     </div>
//   );
// };

// export default NewFilter;


const NewFilter = ({ data }: { data: any[] }) => {
  if (!data || data.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <NewSkeleton />
      </div>
    );

  const news = data;
  const mainNews = news[0];

  const relevantNews = news.filter(
    (item: any) =>
      item?.category?._id === mainNews?.category?._id && item._id !== mainNews._id
  );

  const excludedIds = [
    mainNews?._id,
    ...relevantNews.slice(0, 3).map((n: any) => n._id),
  ];

  const otherNews = news.filter((item: any) => !excludedIds.includes(item._id));

  return (
    <div>
      <h2 className="text-3xl font-bold text-center ">Latest News</h2>
      <NewsSection
        mainNews={mainNews}
        relevantNews={relevantNews}
        moreNews={otherNews}
      />
    </div>
  );
};
 export default NewFilter;
