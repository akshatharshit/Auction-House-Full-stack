import Spinner from "@/custom-components/Spinner";
import { getAuctionDetail } from "@/store/slices/auctionSlice";
import React, { useEffect } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewAuctionDetails = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector((state) => state.auction);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated || user.role === "Bidder") {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated]);

  return (
    <>
      <section className="w-full ml-0 m-0 min-h-screen px-5 pt-20 pb-10 bg-gradient-to-br from-[#EBEAFF] to-[#9694FF]">
        <div className="text-sm sm:text-base flex flex-wrap gap-2 items-center text-gray-700 font-medium mb-6">
          <Link to="/" className="hover:text-[#FF2929] transition-colors">Home</Link>
          <FaGreaterThan className="text-stone-400" />
          <Link to={"/view-my-auctions"} className="hover:text-[#FF2929] transition-colors">My Auctions</Link>
          <FaGreaterThan className="text-stone-400" />
          <p className="text-[#3D3BF3] font-semibold">{auctionDetail.title}</p>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col 2xl:flex-row gap-8">
            {/* Auction Details Section */}
            <div className="flex-1 bg-white rounded-2xl p-6 shadow-2xl border border-[#dcdcff] flex flex-col gap-6">
              <h2 className="text-[#3D3BF3] text-2xl font-bold border-l-4 border-[#FF2929] pl-3">Auction Overview</h2>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="bg-gray-100 rounded-lg border border-gray-300 p-4 w-full lg:w-40 lg:h-40 flex justify-center items-center">
                  <img src={auctionDetail.image?.url} alt={auctionDetail.title} className="object-contain h-full" />
                </div>
                <div className="flex flex-col justify-between gap-2">
                  <h3 className="text-[#FF2929] text-xl sm:text-2xl font-bold">{auctionDetail.title}</h3>
                  <p className="text-lg text-gray-800 font-medium">
                    Condition: <span className="text-[#3D3BF3]">{auctionDetail.condition}</span>
                  </p>
                  <p className="text-lg text-gray-800 font-medium">
                    Minimum Bid: <span className="text-[#3D3BF3]">Rs.{auctionDetail.startingBid}</span>
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-gray-800 mt-4 mb-2">Auction Item Description</h4>
                <hr className="mb-3 border-t border-gray-300" />
                {auctionDetail.description &&
                  auctionDetail.description.split(". ").map((element, index) => (
                    <li key={index} className="text-base text-gray-700 mb-2 pl-2">{element}</li>
                  ))}
              </div>
            </div>

            {/* Bidding Section */}
            <div className="flex-1 bg-white rounded-2xl shadow-2xl border border-[#dcdcff] overflow-hidden">
              <header className="bg-[#3D3BF3] text-white py-4 px-6 text-2xl font-bold border-b border-blue-100">
                Bids
              </header>
              <div className="px-4 py-4 min-h-fit lg:min-h-[650px]">
                {auctionBidders &&
                auctionBidders.length > 0 &&
                new Date(auctionDetail.startTime) < Date.now() &&
                new Date(auctionDetail.endTime) > Date.now() ? (
                  auctionBidders.map((element, index) => (
                    <div key={index} className="py-4 flex items-center justify-between border-b border-gray-200">
                      <div className="flex flex-1 items-center gap-4">
                        <img
                          src={element.profileImage}
                          alt={element.userName}
                          className="w-12 h-12 rounded-full shadow-md border border-gray-300 hidden md:block"
                        />
                        <p className="text-[18px] font-medium text-gray-800">{element.userName}</p>
                      </div>
                      <p className="flex-1 text-center text-gray-700 font-semibold">
                        Rs.{element.amount}
                      </p>
                      {index === 0 ? (
                        <p className="text-[18px] font-bold text-green-600 flex-1 text-end">1st</p>
                      ) : index === 1 ? (
                        <p className="text-[18px] font-bold text-blue-600 flex-1 text-end">2nd</p>
                      ) : index === 2 ? (
                        <p className="text-[18px] font-bold text-yellow-600 flex-1 text-end">3rd</p>
                      ) : (
                        <p className="text-[18px] font-bold text-gray-600 flex-1 text-end">{index + 1}th</p>
                      )}
                    </div>
                  ))
                ) : Date.now() < new Date(auctionDetail.startTime) ? (
                  <img
                    src="/notStarted.png"
                    alt="not-started"
                    className="w-full max-h-[650px] object-contain"
                  />
                ) : (
                  <img
                    src="/auctionEnded.png"
                    alt="ended"
                    className="w-full max-h-[650px] object-contain"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ViewAuctionDetails;
