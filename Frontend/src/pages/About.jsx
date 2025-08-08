import React from "react";

const About = () => {
  const values = [
    {
      id: 1,
      title: "Integrity",
      description:
        "We prioritize honesty and transparency in all our dealings, ensuring a fair and ethical auction experience for everyone.",
    },
    {
      id: 2,
      title: "Innovation",
      description:
        "We continually enhance our platform with cutting-edge technology and features to provide users with a seamless and efficient auction process.",
    },
    {
      id: 3,
      title: "Community",
      description:
        "We foster a vibrant community of buyers and sellers who share a passion for finding and offering exceptional items.",
    },
    {
      id: 4,
      title: "Customer Focus",
      description:
        "We are committed to providing exceptional customer support and resources to help users navigate the auction process with ease.",
    },
  ];

  return (
    <section className="w-full px-6 py-20 bg-gradient-to-br from-[#a4a2ff] to-[#ebeaff] min-h-screen">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#3D3BF3] mb-3">
            Know Us More
          </h1>
          <p className="text-lg md:text-xl text-stone-700 max-w-3xl mx-auto">
            Welcome to <span className="font-semibold text-black">AuctionHouse</span> — the ultimate destination for online auctions and
            bidding excitement. Founded in 2025, we connect buyers and sellers in a secure, easy, and exciting digital marketplace.
          </p>
        </div>

        {/* Sections */}
        <div className="grid gap-10 md:grid-cols-2">
          {/* Our Mission */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#3D3BF3] mb-3">
              🎯 Our Mission
            </h2>
            <p className="text-lg text-stone-700 leading-relaxed">
              At PrimeBid, our mission is to revolutionize how people buy and sell online. We strive to create an exciting, trustworthy
              marketplace where users make smart choices and enjoy competitive bidding.
            </p>
          </div>

          {/* Our Story */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#3D3BF3] mb-3">
              📖 Our Story
            </h2>
            <p className="text-lg text-stone-700 leading-relaxed">
              PrimeBid is built with years of auction experience and
              a passion for bringing people together over valuable, unique finds.
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#3D3BF3] mb-5">
            💡 Our Core Values
          </h2>
          <ul className="space-y-4 text-stone-700 text-lg list-disc pl-5">
            {values.map((value) => (
              <li key={value.id}>
                <span className="text-[#3D3BF3] font-bold">{value.title}</span>: {value.description}
              </li>
            ))}
          </ul>
        </div>

        {/* Join Us */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#3D3BF3] mb-3">
            🤝 Join Us
          </h2>
          <p className="text-lg text-stone-700 leading-relaxed">
            Whether you're a buyer, seller, or just exploring, PrimeBid welcomes you to a growing community of auction lovers.
            Discover gems, win bids, and enjoy the thrill — your next great find is waiting.
          </p>
        </div>

        {/* Final Thanks */}
        <div className="bg-white text-center rounded-2xl shadow-lg p-6 md:p-8">
          <p className="text-xl md:text-2xl font-bold text-[#3D3BF3]">
            🙏 Thank you for choosing <span className="text-black">AuctionHouse</span>. We're honored to be part of your auction journey!
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
