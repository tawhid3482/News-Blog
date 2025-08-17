// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react/no-unescaped-entities */
// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { FieldValues } from "react-hook-form";
// import Image from "next/image";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import SocialLogin from "@/components/SocailLogin/SocailLogin";
// import { userLogin } from "@/services/actions/userLogin";
// import { storeUserInfo } from "@/services/auth.services";
// import Forms from "@/components/Forms/Forms";
// import NInput from "@/components/Forms/NInput";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// export const validationSchema = z.object({
//   email: z.string().email("Please enter a valid email address!"),
//   password: z.string().min(6, "Must be at least 6 characters"),
// });

// const SignInPage = () => {
//   const router = useRouter();
//   const [error, setError] = useState("");

//   const handleLogin = async (data: FieldValues) => {
//     try {
//       const res = await userLogin(data);
//       const token = res?.data?.accessToken;
//       if (token) {
//         storeUserInfo({ accessToken: token });
//         toast.success(res.message);
//         router.push("/");
//       } else {
//         setError(res.message);
//       }
//     } catch (err: any) {
//       console.log(err);
//       const message =
//         err?.response?.data?.message || err?.message || "Something went wrong!";
//       console.error("Login failed:", message);
//       setError(message);
//       toast.error(message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-white to-blue-100 px-4">
//       <div className="flex flex-col md:flex-row items-center max-w-4xl w-full bg-white p-6 md:p-0 rounded-2xl shadow-xl overflow-hidden">
//         {/* Image section */}
//         <div className="hidden md:block md:w-1/2">
//           <Image
//             src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg" // Use your own CDN or image
//             alt="Login Illustration"
//             width={600}
//             height={500}
//             className="object-cover"
//           />
//         </div>

//         {/* Form section */}
//         <div className="w-full md:w-1/2 p-8">
//           <h2 className="text-3xl font-bold text-center text-[#0896EF] mb-6">
//             Welcome Back
//           </h2>
//           <div className="flex justify-center items-center">
//             {error && (
//               <span className="text-lg text-red-600 text-center">{error}</span>
//             )}
//           </div>
//           <Forms
//             onSubmit={handleLogin}
//             resolver={zodResolver(validationSchema)}
//             defaultValues={{
//               email: "",
//               password: "",
//             }}
//           >
//             <div>
//               <NInput name="email" label="Email" type="email" required />
//             </div>

//             <div>
//               <NInput
//                 name="password"
//                 label="Password"
//                 type="password"
//                 required
//               />
//             </div>

//             <div className="flex items-center justify-between">
//               <div className=""></div>
//               <Link
//                 href="/forgot-password"
//                 className="text-sm mb-1 text-[#0896EF] hover:underline"
//               >
//                 Forgot password?
//               </Link>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-[#0896EF] hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 cursor-pointer"
//             >
//               Sign In
//             </button>
//           </Forms>

//           <div className="flex items-center gap-2 my-4">
//             <hr className="flex-1" />
//             <span className="text-sm text-gray-500">OR</span>
//             <hr className="flex-1 " />
//           </div>
//           <div className="">
//             <SocialLogin />
//           </div>

//           <p className="mt-6 text-center text-sm text-gray-600 ">
//             Don't have an account?{" "}
//             <Link
//               href="/signup"
//               className="text-[#0896EF] hover:underline cursor-pointer"
//             >
//               Sign Up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignInPage;


/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import SocialLogin from "@/components/SocailLogin/SocailLogin";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import Forms from "@/components/Forms/Forms";
import NInput from "@/components/Forms/NInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const validationSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

const SignInPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [defaultValues, setDefaultValues] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (data: FieldValues) => {
    try {
      const res = await userLogin(data);
      const token = res?.data?.accessToken;
      if (token) {
        storeUserInfo({ accessToken: token });
        toast.success(res.message);
        router.push("/");
      } else {
        setError(res.message);
      }
    } catch (err: any) {
      console.log(err);
      const message =
        err?.response?.data?.message || err?.message || "Something went wrong!";
      console.error("Login failed:", message);
      setError(message);
      toast.error(message);
    }
  };

  // Auto fill for admin / user
  const fillCredentials = (role: "admin" | "user") => {
    if (role === "admin") {
      setDefaultValues({ email: "admin@gmail.com", password: "123456" });
    } else {
      setDefaultValues({ email: "user@gmail.com", password: "123456" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-white to-blue-100 px-4">
      <div className="flex flex-col md:flex-row items-center max-w-4xl w-full bg-white p-6 md:p-0 rounded-2xl shadow-xl overflow-hidden">
        {/* Image section */}
        <div className="hidden md:block md:w-1/2">
          <Image
            src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg"
            alt="Login Illustration"
            width={600}
            height={500}
            className="object-cover"
          />
        </div>

        {/* Form section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center text-[#0896EF] mb-6">
            Welcome Back
          </h2>

          <div className="flex justify-center items-center">
            {error && (
              <span className="text-lg text-red-600 text-center">{error}</span>
            )}
          </div>

          {/* Auto fill buttons */}
          <div className="flex gap-3 mb-4">
            <button
              type="button"
              onClick={() => fillCredentials("admin")}
              className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Admin Login
            </button>
            <button
              type="button"
              onClick={() => fillCredentials("user")}
              className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              User Login
            </button>
          </div>

          <Forms
            onSubmit={handleLogin}
            resolver={zodResolver(validationSchema)}
            defaultValues={defaultValues}
            key={JSON.stringify(defaultValues)} // re-render when values change
          >
            <div>
              <NInput name="email" label="Email" type="email" required />
            </div>

            <div>
              <NInput
                name="password"
                label="Password"
                type="password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div></div>
              <Link
                href="/forgot-password"
                className="text-sm mb-1 text-[#0896EF] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0896EF] hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 cursor-pointer"
            >
              Sign In
            </button>
          </Forms>

          <div className="flex items-center gap-2 my-4">
            <hr className="flex-1" />
            <span className="text-sm text-gray-500">OR</span>
            <hr className="flex-1 " />
          </div>

          <div>
            <SocialLogin />
          </div>

          <p className="mt-6 text-center text-sm text-gray-600 ">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-[#0896EF] hover:underline cursor-pointer"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
