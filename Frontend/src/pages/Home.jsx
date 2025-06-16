import React from "react";
import Lottie from "react-lottie";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeaturedAuctions from "./home-sub-components/FeaturedAuctions";
import UpcomingAuctions from "./home-sub-components/UpcomingAuctions";
import Leaderboard from "./home-sub-components/Leaderboard";
import Spinner from "@/custom-components/Spinner";
import MyAnimation from "./LottiesLogo";
const Home = () => {
  const howItWorks = [
    { title: "Post Items", description: "Auctioneer posts items for bidding." },
    { title: "Place Bids", description: "Bidders place bids on listed items." },
    {
      title: "Win Notification",
      description: "Highest bidder receives a winning email.",
    },
    {
      title: "Payment & Fees",
      description: "Bidder pays; auctioneer pays 5% fee.",
    },
  ];

  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20  flex flex-col min-h-screen py-4 justify-center bg-[#EBEAFF]">
      <center>
      <div className="w-84 h-64 max-w-[90%] max-h-[80%] overflow-hidden flex justify-center items-center">
  <MyAnimation className="w-full h-full object-contain" />
</div>
      </center>

        <div>
          {/* <p className="text-[#EBEAFF] font-bold text-xl mb-8">
            Transparency Leads to Your Victory
          </p> */}
          {/* <h1
            className={`text-[#111] text-xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl`}
          >
          </h1> */}
          <h1
            className={`text-[#FF2929] text-xl font-bold mb-2 min-[200px]:text-2xl md:text-xl xl:text-4xl 2xl:text-4xl`}
          >
          Make your choice and be The Winner
          </h1>
          <div className="flex gap-4 my-8">
            {!isAuthenticated && (
              <>
                <Link
                  to="/sign-up"
                  className="bg-[#9694FF] font-semibold hover:bg-[#3D3BF3] rounded-md px-4 flex items-center py-2 text-white  transition-all duration-300"
                >
                  Sign Up
                </Link>
                <Link
                  to={"/login"}
                  className="text-[#9694FF] bg-transparent border-2 border-[#9694FF] hover:bg-[#3D3BF3] hover:text-[#ffffff] font-semibold text-xl  rounded-md px-4 flex items-center py-2 transition-all duration-300"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">How it works</h3>
          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap w-full">
            {howItWorks.map((element) => {
              return (
                <div
                  key={element.title}
                  className="bg-white flex flex-col gap-2 p-2 rounded-md h-[96px] justify-center md:w-[48%] lg:w-[47%] 2xl:w-[24%] hover:shadow-md transition-all duration-300"
                >
                  <h5 className="font-bold">{element.title}</h5>
                  <p>{element.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        <FeaturedAuctions />
        <UpcomingAuctions />
        <Leaderboard />
      </section>
    </>
  );
};

export default Home;