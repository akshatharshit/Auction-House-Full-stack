import Card from "@/custom-components/Card";
import React from "react";
import { useSelector } from "react-redux";

const FeaturedAuctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);

  return (
    <section className="my-12 px-4 md:px-8 lg:px-16 py-10 bg-gradient-to-br from-[#F5F5FF] to-[#EBEAFF] rounded-xl shadow-inner">
      <div className="max-w-screen-xl mx-auto">
        <h3 className="text-center text-3xl md:text-4xl font-extrabold text-[#4A00E0] mb-10 tracking-tight">
          🏆 Featured Auctions
        </h3>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allAuctions.slice(0, 8).map((element) => (
            <div
              key={element._id}
              className="transition-transform duration-300 hover:scale-[1.02]"
            >
              <Card
                title={element.title}
                imgSrc={element.image?.url}
                startTime={element.startTime}
                endTime={element.endTime}
                startingBid={element.startingBid}
                id={element._id}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedAuctions;
