import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDiff = new Date(startTime) - now;
    const endDiff = new Date(endTime) - now;

    if (startDiff > 0) {
      return {
        type: "Starts In",
        days: Math.floor(startDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDiff / 1000 / 60) % 60),
        seconds: Math.floor((startDiff / 1000) % 60),
      };
    } else if (endDiff > 0) {
      return {
        type: "Ends In",
        days: Math.floor(endDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDiff / 1000 / 60) % 60),
        seconds: Math.floor((endDiff / 1000) % 60),
      };
    }
    return {};
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

  return (
    <Link
      to={`/auction/item/${id}`}
      className="rounded-2xl shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 bg-white/90 backdrop-blur-sm border border-gray-200 flex flex-col overflow-hidden w-full sm:w-64 md:w-72 lg:w-80"
    >
      <img
        src={imgSrc}
        alt={title}
        className="w-full h-48 object-cover rounded-t-2xl"
      />
      <div className="p-5 flex flex-col justify-between gap-3 h-full">
        <h5 className="text-xl font-semibold text-gray-800 tracking-tight line-clamp-2 hover:text-[#FF5A5F] transition-colors duration-200">
          {title}
        </h5>

        {startingBid && (
          <p className="text-sm text-gray-600">
            Starting Bid:{" "}
            <span className="text-[#FF5A5F] font-semibold">₹{startingBid}</span>
          </p>
        )}

        {timeLeft.type && (
          <div className="text-sm flex items-center justify-between mt-1">
            <span className="text-gray-500">{timeLeft.type}</span>
            <span className="text-[#5D3FD3] font-bold">
              {Object.keys(timeLeft).length > 1
                ? formatTimeLeft(timeLeft)
                : "Time's up!"}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Card;
