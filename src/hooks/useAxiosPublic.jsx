import axios from 'axios';
import React from 'react';

const instance = axios.create({
    baseURL: "https://loan-link-server-phi.vercel.app",
})

const useAxiosPublic = () => {
    return instance;
};

export default useAxiosPublic;