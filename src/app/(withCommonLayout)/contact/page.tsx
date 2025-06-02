/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-7xl w-full bg-white rounded-3xl shadow-2xl p-10 md:p-16 space-y-14">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0896EF]">Contact Us</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Having issues or questions? Reach out to us through any of the options below.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Email */}
          <div className="group flex flex-col items-center text-center space-y-4 p-6 border rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <div className="bg-[#0896EF] p-4 rounded-full text-white text-2xl">
              <FaEnvelope />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Email</h3>
            <p className="text-gray-700 text-base group-hover:text-[#0896EF] transition">
              tisnews3482@gmail.com
            </p>
          </div>

          {/* Phone */}
          <div className="group flex flex-col items-center text-center space-y-4 p-6 border rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <div className="bg-[#0896EF] p-4 rounded-full text-white text-2xl">
              <FaPhoneAlt />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
            <p className="text-gray-700 text-base group-hover:text-[#0896EF] transition">
              01853505787
            </p>
          </div>

          {/* WhatsApp */}
          <div className="group flex flex-col items-center text-center space-y-4 p-6 border rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <div className="bg-[#0896EF] p-4 rounded-full text-white text-2xl">
              <FaWhatsapp />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">WhatsApp</h3>
            <p className="text-gray-700 text-base group-hover:text-[#0896EF] transition">
              01826853371
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-sm text-gray-500 pt-4">
          We're here to help — your feedback means a lot to us.
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
