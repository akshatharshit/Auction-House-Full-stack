import {
  clearAllSuperAdminSliceErrors,
  getAllPaymentProofs,
  getAllUsers,
  getMonthlyRevenue,
} from "@/store/slices/superAdminSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuctionItemDelete from "./sub-components/AuctionItemDelete";
import BiddersAuctioneersGraph from "./sub-components/BiddersAuctioneersGraph";
import PaymentGraph from "./sub-components/PaymentGraph";
import PaymentProofs from "./sub-components/PaymentProofs";
import Spinner from "@/custom-components/Spinner";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.superAdmin);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    dispatch(getMonthlyRevenue());
    dispatch(getAllUsers());
    dispatch(getAllPaymentProofs());
    dispatch(clearAllSuperAdminSliceErrors());
  }, []);

  useEffect(() => {
    if (user.role !== "Super Admin" || !isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full min-h-screen px-4 pt-24 pb-10  bg-[#f9f9fb] text-gray-800 flex justify-center">
          <div className="w-full max-w-6xl flex flex-col gap-14">
            <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3D3BF3] to-[#FF2929]">
              Super Admin Dashboard
            </h1>

            <section className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold text-[#3D3BF3] mb-4">
                Monthly Total Payments Received
              </h2>
              <PaymentGraph />
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold text-[#3D3BF3] mb-4">
                User Statistics
              </h2>
              <BiddersAuctioneersGraph />
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold text-[#3D3BF3] mb-4">
                Payment Proofs
              </h2>
              <PaymentProofs />
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold text-[#3D3BF3] mb-4">
                Delete Items From Auction
              </h2>
              <AuctionItemDelete />
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
