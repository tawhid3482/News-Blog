/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../../button";
import {
  useCreateSubscriberMutation,
  useGetSubscriberByEmailQuery,
} from "@/redux/features/subscriber/subscriberApi";
import toast from "react-hot-toast";
import { getUserInfo } from "@/services/auth.services";

const Newsletter = () => {
  const user = getUserInfo();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [createSubscription] = useCreateSubscriberMutation();
  const { data: subscriberData } = useGetSubscriberByEmailQuery(user.email);
  
  // Auto-check if user already subscribed
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
          setSubmitted(true); // Manually set after successful subscription
        }
      } catch (error: any) {
        toast.error(error?.data?.message || "Subscription failed!");
      }
    }
  };

  return (
    <section className="bg-blue-50 py-10 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Newsletter Subscription
        </h2>
        <p className="text-gray-700 mb-6">
          Enter your email to get the best headlines delivered right to your
          inbox every day!
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
            <Button
              type="submit"
              className="px-6 py-2 text-lg font-medium bg-[#0896EF] text-white rounded-md hover:bg-blue-700 transition"
            >
              Subscribe Now
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
