import Spinner from "@/custom-components/Spinner";
import React from "react";
import { useSelector } from "react-redux";

const Leaderboard = () => {
  const { loading, leaderboard } = useSelector((state) => state.user);

  return (
    <section className="w-full h-fit min-h-screen px-4 pt-20 pb-10 bg-gradient-to-br from-[#DAD8FF] via-[#C6C4FF] to-[#9694FF]">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="mb-8 text-center">
            <h1 className="text-[#FF2929] text-3xl md:text-4xl xl:text-5xl font-extrabold tracking-wide drop-shadow-sm">
              🏆 Bidders Leaderboard
            </h1>
            <p className="text-sm md:text-base text-gray-700 mt-2">
              Top 100 bidders based on their performance
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-xl shadow-lg ring-1 ring-gray-200">
            <table className="min-w-full text-sm md:text-base text-left border-separate border-spacing-y-2">
              <thead className="bg-[#EBEAFF] text-[#3D3BF3]">
                <tr>
                  <th className="py-3 px-6 rounded-tl-lg">#</th>
                  <th className="py-3 px-6">Profile</th>
                  <th className="py-3 px-6">Username</th>
                  <th className="py-3 px-6">Bid Expenditure</th>
                  <th className="py-3 px-6 rounded-tr-lg">Auctions Won</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {leaderboard.slice(0, 100).map((element, index) => (
                  <tr
                    key={element._id}
                    className="bg-white hover:bg-[#F5F7FF] transition duration-200 shadow-sm rounded-md"
                  >
                    <td className="py-3 px-6 font-semibold text-center text-[#3D3BF3]">
                      {index + 1}
                    </td>
                    <td className="py-3 px-6">
                      <img
                        src={element.profileImage?.url}
                        alt={element.userName || "Profile"}
                        className="h-10 w-10 object-cover rounded-full border border-gray-300 shadow-sm"
                      />
                    </td>
                    <td className="py-3 px-6 font-medium">{element.userName}</td>
                    <td className="py-3 px-6 font-semibold text-[#D6482B]">
                      ${element.moneySpent.toLocaleString()}
                    </td>
                    <td className="py-3 px-6 font-bold text-green-600">
                      {element.auctionsWon}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export default Leaderboard;
