/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useGetAllSuperUserQuery,
  useUpdateSuperUserMutation,
} from "@/redux/features/user/userApi";
import Image from "next/image";
import toast from "react-hot-toast";

const ManageSuperUser = () => {
  const { data: superUsers, isLoading, refetch } = useGetAllSuperUserQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [updateSuperUser] = useUpdateSuperUserMutation();
  if (isLoading) {
    return (
      <div className="text-center py-10 text-xl font-semibold">Loading...</div>
    );
  }

  const roleKeyMap: Record<string, "admin" | "Author" | "Editor"> = {
    ADMIN: "admin",
    AUTHOR: "Author",
    EDITOR: "Editor",
  };

  const handleUpdate = async (
    id: string,
    field: "isActive" | "isVerified" | "isDeleted",
    currentValue: boolean
  ) => {

    try {
      console.log("Updating super user:", { id, field });
      const res = await updateSuperUser({ id, field }).unwrap(); // শুধু id
      if (res) {
        toast.success(`Successfully updated ${field} for user ${id}`);
         await refetch();
      }
    } catch (error) {
      console.error("Failed to update super user:", error);
    }
  };

  const renderUsers = (role: "ADMIN" | "AUTHOR" | "EDITOR") => {
    const filtered = superUsers?.filter((user: any) => user.role === role);
    if (!filtered?.length) return null;

    const roleKey = roleKeyMap[role];

    return (
      <div className="mb-10 max-w-lg md:max-w-2xl lg:max-w-4xl 2xl:max-w-7xl">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">{role}s</h3>
        <div className="overflow-x-auto rounded-lg border shadow-sm">
          <table className="min-w-full divide-y divide-gray-300 text-[16px] sm:text-[17px]">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                {[
                  "Name",
                  "Email",
                  "Profile Photo",
                  "Address",
                  "Contact Number",
                  "isActive",
                  "isVerified",
                  ...(role === "ADMIN" ? ["isDeleted"] : []),
                  "Created At",
                  "Actions",
                ]?.map((head, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 text-left font-semibold whitespace-nowrap"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y bg-white text-gray-800">
              {filtered?.map((user: any) => {
                const roleData = user[roleKey];
                if (!roleData) return null;

                return (
                  <tr key={user.id} className="hover:bg-gray-50 transition-all">
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      <Image
                        src={user.profilePhoto}
                        alt="Profile"
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover border"
                      />
                    </td>
                    <td className="px-4 py-3">{roleData.address || "N/A"}</td>
                    <td className="px-4 py-3">
                      {roleData.contactNumber || "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      {roleData.isActive ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-3">
                      {roleData.isVerified ? "Yes" : "No"}
                    </td>
                    {role === "ADMIN" && (
                      <td className="px-4 py-3">
                        {roleData.isDeleted ? "Yes" : "No"}
                      </td>
                    )}
                    <td className="px-4 py-3">
                      {roleData.createdAt
                        ? new Date(roleData.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-4 py-3 flex flex-wrap gap-2 justify-center">
                      <button
                        onClick={() =>
                          handleUpdate(user.id, "isActive", roleData.isActive)
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md transition cursor-pointer"
                      >
                        Toggle Active
                      </button>
                      <button
                        onClick={() =>
                          handleUpdate(
                            user.id,
                            "isVerified",
                            roleData.isVerified
                          )
                        }
                        className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md transition cursor-pointer"
                      >
                        Toggle Verified
                      </button>
                      {role === "ADMIN" && (
                        <button
                          onClick={() =>
                            handleUpdate(
                              user.id,
                              "isDeleted",
                              roleData.isDeleted
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md transition cursor-pointer"
                        >
                          Toggle Deleted
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center sm:text-left">
        Manage Super Users
      </h2>
      {renderUsers("ADMIN")}
      {renderUsers("AUTHOR")}
      {renderUsers("EDITOR")}
    </div>
  );
};

export default ManageSuperUser;
