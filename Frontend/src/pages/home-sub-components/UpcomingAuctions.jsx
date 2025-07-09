import React from "react";
import { RiAuctionFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UpcomingAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);
  const todayString = new Date().toDateString();

  const auctionsStartingToday = allAuctions.filter((item) => {
    const auctionDate = new Date(item.startTime);
    return auctionDate.toDateString() === todayString;
  });

  return (
    <section className="my-12 px-4 md:px-8 lg:px-16">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">
        🕒 Auctions For Today
      </h3>

      <div className="flex flex-wrap gap-6">
        <div className="bg-[#FF2929] text-white w-full lg:flex-1 p-6 rounded-xl flex flex-col justify-between shadow-lg">
          <span className="rounded-full bg-[#3D3BF3] w-fit p-3 text-white text-xl">
            <RiAuctionFill />
          </span>
          <div>
            <h3 className="text-white text-2xl font-semibold mt-4">Auctions For</h3>
            <h3 className="text-white text-2xl font-semibold">Today</h3>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full lg:flex-1 2xl:basis-64">
          {auctionsStartingToday.slice(0, 2).map((element) => (
            <Link
              to={`/auction/item/${element._id}`}
              key={element._id}
              className="w-full flex flex-col gap-3 bg-[#3D3BF3] text-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <img
                  src={element.image?.url}
                  alt={element.title}
                  className="w-16 h-16 rounded-md object-cover border-2 border-white"
                />
                <p className="text-sm font-medium line-clamp-2">{element.title}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-white font-medium">Starting Bid:</p>
                <p className="text-orange-300 font-bold">₹{element.startingBid}</p>
              </div>
              <div>
                <p className="text-white font-medium">Starting Time:</p>
                <p className="text-sm">{new Date(element.startTime).toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4 w-full lg:flex-1 2xl:basis-64">
          {auctionsStartingToday.slice(2, 4).map((element) => (
            <Link
              to={`/auction/item/${element._id}`}
              key={element._id}
              className="w-full flex flex-col gap-3 bg-[#3D3BF3] text-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <img
                  src={element.image?.url}
                  alt={element.title}
                  className="w-16 h-16 rounded-md object-cover border-2 border-white"
                />
                <p className="text-sm font-medium line-clamp-2">{element.title}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-white font-medium">Starting Bid:</p>
                <p className="text-orange-300 font-bold">₹{element.startingBid}</p>
              </div>
              <div>
                <p className="text-white font-medium">Starting Time:</p>
                <p className="text-sm">{new Date(element.startTime).toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4 w-full lg:flex-1 2xl:basis-64">
          {auctionsStartingToday.slice(4, 6).map((element) => (
            <Link
              to={`/auction/item/${element._id}`}
              key={element._id}
              className="w-full flex flex-col gap-3 bg-[#3D3BF3] text-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <img
                  src={element.image?.url}
                  alt={element.title}
                  className="w-16 h-16 rounded-md object-cover border-2 border-white"
                />
                <p className="text-sm font-medium line-clamp-2">{element.title}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-white font-medium">Starting Bid:</p>
                <p className="text-orange-300 font-bold">₹{element.startingBid}</p>
              </div>
              <div>
                <p className="text-white font-medium">Starting Time:</p>
                <p className="text-sm">{new Date(element.startTime).toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingAuctions;
