import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { deleteAuction, republishAuction } from "@/store/slices/auctionSlice";

const CardTwo = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDifference = new Date(startTime) - now;
    const endDifference = new Date(endTime) - now;
    let timeLeft = {};

    if (startDifference > 0) {
      timeLeft = {
        type: "Starts In",
        days: Math.floor(startDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDifference / 1000 / 60) % 60),
        seconds: Math.floor((startDifference / 1000) % 60),
      };
    } else if (endDifference > 0) {
      timeLeft = {
        type: "Ends In",
        days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDifference / 1000 / 60) % 60),
        seconds: Math.floor((endDifference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, "0");
    return `(${days}d) ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const dispatch = useDispatch();
  const handleDeleteAuction = () => dispatch(deleteAuction(id));

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col overflow-hidden sm:w-64 md:w-72 lg:w-80">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-48 object-cover rounded-t-2xl"
        />
        <div className="p-4 flex flex-col gap-2">
          <h5 className="text-xl font-semibold text-gray-800 group-hover:text-[#d6482b] transition">
            {title}
          </h5>
          {startingBid && (
            <p className="text-gray-600 text-sm">
              Starting Bid:
              <span className="ml-1 text-[#fdba88] font-semibold">
                ₹{startingBid}
              </span>
            </p>
          )}
          {timeLeft.type && (
            <p className="text-gray-600 text-sm">
              {timeLeft.type}{" "}
              <span className="ml-1 text-[#5D3FD3] font-semibold">
                {Object.keys(timeLeft).length > 1
                  ? formatTimeLeft(timeLeft)
                  : "Time's up!"}
              </span>
            </p>
          )}

          <div className="flex flex-col gap-2 mt-4">
            <Link
              to={`/auction/details/${id}`}
              className="bg-slate-700 text-white text-center py-2 rounded-md text-[16px] font-medium hover:bg-black transition-all"
            >
              View Auction
            </Link>
            <button
              onClick={handleDeleteAuction}
              className="bg-red-500 text-white text-center py-2 rounded-md text-[16px] font-medium hover:bg-red-700 transition-all"
            >
              Delete Auction
            </button>
            <button
              disabled={new Date(endTime) > Date.now()}
              onClick={() => setOpenDrawer(true)}
              className={`text-white text-center py-2 rounded-md text-[16px] font-medium transition-all ${
                new Date(endTime) > Date.now()
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-sky-500 hover:bg-sky-700"
              }`}
            >
              Republish Auction
            </button>
          </div>
        </div>
      </div>

      <Drawer id={id} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </>
  );
};

export default CardTwo;


const Drawer = ({ setOpenDrawer, openDrawer, id }) => {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { loading } = useSelector((state) => state.auction);

  const handleRepublishAuction = () => {
    const formData = new FormData();
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(republishAuction(id, formData));
  };

  return (
    <section
      className={`fixed left-0 w-full h-full bg-black/50 z-40 transition-all duration-300 ease-in-out flex items-end ${
        openDrawer ? "bottom-0" : "-bottom-full"
      }`}
    >
      <div className="bg-white w-full sm:max-w-[640px] mx-auto rounded-t-2xl px-6 py-8">
        <h3 className="text-2xl font-bold text-[#d6482b] text-center mb-2">
          Republish Auction
        </h3>
        <p className="text-gray-600 text-center mb-6">
          Update start and end time to relist this auction.
        </p>
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Start Time
            </label>
            <DatePicker
              selected={startTime}
              onChange={(date) => setStartTime(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full border-b border-gray-400 py-2 px-1 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              End Time
            </label>
            <DatePicker
              selected={endTime}
              onChange={(date) => setEndTime(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full border-b border-gray-400 py-2 px-1 focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={handleRepublishAuction}
            className="w-full bg-blue-500 text-white font-medium text-lg py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? "Republishing..." : "Republish"}
          </button>
          <button
            type="button"
            onClick={() => setOpenDrawer(false)}
            className="w-full bg-yellow-500 text-white font-medium text-lg py-2 rounded-md hover:bg-yellow-600 transition"
          >
            Cancel
          </button>
        </form>
      </div>
    </section>
  );
};
