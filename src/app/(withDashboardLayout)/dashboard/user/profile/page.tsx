/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import {
  useGetSingleUserQuery,
  useUpdateMYProfileMutation,
} from "@/redux/features/user/userApi";
import Image from "next/image";
import { format } from "date-fns";
import { Pencil } from "lucide-react";
import UpdateProfileModal from "./Components/UpdateProfile";
import AutoFileUploader from "@/components/Forms/AutoFileUploader";
import { logoutUser } from "@/services/actions/logoutUser";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: profile, isLoading } = useGetSingleUserQuery({});
  const [updateMYProfile, { isLoading: updating }] =
    useUpdateMYProfileMutation();
  const router = useRouter();

  const fileUploadHandler = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({}));

    try {
      const res = await updateMYProfile(formData).unwrap();
      logoutUser(router);
      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  if (isLoading) {
    return <p className="text-center py-10 text-lg">Loading...</p>;
  }

  const {
    name,
    email,
    role,
    status,
    profilePhoto,
    createdAt,
    needPasswordChange,
    gender,
  } = profile || {};

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#c3e5f7] via-[#e6f3ff] to-[#ffffff] p-6">
        <div className="w-full max-w-5xl bg-white/50 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-10 items-center">
            {/* Profile Photo + Upload */}
            <div className="flex flex-col items-center gap-6">
              <div className="relative group">
                <Image
                  src={profilePhoto}
                  alt="Profile Photo"
                  width={180}
                  height={200}
                  className="rounded-full h-full lg:h-60 border-4 border-white shadow-xl object-cover group-hover:brightness-110 transition duration-300"
                />

                {/* Pencil + FileUploader */}
                <div className="absolute bottom-2 right-2 z-10">
                  {/* Uploading Message */}
                  {updating ? (
                    <p className="text-center text-sm text-gray-500 italic">
                      ⏳ Uploading...
                    </p>
                  ) : (
                    <AutoFileUploader
                      name="file"
                      icon={
                        <div className="bg-[#0896EF] p-2 rounded-full shadow-md cursor-pointer hover:bg-blue-700 transition">
                          <Pencil size={16} color="white" />
                        </div>
                      }
                      onFileUpload={fileUploadHandler}
                      variant="icon"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="md:col-span-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 capitalize">
                    {name}
                  </h1>
                  <p className="text-gray-600 mt-1 text-xl md:text-xl">
                    {email}
                  </p>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#0896EF] hover:bg-blue-700 text-white px-5 py-2 rounded-full shadow transition text-base sm:text-lg md:text-xl cursor-pointer"
                >
                  ✏️ Update Profile
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 text-base sm:text-lg md:text-xl">
                {[
                  { label: "👤 Role", value: role },
                  { label: "📌 Status", value: status },
                  { label: "🚻 Gender", value: gender || "Not specified" },
                  {
                    label: "🔐 Password Change",
                    value: needPasswordChange ? " Required" : "❌ Not Required",
                  },
                  {
                    label: "📅 Joined",
                    value: createdAt
                      ? format(new Date(createdAt), "PPP")
                      : "N/A",
                  },
                ]?.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/80 p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
                  >
                    <p className="text-sm sm:text-base text-gray-500 mb-1 font-medium">
                      {item.label}
                    </p>
                    <p className="font-semibold text-gray-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      {isModalOpen && (
        <UpdateProfileModal
          profile={profile}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Profile;
