import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import LoadingSpinner from '../components/LoadingSpinner';
import Forbidden from '../pages/Forbidden/Forbidden';

const BorrowerRoute = ({children}) => {
    const {loading} = useAuth();
    const {role, roleLoading} = useRole();

    if(loading || roleLoading){
        return <LoadingSpinner></LoadingSpinner>;
    }
    if(role !== "borrower"){
        return <Forbidden></Forbidden>;
    }
    return children;
};

export default BorrowerRoute;