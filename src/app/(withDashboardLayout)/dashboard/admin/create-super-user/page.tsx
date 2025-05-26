/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Forms from "@/components/Forms/Forms";
import ImgInput from "@/components/Forms/ImgInput";
import NInput from "@/components/Forms/NInput";
import NRole from "@/components/Forms/NRole";
import NSelect from "@/components/Forms/NSelect";
import {
  useCreateAdminMutation,
  useCreateAuthorMutation,
  useCreateEditorMutation,
} from "@/redux/features/superUser/superUserApi";
import React, { useState } from "react";
import toast from "react-hot-toast";

const roleOptions = [
  { label: "Admin", value: "ADMIN" },
  { label: "Author", value: "AUTHOR" },
  { label: "Editor", value: "EDITOR" },
];

const genderOptions = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "Other", value: "OTHER" },
];

const CreateSuperUser = () => {
  const [createAdmin] = useCreateAdminMutation();
  const [createAuthor] = useCreateAuthorMutation();
  const [createEditor] = useCreateEditorMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const handlePost = async (data: any, reset: () => void) => {
    const file = data.image?.[0];

    const baseData = {
      email: data.email,
      password: data.password,
      name: data.name,
      gender: data.gender,
      contactNumber: data.contactNumber,
      address: data.address,
      bio: data.bio,
      socialLinks: {
        facebook: data.facebook,
        linkedin: data.linkedin,
      },
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(baseData));
    if (file) formData.append("file", file);

    try {
      setIsSubmitting(true);

      let res;
      if (selectedRole === "ADMIN") {
        res = await createAdmin(formData).unwrap();
      } else if (selectedRole === "AUTHOR") {
        res = await createAuthor(formData).unwrap();
      } else if (selectedRole === "EDITOR") {
        res = await createEditor(formData).unwrap();
      }

      if (res) {
        toast.success(`${selectedRole} created successfully`);
        reset();
        setSelectedRole("");
      }
    } catch (error) {
      console.error("User creation failed:", error);
      toast.error("Failed to create user");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Create Super User</h2>

      <Forms onSubmit={handlePost}>
        <NRole
          name="role"
          label="Select Role"
          options={roleOptions}
          required
          onChange={(e: any) => setSelectedRole(e.target.value)}
        />

        {selectedRole && (
          <>
            <NInput name="email" label="Email" required type="email" />
            <NInput name="password" label="Password" required type="password" />
            <NInput name="name" label="Name" required />
            <NSelect
              name="gender"
              label="Gender"
              options={genderOptions}
              required
            />
            <NInput name="contactNumber" label="Contact Number" required />
            <NInput name="address" label="Address" required />
            <NInput name="bio" label="Bio" type="textarea" required />
            <NInput name="facebook" label="Facebook Link" />
            <NInput name="linkedin" label="LinkedIn Link" />
            <ImgInput name="image" label="Profile Image" />
          </>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !selectedRole}
          className={`mt-4 px-6 py-2 w-full rounded text-white transition cursor-pointer ${
            isSubmitting || !selectedRole
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#0896EF] hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </Forms>
    </div>
  );
};

export default CreateSuperUser;
