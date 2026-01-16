import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Login = () => {
  const { signInUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginUser = (data) => {
    signInUser(data.email, data.password)
      .then((res) => {
        toast.success(`${res.user.displayName} signed in successfully.`);
        navigate(location.state || "/");
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          toast.error("No account found with this email.");
        } else if (err.code === "auth/wrong-password") {
          toast.error("Incorrect password. Please try again.");
        } else {
          toast.error("Login failed. Please check your credentials.");
        }
      });
  };

  return (
    <div>
      <h1 className="text-3xl text-accent font-bold">Welcome Back</h1>
      <p className="mb-6">Login with LoanLink</p>
      <form onSubmit={handleSubmit(handleLoginUser)} className="">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            // placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
            })}
            className="input w-full"
            // placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be 6 characters or longer
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Password must have at least one uppercase , one lowercase, one
              number and one special characters
            </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-primary mt-4">Login</button>
        </fieldset>
      </form>
      <p className="mt-3">
        Don’t have any account?{" "}
        <Link
          to={`/register`}
          state={location?.state}
          className="text-primary hover:underline"
        >
          Register
        </Link>
      </p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
