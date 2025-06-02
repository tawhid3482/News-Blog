/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { authKey } from "@/contants/authkey";
import { deleteCookies } from "@/services/actions/deleteCookies";
import toast from "react-hot-toast";
import Forms from "@/components/Forms/Forms";
import NInput from "@/components/Forms/NInput";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";

const validationSchema = z.object({
  newPassword: z.string().min(6, "Must be at least 6 characters long"),
});

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const token = searchParams.get("token");
  const router = useRouter();
  const [resetPassword] = useResetPasswordMutation();

  useEffect(() => {
    if (!token) return;
    localStorage.setItem(authKey, token);
  }, [token]);

  const handleReset = async (values: FieldValues) => {
    const updatedData = { ...values, id };

    try {
      const res = await resetPassword(updatedData);

      if ("data" in res && res.data.status === 200) {
        toast.success("Password Reset Successful");
        localStorage.removeItem(authKey);
        deleteCookies([authKey, "refreshToken"]);
        router.push("/signin");
      } else {
        throw new Error("Something Went Wrong, Try Again");
      }
    } catch (error) {
      toast.error("Something Went Wrong, Try Again");
    }
  };

  return (
    <div className="w-96 mx-auto mt-10 bg-white shadow-md rounded-md px-6 py-8">
      <div className="flex flex-col items-center">
        <svg
          className="w-20 h-20 text-blue-600 mb-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 11c0-1.105-.895-2-2-2s-2 .895-2 2m4 0v1a2 2 0 11-4 0v-1m4 0a4 4 0 00-4-4m8 4a8 8 0 10-8 8 8 8 0 008-8z"
          />
        </svg>
        <h2 className="text-xl font-semibold mb-4">Reset password</h2>
      </div>

      <Forms
        onSubmit={handleReset}
        defaultValues={{ newPassword: "" }}
        resolver={zodResolver(validationSchema)}
      >
        <div>
          <NInput name="newPassword" type="password" label="New Password" />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer "
        >
          Reset Password
        </button>
      </Forms>
    </div>
  );
};

export default ResetPassword;
