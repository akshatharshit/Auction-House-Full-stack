import { postCommissionProof } from "@/store/slices/commissionSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SubmitCommission = () => {
  const [proof, setProof] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  const proofHandler = (e) => {
    const file = e.target.files[0];
    setProof(file);
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.commission);

  const handlePaymentProof = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("proof", proof);
    formData.append("amount", amount);
    formData.append("comment", comment);
    dispatch(postCommissionProof(formData));
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-[#C6C4FF] via-[#9694FF] to-[#7B78FF] py-20 px-4 flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl px-6 py-10">
        <form className="flex flex-col gap-6" onSubmit={handlePaymentProof}>
          <h3 className="text-[#FF2929] text-2xl md:text-3xl font-bold text-center">
            Upload Payment Proof
          </h3>

          <div className="flex flex-col gap-2">
            <label className="text-[#3D3BF3] font-medium text-lg">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter payment amount"
              className="border border-gray-300 rounded-md px-4 py-2 text-[16px] focus:ring-2 focus:ring-[#3D3BF3] outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#3D3BF3] font-medium text-lg">
              Payment Proof (Screenshot)
            </label>
            <input
              type="file"
              onChange={proofHandler}
              className="border border-gray-300 rounded-md px-4 py-2 text-[16px] bg-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#3D3BF3] file:text-white cursor-pointer transition hover:file:bg-[#2C2AF3]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#3D3BF3] font-medium text-lg">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={6}
              placeholder="Add any notes or comments"
              className="border border-gray-300 rounded-md px-4 py-2 text-[16px] focus:ring-2 focus:ring-[#3D3BF3] outline-none transition resize-none"
            />
          </div>

          <button
            type="submit"
            className="bg-[#FF2929] hover:bg-[#e22626] text-white font-semibold text-lg py-3 rounded-md transition-all duration-300"
          >
            {loading ? "Uploading..." : "Upload Payment Proof"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SubmitCommission;
