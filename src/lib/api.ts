export async function fetchSingleNews(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${slug}`,
    {
      cache: "no-store", // SSR + fresh data
    }
  );
  if (!res.ok) throw new Error("Failed to fetch news");
  const data = await res.json();
  return data?.data;
}
