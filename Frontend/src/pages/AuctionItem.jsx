import Spinner from "@/custom-components/Spinner";
import { getAuctionDetail } from "@/store/slices/auctionSlice";
import { placeBid } from "@/store/slices/bidSlice";
import React, { useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const AuctionItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const [amount, setAmount] = useState(0);

  const handleBid = () => {
    const formData = new FormData();
    formData.append("amount", amount);
    dispatch(placeBid(id, formData));
    dispatch(getAuctionDetail(id));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated]);

  return (
    <section className="w-full px-5 pt-20 min-h-screen bg-gradient-to-br from-[#A2A0F7] to-[#EBEAFF]">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm breadcrumbs text-base font-medium text-white">
        <ul className="flex items-center space-x-2">
          <li>
            <Link to="/" className="hover:text-[#FFD700]">Home</Link>
          </li>
          <FaGreaterThan className="text-white" />
          <li>
            <Link to="/auctions" className="hover:text-[#FFD700]">Auctions</Link>
          </li>
          <FaGreaterThan className="text-white" />
          <li className="text-stone-100 truncate max-w-[180px]">{auctionDetail?.title}</li>
        </ul>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Auction Info */}
          <div className="flex-1 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 flex flex-col gap-5">
            <div className="flex gap-6 flex-col lg:flex-row">
              <div className="w-full lg:w-48 lg:h-48 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={auctionDetail.image?.url}
                  alt={auctionDetail.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-between">
                <h3 className="text-2xl font-bold text-[#3D3BF3] mb-2">
                  {auctionDetail.title}
                </h3>
                <p className="text-lg text-gray-800 font-medium">
                  Condition: <span className="text-[#FF2929]">{auctionDetail.condition}</span>
                </p>
                <p className="text-lg text-gray-800 font-medium">
                  Minimum Bid: <span className="text-[#FF2929]">Rs.{auctionDetail.startingBid}</span>
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-xl font-semibold text-[#3D3BF3] mb-2">Description</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-[17px]">
                {auctionDetail.description &&
                  auctionDetail.description.split(". ").map((element, index) => (
                    <li key={index}>{element}</li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Right Side - Bidders and Bidding */}
          <div className="flex-1 space-y-5">
            {/* Bidder List */}
            <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg">
              <header className="bg-[#3D3BF3] text-white font-bold text-xl py-4 px-6 rounded-t-xl">
                BIDS
              </header>
              <div className="p-6 min-h-[400px]">
                {auctionBidders &&
                new Date(auctionDetail.startTime) < Date.now() &&
                new Date(auctionDetail.endTime) > Date.now() ? (
                  auctionBidders.length > 0 ? (
                    auctionBidders.map((element, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-gray-200"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={element.profileImage}
                            alt={element.userName}
                            className="w-10 h-10 rounded-full border hidden md:block"
                          />
                          <span className="font-medium">{element.userName}</span>
                        </div>
                        <span className={`font-bold text-lg ${
                          index === 0
                            ? "text-green-600"
                            : index === 1
                            ? "text-blue-600"
                            : index === 2
                            ? "text-yellow-600"
                            : "text-gray-600"
                        }`}>
                          {index === 0
                            ? "1st"
                            : index === 1
                            ? "2nd"
                            : index === 2
                            ? "3rd"
                            : `${index + 1}th`}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">No bids for this auction</p>
                  )
                ) : Date.now() < new Date(auctionDetail.startTime) ? (
                  <img src="/notStarted.png" alt="Not started" className="w-full max-h-[400px]" />
                ) : (
                  <img src="/auctionEnded.png" alt="Ended" className="w-full max-h-[400px]" />
                )}
              </div>
            </div>

            {/* Bid Input */}
            <div className="bg-[#FF2929] p-6 rounded-xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {Date.now() >= new Date(auctionDetail.startTime) &&
              Date.now() <= new Date(auctionDetail.endTime) ? (
                <>
                  <div className="flex items-center gap-4 flex-1">
                    <label htmlFor="bidAmount" className="text-white font-semibold text-lg">
                      Place Bid
                    </label>
                    <input
                      type="number"
                      id="bidAmount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="p-2 rounded-md focus:outline-none text-black w-32 sm:w-40"
                      placeholder="Enter amount"
                    />
                  </div>
                  <button
                    onClick={handleBid}
                    className="bg-black hover:bg-gray-800 transition-all p-3 rounded-full text-white text-xl"
                  >
                    <RiAuctionFill />
                  </button>
                </>
              ) : new Date(auctionDetail.startTime) > Date.now() ? (
                <p className="text-white text-center w-full font-semibold text-lg">
                  Auction has not started yet!
                </p>
              ) : (
                <p className="text-white text-center w-full font-semibold text-lg">
                  Auction has ended!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AuctionItem;
