/* eslint-disable @typescript-eslint/no-explicit-any */
import MainNewsCard from "./MainNewsCard";
import MoreNewsGrid from "./MoreNews";
import RelevantNewsList from "./ReleventNewsList";

const NewsSection = ({
  mainNews,
  relevantNews,
  moreNews,
}: {
  mainNews: any;
  relevantNews: any[];
  moreNews: any[];
}) => {
  
  return (
    <div className="space-y-8 my-5">
  
      <div className="flex flex-col lg:flex-row gap-8">
        <div
          className={`w-full h-full relative ${
            relevantNews?.length === 0 ? "lg:w-full" : "lg:w-2/3"
          }`}
        >
          <MainNewsCard mainNews={mainNews} />
        </div>
        <RelevantNewsList relevantNews={relevantNews} />
      </div>

      <MoreNewsGrid moreNews={moreNews} />
    </div>
  );
};

export default NewsSection;
