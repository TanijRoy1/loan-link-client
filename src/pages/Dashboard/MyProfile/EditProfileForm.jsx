import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

const EditProfileForm = ({ user }) => {
  const axiosSecure = useAxiosSecure();
  const { updateUser, setUser } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      displayName: user.displayName,
      photoURL: user.photoURL,
    },
  });

  const editProfile = async (data) => {
    updateUser({
      displayName: data.displayName,
      photoURL: data.photoURL,
    })
      .then(() => {
        axiosSecure.patch(`/users-upate/${user._id}`, data).then((res) => {
          if (res.data.modifiedCount) {
            setUser((prev) => ({
              ...prev,
              displayName: data.displayName,
              photoURL: data.photoURL,
            }));

            // 🔹 4. Invalidate React Query cache (THIS IS THE KEY)
            queryClient.invalidateQueries(["user", user._id]);
            toast.success("Profile updated successfully");
            document.getElementById("edit_profile_modal").close();
          }
        });
      })
      .catch(() => {
        toast.error("Failed to update profile");
      });
  };

  return (
    <form onSubmit={handleSubmit(editProfile)} className="space-y-3">
      <div>
        <label className="label">Full Name</label>
        <input
          {...register("displayName")}
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label className="label">Photo URL</label>
        <input
          {...register("photoURL")}
          className="input input-bordered w-full"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary btn-sm w-full"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditProfileForm;
