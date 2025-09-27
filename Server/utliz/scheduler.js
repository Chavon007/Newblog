import cron from "node-cron";

import { fetchAllArticles } from "./fetcharticle.js"

cron.schedule("0 * * * *", async () => {
  try {
    await fetchAllArticles();
  } catch (err) {
    console.error(err.message);
  }
});
