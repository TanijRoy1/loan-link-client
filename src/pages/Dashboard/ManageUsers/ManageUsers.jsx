import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [editingUser, setEditingUser] = useState(null);
  const openEdit = (user) => setEditingUser({ ...user });
  const closeEdit = () => {
    setEditingUser(null);
    reset();
  };

  const [suspendingUser, setSuspendingUser] = useState(null);
  const openSuspend = (user) => setSuspendingUser({ ...user });
  const closeSuspend = () => {
    setSuspendingUser(null);
    reset();
  };

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleApprove = (user) => {
    Swal.fire({
      title: "Approve User?",
      text: "Are you sure you want to approve this user? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Agree",
    }).then((result) => {
      if (result.isConfirmed) {
        const updateUser = { status: "approved", role: user?.role };
        axiosSecure.patch(`/users/${user._id}`, updateUser).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: "Approved",
              text: "The user has been successfully approved.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleUpdate = (data) => {
    closeEdit();
    Swal.fire({
      title: "Update User Role?",
      text: "Are you sure you want to update this user’s role? This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Agree",
    }).then((result) => {
      if (result.isConfirmed) {
        const updateUser = { status: data?.status, role: data?.role };
        axiosSecure.patch(`/users/${data.id}`, updateUser).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: "Role Updated",
              text: "The user’s role has been updated successfully.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleSuspend = (data) => {
    closeSuspend();
    Swal.fire({
      title: "Suspend User?",
      text: "Are you sure you want to suspend this user? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Agree",
    }).then((result) => {
      if (result.isConfirmed) {
        const updateUser = { status: "suspended", role: data?.role };
        axiosSecure.patch(`/users/${data.id}`, updateUser).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: "Suspended",
              text: "The user has been suspended successfully.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>

        <div className="hidden lg:block overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user._id}>
                  <th>{i + 1}</th>
                  <td>{user.displayName}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`${
                        user.role === "admin"
                          ? "text-blue-600"
                          : user.role === "manager"
                          ? "text-purple-600"
                          : "text-green-600"
                      } border rounded px-2 py-1 capitalize`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`${
                        user.status === "approved"
                          ? "text-green-600"
                          : user.status === "suspended"
                          ? "text-red-600"
                          : "text-gray-600"
                      } capitalize`}
                    >
                      {user.status || "pending"}
                    </span>
                  </td>

                  <td>
                    <button
                      onClick={() => handleApprove(user)}
                      className="btn btn-primary btn-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => openSuspend(user)}
                      className="btn btn-secondary btn-sm mx-2"
                    >
                      Suspend
                    </button>
                    <button
                      onClick={() => openEdit(user)}
                      className="btn btn-primary btn-outline btn-sm"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards for small screens */}
        <div className="lg:hidden block space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-base-100 border rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <div className="min-w-0">
                      <div className="font-medium truncate">
                        {user.displayName}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {user.email}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span
                      className={`${
                        user.role === "admin"
                          ? "text-blue-600"
                          : user.role === "manager"
                          ? "text-purple-600"
                          : "text-green-600"
                      } border rounded px-2 py-1 capitalize text-xs`}
                    >
                      {user.role}
                    </span>

                    <span
                      className={`${
                        user.status === "approved"
                          ? "text-green-600"
                          : user.status === "suspended"
                          ? "text-red-600"
                          : "text-gray-600"
                      } capitalize text-xs`}
                    >
                      {user.status || "pending"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => handleApprove(user)}
                    className="btn btn-primary btn-xs"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => openSuspend(user)}
                    className="btn btn-secondary btn-xs"
                  >
                    Suspend
                  </button>
                  <button
                    onClick={() => openEdit(user)}
                    className="btn btn-primary btn-outline btn-xs"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {editingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-base-100 rounded-lg shadow-lg w-full max-w-md p-6">
              <h3 className="text-lg font-semibold mb-4">
                Update Role for {editingUser.email}
              </h3>

              <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
                <div className="hidden">
                  <label className="label">ID</label>
                  <input
                    type="text"
                    defaultValue={editingUser._id}
                    readOnly
                    {...register("id", { required: true })}
                  />

                  {errors._id?.type === "required" && (
                    <p className="text-red-500">ID is required</p>
                  )}
                </div>
                <div>
                  <label className="label">Role</label>
                  <select
                    defaultValue={editingUser.role}
                    {...register("role", { required: true })}
                    className="select w-full"
                  >
                    <option value="borrower">borrower</option>
                    <option value="manager">manager</option>
                    <option value="admin">admin</option>
                  </select>
                  {errors.role?.type === "required" && (
                    <p className="text-red-500">Role is required</p>
                  )}
                </div>
                <div>
                  <label className="label">Status</label>

                  <select
                    defaultValue={editingUser.status || "pending"}
                    {...register("status", { required: true })}
                    className="select w-full"
                  >
                    <option value="pending">pending</option>
                    <option value="approved">approved</option>
                    <option value="suspended">suspended</option>
                  </select>
                  {errors.status?.type === "required" && (
                    <p className="text-red-500">Status is required</p>
                  )}
                </div>

                <div className="flex justify-end gap-2">
                  <button type="button" className="btn" onClick={closeEdit}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Suspend Modal */}
        {suspendingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-base-100 rounded-lg shadow-lg w-full max-w-md p-6">
              <h3 className="text-lg font-semibold mb-4">
                Suspend {suspendingUser.email}
              </h3>

              <form
                onSubmit={handleSubmit(handleSuspend)}
                className="space-y-4"
              >
                <div className="hidden">
                  <label className="label">ID</label>
                  <input
                    type="text"
                    defaultValue={suspendingUser._id}
                    readOnly
                    {...register("id", { required: true })}
                  />

                  {errors._id?.type === "required" && (
                    <p className="text-red-500">ID is required</p>
                  )}
                </div>
                <div>
                  <label className="label">Role</label>
                  <select
                    value={suspendingUser.role}
                    readOnly
                    {...register("role", { required: true })}
                    className="select w-full"
                  >
                    <option value="borrower">borrower</option>
                    <option value="manager">manager</option>
                    <option value="admin">admin</option>
                  </select>
                  {errors.role?.type === "required" && (
                    <p className="text-red-500">Role is required</p>
                  )}
                </div>
                <div>
                  <label className="label">Status</label>
                  <textarea
                    className="textarea w-full"
                    {...register("feedback", { required: true })}
                    placeholder="Suspend reason & feedback"
                  ></textarea>

                  {errors.feedback?.type === "required" && (
                    <p className="text-red-500">Status is required</p>
                  )}
                </div>

                <div className="flex justify-end gap-2">
                  <button type="button" className="btn" onClick={closeSuspend}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Suspend
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ManageUsers;
