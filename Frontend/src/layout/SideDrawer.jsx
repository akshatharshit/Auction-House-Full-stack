import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { RiAuctionFill, RiInstagramFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaFacebook, FaUserCircle } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { FaFileInvoiceDollar, FaEye } from "react-icons/fa6";
import { logout } from "@/store/slices/userSlice";

const SideDrawer = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-[#2D2E3E] text-white shadow-lg">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-4 gap-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-[#FFFBF5] transition-all">
          Auction<span className="text-[#FF2929]">House</span>
        </Link>

        {/* Hamburger Menu for Small Screens */}
        <div
          className="lg:hidden text-3xl cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? (
            <IoMdCloseCircleOutline className="text-[#FFFBF5]" />
          ) : (
            <GiHamburgerMenu className="text-[#FFFBF5]" />
          )}
        </div>

        {/* Full-Screen Menu */}
        <ul className="hidden lg:flex gap-8 items-center text-lg font-semibold">
          <li className="flex items-center gap-2 ">
            <RiAuctionFill className="text-xl" />
            <Link to="/auctions" className="hover:text-[#FFFBF5] transition-colors">
              Auctions
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <MdLeaderboard className="text-xl" />
            <Link to="/leaderboard" className="hover:text-[#FFFBF5] transition-colors">
              Leader
            </Link>
          </li>
          {isAuthenticated && user?.role === "Auctioneer" && (
            <>
              <li className="flex items-center gap-2">
                <FaFileInvoiceDollar className="text-xl" />
                <Link to="/submit-commission" className="hover:text-[#FFFBF5] transition-colors">
                  Commission
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <IoIosCreate className="text-xl" />
                <Link to="/create-auction" className="hover:text-[#FFFBF5] transition-colors">
                  Create 
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <FaEye className="text-xl" />
                <Link to="/view-my-auctions" className="hover:text-[#FFFBF5] transition-colors">
                   My Auctions
                </Link>
              </li>
            </>
          )}
          {isAuthenticated && user?.role === "Super Admin" && (
            <li className="flex items-center gap-2">
              <MdDashboard className="text-xl" />
              <Link to="/dashboard" className="hover:text-[#FFFBF5] transition-colors">
                Dashboard
              </Link>
            </li>
          )}
          <li className="flex items-center gap-2">
            <SiGooglesearchconsole className="text-xl" />
            <Link to="/how-it-works-info" className="hover:text-[#FFFBF5] transition-colors">
              How it works
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <BsFillInfoSquareFill className="text-xl" />
            <Link to="/about" className="hover:text-[#FFFBF5] transition-colors">
              About Us
            </Link>
          </li>
          {isAuthenticated && (
            <li className="flex items-center gap-2">
              <FaUserCircle className="text-xl" />
              <Link to="/me" className="hover:text-[#FFFBF5] transition-colors">
                Profile
              </Link>
            </li>
          )}
          {!isAuthenticated ? (
            <>
              <li className="flex items-center gap-2">
                <Link
                  to="/sign-up"
                  className="bg-[#3D3BF3] text-white px-6 py-2 rounded-md hover:bg-[#FF2929] transition-all"
                >
                  Sign Up
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="border-2 border-[#3D3BF3] text-[#3D3BF3] px-6 py-2 rounded-md hover:bg-[#3D3BF3] hover:text-white transition-all"
                >
                  Login
                </Link>
              </li>
            </>
          ) : (
            <li className="flex items-center gap-2">
              <button
                onClick={handleLogout}
                className="bg-[#FF2929] text-white px-6 py-2 rounded-md hover:bg-[#3D3BF3] transition-all"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="lg:hidden bg-[#2D2E3E] shadow-md p-4 rounded-md">
          <ul className="flex flex-col gap-4 text-lg font-semibold text-gray-300">
            <li className="flex items-center gap-2">
              <RiAuctionFill className="text-xl" />
              <Link to="/auctions" className="hover:text-[#FFFBF5] transition-colors" onClick={() => setShowMenu(false)}>
                Auctions
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <MdLeaderboard className="text-xl" />
              <Link to="/leaderboard" className="hover:text-[#FFFBF5] transition-colors" onClick={() => setShowMenu(false)}>
                Leaderboard
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <FaUserCircle className="text-xl" />
              <Link to="/contact" className="hover:text-[#FFFBF5] transition-colors" onClick={() => setShowMenu(false)}>
                Contact Us
              </Link>
            </li>
            {isAuthenticated && user?.role === "Auctioneer" && (
              <>
                <li className="flex items-center gap-2">
                  <FaFileInvoiceDollar className="text-xl" />
                  <Link to="/submit-commission" className="hover:text-[#FFFBF5] transition-colors" onClick={() => setShowMenu(false)}>
                    Submit Commission
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <IoIosCreate className="text-xl" />
                  <Link to="/create-auction" className="hover:text-[#FFFBF5] transition-colors" onClick={() => setShowMenu(false)}>
                    Create Auction
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <FaEye className="text-xl" />
                  <Link to="/view-my-auctions" className="hover:text-[#FFFBF5] transition-colors" onClick={() => setShowMenu(false)}>
                    View My Auctions
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated && user?.role === "Super Admin" && (
              <li className="flex items-center gap-2">
                <MdDashboard className="text-xl" />
                <Link to="/dashboard" className="hover:text-[#FFFBF5] transition-colors" onClick={() => setShowMenu(false)}>
                  Dashboard
                </Link>
              </li>
            )}
            <li className="flex items-center gap-2">
              <SiGooglesearchconsole className="text-xl" />
              <Link to="/how-it-works-info" className="hover:text-[#FFFBF5] transition-colors" onClick={() => setShowMenu(false)}>
                How it works
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <BsFillInfoSquareFill className="text-xl" />
              <Link to="/about" className="hover:text-[#FFFBF5] transition-colors" onClick={() => setShowMenu(false)}>
                About Us
              </Link>
            </li>
            {isAuthenticated && (
              <li className="flex items-center gap-2">
                <FaUserCircle className="text-xl" />
                <Link to="/me" className="hover:text-[#FFFBF5] transition-colors" onClick={() => setShowMenu(false)}>
                  Profile
                </Link>
              </li>
            )}
            {!isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/sign-up"
                    className="bg-[#3D3BF3] text-white px-6 py-2 rounded-md hover:bg-[#FF2929] transition-all"
                    onClick={() => setShowMenu(false)}
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="border-2 border-[#3D3BF3] text-[#3D3BF3] px-6 py-2 rounded-md hover:bg-[#3D3BF3] hover:text-white transition-all"
                    onClick={() => setShowMenu(false)}
                  >
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-[#FF2929] text-white px-6 py-2 rounded-md hover:bg-[#3D3BF3] transition-all"
                  //onClick={() => setShowMenu(false)}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default SideDrawer;
