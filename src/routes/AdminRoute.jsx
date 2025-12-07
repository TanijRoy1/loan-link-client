import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/LoadingSpinner";
import Forbidden from "../pages/Forbidden/Forbidden";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, status, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (role !== "admin" || status !== "approved") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default AdminRoute;
