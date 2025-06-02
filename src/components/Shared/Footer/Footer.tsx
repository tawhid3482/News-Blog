/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from "react";
import { getUserInfo } from "@/services/auth.services";
import { useCreateSubscriberMutation, useGetSubscriberByEmailQuery } from "@/redux/features/subscriber/subscriberApi";
import toast from "react-hot-toast";
import SocialMedia from "@/components/UI/HomePage/SocialMedia/SocialMedia";

const Footer = () => {
  const user = getUserInfo(); // your method to get user email etc.
  const [email, setEmail] = useState(user?.email || "");
  const [submitted, setSubmitted] = useState(false);

  // Query to check if subscriber exists already
  const { data: subscriberData } = useGetSubscriberByEmailQuery(user?.email, { skip: !user?.email });
  const [createSubscription, { isLoading }] = useCreateSubscriberMutation();

  useEffect(() => {
    if (
      subscriberData &&
      Array.isArray(subscriberData) &&
      subscriberData.length > 0 &&
      subscriberData[0].email === user.email
    ) {
      setSubmitted(true);
    }
  }, [subscriberData, user.email]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      try {
        const res = await createSubscription({ email }).unwrap();
        if (res) {
          toast.success("Subscription successful!");
          setSubmitted(true);
          setEmail(""); // clear input after subscribe
        }
      } catch (error: any) {
        toast.error(error?.data?.message || "Subscription failed!");
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-10 mt-10 border-t" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <section aria-labelledby="footer-about">
          <h2 id="footer-about" className="text-xl font-semibold mb-4">TIS-News</h2>
          <p className="text-gray-400 text-sm">
            Stay informed with the latest headlines from around the world. Your trusted source for breaking news, in-depth analysis, and expert opinion.
          </p>
        </section>

        {/* Quick Links */}
        <nav aria-label="Footer Quick Links">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white transition">Terms of Use</a></li>
          </ul>
        </nav>

        {/* Subscription + Social */}
        <section aria-labelledby="footer-subscribe">
          <h3 id="footer-subscribe" className="text-lg font-semibold mb-4">Subscribe</h3>

          {submitted ? (
            <p className="text-green-400 font-semibold">Thank you for subscribing!</p>
          ) : (
            <form aria-label="Subscribe to newsletter" className="flex flex-col gap-2" onSubmit={handleSubscribe}>
              <input
                type="email"
                aria-label="Email address"
                placeholder="Your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-[#0896EF] hover:bg-blue-600 text-white px-4 py-2 rounded font-medium transition disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          )}

          <h3 className="text-lg font-semibold mt-6 mb-4">Connect With Us</h3>
          <SocialMedia />
        </section>
      </div>

      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-800 pt-6">
        © {new Date().getFullYear()} TIS-News. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
