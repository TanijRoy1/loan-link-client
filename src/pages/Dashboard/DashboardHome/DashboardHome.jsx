import React from 'react';
import useRole from '../../../hooks/useRole';
import LoadingSpinner from '../../../components/LoadingSpinner';
import AdminHome from './AdminHome';
import ManagerHome from './ManagerHome';
import BorrowerHome from './BorrowerHome';

const DashboardHome = () => {
    const {role, roleLoading} = useRole();

    if (roleLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }
    if (role === "admin") {
        return <AdminHome></AdminHome>;
    } else if (role === "manager") {
        return <ManagerHome></ManagerHome>;
    } else {
        return <BorrowerHome></BorrowerHome>;
    }

};

export default DashboardHome;
