import express from "express";
import connectDB from "./config.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import signup from "./router/signup.js";
import login from "./router/login.js";
import feed from "./router/personalarticle.js";
import articles from "./router/generalarticle.js";
import { fetchAllArticles } from "./utliz/fetcharticle.js";
import "./utliz/scheduler.js";
import userstat from "./router/usersinforn.js";

import logout from "./router/logout.js";
dotenv.config();

const app = express();
connectDB();

app.use(express.json());

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

fetchAllArticles().then(() => console.log("All articles fetched!"));
app.use("/api/", signup);
app.use("/api/", login);
app.use("/api/", feed);
app.use("/api/", articles);
app.use("/api/", logout);
app.use("/api/", userstat);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
