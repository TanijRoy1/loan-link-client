import React from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/LoadingSpinner";

const LoanApplication = () => {
  const { id: loanId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: loan = {}, isLoading } = useQuery({
      queryKey: ["loan", loanId],
      queryFn: async () => {
        const res = await axiosSecure.get(`/loans/${loanId}`);
        return res.data;
      },
    });




  const handleApplyLoan = (data) => {

    data.loanId = loan?._id || loanId;
    data.interestRate = parseFloat(data.interestRate);
    data.monthlyIncome = parseInt(data.monthlyIncome);
    data.loanAmount = parseInt(data.loanAmount);
    data.status= "pending";
    data.applicationFeeStatus= "unpaid";
    data.createdAt= new Date();
    console.log(data);
    
    
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  

  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto px-6 bg-base-100 rounded-md shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Loan Application</h2>


        <form onSubmit={handleSubmit(handleApplyLoan)} className="space-y-4">
    
          <div>
            <label className="label">User Email</label>
            <input type="email" {...register("userEmail")} className="input w-full" defaultValue={user?.email} readOnly />
          </div>

          <div>
            <label className="label">Loan Title</label>
            <input type="text" {...register("loanTitle")} className="input w-full" defaultValue={loan?.title} readOnly />
          </div>

          <div>
            <label className="label">Interest Rate (%)</label>
            <input type="text" {...register("interestRate")} className="input w-full" defaultValue={loan?.interestRate} readOnly />
          </div>

          <div>
            <label className="label">First Name</label>
            <input
              type="text"
              {...register("firstName", { required: true })}
              className="input w-full"
              placeholder="First Name"
            />
            {errors.firstName?.type === "required" && <p className="text-red-500">First name is required</p>}
          </div>

          <div>
            <label className="label">Last Name</label>
            <input
              type="text"
              {...register("lastName", { required: true })}
              className="input w-full"
              placeholder="Last Name"
            />
            {errors.lastName?.type === "required" && <p className="text-red-500">Last name is required</p>}
          </div>

          <div>
            <label className="label">Contact Number</label>
            <input
              type="text"
              {...register("contactNumber", { required: true, minLength: 8 })}
              className="input w-full"
              placeholder="e.g. +8801712345678"
            />
            {errors.contactNumber?.type === "required" && <p className="text-red-500">Contact number is required</p>}
            {errors.contactNumber?.type === "minLength" && (
              <p className="text-red-500">Contact number is too short</p>
            )}
          </div>

          <div>
            <label className="label">National ID / Passport Number</label>
            <input
              type="text"
              {...register("nationalId", { required: true })}
              className="input w-full"
              placeholder="National ID or Passport"
            />
            {errors.nationalId?.type === "required" && <p className="text-red-500">National ID is required</p>}
          </div>

          <div>
            <label className="label">Income Source</label>
            <input
              type="text"
              {...register("incomeSource", { required: true })}
              className="input w-full"
              placeholder="e.g., Farming / Tailoring"
            />
            {errors.incomeSource?.type === "required" && <p className="text-red-500">Income source is required</p>}
          </div>

          <div>
            <label className="label">Monthly Income</label>
            <input
              type="text"
              {...register("monthlyIncome", { required: true,  min: 1 })}
              className="input w-full"
              placeholder="Monthly income"
            />
            {errors.monthlyIncome?.type === "required" && <p className="text-red-500">Monthly income is required</p>}
            {errors.monthlyIncome?.type === "min" && <p className="text-red-500">Enter a valid income</p>}
          </div>

          <div>
            <label className="label">Loan Amount</label>
            <input
              type="text"
              {...register("loanAmount", { required: true, min: 1 })}
              className="input w-full"
              placeholder={`Max ${loan?.maxLoanLimit || ""}`}
            />
            {errors.loanAmount?.type === "required" && <p className="text-red-500">Loan amount is required</p>}
            {errors.loanAmount?.type === "min" && <p className="text-red-500">Enter a valid amount</p>}
            
          </div>

          <div>
            <label className="label">Reason for Loan</label>
            <textarea
              {...register("reason", { required: true })}
              className="textarea w-full"
              placeholder="Explain why you need this loan"
              rows={4}
            />
            {errors.reason?.type === "required" && <p className="text-red-500">Reason is required</p>}
          </div>

          <div>
            <label className="label">Address</label>
            <input
              type="text"
              {...register("address", { required: true })}
              className="input w-full"
              placeholder="Address"
            />
            {errors.address?.type === "required" && <p className="text-red-500">Address is required</p>}
          </div>

          <div>
            <label className="label">Extra Notes</label>
            <textarea {...register("extraNotes")} className="textarea w-full" placeholder="Optional notes" rows={3} />
          </div>

          
          <div>
            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}


export default LoanApplication;