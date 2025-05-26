import NewsSearchPage from "@/app/(withCommonLayout)/search/page";
import { useSearchParams } from "next/navigation";

const SearchNews = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || "";

  return (
    <>
      <NewsSearchPage searchParams={{ searchTerm }} />
    </>
  );
};

export default SearchNews;
