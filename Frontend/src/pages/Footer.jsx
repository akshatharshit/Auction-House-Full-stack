import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#9694FF] to-[#3D3BF3] text-white mt-16 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand & Description */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-extrabold tracking-tighter bg-gradient-to-r from-[#3D3BF3] to-[#FF2929] bg-clip-text text-transparent">
            AuctionHouse
          </h2>
          <p className="text-sm text-gray-100 leading-relaxed">
            Bid smart. Win big. AuctionHouse connects sellers and buyers in a premium, secure auction experience.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-l-4 border-[#FF2929] pl-3 tracking-wide">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm text-gray-200">
            <li>
              <Link
                to="/"
                className="hover:text-[#FF2929] transition-all duration-300 hover:pl-1"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/auctions"
                className="hover:text-[#FF2929] transition-all duration-300 hover:pl-1"
              >
                Auctions
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="hover:text-[#FF2929] transition-all duration-300 hover:pl-1"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/support"
                className="hover:text-[#FF2929] transition-all duration-300 hover:pl-1"
              >
                Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-l-4 border-[#FF2929] pl-3 tracking-wide">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm text-gray-100">
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-[#FF2929] text-base" />
              support@auctionhouse.com
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#FF2929] text-base" />
              +91 999-888-7777
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-l-4 border-[#FF2929] pl-3 tracking-wide">
            Follow Us
          </h3>
          <div className="flex items-center gap-5 mt-2">
            <a
              href="#"
              className="bg-white/10 p-3 rounded-full hover:bg-[#FF2929] hover:text-white transition-all duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-white/10 p-3 rounded-full hover:bg-[#FF2929] hover:text-white transition-all duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-white/10 p-3 rounded-full hover:bg-[#FF2929] hover:text-white transition-all duration-300"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-white/20 py-4 text-center text-gray-200 text-sm tracking-wide">
        © {new Date().getFullYear()} <span className="font-semibold text-[#FF2929]">AuctionHouse</span> — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
