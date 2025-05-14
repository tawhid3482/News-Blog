import Link from "next/link";

const editorials = [
  {
    id: 1,
    title: "The Future of Technology: A Double-Edged Sword",
    author: "John Doe",
    date: "2025-05-14",
    excerpt:
      "In this article, we explore the immense potential of emerging technologies and the risks that come with them. Will AI truly revolutionize our world, or will it spell disaster for privacy?",
    slug: "future-of-technology",
  },
  {
    id: 2,
    title: "Global Warming: An Immediate Crisis That Requires Action",
    author: "Jane Smith",
    date: "2025-05-10",
    excerpt:
      "Climate change is no longer a future issue; it is a present-day emergency. This editorial calls for immediate government action and widespread societal shifts to combat global warming.",
    slug: "global-warming-crisis",
  },
  {
    id: 3,
    title: "Why Universal Healthcare is a Right, Not a Privilege",
    author: "Mark Johnson",
    date: "2025-05-08",
    excerpt:
      "Access to healthcare should be a fundamental right for every individual, not determined by one’s income. We dive into the arguments for universal healthcare systems worldwide.",
    slug: "universal-healthcare-right",
  },
];

const EditorialsSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Editorials & Opinions</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {editorials.map((editorial) => (
          <div key={editorial.id} className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-2">
              {/* Removed the <a> tag inside <Link> */}
              <Link href={`/editorials/${editorial.slug}`} className="text-[#0896EF] hover:text-blue-800">
                {editorial.title}
              </Link>
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              By {editorial.author} | {editorial.date}
            </p>
            <p className="text-gray-700 mb-4">{editorial.excerpt}</p>
            <Link href={`/editorials/${editorial.slug}`} className="text-[#0896EF] hover:text-blue-800">
              Read Full Article
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EditorialsSection;
