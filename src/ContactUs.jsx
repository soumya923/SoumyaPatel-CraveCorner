// ContactUs.jsx
import React from "react";
import "./ContactUsStyles.css";
const ContactUs = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-700">Contact Us</h2>
      
      <p className="text-center text-gray-600 mb-8">
        Have questions or feedback? We'd love to hear from you! Fill out the form below or reach us directly.
      </p>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Message</label>
          <textarea
            placeholder="Write your message here..."
            className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            rows="4"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition"
        >
          Send Message
        </button>
      </form>

      <div className="text-center mt-8 text-gray-500 text-sm">
        Or email us directly at: <a href="mailto:support@cravecorner.com" className="text-green-600 underline">support@cravecorner.com</a>
      </div>
    </div>
  );
};

export default ContactUs;
