import Spinner from "@/custom-components/Spinner";
import React from "react";
import { useSelector } from "react-redux";

const Leaderboard = () => {
  const { loading, leaderboard } = useSelector((state) => state.user);
  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20  flex flex-col min-h-screen bg-[#9694FF]">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5">
              <h1 className="text-[#FF2929] text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold">
                Bidders Leaderboard
              </h1>
            </div>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead className="bg-[#EFF6FF]">
                  <tr>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">
                      #
                    </th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">
                      Profile Pic
                    </th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">
                      Username
                    </th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">
                      Bid Expenditure
                    </th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">
                      Auctions Won
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-800 divide-y divide-gray-200">
                  {leaderboard.slice(0, 100).map((element, index) => (
                    <tr key={element._id} className="hover:bg-gray-100">
                      <td className="py-3 px-6 text-center font-medium">
                        {index + 1}
                      </td>
                      <td className="py-3 px-6 flex items-center gap-3">
                        <img
                          src={element.profileImage?.url}
                          alt={element.userName || "Profile"}
                          className="h-12 w-12 object-cover rounded-full border border-gray-300"
                        />
                      </td>
                      <td className="py-3 px-6 font-medium">
                        {element.userName}
                      </td>
                      <td className="py-3 px-6">
                        ${element.moneySpent.toLocaleString()}
                      </td>
                      <td className="py-3 px-6">{element.auctionsWon}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Leaderboard;
