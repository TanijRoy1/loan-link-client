import React from "react";
import {
  FaEnvelope,
  FaUserTag,
  FaCheckCircle,
  FaCalendarAlt,
  FaIdBadge,
  FaSignOutAlt,
  FaInfoCircle,
} from "react-icons/fa";
import useRole from "../../../hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const MyProfile = () => {
  const { _id, role, status } = useRole();
  const axiosSecure = useAxiosSecure();
  const { signOutUser } = useAuth();

  const { data: user = {}, isLoading } = useQuery({
    queryKey: ["user", _id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${_id}`);
      return res.data;
    },
  });

  const handleSignOutUser = () => {
    signOutUser()
      .then(() => {
        toast.success("Sign Out Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="max-w-3xl mx-auto py-4">
      <h1 className="text-3xl font-bold text-accent-content mb-6 text-center">
        My Profile
      </h1>

      <div className="card bg-base-100 border border-base-300 shadow-xl rounded-lg p-6 flex flex-col items-center gap-6">
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="w-32 h-32 rounded-full object-cover border-2 border-accent-content"
        />

        <div className="text-center mt-2">
          <p className="text-xs uppercase font-semibold">Full Name</p>
          <h2 className="text-xl font-semibold text-accent-content">
            {user.displayName}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-2 w-full mt-4 text-accent-content text-sm">
          <div className="flex items-start gap-2 mb-4">
            <div className="text-primary mt-1">
              <FaUserTag />
            </div>
            <div>
              <div className="text-sm text-muted uppercase font-semibold">
                Role
              </div>
              <span
                className={`px-2 py-0.5 rounded-full font-medium capitalize border block ${
                  user.role === "admin"
                    ? "text-red-600 border-red-500"
                    : user.role === "manager"
                    ? "text-blue-600 border-blue-500"
                    : user.role === "borrower"
                    ? "text-purple-600 border-purple-500"
                    : "text-accent-content border-base-300"
                }`}
              >
                {user.role}
              </span>
            </div>
          </div>
          <div className="flex items-start gap-2 mb-4">
            <div className="text-primary mt-1">
              <FaCheckCircle />
            </div>
            <div>
              <div className="text-sm text-muted uppercase font-semibold">
                Status
              </div>
              <span
                className={`px-2 py-0.5 rounded-full font-medium capitalize block ${
                  user.status === "approved"
                    ? "text-green-600 border border-green-500"
                    : user.status === "pending"
                    ? "text-yellow-600 border border-yellow-500"
                    : "text-red-600 border border-red-500"
                }`}
              >
                {user.status}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2 mb-4">
            <div className="text-primary mt-1">
              <FaEnvelope />
            </div>
            <div>
              <div className="text-sm text-muted uppercase font-semibold">
                Email
              </div>
              <a className="text-accent-content text-sm link">{user.email}</a>
            </div>
          </div>
          <div className="flex items-start gap-2 mb-4">
            <div className="text-primary mt-1">
              <FaCalendarAlt />
            </div>
            <div>
              <div className="text-sm text-muted uppercase font-semibold">
                Created At
              </div>
              <span className="text-accent-content text-sm">
                {new Date(user.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex items-start gap-2 mb-4">
            <div className="text-primary mt-1">
              <FaIdBadge />
            </div>
            <div>
              <div className="text-sm text-muted uppercase font-semibold">
                Record ID
              </div>
              <span className="text-accent-content text-sm">{user._id}</span>
            </div>
          </div>
        </div>

        {role === "borrower" && status !== "approved" && (
          <div
            className={`w-full mt-3 p-3 rounded-md border border-purple-500 text-purple-600 flex items-start gap-2`}
          >
            <FaInfoCircle className="text-lg" />
            <p className="text-sm">{`Your account is ${status} approval. You will be able to submit loan applications and make payments once an administrator approves your profile.`}</p>
          </div>
        )}
        {role === "manager" && status !== "approved" && (
          <div
            className={`w-full mt-3 p-3 rounded-md border border-blue-500 text-blue-600 flex items-start gap-2`}
          >
            <FaInfoCircle className="text-lg" />
            <p className="text-sm">{`Your account is ${status} approval. You will be able to create or modify loans, and manage application approvals once an administrator approves your profile.`}</p>
          </div>
        )}
        {role === "admin" && status !== "approved" && (
          <div className="w-full mt-3 p-3 rounded-md border border-red-500 text-red-600 flex items-start gap-2">
            <FaInfoCircle className="text-lg" />
            <p className="text-sm">
              {`Your admin account is currently ${status}. Administrative privileges, including user and system management, will be fully available once your account is approved.`}
            </p>
          </div>
        )}

        <button
          onClick={handleSignOutUser}
          className="btn btn-sm mt-6 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
