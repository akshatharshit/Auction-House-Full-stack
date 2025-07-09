import { deleteAuctionItem } from "@/store/slices/superAdminSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AuctionItemDelete = () => {
  const { allAuctions } = useSelector((state) => state.auction);
  const dispatch = useDispatch();

  const handleAuctionDelete = (id) => {
    dispatch(deleteAuctionItem(id));
  };

  return (
    <div className="overflow-x-auto mb-10 border rounded-lg shadow-sm">
      <table className="min-w-full bg-white border-collapse">
        <thead className="bg-[#3D3BF3] text-white">
          <tr>
            <th className="py-3 px-6 text-left text-sm font-semibold">Image</th>
            <th className="py-3 px-6 text-left text-sm font-semibold">Title</th>
            <th className="py-3 px-6 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 text-sm">
          {allAuctions.length > 0 ? (
            allAuctions.map((element, index) => (
              <tr
                key={element._id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-3 px-6">
                  <img
                    src={element.image?.url}
                    alt={element.title}
                    className="h-12 w-12 object-cover rounded-md shadow"
                  />
                </td>
                <td className="py-3 px-6 font-medium">{element.title}</td>
                <td className="py-3 px-6 flex gap-2">
                  <Link
                    to={`/auction/details/${element._id}`}
                    className="px-4 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200 shadow-sm"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleAuctionDelete(element._id)}
                    className="px-4 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 transition duration-200 shadow-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="py-5 px-6 text-center text-lg text-gray-500 italic">
                No auctions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AuctionItemDelete;
