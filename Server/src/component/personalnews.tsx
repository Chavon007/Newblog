import NewsFeed from "./newsfeed";

function PersonalizedNews() {
  return (
    <NewsFeed
      endpoint="/api/feed"
      title="Your Personalized News Feed"
      requiresAuth
    />
  );
}
export default PersonalizedNews;
