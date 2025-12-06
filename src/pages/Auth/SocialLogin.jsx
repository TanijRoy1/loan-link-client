import React, { useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SocialLogin = () => {
  const { googleSignInUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const roleModalRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleGoogleSignin = (data) => {
    console.log(data);

    googleSignInUser().then((res) => {
      navigate(location.state || "/");
      const userInfo = {
        email: res.user.email,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
        role: data.role
      };
      axiosSecure.post("/users", userInfo).then((res) => {
        if (res.data.insertedId) {
          console.log("user added to database.");
          toast.success("User created successfully!")
        } else{
            console.log(res.data);
            toast("Your role already has been saved.");
        }
      });
    });
  };
  const handleOpenModal = () => {
    roleModalRef.current.showModal();
    
  };
  return (
    <div>
      <p className="py-4 text-center">Or</p>
      <button
        onClick={handleOpenModal}
        className="flex items-center gap-1.5 btn w-full"
      >
        <FcGoogle className="text-2xl" />
        Sign in with google
      </button>

      <dialog ref={roleModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form onSubmit={handleSubmit(handleGoogleSignin)}>
            <fieldset className="fieldset">
              <label className="label text-lg text-accent">Role</label>
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

              <button className="btn btn-primary mt-4">Sign In</button>
            </fieldset>
          </form>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SocialLogin;
