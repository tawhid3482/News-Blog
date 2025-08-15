/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import SocialLogin from "@/components/SocailLogin/SocailLogin";
import { registerUser } from "@/services/actions/registerUser";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import Forms from "@/components/Forms/Forms";
import toast from "react-hot-toast";
import NSelect from "@/components/Forms/NSelect";
import ImgInput from "@/components/Forms/ImgInput";
import NInput from "@/components/Forms/NInput";

const IMG_BB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "";

const SignUpPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Upload image to ImgBB
  const uploadImageToImgBB = async (file: File): Promise<string | null> => {
    if (!IMG_BB_API_KEY) {
      toast.error("Image upload key is missing. Please check .env.local");
      return null;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMG_BB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data?.success) {
        return data.data.url;
      } else {
        toast.error("Image upload failed");
        return null;
      }
    } catch (error) {
      console.error(error);
      toast.error("Error uploading image");
      return null;
    }
  };

  // Handle form submission
const handleRegister = async (values: FieldValues) => {
  setIsSubmitting(true);

  try {
    let profilePhotoUrl = "";
    if (values.profilePhoto?.[0]) {
      const uploadedUrl = await uploadImageToImgBB(values.profilePhoto[0]);
      if (!uploadedUrl) {
        setIsSubmitting(false);
        return;
      }
      profilePhotoUrl = uploadedUrl;
    }

    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      gender: values.gender,
      role: "USER", // default role পাঠাচ্ছি
      profilePhoto: profilePhotoUrl,
    };

    const result = await registerUser(payload); // এখানে JSON পাঠানো হবে
    console.log("Registration result:", result);

    if (!result?.success) {
      throw new Error(result?.message || "Registration failed");
    }

    const res = await userLogin({
      password: values.password,
      email: values.email,
    });

    const token = res?.data?.accessToken;
    if (token) {
      storeUserInfo({ accessToken: token });
      router.push("/");
    }

    toast.success(result.message || "Signup successful");
  } catch (error: any) {
    console.error("Registration error:", error);
    toast.error(error?.message || "Signup failed");
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
            src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg"
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
            <NInput name="name" label="User name" type="text" required />
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
            <NInput name="email" label="Email" type="email" required />
            <NInput name="password" label="Password" type="password" required />
            <ImgInput name="profilePhoto" label="Profile Photo" required />

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

          <div className="flex items-center gap-2 my-4">
            <hr className="flex-1" />
            <span className="text-sm text-gray-500">OR</span>
            <hr className="flex-1" />
          </div>

          <SocialLogin />

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-[#0896EF] hover:underline cursor-pointer"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
