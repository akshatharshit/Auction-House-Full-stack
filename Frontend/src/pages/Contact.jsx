import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { FaFacebook, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();

  const handleContactForm = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      name,
      email,
      phone,
      subject,
      message,
    };

    emailjs
      .send(
        "service_v01mtcu",
        "template_3a1r5xp",
        templateParams,
        "YcOimjllS64zn4ghK"
      )
      .then(() => {
        toast.success("Thank you! Your message has been sent successfully.");
        setLoading(false);
        navigateTo("/");
      })
      .catch(() => {
        toast.error("Failed to send message.");
        setLoading(false);
      });
  };

  return (
    <section className="min-h-screen pt-24 pb-10 px-4 bg-gradient-to-br from-[#EBEAFF] via-[#DAD8FF] to-[#C6C4FF]">
      <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl p-8 md:p-10 border border-white/40">
        <h2 className="text-center text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3D3BF3] to-[#FF2929] mb-10">
          Contact Us
        </h2>

        <form onSubmit={handleContactForm} className="space-y-6">
          {[
            { label: "Your Name", type: "text", value: name, setter: setName },
            { label: "Your Email", type: "email", value: email, setter: setEmail },
            { label: "Your Phone", type: "tel", value: phone, setter: setPhone },
            { label: "Subject", type: "text", value: subject, setter: setSubject },
          ].map((field, idx) => (
            <div key={idx}>
              <label className="block text-sm font-semibold text-[#3D3BF3] mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6482B] shadow-sm"
                required
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-semibold text-[#3D3BF3] mb-1">Message</label>
            <textarea
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6482B] shadow-sm"
              required
            />
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-[#D6482B] to-[#b8381e] hover:from-[#b8381e] hover:to-[#a42f18] text-white font-semibold px-8 py-3 rounded-md transition-all duration-300 shadow-lg hover:shadow-2xl disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>

        {/* Social Links */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm mb-4">Or reach out to us on</p>
          <div className="flex justify-center gap-6 text-2xl text-[#3D3BF3]">
            <a
              href="mailto:info@example.com"
              className="hover:text-[#FF2929] transition duration-300 hover:scale-110"
              title="Email"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF2929] transition duration-300 hover:scale-110"
              title="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF2929] transition duration-300 hover:scale-110"
              title="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF2929] transition duration-300 hover:scale-110"
              title="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
