import axios from "axios";
import Article from "../model/article.js";

// Predefined categories and related keywords for matching
const categories = [
  {
    name: "technology",
    keywords: [
      "tech",
      "software",
      "AI",
      "machine learning",
      "gadgets",
      "computer",
      "cybersecurity",
      "programming",
      "internet",
      "apps",
    ],
  },
  {
    name: "sports",
    keywords: [
      "football",
      "soccer",
      "basketball",
      "rugby",
      "tennis",
      "cricket",
      "NFL",
      "NBA",
      "Olympics",
      "athlete",
      "match",
    ],
  },
  {
    name: "health",
    keywords: [
      "health",
      "medicine",
      "wellness",
      "fitness",
      "mental health",
      "nutrition",
      "disease",
      "vaccine",
      "hospital",
      "doctor",
    ],
  },
  {
    name: "finance",
    keywords: [
      "finance",
      "stock",
      "market",
      "economy",
      "money",
      "investment",
      "bank",
      "cryptocurrency",
      "trading",
      "business",
    ],
  },
];

// Helper to determine article category based on title/content
function assignCategory(article) {
  const text = `${article.title} ${article.content || ""}`.toLowerCase();

  for (const cat of categories) {
    for (const kw of cat.keywords) {
      if (text.includes(kw.toLowerCase())) {
        return cat.name;
      }
    }
  }

  return "general"; // fallback if no keyword matches
}

// Helper to save articles and avoid duplicates
async function saveArticles(articles) {
  for (const item of articles) {
    const category = assignCategory(item);

    await Article.updateOne(
      { url: item.url },
      {
        $set: {
          title: item.title,
          content: item.content || item.abstract || "",
          source: item.source || "Unknown",
          url: item.url,
          urlToImage: item.urlToImage || item.multimedia?.[0]?.url || "",
          publishedAt: item.publishedAt || item.published_date || new Date(),
          category: [category], // now assigned based on keywords
        },
      },
      { upsert: true }
    );
  }
}

//  NewsAPI
export async function fetchNewsAPI() {
  for (const cat of categories) {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${cat.name}&apiKey=${process.env.NEWSAPI_KEY}`;
    try {
      const response = await axios.get(url);
      const articles = response.data.articles.map((item) => ({
        title: item.title,
        content: item.content,
        source: item.source.name,
        url: item.url,
        urlToImage: item.urlToImage,
        publishedAt: item.publishedAt,
      }));
      await saveArticles(articles);
      console.log(`NewsAPI ${cat.name} articles fetched`);
    } catch (err) {
      console.error("Error fetching NewsAPI:", err.message);
    }
  }
}

// ----------- The Guardian -----------
export async function fetchGuardian() {
  const url = `https://content.guardianapis.com/search?api-key=${process.env.GUARDIAN_KEY}&show-fields=bodyText,thumbnail`;
  try {
    const response = await axios.get(url);
    const articles = response.data.response.results.map((item) => ({
      title: item.webTitle,
      content: item.fields?.bodyText || "",
      source: "The Guardian",
      url: item.webUrl,
      urlToImage: item.fields?.thumbnail || "",
      publishedAt: item.webPublicationDate,
    }));
    await saveArticles(articles);
    console.log("Guardian articles fetched");
  } catch (err) {
    console.error("Error fetching Guardian:", err.message);
  }
}

// ----------- NYT -----------
export async function fetchNYT() {
  const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.NYT_KEY}`;
  try {
    const response = await axios.get(url);
    const articles = response.data.results.map((item) => ({
      title: item.title,
      content: item.abstract || "",
      source: "NYT",
      url: item.url,
      urlToImage: item.multimedia?.[0]?.url || "",
      publishedAt: item.published_date,
    }));
    await saveArticles(articles);
    console.log("NYT articles fetched");
  } catch (err) {
    console.error("Error fetching NYT:", err.message);
  }
}

// ----------- Fetch all sources -----------
export async function fetchAllArticles() {
  await fetchNewsAPI();
  await fetchGuardian();
  await fetchNYT();
  console.log("All articles fetched!");
}
