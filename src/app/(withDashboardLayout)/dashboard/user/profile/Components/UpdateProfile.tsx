/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Forms from "@/components/Forms/Forms";
import NInput from "@/components/Forms/NInput";
import NSelect from "@/components/Forms/NSelect";
import { useUpdateMYProfileMutation } from "@/redux/features/user/userApi";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    required_error: "Gender is required",
  }),
  profilePhoto: z.any().optional(),
});

type TProfileSchema = z.infer<typeof profileSchema>;

const UpdateProfileModal = ({
  profile,
  onClose,
}: {
  profile: any;
  onClose: () => void;
}) => {
  const [updateMYProfile, { isLoading }] = useUpdateMYProfileMutation();

  const handleProfile = async (data: TProfileSchema) => {
    const formData = new FormData();

    // Append file if it exists
    if (data.profilePhoto && data.profilePhoto instanceof File) {
      formData.append("file", data.profilePhoto);
    }

    // Append other fields as JSON
    const profileDataToSend = {
      name: data.name,
      email: data.email,
      gender: data.gender,
    };

    formData.append("data", JSON.stringify(profileDataToSend));

    try {
      await updateMYProfile(formData).unwrap();
      onClose();
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-xl animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
        >
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Update Your Profile
        </h2>

        <Forms
          onSubmit={handleProfile}
          defaultValues={{
            name: profile.name,
            email: profile.email,
            gender: profile.gender || "",
          }}
          resolver={zodResolver(profileSchema)}
        >
          <NInput name="name" label="Name" placeholder="Enter Your Name" />
          <NInput
            name="email"
            label="Email"
            placeholder="Enter Your Email"
            type="email"
          />
          <NSelect
            name="gender"
            label="Gender"
            options={[
              { label: "Male", value: "MALE" },
              { label: "Female", value: "FEMALE" },
              { label: "Other", value: "OTHER" },
            ]}
          />
          <NInput name="profilePhoto" label="Profile Photo" type="file" />

          <button
            type="submit"
            className="bg-blue-600 w-full py-2 text-white rounded-lg hover:bg-blue-700 transition"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Save Changes"}
          </button>
        </Forms>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
