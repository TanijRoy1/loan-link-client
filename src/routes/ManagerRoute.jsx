import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/LoadingSpinner";
import Forbidden from "../pages/Forbidden/Forbidden";

const ManagerRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, status, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (role !== "manager" || status !== "approved") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default ManagerRoute;
