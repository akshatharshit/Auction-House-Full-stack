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
    <section className="w-full flex items-center justify-center min-h-screen bg-[#EBEAFF] px-4 py-10">
      <div className="bg-white shadow-lg w-full max-w-4xl rounded-lg px-6 py-8">
        <h1 className="text-4xl font-extrabold text-[#3D3BF3] text-center mb-6">
          Register
        </h1>
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Personal Details */}
          <p className="font-semibold text-2xl text-[#9694FF]">Personal Details</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-lg font-medium text-[#9694FF]">Full Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="mt-2 px-3 py-2 text-base border-[1px] border-[#9694FF] rounded focus:outline-none focus:ring focus:ring-[#3D3BF3]"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label className="text-lg font-medium text-[#9694FF]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 px-3 py-2 text-base border-[1px] border-[#9694FF] rounded focus:outline-none focus:ring focus:ring-[#3D3BF3]"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="text-lg font-medium text-[#9694FF]">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 px-3 py-2 text-base border-[1px] border-[#9694FF] rounded focus:outline-none focus:ring focus:ring-[#3D3BF3]"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div>
              <label className="text-lg font-medium text-[#9694FF]">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-2 px-3 py-2 text-base border-[1px] border-[#9694FF] rounded focus:outline-none focus:ring focus:ring-[#3D3BF3]"
                placeholder="Enter your address"
                required
              />
            </div>
            <div>
              <label className="text-lg font-medium text-[#9694FF]">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-2 px-3 py-2 text-base border-[1px] border-[#9694FF] rounded focus:outline-none focus:ring focus:ring-[#3D3BF3]"
              >
                <option value="">Select Role</option>
                <option value="Auctioneer">Auctioneer</option>
                <option value="Bidder">Bidder</option>
              </select>
            </div>
            <div>
              <label className="text-lg font-medium text-[#9694FF]">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 px-3 py-2 text-base border-[1px] border-[#9694FF] rounded focus:outline-none focus:ring focus:ring-[#3D3BF3]"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {/* Profile Image */}
          <div>
            <label className="text-lg font-medium text-[#9694FF]">Profile Image</label>
            <div className="flex items-center gap-4 mt-2">
              <img
                src={
                  profileImagePreview ? profileImagePreview : "/imageHolder.jpg"
                }
                alt="Profile Preview"
                className="w-16 h-16 rounded-full border-2 border-[#9694FF]"
              />
              <input
                type="file"
                onChange={imageHandler}
                className="text-sm text-[#3D3BF3] cursor-pointer"
              />
            </div>
          </div>

          {/* Auctioneer Payment Details */}
          {role === "Auctioneer" && (
            <div className="space-y-4">
              <p className="font-semibold text-2xl text-[#9694FF]">
                Payment Details (Auctioneer Only)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-lg font-medium text-[#9694FF]">Bank Name</label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="mt-2 px-3 py-2 text-base border-[1px] border-[#9694FF] rounded focus:outline-none focus:ring focus:ring-[#3D3BF3]"
                    placeholder="Enter your bank name"
                  />
                </div>
                <div>
                  <label className="text-lg font-medium text-[#9694FF]">Account Number</label>
                  <input
                    type="text"
                    value={bankAccountNumber}
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                    className="mt-2 px-3 py-2 text-base border-[1px] border-[#9694FF] rounded focus:outline-none focus:ring focus:ring-[#3D3BF3]"
                    placeholder="Enter account number"
                  />
                </div>
                <div>
                  <label className="text-lg font-medium text-[#9694FF]">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setupiId(e.target.value)}
                    className="mt-2 px-3 py-2 text-base border-[1px] border-[#9694FF] rounded focus:outline-none focus:ring focus:ring-[#3D3BF3]"
                    placeholder="Enter your UPI ID"
                  />
                </div>
                <div>
                  <label className="text-lg font-medium text-[#9694FF]">PayPal ID</label>
                  <input
                    type="email"
                    value={paypalId}
                    onChange={(e) => setPaypalId(e.target.value)}
                    className="mt-2 px-3 py-2 text-base border-[1px] border-[#9694FF] rounded focus:outline-none focus:ring focus:ring-[#3D3BF3]"
                    placeholder="Enter your PayPal ID"
                  />
                </div>
                <div>
                  <label className="text-lg font-medium text-[#9694FF]">Bank Account Name</label>
                  <input
                    type="text"
                    value={bankAccountName}
                    onChange={(e) => setBankAccountName(e.target.value)}
                    className="mt-2 px-3 py-2 text-base border-[1px] border-[#9694FF] rounded focus:outline-none focus:ring focus:ring-[#3D3BF3]"
                    placeholder="Enter your bank account name"
                  />
                </div>
              </div>
            </div>
          )}


          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-lg font-semibold rounded-md bg-[#3D3BF3] hover:bg-[#9694FF] text-white transition-all disabled:bg-[#EBEAFF]"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
