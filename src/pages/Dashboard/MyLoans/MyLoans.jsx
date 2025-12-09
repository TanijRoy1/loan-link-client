import React, { useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner";

const MyLoans = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedApplication, setSeletedApplication] = useState(null);
  const detailsMotalRef = useRef();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["applications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/loan-applications?email=${user?.email}`
      );
      return res.data;
    },
  });

  const handlePayment = async (application) => {
    const paymentInfo = {
      userEmail: application.userEmail,
      applicationId: application._id,
      loanTitle: application.loanTitle,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    // console.log(res.data);
    window.location.assign(res.data.url);
  };

  const openDetailsModal = (application) => {
    setSeletedApplication(application);
    detailsMotalRef.current.showModal();
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">My Loans</h2>

        <div>
          {isLoading ? (
            <LoadingSpinner></LoadingSpinner>
          ) : (
            <div>
              <div className="hidden lg:block overflow-x-auto mt-4">
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th className="text-left">Loan ID</th>
                      <th className="text-left">Loan Info</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((application, i) => (
                      <tr key={application._id}>
                        <td>{i + 1}</td>
                        <td className="text-left">
                          <p>{application.loanId}</p>
                        </td>
                        <td className="text-left">
                          <p className="font-semibold">
                            {application.loanTitle}
                          </p>
                          <p>{application.loanCategory}</p>
                          <p>{application.interestRate}</p>
                        </td>
                        <td>{application?.loanAmount}</td>
                        <td className="flex flex-col gap-2 items-center">
                          <p
                            className={`px-2 py-0.5 rounded-full font-semibold capitalize border ${
                              application?.status === "pending"
                                ? "text-yellow-600"
                                : application?.status === "approved"
                                ? "text-green-600"
                                : application?.status === "rejected"
                                ? "text-red-600"
                                : ""
                            }`}
                          >
                            {application?.status || "N/A"}
                          </p>

                          <p
                            className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize border ${
                              application?.applicationFeeStatus === "paid"
                                ? "border-green-500  text-green-700"
                                : application?.applicationFeeStatus === "unpaid"
                                ? "border-red-500 text-red-700"
                                : ""
                            }`}
                          >
                            {application?.applicationFeeStatus}
                          </p>
                        </td>
                        <td className="">
                          <div className="flex items-center justify-center gap-1 flex-col">
                            <div className="flex gap-1"><button
                              onClick={() => openDetailsModal(application)}
                              className="btn btn-sm btn-primary"
                            >
                              View
                            </button>
                            {application.status === "pending" && (
                              <button className="btn btn-sm bg-red-600 text-white">
                                Cancel
                              </button>
                            )}</div>
                            {application.applicationFeeStatus === "paid" ? (
                              <p className="px-3 py-1 rounded-full text-xs font-semibold capitalize border border-green-500 text-green-600">
                                Paid
                              </p>
                            ) : (
                              <button
                                onClick={() => handlePayment(application)}
                                className="btn btn-sm bg-secondary text-white"
                              >
                                Pay
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Application Details Modal */}
        <dialog
          ref={detailsMotalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box max-w-3xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-bold text-xl">
                  {selectedApplication?.loanTitle}
                </h3>
                <p className="text-sm text-accent-content">
                  Application ID:{" "}
                  <span className="font-mono text-xs">
                    {selectedApplication?._id}
                  </span>
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                    selectedApplication?.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : selectedApplication?.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {selectedApplication?.status || "unknown"}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                    selectedApplication?.applicationFeeStatus === "paid"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {selectedApplication?.applicationFeeStatus}
                </span>
              </div>
            </div>

            <div className="divider my-4" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-accent-content">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-accent-content">Applicant</p>
                  <p className="font-medium">
                    {selectedApplication?.firstName}{" "}
                    {selectedApplication?.lastName}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-accent-content">Email</p>
                  <p className="truncate">{selectedApplication?.userEmail}</p>
                </div>

                <div>
                  <p className="text-xs text-accent-content">Contact</p>
                  <p>{selectedApplication?.contactNumber}</p>
                </div>

                <div>
                  <p className="text-xs text-accent-content">National ID</p>
                  <p className="font-mono">{selectedApplication?.nationalId}</p>
                </div>

                <div>
                  <p className="text-xs text-accent-content">Address</p>
                  <p>{selectedApplication?.address}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-accent-content">Loan Category</p>
                  <p className="font-medium capitalize">
                    {selectedApplication?.loanCategory}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-accent-content">Loan ID</p>
                  <p className="font-mono">{selectedApplication?.loanId}</p>
                </div>

                <div>
                  <p className="text-xs text-accent-content">Loan Amount</p>
                  <p className="text-lg font-semibold">
                    BDT {selectedApplication?.loanAmount}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-accent-content">Interest Rate</p>
                  <p>{selectedApplication?.interestRate}%</p>
                </div>

                <div>
                  <p className="text-xs text-accent-content">Income Source</p>
                  <p className="capitalize">
                    {selectedApplication?.incomeSource}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-accent-content">Monthly Income</p>
                  <p>BDT {selectedApplication?.monthlyIncome}</p>
                </div>
              </div>
            </div>

            <div className="divider my-4" />

            <div className="space-y-3 text-sm text-accent-content">
              <div>
                <p className="text-xs text-accent-content">Reason for Loan</p>
                <p className="whitespace-pre-line">
                  {selectedApplication?.reason}
                </p>
              </div>

              <div>
                <p className="text-xs text-accent-content">Extra Notes</p>
                <p className="italic text-accent-content">
                  {selectedApplication?.extraNotes}
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs text-accent-content">
                <span>
                  Created at:&nbsp;
                  <span className="text-accent-content font-medium">
                    {new Date(selectedApplication?.createdAt).toLocaleString()}
                  </span>
                </span>

                <span className="mx-1">•</span>

                <span>
                  Record ID:&nbsp;
                  <span className="font-mono">{selectedApplication?._id}</span>
                </span>
              </div>
            </div>

            <div className="modal-action mt-6">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MyLoans;
