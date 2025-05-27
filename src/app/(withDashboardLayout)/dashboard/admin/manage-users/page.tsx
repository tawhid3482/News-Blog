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
  const [updateUserStatus, { isLoading: isUpdating }] = useUpdateUserStatusMutation();
  const [selectedStatus, setSelectedStatus] = useState<Record<string, string>>({});

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
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300 border border-gray-300 rounded-md text-base">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Name</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Email</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Gender</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Role</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Current Status</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Change Status</th>
              <th className="px-6 py-4 text-center font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {users?.map((user: any) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">{user.name}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3 capitalize">{user.gender}</td>
                <td className="px-6 py-3">{user.role}</td>
                <td className="px-6 py-3 font-medium text-blue-600">
                  {user.status}
                </td>
                <td className="px-6 py-3">
                  <select
                    className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={selectedStatus[user.id] || ""}
                    onChange={(e) => handleStatusChange(user.id, e.target.value)}
                  >
                    <option value="">Select Status</option>
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-3 text-center">
                  <button
                    onClick={() => handleUpdateStatus(user.id)}
                    className={`bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded ${
                      !selectedStatus[user.id] ? "opacity-50 cursor-not-allowed" : ""
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
