import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeaturedAuctions from "./home-sub-components/FeaturedAuctions";
import UpcomingAuctions from "./home-sub-components/UpcomingAuctions";
import Leaderboard from "./home-sub-components/Leaderboard";
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
      <section className="w-full h-fit min-h-screen bg-gradient-to-br from-[#EBEAFF] to-[#9694FF] px-6 pt-24 pb-12 flex flex-col justify-center">

        {/* Logo Animation */}
        <center> <div className="w-84 h-64 max-w-[90%] max-h-[80%] overflow-hidden flex justify-center items-center"> <MyAnimation className="w-full h-full object-contain" /> </div> </center>

        {/* Heading & Buttons */}
        <div className="text-center mt-6">
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-extrabold text-[#FF2929] tracking-wide drop-shadow-md mb-2">
            Make your choice and be The Winner
          </h1>
          <p className="text-gray-700 text-md md:text-lg font-medium mt-2">
            Join our vibrant bidding platform and win exclusive auctions daily.
          </p>

          <div className="flex gap-4 justify-center mt-8">
            {!isAuthenticated && (
              <>
                <Link
                  to="/sign-up"
                  className="bg-[#9694FF] hover:bg-[#3D3BF3] text-white font-semibold text-lg px-6 py-2 rounded-md shadow-md transition-all duration-300"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-[#9694FF] hover:bg-[#3D3BF3] hover:text-white text-[#9694FF] font-semibold text-lg px-6 py-2 rounded-md transition-all duration-300"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <h3 className="text-[#3D3BF3] text-2xl md:text-3xl font-bold mb-6 border-l-4 border-[#FF2929] pl-3">
            How It Works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step) => (
              <div
                key={step.title}
                className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <h5 className="text-lg font-bold text-[#FF2929] mb-1">
                  {step.title}
                </h5>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Sections */}
        <div className="mt-20">
          <FeaturedAuctions />
          <UpcomingAuctions />
          <Leaderboard />
        </div>
      </section>
    </>
  );
};

export default Home;
