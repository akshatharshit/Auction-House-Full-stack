import React from "react";
import Work from "./LottieWork";
import {
  FaUser,
  FaGavel,
  FaEnvelope,
  FaDollarSign,
  FaFileInvoice,
  FaRedo,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUser />,
      title: "User Registration",
      description:
        "Users must register or log in to post auctions, place bids, access their dashboard, and send payment proof.",
    },
    {
      icon: <FaGavel />,
      title: "Role Selection",
      description:
        'Users choose to register as a "Bidder" or "Auctioneer." Bidders can bid, and Auctioneers can post items.',
    },
    {
      icon: <FaEnvelope />,
      title: "Winning Bid Notification",
      description:
        "Winners receive an email with the Auctioneer's payment details including bank, Easypaisa, and PayPal.",
    },
    {
      icon: <FaDollarSign />,
      title: "Commission Payment",
      description:
        "Auctioneers must pay 5% commission after the Bidder pays. Delays block new posts and can lead to legal notice.",
    },
    {
      icon: <FaFileInvoice />,
      title: "Proof of Payment",
      description:
        "Payment proofs are sent via screenshots. Once verified, any unpaid commissions are adjusted by admin.",
    },
    {
      icon: <FaRedo />,
      title: "Reposting Items",
      description:
        "If a Bidder doesn't pay, Auctioneers may repost the item at no additional cost.",
    },
  ];

  return (
    <section className="w-full min-h-screen pt-24 pb-16 px-6 bg-gradient-to-br from-[#9694FF] via-[#A6A4FF] to-[#C6C4FF]">
      <div className="flex justify-center mb-10">
        <div className="w-[360px] sm:w-[420px] h-[260px] sm:h-[300px]">
          <Work />
        </div>
      </div>

      <h1 className="text-center text-[#FF2929] text-2xl sm:text-3xl md:text-4xl font-extrabold mb-10">
        Discover How AuctionHouse Operates
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {steps.map((element, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md flex flex-col gap-3 group hover:bg-[#3D3BF3] transition-all duration-300"
          >
            <div className="bg-black text-white p-4 text-2xl rounded-full w-fit group-hover:bg-[#FF2929] transition-all duration-300">
              {element.icon}
            </div>
            <h3 className="text-[#3D3BF3] group-hover:text-white text-xl font-bold">
              {element.title}
            </h3>
            <p className="text-gray-700 text-base group-hover:text-white transition-all duration-300 leading-relaxed">
              {element.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
