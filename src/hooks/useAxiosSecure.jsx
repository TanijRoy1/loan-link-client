import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "https://loan-link-server-phi.vercel.app",
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const requestInterceptors = instance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });
    const responseInterceptors = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        // console.log(err.status);
        if (err.status === 401 || err.status === 403) {
          signOutUser().then(() => {
            navigate("/login");
          });
        }
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptors);
      instance.interceptors.response.eject(responseInterceptors);
    };
  }, [user, signOutUser, navigate]);

  return instance;
};

export default useAxiosSecure;
