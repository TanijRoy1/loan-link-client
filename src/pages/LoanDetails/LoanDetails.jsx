import React from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";
import useRole from "../../hooks/useRole";

const LoanDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const {role} = useRole();

  const { data: loan = {}, isLoading } = useQuery({
    queryKey: ["loan-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/loans/${id}`);
      return res.data;
    },
  });

  if(isLoading){
    return <LoadingSpinner></LoadingSpinner>;
  }


  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-accent">{loan.title}</h2>
          <Link to="/all-loans" className="btn btn-sm btn-outline btn-primary">
            Back
          </Link>
        </div>

        <div className="w-full h-90 rounded-lg overflow-hidden shadow mb-8">
          <img
            src={loan.image}
            alt={loan.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-4 bg-base-100 rounded shadow border border-base-300">
            <h3 className="text-lg font-semibold text-accent mb-2">Category</h3>
            <p className="text-accent-content">{loan.category}</p>
          </div>

          <div className="p-4 bg-base-100 rounded shadow border border-base-300">
            <h3 className="text-lg font-semibold text-accent mb-2">
              Interest Rate
            </h3>
            <p className="text-accent-content">{loan.interestRate}%</p>
          </div>

          <div className="p-4 bg-base-100 rounded shadow border border-base-300">
            <h3 className="text-lg font-semibold text-accent mb-2">
              Max Loan Limit
            </h3>
            <p className="text-accent-content">{loan.maxLoanLimit} BDT</p>
          </div>

          <div className="p-4 bg-base-100 rounded shadow border border-base-300">
            <h3 className="text-lg font-semibold text-accent mb-2">
              EMI Plans
            </h3>
            <ul className="list-disc ml-5 text-accent-content">
              {loan.emiPlans?.length > 0 ? (
                loan.emiPlans.map((p, i) => <li key={i}>{p}</li>)
              ) : (
                <li>No EMI plans available</li>
              )}
            </ul>
          </div>
        </div>

        <div className="p-6 bg-base-100 rounded shadow border border-base-300 mb-8">
          <h3 className="text-xl font-semibold text-accent mb-3">
            Description
          </h3>
          <p className="text-accent-content leading-relaxed">
            {loan.description}
          </p>
        </div>

        <div className="flex justify-end">
          <Link 
            disabled={role === "borrower" ? false : true}
            className="btn btn-primary"
            to={`/apply-loan/${loan._id}`}
          >
            Apply Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoanDetails;
