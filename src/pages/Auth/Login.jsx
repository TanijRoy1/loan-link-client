import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const DEMO_USERS = {
  admin: {
    email: "tanijroy@gmail.com",
    password: "Tanij123@",
  },
  manager: {
    email: "rayhankabir@gmail.com",
    password: "Tanij123@",
  },
  borrower: {
    email: "forhadali@gmail.com",
    password: "Tanij123@",
  },
};

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

  const handleDemoLogin = (role) => {
    const demoUser = DEMO_USERS[role];
    if (!demoUser) return;

    signInUser(demoUser.email, demoUser.password)
      .then(() => {
        toast.success(`Demo ${role} logged in successfully`);
        navigate(location.state || "/");
      })
      .catch(() => {
        toast.error("Demo login failed");
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
      <div className="divider">Demo Login</div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => handleDemoLogin("admin")}
          className="btn btn-outline btn-secondary"
        >
          Demo Admin Login
        </button>

        <button
          onClick={() => handleDemoLogin("manager")}
          className="btn btn-outline btn-primary"
        >
          Demo Manager Login
        </button>

        <button
          onClick={() => handleDemoLogin("borrower")}
          className="btn btn-outline  border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
        >
          Demo Borrower Login
        </button>
      </div>

      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
