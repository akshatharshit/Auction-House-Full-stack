import { createAuction } from "@/store/slices/auctionSlice";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const CreateAuction = () => {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const auctionCategories = [
    "Electronics", "Furniture", "Art & Antiques", "Jewelry & Watches", "Automobiles",
    "Real Estate", "Collectibles", "Fashion & Accessories", "Sports Memorabilia", "Books & Manuscripts"
  ];

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(file);
      setImagePreview(reader.result);
    };
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auction);

  const handleCreateAuction = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("startingBid", startingBid);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(createAuction(formData));
  };

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  return (
    <section className="w-full min-h-screen pt-24 pb-10 px-4 bg-gradient-to-br from-[#EBEAFF] via-[#DAD8FF] to-[#C6C4FF] flex justify-center items-start">
      <div className="w-full max-w-5xl bg-white shadow-xl border border-gray-200 rounded-xl p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#3D3BF3] to-[#FF2929] mb-10">
          Create Auction
        </h1>

        <form className="space-y-8" onSubmit={handleCreateAuction}>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-[#3D3BF3] mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#D6482B] outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#3D3BF3] mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#D6482B] outline-none"
                required
              >
                <option value="">Select Category</option>
                {auctionCategories.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#3D3BF3] mb-1">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#D6482B] outline-none"
                required
              >
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#3D3BF3] mb-1">Starting Bid</label>
              <input
                type="number"
                value={startingBid}
                onChange={(e) => setStartingBid(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#D6482B] outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#3D3BF3] mb-1">Start Time</label>
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#D6482B] outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#3D3BF3] mb-1">End Time</label>
              <DatePicker
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#D6482B] outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3D3BF3] mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#D6482B] outline-none"
              required
            />
          </div>

          <div className="w-full">
            <label className="block text-lg font-bold text-[#3D3BF3] mb-2">Auction Item Image</label>
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {imagePreview ? (
                  <img src={imagePreview} alt={title} className="w-40 h-auto rounded-md" />
                ) : (
                  <>
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M4 12l1.293-1.293a1 1 0 011.414 0L9 13l2.293-2.293a1 1 0 011.414 0L15 13l3.293-3.293a1 1 0 011.414 0L20 12"></path>
                    </svg>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Click to upload</span> or drag & drop
                    </p>
                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (Max: 800x400px)</p>
                  </>
                )}
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={imageHandler} />
            </label>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-md text-white font-semibold bg-[#3D3BF3] hover:bg-[#FF2929] transition duration-300"
              disabled={loading}
            >
              {loading ? "Creating Auction..." : "Create Auction"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateAuction;
