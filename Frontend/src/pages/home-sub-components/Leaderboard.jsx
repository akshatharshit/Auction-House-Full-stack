import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const { leaderboard } = useSelector((state) => state.user);

  const getRankEmoji = (rank) => {
    const medals = ["🥇", "🥈", "🥉"];
    return medals[rank] || `${rank + 1}`;
  };

  return (
    <section className="my-12 px-4 md:px-8 lg:px-16">
      <div className="mb-6 flex flex-col min-[340px]:flex-row min-[340px]:gap-2 items-start sm:items-center">
        <h3 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          Top 10
        </h3>
        <h3 className="text-3xl font-extrabold text-[#3D3BF3] tracking-tight ml-2">
          Bidders Leaderboard
        </h3>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-md bg-white border border-[#3D3BF3]">
        <table className="min-w-full text-sm md:text-base">
          <thead className="bg-[#F5F7FF] text-gray-700 font-semibold">
            <tr>
              <th className="py-3 px-4 text-left">Rank</th>
              <th className="py-3 px-4 text-left">Profile</th>
              <th className="py-3 px-4 text-left">Username</th>
              <th className="py-3 px-4 text-left">Bid Expenditure</th>
              <th className="py-3 px-4 text-left">Auctions Won</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {leaderboard.slice(0, 10).map((element, index) => (
              <tr
                key={element._id}
                className="hover:bg-gray-50 border-b transition-all duration-200"
              >
                <td className="py-3 px-4 font-bold text-xl">
                  {getRankEmoji(index)}
                </td>
                <td className="py-3 px-4">
                  <img
                    src={element.profileImage?.url}
                    alt={element.userName}
                    className="h-12 w-12 object-cover rounded-full border-2 border-[#3D3BF3]"
                  />
                </td>
                <td className="py-3 px-4">{element.userName}</td>
                <td className="py-3 px-4">₹{element.moneySpent}</td>
                <td className="py-3 px-4">{element.auctionsWon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          to="/leaderboard"
          className="px-6 py-3 rounded-lg text-lg font-semibold border-2 border-[#3D3BF3] text-[#3D3BF3] hover:bg-[#3D3BF3] hover:text-white transition-all duration-300"
        >
          View Full Leaderboard
        </Link>
      </div>
    </section>
  );
};

export default Leaderboard;
