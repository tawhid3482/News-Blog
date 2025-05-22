/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import SocialLogin from "@/components/SocailLogin/SocailLogin";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerUser } from "@/services/actions/registerUser";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import NInput from "@/components/Forms/NInput";
import Forms from "@/components/Forms/Forms";
import toast from "react-hot-toast";
import NSelect from "@/components/Forms/NSelect";
import ImgInput from "@/components/Forms/ImgInput";

const SignUpPage = () => {
  const router = useRouter();
  // const [signup] = useSignupMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (values: FieldValues) => {
    setIsSubmitting(true);

    const data = modifyPayload(values);

    try {
      const result = await registerUser(data);
      const res = await userLogin({
        password: values.password,
        email: values.email,
      });
      const token = res?.data?.accessToken;
      if (token) {
        storeUserInfo({ accessToken: token });
        router.push("/");
      }
      // const user = (await verifyToken(result.token)) as TUser;
      // dispatch(setUser({ user, token: result.token }));
      toast.success(result.message);
    } catch (error: any) {
      toast.error(error?.data?.message || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-white to-blue-100 px-4">
      <div className="flex flex-col md:flex-row items-center max-w-4xl w-full bg-white p-6 md:p-0 rounded-2xl shadow-xl overflow-hidden">
        {/* Image Section */}
        <div className="hidden md:block md:w-1/2">
          <Image
            src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg" // Customize if needed
            alt="Signup Illustration"
            width={600}
            height={800}
            className="object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center text-[#0896EF] mb-6">
            Create an Account
          </h2>

          <Forms onSubmit={handleRegister}>
            {/* Name */}
            <div>
              <NInput name="name" label="User name" type="text" required />
            </div>

            {/* Gender */}
            <div>
              <NSelect
                name="gender"
                label="Gender"
                required
                options={[
                  { label: "Male", value: "MALE" },
                  { label: "Female", value: "FEMALE" },
                  { label: "Other", value: "OTHER" },
                ]}
              />
            </div>

            {/* Email */}
            <div>
              <NInput name="email" label="Email" type="email" required />
            </div>

            {/* Password */}
            <div>
              <NInput
                name="password"
                label="Password"
                type="password"
                required
              />
            </div>

            {/* Profile Photo */}
            <div>
              <ImgInput name="profilePhoto" label="Profile Photo" required />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 text-lg font-semibold rounded-lg transition duration-300 cursor-pointer ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#0896EF] hover:bg-blue-700 text-white"
              }`}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </Forms>

          {/* Divider */}
          <div className="flex items-center gap-2 my-4">
            <hr className="flex-1" />
            <span className="text-sm text-gray-500">OR</span>
            <hr className="flex-1 " />
          </div>

          {/* Social Login */}
          <div className="">
            <SocialLogin />
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/signin" className="text-[#0896EF] hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
