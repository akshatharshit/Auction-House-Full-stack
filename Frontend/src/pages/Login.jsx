import { login } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, isAuthenticated, loading]);

  return (
    <section className="w-full flex items-center justify-center min-h-screen bg-[#EBEAFF] px-4 py-10">
      <div className="bg-white shadow-lg w-full max-w-lg rounded-lg px-6 py-8">
        <h1 className="text-4xl font-extrabold text-[#3D3BF3] text-center mb-6">Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div className="flex flex-col">
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
          {/* Password Input */}
          <div className="flex flex-col">
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
          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 text-lg font-semibold text-white bg-[#3D3BF3] hover:bg-[#9694FF] rounded transition duration-300`}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
        {/* Error or Helper Text */}
        <div className="mt-4 text-center text-sm text-[#FF2929]">
          {loading && "Please wait while we log you in..."}
        </div>
      </div>
    </section>
  );
};

export default Login;
