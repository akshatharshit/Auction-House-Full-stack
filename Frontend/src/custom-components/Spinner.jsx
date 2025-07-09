import React from "react";
import { HashLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="w-full min-h-[600px] flex flex-col justify-center items-center bg-gradient-to-br from-[#F5F5FF] to-[#EDEBFF] animate-fadeIn">
      <HashLoader size={120} color="#D6482B" />
      <p className="mt-6 text-lg text-gray-600 font-medium tracking-wide animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Spinner;
