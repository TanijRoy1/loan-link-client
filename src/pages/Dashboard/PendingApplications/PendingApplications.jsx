import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Swal from "sweetalert2";

const PendingApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedApplication, setSeletedApplication] = useState(null);
  const detailsMotalRef = useRef();

  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["loan-applications", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loan-applications?status=pending");
      return res.data;
    },
  });

  const handleApproveApplication = (application) => {
    Swal.fire({
      title: "Approve Application?",
      text: "Are you sure you want to approve this application? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedApplication = { status: "approved" };
        axiosSecure
          .patch(`/loan-applications/${application._id}`, updatedApplication)
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                title: "Approved",
                text: "The loan application has been successfully approved.",
                icon: "success",
              });
            }
          });
      }
    });
  };
  const handleRejectApplication = (application) => {
    Swal.fire({
      title: "Reject Application?",
      text: "Are you sure you want to reject this application? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedApplication = { status: "rejected" };
        axiosSecure
          .patch(`/loan-applications/${application._id}`, updatedApplication)
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                title: "Rejected",
                text: "The application has been rejected.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  const openDetailsModal = (application) => {
    setSeletedApplication(application);
    detailsMotalRef.current.showModal();
  };

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">
          Pending Loan Applications
        </h2>

        <div className="mt-4">
          {isLoading ? (
            <LoadingSpinner></LoadingSpinner>
          ) : (
            <div>
              <div className="hidden lg:block overflow-x-auto">
                <table className="table  text-center">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th className="text-left">Loan ID</th>
                      <th className="text-left">User Info</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((application, i) => (
                      <tr key={application._id}>
                        <td>{i + 1}</td>
                        <td className="text-left">
                          <p className="font-semibold">
                            {application.loanTitle}
                          </p>
                          <p>{application.loanId}</p>
                        </td>
                        <td className="text-left">
                          <p className="font-semibold">
                            {application?.firstName} {application.lastName}
                          </p>
                          <p className="text-accent-content">
                            {application.userEmail}
                          </p>
                        </td>
                        <td>BDT {application.loanAmount}</td>
                        <td>
                          {new Date(application.createdAt).toLocaleString()}
                        </td>

                        <td className="flex flex-wrap gap-2 items-center justify-center">
                          <button
                            onClick={() =>
                              handleApproveApplication(application)
                            }
                            className="btn btn-sm bg-green-600 text-white hover:bg-green-700"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() => handleRejectApplication(application)}
                            className="btn btn-sm bg-red-600 text-white hover:bg-red-700"
                          >
                            Reject
                          </button>

                          <button
                            onClick={() => openDetailsModal(application)}
                            className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="lg:hidden space-y-4">
                {applications.map((application, i) => (
                  <div
                    key={application._id}
                    className="card bg-base-100 p-4 shadow-sm border border-base-200"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-accent-content truncate">
                          {application.loanTitle}
                        </h4>
                        <span className="text-xs text-accent-content">
                          #{i + 1}
                        </span>
                      </div>

                      <p className="text-xs text-accent-content">
                        {application.loanId}
                      </p>

                      <div className="text-sm text-accent-content">
                        <p className="font-medium">
                          {application.firstName} {application.lastName}
                        </p>
                        <p className="text-xs truncate">
                          {application.userEmail}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-accent-content">
                          Amount: BDT {application.loanAmount}
                        </span>
                        <span className="text-xs text-accent-content">
                          {new Date(application.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-2">
                        <button
                          onClick={() => handleApproveApplication(application)}
                          className="btn btn-sm bg-green-600 text-white hover:bg-green-700 flex-1"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => handleRejectApplication(application)}
                          className="btn btn-sm bg-red-600 text-white hover:bg-red-700 flex-1"
                        >
                          Reject
                        </button>

                        <button
                          onClick={() => openDetailsModal(application)}
                          className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 flex-1"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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
    </section>
  );
};

export default PendingApplications;
