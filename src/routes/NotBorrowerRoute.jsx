import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import LoadingSpinner from '../components/LoadingSpinner';
import Forbidden from '../pages/Forbidden/Forbidden';

const NotBorrowerRoute = ({children}) => {
    const { loading } = useAuth();
  const { role, status, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (role === "borrower" || status === "pending" || status === "suspended") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default NotBorrowerRoute;