import Spinner from "@/custom-components/Spinner";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <section className="w-full px-5 pt-20 flex flex-col min-h-screen  bg-[#9694FF]">
        {loading ? (
          <Spinner />
        ) : (
          <div className="shadow-lg mx-auto w-full max-w-4xl p-6 rounded-lg bg-[#EBEAFF]">
            <div className="flex flex-col items-center gap-4">
              <img
                src={user.profileImage?.url}
                alt="User Avatar"
                className="w-36 h-36 rounded-full border-4 border-[#3D3BF3] shadow-sm"
              />
              <h2 className="text-2xl font-bold text-gray-800">
                {user.userName || "User"}
              </h2>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-12">
                Personal Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Username" value={user.userName} />
                <InputField label="Email" value={user.email} />
                <InputField label="Phone" value={user.phone} />
                <InputField label="Address" value={user.address} />
                <InputField label="Role" value={user.role} />
                <InputField
                  label="Joined On"
                  value={user.createdAt?.substring(0, 10)}
                />
              </div>
            </div>

            {user.role === "Auctioneer" && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Payment Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Bank Name"
                    value={user.paymentMethods.bankTransfer.bankName}
                  />
                  <InputField
                    label="Bank Account (IBAN)"
                    value={user.paymentMethods.bankTransfer.bankAccountNumber}
                  />
                  <InputField
                    label="Account Name"
                    value={user.paymentMethods.bankTransfer.bankAccountName}
                  />
                  <InputField
                    label="Easypaisa Account Number"
                    value={user.paymentMethods.easypaisa.easypaisaAccountNumber}
                  />
                  <InputField
                    label="Paypal Email"
                    value={user.paymentMethods.paypal.paypalEmail}
                  />
                </div>
              </div>
            )}

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Other User Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user.role === "Auctioneer" && (
                  <InputField
                    label="Unpaid Commissions"
                    value={user.unpaidCommission}
                  />
                )}
                {user.role === "Bidder" && (
                  <>
                    <InputField label="Auctions Won" value={user.auctionsWon} />
                    <InputField label="Money Spent" value={user.moneySpent} />
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

const InputField = ({ label, value }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <input
      type="text"
      value={value || "N/A"}
      className="w-full px-4 py-2 border rounded-md shadow-sm bg-gray-100 text-gray-700 focus:outline-none focus:ring focus:ring-[#3D3BF3]"
      disabled
    />
  </div>
);

export default UserProfile;
