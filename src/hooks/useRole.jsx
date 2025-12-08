import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {isLoading:roleLoading, data: currUser = {}} = useQuery({
        queryKey: ["user-role", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}/role`);
            return res.data;
        }
    })
    const {_id, role, status} = currUser;
    
    return {_id, role, status, roleLoading};
};

export default useRole;