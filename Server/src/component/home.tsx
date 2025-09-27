import PersonalizedNews from "./personalnews";
import GeneralNews from "./generalnews";
import Logout from "./logout";
import { useEffect, useState } from "react";

function Home() {
  interface UserStat {
    id?: string;
    name?: string;
    email?: string;
  }

  const [user, setUser] = useState<UserStat>({});
  const [feed, setFeed] = useState<"personal_feed" | "global_feed">(
    "personal_feed"
  );

  useEffect(() => {
    fetch("http://localhost:5000/api/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <div className="w-[100%] h-[100vh] ">
          <div className="bg-blue-600 p-[20px] text-base font-serif text-[#fff]">
            <h2>Hi {user.name}</h2>
          </div>

          <div className="bg-gray-100">
            <div className=" w-[95%] md:p-[20px] flex justify-between lg:w-[80%] mx-auto">
              <button
                className="bg-blue-400 mt-[20px] p-[6px] font-mons font-xs font-bold cursor-pointer text-[#fff] hover:bg-blue-700"
                onClick={() => setFeed("personal_feed")}
              >
                My Newsfeed
              </button>
              <button
                className="bg-blue-400 mt-[20px] p-[6px] font-mons font-xs font-bold cursor-pointer text-[#fff] hover:bg-blue-700"
                onClick={() => setFeed("global_feed")}
              >
                Global NewsFeed
              </button>

              <h1 className="bg-blue-400 mt-[20px] p-[6px] font-mons font-xs font-bold cursor-pointer text-[#fff] hover:bg-blue-700">
                {" "}
                <Logout />
              </h1>
            </div>

            <div className="w-[95%]  md:w-[80%] mx-auto ">
              {feed === "personal_feed" ? (
                <PersonalizedNews />
              ) : (
                <GeneralNews />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
