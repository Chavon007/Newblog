import { useEffect, useState, FormEvent } from "react";

interface Article {
  _id: string;
  title: string;
  content: string;
  source: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  category?: string[];
}

interface FeedResponse {
  articles: Article[];
  total: number;
  page: number;
  totalPages: number;
}

interface NewsFeedProps {
  endpoint: string;
  title: string;
  requiresAuth?: boolean;
}

export default function NewsFeed({
  endpoint,
  title,
  requiresAuth = false,
}: NewsFeedProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [source, setSource] = useState("");

  const fetchNews = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: String(pageNumber),
        limit: "10",
      });
      if (keyword) queryParams.append("keyword", keyword);
      if (source) queryParams.append("source", source);

      const res = await fetch(
        `http://localhost:5000${endpoint}?${queryParams.toString()}`,
        {
          method: "GET",
          credentials: requiresAuth ? "include" : "omit",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch news");
      }

      const data: FeedResponse = await res.json();
      setArticles(data.articles);
      setTotalPages(data.totalPages);
      setPage(data.page);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    fetchNews(1);
  };

  return (
    <div className="w-[95%] mx-auto pb-[30px]">
      <h1 className="p-[10px] text-center font-bold font-sans text-1xl lg:text-3xl text-gray-800">
        {title}
      </h1>

      <form
        onSubmit={handleSearch}
        className="md:flex md:justify-between p-[10px] md:p-[20px] md:items-center"
      >
        <div className="gap-4 flex justify-between">
          <input
            className="w-[50%] mr-[10px] placeholder:text-sm placeholder:font-serif placeholder:p-[10px] focus:outline-none bg-[#fff] rounded-2xl"
            type="text"
            placeholder="Search by Keyword..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <input
            className="w-[50%] mr-[10px] placeholder:text-sm placeholder:font-serif placeholder:p-[10px] focus:outline-none bg-[#fff] rounded-2xl"
            type="text"
            placeholder="Search by Source..."
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>
        <button
          className="flex justify-center mt-[20px] md:mt-[0] p-[8px] md:p-[3px] lg:p-[4px] w-[150px] bg-blue-400 mx-auto font-mons font-xs font-bold cursor-pointer text-[#fff] hover:bg-blue-700"
          type="submit"
        >
          Search
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : articles.length === 0 ? (
        <p>No articles found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-6">
          {articles.map((article) => {
            const shortContent =
              article.content.length > 200
                ? article.content.substring(0, 200) + "..."
                : article.content;

            return (
              <div
                key={article._id}
                className="w-[95%] mx-auto h-auto pb-[10px]"
              >
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="h-48 w-full object-cover mb-3"
                  />
                )}
                <h4 className="text-sm font-sans mb-2 pl-[10px] font-bold">
                  {article.title}
                </h4>
                <p className="text-gray-900 text-xs pl-[10px] font-mons mb-2">
                  {shortContent}
                </p>
                <h5 className="mb-2 pl-[10px]">
                  Read more:{" "}
                  <a
                    href={article.url}
                    className="text-blue-500 text-xs underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.url}
                  </a>
                </h5>

                <div className="flex flex-col pl-[10px]">
                  <span className="text-xs font-serif text-gray-800">
                    <strong className="text-sm font-mons">Source:</strong>{" "}
                    {article.source}
                  </span>
                  <div className="text-xs font-mons mt-[5px]">
                    <span>
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                    {article.category && article.category.length > 0 && (
                      <span> | {article.category.join(", ")}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-6 space-x-4">
          <button
            onClick={() => fetchNews(page - 1)}
            disabled={page === 1}
            className={`px-4 py-2 rounded ${
              page === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Prev
          </button>

          <span className="text-gray-700 font-medium">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => fetchNews(page + 1)}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded ${
              page === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
