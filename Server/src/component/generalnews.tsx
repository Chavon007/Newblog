import NewsFeed from "./newsfeed";

function GeneralNews() {
  return <NewsFeed endpoint="/api/article" title="Latest News" />;
}
export default GeneralNews;
