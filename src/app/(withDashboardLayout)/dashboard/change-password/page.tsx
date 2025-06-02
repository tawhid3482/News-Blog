"use client";

import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { Key } from "lucide-react";
import toast from "react-hot-toast";
import { logoutUser } from "@/services/actions/logoutUser";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import Forms from "@/components/Forms/Forms";
import NInput from "@/components/Forms/NInput";


const ChangePassword = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const router = useRouter();

  const handleChange = async (values: FieldValues) => {
    try {
      const res = await changePassword(values);

      if ("data" in res && res.data.status === 200) {
        logoutUser(router);
        toast.success("Password Changed Successfully");
      } else {
        throw new Error("Set the Password Properly, Must be 6 Character");
      }
    } catch (error) {
      toast.error("Set the Password Properly, Must be 6 Character");
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center mb-6">
        <Key className="w-20 h-20 text-[#0896EF] mb-2" />
        <h2 className="text-2xl font-semibold">Change Password</h2>
      </div>

      <Forms onSubmit={handleChange}>
        <div>
          <NInput
            name="oldPassword"
            label="Old Password"
            placeholder="Enter Your Old Password"
            type="text"
            required
          />
        </div>

        <div>
          <NInput
            name="newPassword"
            label="New Password"
            placeholder="Enter Your New Password"
            type="password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-[#0896EF] text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
        >
          {isLoading ? "Changing..." : "Change Password"}
        </button>
      </Forms>
    </div>
  );
};

export default ChangePassword;
