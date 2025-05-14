/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      // You can integrate Mailchimp / API call here
    }
  };

  return (
    <section className="bg-blue-50 py-10 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Newsletter Subscription</h2>
        <p className="text-gray-700 mb-6">
           Enter your email to get the best headlines delivered right to your inbox every day!
        </p>

        {submitted ? (
          <p className="text-[#0896EF] font-medium">
             Thank you! We'll send you regular updates.
          </p>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-[#0896EF] text-white rounded-md hover:bg-blue-700 transition"
            >
              Subscribe Now
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
