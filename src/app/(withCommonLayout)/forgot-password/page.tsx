"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldValues } from "react-hook-form";
import { CheckCircle, KeyRound } from "lucide-react";
import { useState } from "react";
import Forms from "@/components/Forms/Forms";
import NInput from "@/components/Forms/NInput";
import toast from "react-hot-toast";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";

const validationSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
});

const ForgotPassword = () => {
  const [forgotPassword, { isSuccess }] = useForgotPasswordMutation();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (values: FieldValues) => {
    try {
      const res = await forgotPassword(values);

      if ("data" in res && res.data.status === 200) {
        toast.success("Check your email for the reset link");
        setSubmitted(true);
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-md shadow-md">
        <div className="flex flex-col items-center justify-center text-center mb-4">
          <KeyRound className="w-20 h-20 text-[#0896EF] mb-2" />
          <h2 className="text-2xl font-semibold">Forgot Password</h2>
        </div>

        {isSuccess || submitted ? (
          <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-3 rounded-md">
            <CheckCircle className="w-5 h-5" />
            <span>
              An email with a reset password link was sent to your email.
            </span>
          </div>
        ) : (
          <Forms
            onSubmit={onSubmit}
            defaultValues={{ email: "" }}
            resolver={zodResolver(validationSchema)}
          >
            <div className="mb-4">
              <NInput name="email" type="email" label="Your Email" />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0896EF] hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200 cursor-pointer"
            >
              Forgot Password
            </button>
          </Forms>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
