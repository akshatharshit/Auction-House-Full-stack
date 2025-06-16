import Card from "@/custom-components/Card";
import Spinner from "@/custom-components/Spinner";
import React from "react";
import { useSelector } from "react-redux";

const Auctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <article className="w-full ml-0 m-0 h-fit px-5 pt-20  flex flex-col bg-[#9694FF]">
          <section className="my-8 ">
            <h1
              className={`text-[#FF2929] text-1xl font-bold mb-4 min-[240px]:text-2xl md:text-3xl xl:text-3xl 1xl:text-4xl`}
            >
              Auctions
            </h1>
            <div className="flex flex-wrap gap-6 text-[#3D3BF3] bg-[#EBEAFF]">
              {allAuctions.map((element) => (
                <Card
                  title={element.title}
                  startTime={element.startTime}
                  endTime={element.endTime}
                  imgSrc={element.image?.url}
                  startingBid={element.startingBid}
                  id={element._id}
                  key={element._id}
                />
              ))}
            </div>
          </section>
        </article>
      )}
    </>
  );
};

export default Auctions;