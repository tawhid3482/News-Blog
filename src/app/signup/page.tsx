/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useSignupMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/redux/features/hooks";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import SocialLogin from "@/components/SocailLogin/SocailLogin";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  profilePhoto: FileList;
}

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [signup] = useSignupMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: SignUpFormData) => {
    setIsSubmitting(true);
    const formData = new FormData();

    const userData = {
      name: data.name,
      gender: data.gender,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    formData.append("data", JSON.stringify(userData));
    formData.append("file", data.profilePhoto[0]);

    try {
      const result = await signup(formData).unwrap();
      const user = (await verifyToken(result.token)) as TUser;
      dispatch(setUser({ user, token: result.token }));
      toast.success("User created successfully");
      router.push("/");
    } catch (error: any) {
      toast.error(error?.data?.message || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                {...register("gender", { required: "Gender is required" })}
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="">Select gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Create a password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Profile Photo */}
            <div>
              <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700">
                Profile Photo
              </label>
              <div className="mt-2 flex items-center space-x-4">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-full border"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border text-xs">
                    No Image
                  </div>
                )}
                <label
                  htmlFor="profilePhoto"
                  className="cursor-pointer inline-block bg-[#0896EF] text-white px-4 py-2 text-sm font-medium rounded hover:bg-blue-700 transition"
                >
                  Choose Photo
                </label>
              </div>
              <input
                id="profilePhoto"
                type="file"
                accept="image/*"
                {...register("profilePhoto", {
                  required: "Profile photo is required",
                })}
                onChange={handleImageChange}
                className="hidden"
              />
              {errors.profilePhoto && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.profilePhoto.message as string}
                </p>
              )}
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
          </form>

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
