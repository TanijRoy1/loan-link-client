import React from 'react';
import useRole from '../../../hooks/useRole';
import LoadingSpinner from '../../../components/LoadingSpinner';
import AdminHome from './AdminHome';

const DashboardHome = () => {
    const {role, roleLoading} = useRole();

    if (roleLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }
    if (role === "admin") {
        return <AdminHome></AdminHome>;
    } else if (role === "manager") {
        return <div>Manager Home</div>;
    } else {
        return <div>Borrower Home</div>;
    }

};

export default DashboardHome;
