/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useGetAllUserQuery,
  useUpdateUserStatusMutation,
} from "@/redux/features/user/userApi";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const statusOptions = ["ACTIVE", "BLOCKED", "DELETED"];

const ManageUsers = () => {
  const { data: users, isLoading } = useGetAllUserQuery({});
  const [updateUserStatus, { isLoading: isUpdating }] =
    useUpdateUserStatusMutation();
  const [selectedStatus, setSelectedStatus] = useState<Record<string, string>>(
    {}
  );

  if (isLoading) {
    return (
      <div className="text-center py-10 text-lg font-semibold">Loading...</div>
    );
  }

  const handleStatusChange = (id: string, status: string) => {
    setSelectedStatus((prev) => ({ ...prev, [id]: status }));
  };

  const handleUpdateStatus = async (id: string) => {
    const newStatus = selectedStatus[id];
    if (!newStatus) return;

    try {
      await updateUserStatus({
        id,
        data: { status: newStatus },
      }).unwrap();

      toast.success(`User status updated to ${newStatus}`);
      setSelectedStatus((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    } catch (error: any) {
      console.error("Error updating status:", error);
      toast.error(error?.message || "Failed to update status");
    }
  };

  return (
    <div className="p-4 w-lg md:w-2xl lg:w-4xl 2xl:w-7xl">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
        Manage Users
      </h2>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#0896EF] mb-6">
          Total Users {users?.length}
        </h2>
        <h2 className="text-xl font-bold text-[#0896EF] mb-6">
          Total Inactive{" "}
          {users?.filter((user: any) => !user.status.ACTIVE)?.length}
        </h2>
      </div>
      {/* Overflow-x auto only on sm and md, visible on lg+ */}
      <div className="overflow-x-auto lg:overflow-x-visible rounded-md border border-gray-300">
        <table className="min-w-full divide-y divide-gray-300 bg-white text-sm sm:text-base">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-3 sm:px-6 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                Name
              </th>
              <th className="px-3 sm:px-6 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                Email
              </th>
              <th className="px-3 sm:px-6 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                Gender
              </th>
              <th className="px-3 sm:px-6 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                Role
              </th>
              <th className="px-3 sm:px-6 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                Current Status
              </th>
              <th className="px-3 sm:px-6 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                Change Status
              </th>
              <th className="px-3 sm:px-6 py-3 text-center font-semibold text-gray-700 whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users?.map((user: any) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-3 sm:px-6 py-2 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="px-3 sm:px-6 py-2 whitespace-nowrap">
                  {user.email}
                </td>
                <td className="px-3 sm:px-6 py-2 capitalize whitespace-nowrap">
                  {user.gender}
                </td>
                <td className="px-3 sm:px-6 py-2 whitespace-nowrap">
                  {user.role}
                </td>
                <td className="px-3 sm:px-6 py-2 font-medium text-blue-600 whitespace-nowrap">
                  {user.status}
                </td>
                <td className="px-3 sm:px-6 py-2 whitespace-nowrap">
                  <select
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={selectedStatus[user.id] || ""}
                    onChange={(e) =>
                      handleStatusChange(user.id, e.target.value)
                    }
                  >
                    <option value="">Select Status</option>
                    {statusOptions?.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3 sm:px-6 py-2 text-center whitespace-nowrap">
                  <button
                    onClick={() => handleUpdateStatus(user.id)}
                    className={`bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded cursor-pointer ${
                      !selectedStatus[user.id]
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={!selectedStatus[user.id] || isUpdating}
                  >
                    {isUpdating ? "Updating..." : "Update"}
                  </button>
                </td>
              </tr>
            ))}
            {users?.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
