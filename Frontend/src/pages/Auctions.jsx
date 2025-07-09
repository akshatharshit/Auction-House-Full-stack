import React from "react";
import { useSelector } from "react-redux";
import Card from "@/custom-components/Card";
import Spinner from "@/custom-components/Spinner";

const Auctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen bg-[#EBEAFF]">
          <Spinner />
        </div>
      ) : (
        <main className="min-h-screen w-full bg-gradient-to-br from-[#EBEAFF] via-[#DAD8FF] to-[#C6C4FF] px-4 py-20 md:px-8 lg:px-16">
          <section className="max-w-screen-xl mx-auto">
            {/* Header */}
            <header className="mb-14 text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] tracking-tight drop-shadow-sm">
                🛍️ Live & Upcoming Auctions
              </h1>
              <p className="text-gray-700 mt-4 text-lg font-medium max-w-2xl mx-auto">
                Browse all ongoing and scheduled auctions with exciting opportunities to place your bids.
              </p>
            </header>

            {/* Auction Cards */}
            {allAuctions.length > 0 ? (
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {allAuctions.map((element) => (
                  <div
                    key={element._id}
                    className="transition-transform duration-300 hover:scale-[1.02]"
                  >
                    <Card
                      title={element.title}
                      startTime={element.startTime}
                      endTime={element.endTime}
                      imgSrc={element.image?.url}
                      startingBid={element.startingBid}
                      id={element._id}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 text-lg mt-20 font-semibold">
                🚫 No auctions available at the moment. Please check back later!
              </p>
            )}
          </section>
        </main>
      )}
    </>
  );
};

export default Auctions;
