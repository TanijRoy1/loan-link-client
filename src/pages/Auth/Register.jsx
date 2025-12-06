import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUpUser, updateUser, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const handleRegistration = (data) => {
    const profileImg = data.photo[0];

    signUpUser(data.email, data.password).then((result) => {
      const currentUser = result.user;
      const formData = new FormData();
      formData.append("image", profileImg);
      axios
        .post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_image_host_key
          }`,
          formData
        )
        .then((res) => {
          // console.log(res.data.data.url);
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: res.data.data.url,
            role: data.role
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
            //   console.log("user added to database.");
              toast.success("User created successfully!");
            }
          });

          updateUser({ displayName: data.name, photoURL: res.data.data.url })
            .then(() => {
              setUser({
                ...currentUser,
                displayName: data.name,
                photoURL: res.data.data.url,
              });
            })
            .catch((e) => {
              console.log(e);
              setUser(currentUser);
            });
        });

      navigate(location.state || "/");
    });
  };
  return (
    <div>
      <h1 className="text-3xl text-accent font-bold">Create an Account</h1>
      <p className="mb-6">Register with LoanLink</p>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input w-full"
            placeholder="Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input w-full"
            placeholder="Photo"
          />
          {errors.photo?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}

          <label className="label">Role</label>
          <select
            defaultValue="Pick a Role"
            {...register("role", { required: true })}
            className="select w-full"
          >
            <option disabled={true}>Pick a Role</option>

            <option value="borrower">borrower</option>
            <option value="manager">manager</option>
          </select>

          {errors.role?.type === "required" && (
            <p className="text-red-500">Role is required</p>
          )}

          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
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
            placeholder="Password"
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
          <button className="btn btn-primary mt-4">Register</button>
        </fieldset>
      </form>
      <p className="mt-3">
        Already have an account?{" "}
        <Link
          to={`/login`}
          state={location?.state}
          className="text-primary hover:underline"
        >
          Login
        </Link>
      </p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
