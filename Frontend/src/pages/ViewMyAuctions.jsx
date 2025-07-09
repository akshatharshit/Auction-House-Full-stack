import CardTwo from "@/custom-components/CardTwo";
import Spinner from "@/custom-components/Spinner";
import { getMyAuctionItems } from "@/store/slices/auctionSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewMyAuctions = () => {
  const { myAuctions, loading } = useSelector((state) => state.auction);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
    dispatch(getMyAuctionItems());
  }, [dispatch, isAuthenticated]);

  return (
    <>
      <section className="w-full min-h-screen bg-gradient-to-br from-[#EBEAFF] to-[#9694FF] px-5 pt-24 pb-10">
        <div className="max-w-7xl mx-auto flex flex-col">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#FF2929] border-l-4 border-[#3D3BF3] pl-4">
              My Auctions
            </h1>
            <p className="text-gray-700 mt-2 text-lg">
              View and manage all items you have posted for auction.
            </p>
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${
                myAuctions.length === 0 && "justify-center"
              }`}
            >
              {myAuctions.length > 0 ? (
                myAuctions.map((element) => (
                  <CardTwo
                    key={element._id}
                    title={element.title}
                    startingBid={element.startingBid}
                    endTime={element.endTime}
                    startTime={element.startTime}
                    imgSrc={element.image?.url}
                    id={element._id}
                  />
                ))
              ) : (
                <div className="col-span-full text-center mt-10">
                  <h3 className="text-2xl font-semibold text-gray-600">
                    You have not posted any auction yet.
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Start by posting your first item to auction!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ViewMyAuctions;
