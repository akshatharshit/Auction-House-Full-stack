import {
  deletePaymentProof,
  getSinglePaymentProofDetail,
  updatePaymentProof,
} from "@/store/slices/superAdminSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PaymentProofs = () => {
  const { paymentProofs, singlePaymentProof } = useSelector(
    (state) => state.superAdmin
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();

  const handlePaymentProofDelete = (id) => {
    dispatch(deletePaymentProof(id));
  };

  const handleFetchPaymentDetail = (id) => {
    dispatch(getSinglePaymentProofDetail(id));
  };

  useEffect(() => {
    if (singlePaymentProof && Object.keys(singlePaymentProof).length > 0) {
      setOpenDrawer(true);
    }
  }, [singlePaymentProof]);

  return (
    <>
      <div className="overflow-x-auto mt-8 border rounded-md shadow-md bg-white">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-[#2D2E3E] text-white uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">User ID</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paymentProofs.length > 0 ? (
              paymentProofs.map((element, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-6 py-4 font-medium">{element.userId}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        element.status === "Approved"
                          ? "bg-green-100 text-green-600"
                          : element.status === "Rejected"
                          ? "bg-red-100 text-red-600"
                          : element.status === "Settled"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {element.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center space-x-3">
                    <button
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-800 transition"
                      onClick={() => handleFetchPaymentDetail(element._id)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-800 transition"
                      onClick={() => handlePaymentProofDelete(element._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-5 text-blue-600 font-medium"
                >
                  No payment proofs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Drawer setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
    </>
  );
};

export default PaymentProofs;

export const Drawer = ({ setOpenDrawer, openDrawer }) => {
  const { singlePaymentProof, loading } = useSelector(
    (state) => state.superAdmin
  );
  const [amount, setAmount] = useState(singlePaymentProof.amount || "");
  const [status, setStatus] = useState(singlePaymentProof.status || "");

  const dispatch = useDispatch();

  const handlePaymentProofUpdate = () => {
    dispatch(updatePaymentProof(singlePaymentProof._id, status, amount));
  };

  return (
    <section
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-all duration-300 ${
        openDrawer && singlePaymentProof.userId
          ? "opacity-100 visible"
          : "opacity-0 invisible"
      }`}
    >
      <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-xl shadow-xl p-6 sm:max-w-[640px] sm:mx-auto">
        <h3 className="text-2xl font-semibold text-center text-[#D6482B] mb-1">
          Update Payment Proof
        </h3>
        <p className="text-sm text-gray-600 mb-5 text-center">
          You can update the payment status and amount.
        </p>

        <form className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-700 mb-1 block">User ID</label>
            <input
              type="text"
              value={singlePaymentProof.userId || ""}
              disabled
              className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-100 text-gray-600"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 mb-1 block">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 mb-1 block">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Settled">Settled</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-700 mb-1 block">Comment</label>
            <textarea
              rows="4"
              value={singlePaymentProof.comment || ""}
              disabled
              className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-100 text-gray-600"
            />
          </div>

          <Link
            to={singlePaymentProof.proof?.url || ""}
            target="_blank"
            className="block w-full bg-[#D6482B] text-white text-center py-2 rounded-md hover:bg-[#b8381e] transition-all"
          >
            View Payment Proof
          </Link>

          <button
            type="button"
            onClick={handlePaymentProofUpdate}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-800 transition"
          >
            {loading ? "Updating..." : "Update Payment Proof"}
          </button>

          <button
            type="button"
            onClick={() => setOpenDrawer(false)}
            className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </form>
      </div>
    </section>
  );
};
