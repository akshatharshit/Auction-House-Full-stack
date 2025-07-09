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
    <section className="w-full px-5 pt-24 flex flex-col min-h-screen bg-gradient-to-br from-[#3D3BF3] via-[#9694FF] to-[#EBEAFF]">
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white shadow-xl mx-auto w-full max-w-5xl p-8 rounded-2xl border border-gray-200">
          <div className="flex flex-col items-center gap-4 mb-10">
            <img
              src={user.profileImage?.url}
              alt="User Avatar"
              className="w-36 h-36 rounded-full border-4 border-[#3D3BF3] shadow-md object-cover"
            />
            <h2 className="text-3xl font-extrabold text-gray-800">{user.userName || "User"}</h2>
          </div>

          {/* Personal Details */}
          <Section title="Personal Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Username" value={user.userName} />
              <InputField label="Email" value={user.email} />
              <InputField label="Phone" value={user.phone} />
              <InputField label="Address" value={user.address} />
              <InputField label="Role" value={user.role} />
              <InputField label="Joined On" value={user.createdAt?.substring(0, 10)} />
            </div>
          </Section>

          {/* Payment Methods */}
          {user.role === "Auctioneer" && (
            <Section title="Payment Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Bank Name" value={user.paymentMethods.bankTransfer.bankName} />
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
            </Section>
          )}

          {/* Other Details */}
          <Section title="Other User Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.role === "Auctioneer" && (
                <InputField label="Unpaid Commissions" value={user.unpaidCommission} />
              )}
              {user.role === "Bidder" && (
                <>
                  <InputField label="Auctions Won" value={user.auctionsWon} />
                  <InputField label="Money Spent" value={`$${user.moneySpent}`} />
                </>
              )}
            </div>
          </Section>
        </div>
      )}
    </section>
  );
};

const Section = ({ title, children }) => (
  <section className="mb-10">
    <h3 className="text-2xl md:text-3xl font-semibold text-[#3D3BF3] border-l-4 border-[#FF2929] pl-4 mb-4">
      {title}
    </h3>
    {children}
  </section>
);

const InputField = ({ label, value }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-600 mb-1">{label}</label>
    <input
      type="text"
      value={value || "N/A"}
      disabled
      className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3D3BF3]"
    />
  </div>
);

export default UserProfile;
