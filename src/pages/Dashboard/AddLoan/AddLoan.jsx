import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import loadingAnimationData from "../../../assets/json/paymentLoading.json";
import Lottie from "react-lottie";

const AddLoan = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [preview, setPreview] = useState("");
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
  };

  const handleAddLoan = (data) => {
    data.emiPlans = data.emiPlans.split(",").map((p) => p.trim());
    data.requiredDocuments = data.requiredDocuments
      .split(",")
      .map((d) => d.trim());
    data.createdAt = new Date();
    data.interestRate = parseFloat(data.interestRate);
    data.maxLoanLimit = parseInt(data.maxLoanLimit);
    const loanImg = data.image[0];

    const formData = new FormData();
    formData.append("image", loanImg);
    setLoading(true);
    axios
      .post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`,
        formData
      )
      .then((res) => {
        // console.log(res.data.data.url);
        data.image = res.data.data.url;
        // console.log(data);
        axiosSecure.post("/loans", data).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your loan has been added",
              showConfirmButton: false,
              timer: 1500,
            });
            setLoading(false);
          }
        });
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 rounded-md shadow">
      <h2 className="text-2xl font-semibold mb-4 text-accent">Add Loan</h2>

      <form onSubmit={handleSubmit(handleAddLoan)}>
        <fieldset className="space-y-4">
          <div>
            <label className="label">Loan Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="input w-full"
              placeholder="Loan Title"
            />
            {errors.title && (
              <p className="text-red-500">Loan Title is required</p>
            )}
          </div>

          <div>
            <label className="label">Description</label>
            <textarea
              {...register("description", { required: true })}
              className="textarea w-full"
              placeholder="Detailed description"
              rows={5}
            />
            {errors.description && (
              <p className="text-red-500">Description is required</p>
            )}
          </div>

          <div>
            <label className="label">Category</label>
            <input
              type="text"
              {...register("category", { required: true })}
              className="input w-full"
              placeholder="e.g., Agriculture"
            />
            {errors.category && (
              <p className="text-red-500">Category is required</p>
            )}

            <div>
              <label className="label">Interest Rate (%)</label>
              <input
                type="text"
                step="0.01"
                {...register("interestRate", {
                  required: true,
                  min: 0,
                })}
                className="input w-full"
                placeholder="e.g., 6.5"
              />
              {errors.interestRate?.type === "required" && (
                <p className="text-red-500">Interest Rate is required</p>
              )}
              {errors.interestRate?.type === "min" && (
                <p className="text-red-500">
                  Interest Rate must be 0 or greater
                </p>
              )}
            </div>

            <div>
              <label className="label">Max Loan Limit</label>
              <input
                type="text"
                {...register("maxLoanLimit", {
                  required: true,
                  min: 1,
                })}
                className="input w-full"
                placeholder="e.g., 200000"
              />
              {errors.maxLoanLimit?.type === "required" && (
                <p className="text-red-500">Max Loan Limit is required</p>
              )}
              {errors.maxLoanLimit?.type === "min" && (
                <p className="text-red-500">
                  Max Loan Limit must be at least 1
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="label">Required Documents</label>
            <input
              type="text"
              {...register("requiredDocuments", { required: true })}
              className="input w-full"
              defaultValue={"National ID, Photo"}
              placeholder="e.g., National ID, Photo"
            />
            {errors.requiredDocuments && (
              <p className="text-red-500">Required Documents are required</p>
            )}
          </div>
          <div>
            <label className="label">EMI Plans</label>
            <input
              type="text"
              {...register("emiPlans", { required: true })}
              className="input w-full"
              defaultValue={"3 months, 6 months, 12 months"}
              placeholder="e.g., 6 months, 12 months, 8 months"
            />
            {errors.emiPlans && (
              <p className="text-red-500"> EMI Plans are required</p>
            )}
          </div>

          <div>
            <div className="flex flex-wrap gap-4 w-full">
              <label className="label">Images Upload</label>
              <input
                type="file"
                accept="image/*"
                {...register("image", { required: true })}
                onChange={handleImageChange}
                className="file-input flex-1"
              />
            </div>
            <div className="mt-3">
              {preview.length > 0 && (
                <div className="relative w-28 h-20 rounded overflow-hidden border">
                  <img src={preview} className="object-cover w-full h-full" />
                </div>
              )}
            </div>
            {errors.image && (
              <p className="text-red-500 mt-2">Image is required</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <label className="label mb-0">Show on Home</label>
            <input
              type="checkbox"
              {...register("showOnHome")}
              className="toggle"
            />
          </div>

          <div>
            <button type="submit" className="btn btn-primary w-full">
              {loading ? (
                <span className="flex gap-1">
                  Adding{" "}
                  <Lottie
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: loadingAnimationData,
                      rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice",
                      },
                    }}
                    height={25}
                    width={25}
                    isStopped={false}
                    isPaused={false}
                  />
                </span>
              ) : (
                "Add Loan"
              )}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default AddLoan;
