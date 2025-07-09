import { register } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [upiId, setupiId] = useState("");
  const [paypalId, setPaypalId] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("profileImage", profileImage);
    if (role === "Auctioneer") {
      formData.append("bankAccountName", bankAccountName);
      formData.append("bankAccountNumber", bankAccountNumber);
      formData.append("bankName", bankName);
      formData.append("upiId", upiId);
      formData.append("paypalId", paypalId);
    }
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, loading, isAuthenticated]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setProfileImage(file);
    };
  };

  return (
    <section className="w-full flex items-center justify-center min-h-screen bg-gradient-to-br from-[#EBEAFF] to-[#E6E4FF] px-4 py-12">
      <div className="bg-white shadow-2xl w-full max-w-5xl rounded-xl px-6 py-10">
        <h1 className="text-4xl font-extrabold text-center text-[#3D3BF3] mb-8">Register</h1>
        <form onSubmit={handleRegister} className="space-y-8">
          <p className="font-semibold text-2xl text-[#3D3BF3]">Personal Details</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-base font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="mt-2 w-full px-3 py-2 border border-[#9694FF] rounded-lg focus:ring-2 focus:ring-[#3D3BF3] outline-none"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label className="text-base font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full px-3 py-2 border border-[#9694FF] rounded-lg focus:ring-2 focus:ring-[#3D3BF3] outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="text-base font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 w-full px-3 py-2 border border-[#9694FF] rounded-lg focus:ring-2 focus:ring-[#3D3BF3] outline-none"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div>
              <label className="text-base font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-2 w-full px-3 py-2 border border-[#9694FF] rounded-lg focus:ring-2 focus:ring-[#3D3BF3] outline-none"
                placeholder="Enter your address"
                required
              />
            </div>
            <div>
              <label className="text-base font-medium text-gray-700">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-2 w-full px-3 py-2 border border-[#9694FF] rounded-lg focus:ring-2 focus:ring-[#3D3BF3] outline-none"
              >
                <option value="">Select Role</option>
                <option value="Auctioneer">Auctioneer</option>
                <option value="Bidder">Bidder</option>
              </select>
            </div>
            <div>
              <label className="text-base font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full px-3 py-2 border border-[#9694FF] rounded-lg focus:ring-2 focus:ring-[#3D3BF3] outline-none"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-base font-medium text-gray-700">Profile Image</label>
            <div className="flex items-center gap-4 mt-2">
              <img
                src={profileImagePreview ? profileImagePreview : "/imageHolder.jpg"}
                alt="Preview"
                className="w-16 h-16 rounded-full border border-[#9694FF]"
              />
              <input
                type="file"
                onChange={imageHandler}
                className="text-sm text-[#3D3BF3] cursor-pointer"
              />
            </div>
          </div>

          {role === "Auctioneer" && (
            <div className="space-y-4">
              <p className="font-semibold text-2xl text-[#3D3BF3]">
                Payment Details (Auctioneer Only)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-base font-medium text-gray-700">Bank Name</label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="mt-2 w-full px-3 py-2 border border-[#9694FF] rounded-lg focus:ring-2 focus:ring-[#3D3BF3] outline-none"
                    placeholder="Enter your bank name"
                  />
                </div>
                <div>
                  <label className="text-base font-medium text-gray-700">Account Number</label>
                  <input
                    type="text"
                    value={bankAccountNumber}
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                    className="mt-2 w-full px-3 py-2 border border-[#9694FF] rounded-lg focus:ring-2 focus:ring-[#3D3BF3] outline-none"
                    placeholder="Enter account number"
                  />
                </div>
                <div>
                  <label className="text-base font-medium text-gray-700">UPI ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setupiId(e.target.value)}
                    className="mt-2 w-full px-3 py-2 border border-[#9694FF] rounded-lg focus:ring-2 focus:ring-[#3D3BF3] outline-none"
                    placeholder="Enter your UPI ID"
                  />
                </div>
                <div>
                  <label className="text-base font-medium text-gray-700">PayPal ID</label>
                  <input
                    type="email"
                    value={paypalId}
                    onChange={(e) => setPaypalId(e.target.value)}
                    className="mt-2 w-full px-3 py-2 border border-[#9694FF] rounded-lg focus:ring-2 focus:ring-[#3D3BF3] outline-none"
                    placeholder="Enter your PayPal ID"
                  />
                </div>
                <div>
                  <label className="text-base font-medium text-gray-700">Bank Account Name</label>
                  <input
                    type="text"
                    value={bankAccountName}
                    onChange={(e) => setBankAccountName(e.target.value)}
                    className="mt-2 w-full px-3 py-2 border border-[#9694FF] rounded-lg focus:ring-2 focus:ring-[#3D3BF3] outline-none"
                    placeholder="Enter your bank account name"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-lg font-semibold rounded-lg bg-[#3D3BF3] hover:bg-[#2e2cdc] text-white transition-all duration-300 disabled:bg-[#cfcfff]"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
