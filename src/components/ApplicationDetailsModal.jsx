import React from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ApplicationDetailsModal = ({
  application,
  modalRef,
  refetchApplications,
  setSelectedApplication,
}) => {
  const axiosSecure = useAxiosSecure();

  // -----------------------------
  // AI REPORT GENERATION
  // -----------------------------
  const generateReportMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.post(`/api/ai/reports/${application._id}`);
      return res.data;
    },

    onSuccess: async (response) => {
      toast.success("AI report generated successfully");

      // refresh parent list so modal gets updated data
      await refetchApplications();

      setSelectedApplication((prev) => ({
        ...prev,
        aiReportGenerated: true,
        aiReportId: response.data?.id,
        aiGeneratedAt: new Date().toISOString(),
      }));
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to generate AI report",
      );
    },
  });

  const handleGenerateReport = () => {
    generateReportMutation.mutate();
  };

  // prevent crash if modal opens before data loads
  if (!application) return null;

  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box max-w-3xl">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-bold text-xl">{application?.loanTitle}</h3>

            <p className="text-sm text-accent-content">
              Application ID:{" "}
              <span className="font-mono text-xs">{application?._id}</span>
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                application?.status === "approved"
                  ? "bg-green-100 text-green-800"
                  : application?.status === "rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {application?.status || "unknown"}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                application?.applicationFeeStatus === "paid"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {application?.applicationFeeStatus}
            </span>
          </div>
        </div>

        <div className="divider my-4" />

        {/* DETAILS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-accent-content">
          {/* LEFT */}
          <div className="space-y-3">
            <div>
              <p className="text-xs">Applicant</p>
              <p className="font-medium">
                {application?.firstName} {application?.lastName}
              </p>
            </div>

            <div>
              <p className="text-xs">Email</p>
              <p className="truncate">{application?.userEmail}</p>
            </div>

            <div>
              <p className="text-xs">Contact</p>
              <p>{application?.contactNumber}</p>
            </div>

            <div>
              <p className="text-xs">National ID</p>
              <p className="font-mono">{application?.nationalId}</p>
            </div>

            <div>
              <p className="text-xs">Address</p>
              <p>{application?.address}</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-3">
            <div>
              <p className="text-xs">Loan Category</p>
              <p className="font-medium capitalize">
                {application?.loanCategory}
              </p>
            </div>

            <div>
              <p className="text-xs">Loan ID</p>
              <p className="font-mono">{application?.loanId}</p>
            </div>

            <div>
              <p className="text-xs">Loan Amount</p>
              <p className="text-lg font-semibold">
                BDT {application?.loanAmount}
              </p>
            </div>

            <div>
              <p className="text-xs">Interest Rate</p>
              <p>{application?.interestRate}%</p>
            </div>

            <div>
              <p className="text-xs">Income Source</p>
              <p className="capitalize">{application?.incomeSource}</p>
            </div>

            <div>
              <p className="text-xs">Monthly Income</p>
              <p>BDT {application?.monthlyIncome}</p>
            </div>
          </div>
        </div>

        <div className="divider my-4" />

        {/* LOAN REASON */}
        <div className="space-y-3 text-sm text-accent-content">
          <div>
            <p className="text-xs">Reason for Loan</p>
            <p className="whitespace-pre-line">{application?.reason}</p>
          </div>

          <div>
            <p className="text-xs">Extra Notes</p>
            <p className="italic">{application?.extraNotes}</p>
          </div>
        </div>

        {/* ---------------- AI SECTION ---------------- */}
        <div className="divider my-4" />

        <div className="space-y-3">
          <h3 className="font-bold text-lg">AI Loan Analysis</h3>

          {application?.aiReportGenerated ? (
            <div className="space-y-2 text-sm">
              <p className="text-green-600 font-semibold">Generated ✓</p>

              <p>
                Report ID:{" "}
                <span className="font-mono">{application.aiReportId}</span>
              </p>

              <p>
                Generated At:{" "}
                {new Date(application.aiGeneratedAt).toLocaleString()}
              </p>

              <button className="btn btn-success btn-sm">
                Download Report
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-500">
                No AI report generated yet.
              </p>

              <button
                onClick={handleGenerateReport}
                disabled={generateReportMutation.isPending}
                className="btn btn-primary btn-sm"
              >
                {generateReportMutation.isPending
                  ? "Generating..."
                  : "Generate AI Report"}
              </button>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="modal-action mt-6">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ApplicationDetailsModal;
