import React from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner";

const BorrowerHome = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    
      const {
        data: activeLoans = {},
        isLoading
      } = useQuery({
        queryKey: ["activeLoans", user?.email],
        queryFn: async () => {
          const res = await axiosSecure.get(`/applications/stats/borrower?email=${user?.email}`);
          return res.data;
        },
      });
      const {
        data: payments = [],
        isLoading: paymentLoading
      } = useQuery({
        queryKey: ["payments", user?.email],
        queryFn: async () => {
          const res = await axiosSecure.get(`/payments?email=${user?.email}`);
          return res.data;
        },
      });

      if (isLoading || paymentLoading) {
        return <LoadingSpinner></LoadingSpinner>;

      }

      const totalAmount = activeLoans[0].totalAmount;
const count = activeLoans[0].count;

  return (
    <div className="py-6 space-y-6">
      <header className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Your Dashboard, Forhad</h1>
          <p className="text-sm text-accent-content">
            Quick overview of your loan activity
          </p>
        </div>
       
          <Link to={`/all-loans`} className="btn px-4 py-2 bg-primary text-white">
            Apply New Loan
          </Link>
   
      </header>

    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-4 bg-primary/10 rounded-2xl shadow">
          <div className="text-sm text-accent-content">Total Loan Amount</div>
          <div className="text-2xl font-bold">৳ {totalAmount}</div>
          <div className="text-xs text-accent-content mt-2">
            Sum of principal for all your loans
          </div>
        </div>
        <div className="p-4 bg-primary/10 rounded-2xl shadow">
          <div className="text-sm text-accent-content">Active Loans</div>
          <div className="text-2xl font-bold">{count}</div>
          <div className="text-xs text-accent-content mt-2">
            Currently active loan accounts
          </div>
        </div>
        <div className="bg-primary/10 p-4 rounded-lg shadow">
          <h4 className="font-semibold mb-2">Notifications</h4>
        </div>
      </div>

      <div className="p-4 rounded-2xl shadow ">
  <h1 className="text-lg font-semibold mb-3">Recent Payments</h1>

  <div className="hidden lg:block overflow-x-auto">
    <table className="table w-full">
      <thead>
        <tr>
          <th className="w-8">#</th>
          <th className="text-left">Loan Info</th>
          <th className="text-left">Transaction ID</th>
          <th>Paid At</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((payment, i) => (
          <tr key={payment._id}>
            <th>{i + 1}</th>
            <td className="text-left">
              <p className="font-medium truncate max-w-md">{payment.loanTitle}</p>
              <p className="text-sm text-accent-content truncate max-w-md">{payment.applicationId}</p>
            </td>
            <td className="text-left truncate max-w-xs">{payment.transactionId}</td>
            <td className="whitespace-nowrap">
              {payment.paidAt ? new Date(payment.paidAt).toLocaleString() : "—"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  
  <div className="lg:hidden mt-2 space-y-3">
    {payments.map((payment, i) => (
      <div
        key={payment._id}
        className="border border-base-300 rounded-lg p-3 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div className="flex items-start gap-3 min-w-0">
          <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold">
            {i + 1}
          </div>

          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{payment.loanTitle}</p>
            <p className="text-xs text-accent-content truncate">{payment.applicationId}</p>
          </div>
        </div>

        <div className="flex-1 min-w-0 text-sm mt-2 sm:mt-0 sm:ml-4">
          <p className="truncate"><span className="font-semibold">Txn:</span> {payment.transactionId}</p>
          <p className="text-xs text-accent-content mt-1">
            <span className="font-semibold">Paid:</span>{" "}
            {payment.paidAt ? new Date(payment.paidAt).toLocaleString() : "—"}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default BorrowerHome;
