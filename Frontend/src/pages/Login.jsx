import { login } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import loginAnimation from "../assets/Animation - 1752081576173.json";

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

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: loginAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-[#e4e4fc] via-[#f4f4ff] to-[#e6f0ff] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-5xl flex flex-col-reverse md:flex-row bg-white/80 backdrop-blur-lg rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.15)] border border-gray-300 overflow-hidden transition-all duration-300">

        {/* Left Side - Login Form */}
        <div className="w-full md:w-1/2 px-10 py-12 md:px-14 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-[#3D3BF3] mb-3 tracking-tight drop-shadow-sm">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-600 mb-8">
            Sign in to access live auctions and place your bids.
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-gray-800 block mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-[#d3d4ff] rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3D3BF3] focus:border-[#3D3BF3] transition"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-800 block mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-[#d3d4ff] rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3D3BF3] focus:border-[#3D3BF3] transition"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#3D3BF3] hover:bg-[#2f2dd8] text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              {loading ? "Logging In..." : "Login"}
            </button>

            {loading && (
              <div className="text-center text-xs text-[#FF2929] font-medium">
                Please wait while we log you in...
              </div>
            )}
          </form>
        </div>

        {/* Right Side - Lottie Animation */}
        <div className="w-full md:w-1/2 bg-[#3D3BF3] text-white flex items-center justify-center p-8 md:p-12">
          <div className="text-center">
            <Lottie options={lottieOptions} height={260} width={260} />
            <h3 className="text-xl font-semibold mt-4 drop-shadow-sm">
              Start Bidding Now!
            </h3>
            <p className="text-sm text-blue-100 mt-2 max-w-sm mx-auto">
              Explore exciting auctions and compete for the best deals in real time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
