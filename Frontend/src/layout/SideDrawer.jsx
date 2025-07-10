import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { RiAuctionFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { FaFileInvoiceDollar, FaEye } from "react-icons/fa6";
import { logout } from "@/store/slices/userSlice";
import { Contact } from "lucide-react";

const SideDrawer = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isAuthenticated, user } = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => dispatch(logout());

  const linkClasses = (path) => {
    const active = location.pathname === path;
    return `flex items-center px-4 py-2 gap-3 rounded-lg transition-all duration-200 ${
      active
        ? "bg-gradient-to-r from-[#3D3BF3] to-[#6A5ACD] text-white shadow-lg"
        : "text-gray-200 hover:bg-white hover:bg-opacity-10 hover:text-white"
    }`;
  };
  

  return (
    <nav className="bg-[#1E1F29] text-gray-200 shadow-lg sticky top-0 z-50">
      {/* Desktop Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-[#3D3BF3]">
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-tighter bg-gradient-to-r from-[#3D3BF3] to-[#FF2929] bg-clip-text text-transparent"
        >
          AuctionHouse
        </Link>

        <div
          className="lg:hidden text-2xl cursor-pointer p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? <IoMdCloseCircleOutline /> : <GiHamburgerMenu />}
        </div>

        <ul className="hidden lg:flex gap-4 items-center font-semibold">
          <li className={linkClasses("/auctions")}>
            <RiAuctionFill className="text-xl" />
            <Link to="/auctions">Auctions</Link>
          </li>
          <li className={linkClasses("/leaderboard")}>
            <MdLeaderboard className="text-xl" />
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
          {isAuthenticated && user?.role === "Auctioneer" && (
            <>
              <li className={linkClasses("/submit-commission")}>
                <FaFileInvoiceDollar className="text-xl" />
                <Link to="/submit-commission">Commission</Link>
              </li>
              <li className={linkClasses("/create-auction")}>
                <IoIosCreate className="text-xl" />
                <Link to="/create-auction">Create Auction</Link>
              </li>
              <li className={linkClasses("/view-my-auctions")}>
                <FaEye className="text-xl" />
                <Link to="/view-my-auctions">My Auctions</Link>
              </li>
            </>
          )}
          {isAuthenticated && user?.role === "Super Admin" && (
            <li className={linkClasses("/dashboard")}>
              <MdDashboard className="text-xl" />
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}
          
          <li className={linkClasses("/about")}>
            <BsFillInfoSquareFill className="text-xl" />
            <Link to="/about">About Us</Link>
          </li>

          {isAuthenticated && user?.role === "Bidder" && (
            <li className={linkClasses("/contact")}>
            <Contact className="text-xl" />
            <Link to="/contact">Contact</Link>
          </li>,
          <li className={linkClasses("/how-it-works-info")}>
            <SiGooglesearchconsole className="text-xl" />
            <Link to="/how-it-works-info">How it works</Link>
          </li>
          )}

          {isAuthenticated && (
            <li className={linkClasses("/me")}>
              <FaUserCircle className="text-xl" />
              <Link to="/me">Profile</Link>
            </li>
          )}
          {!isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/sign-up"
                  className="px-4 py-2 bg-gradient-to-r from-[#3D3BF3] to-[#FF2929] text-white rounded-lg shadow hover:opacity-90 transition"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="px-4 py-2 border-2 border-[#3D3BF3] text-[#3D3BF3] rounded-lg hover:bg-[#3D3BF3] hover:text-white transition"
                >
                  Login
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gradient-to-r from-[#FF2929] to-[#FF6347] text-white rounded-lg shadow hover:opacity-90 transition"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="lg:hidden bg-[#1E1F29] border-t border-[#3D3BF3] p-4 space-y-3">
          <ul className="flex flex-col gap-2">
            <li className={linkClasses("/auctions")}>
              <RiAuctionFill />
              <Link to="/auctions" onClick={() => setShowMenu(false)}>Auctions</Link>
            </li>
            <li className={linkClasses("/leaderboard")}>
              <MdLeaderboard />
              <Link to="/leaderboard" onClick={() => setShowMenu(false)}>Leaderboard</Link>
            </li>
            <li className={linkClasses("/how-it-works-info")}>
              <SiGooglesearchconsole />
              <Link to="/how-it-works-info" onClick={() => setShowMenu(false)}>How it works</Link>
            </li>
            <li className={linkClasses("/about")}>
              <BsFillInfoSquareFill />
              <Link to="/about" onClick={() => setShowMenu(false)}>About Us</Link>
            </li>
            {isAuthenticated && user?.role === "Auctioneer" && (
              <>
                <li className={linkClasses("/submit-commission")}>
                  <FaFileInvoiceDollar />
                  <Link to="/submit-commission" onClick={() => setShowMenu(false)}>Commission</Link>
                </li>
                <li className={linkClasses("/create-auction")}>
                  <IoIosCreate />
                  <Link to="/create-auction" onClick={() => setShowMenu(false)}>Create Auction</Link>
                </li>
                <li className={linkClasses("/view-my-auctions")}>
                  <FaEye />
                  <Link to="/view-my-auctions" onClick={() => setShowMenu(false)}>My Auctions</Link>
                </li>
              </>
            )}
            {isAuthenticated && user?.role === "Super Admin" && (
              <li className={linkClasses("/dashboard")}>
                <MdDashboard />
                <Link to="/dashboard" onClick={() => setShowMenu(false)}>Dashboard</Link>
              </li>
            )}
            {!isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/sign-up"
                    onClick={() => setShowMenu(false)}
                    className="block px-4 py-2 bg-gradient-to-r from-[#3D3BF3] to-[#FF2929] text-white rounded-lg text-center"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    onClick={() => setShowMenu(false)}
                    className="block px-4 py-2 border-2 border-[#3D3BF3] text-[#3D3BF3] rounded-lg text-center hover:bg-[#3D3BF3] hover:text-white transition"
                  >
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-[#FF2929] to-[#FF6347] text-white rounded-lg shadow hover:opacity-90 transition"
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
