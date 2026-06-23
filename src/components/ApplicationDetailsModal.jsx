const ApplicationDetailsModal = ({ application, modalRef }) => {
  return (
    <>
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-3xl">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-accent-content">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-accent-content">Applicant</p>
                <p className="font-medium">
                  {application?.firstName} {application?.lastName}
                </p>
              </div>

              <div>
                <p className="text-xs text-accent-content">Email</p>
                <p className="truncate">{application?.userEmail}</p>
              </div>

              <div>
                <p className="text-xs text-accent-content">Contact</p>
                <p>{application?.contactNumber}</p>
              </div>

              <div>
                <p className="text-xs text-accent-content">National ID</p>
                <p className="font-mono">{application?.nationalId}</p>
              </div>

              <div>
                <p className="text-xs text-accent-content">Address</p>
                <p>{application?.address}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-accent-content">Loan Category</p>
                <p className="font-medium capitalize">
                  {application?.loanCategory}
                </p>
              </div>

              <div>
                <p className="text-xs text-accent-content">Loan ID</p>
                <p className="font-mono">{application?.loanId}</p>
              </div>

              <div>
                <p className="text-xs text-accent-content">Loan Amount</p>
                <p className="text-lg font-semibold">
                  BDT {application?.loanAmount}
                </p>
              </div>

              <div>
                <p className="text-xs text-accent-content">Interest Rate</p>
                <p>{application?.interestRate}%</p>
              </div>

              <div>
                <p className="text-xs text-accent-content">Income Source</p>
                <p className="capitalize">{application?.incomeSource}</p>
              </div>

              <div>
                <p className="text-xs text-accent-content">Monthly Income</p>
                <p>BDT {application?.monthlyIncome}</p>
              </div>
            </div>
          </div>

          <div className="divider my-4" />

          <div className="space-y-3 text-sm text-accent-content">
            <div>
              <p className="text-xs text-accent-content">Reason for Loan</p>
              <p className="whitespace-pre-line">{application?.reason}</p>
            </div>

            <div>
              <p className="text-xs text-accent-content">Extra Notes</p>
              <p className="italic text-accent-content">
                {application?.extraNotes}
              </p>
            </div>

            <div className="flex items-start  gap-2 flex-wrap text-xs text-accent-content">
              <span>
                Created at:{" "}
                <span className="text-accent-content font-medium">
                  {new Date(application?.createdAt).toLocaleString()}
                </span>
              </span>

              <span className="mx-1">•</span>

              <span>
                Approved at:{" "}
                <span className="text-accent-content font-medium">
                  {new Date(application?.approvedAt).toLocaleString()}
                </span>
              </span>

              <span className="mx-1">•</span>

              <span>
                Record ID: <span className="font-mono">{application?._id}</span>
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
    </>
  );
};

export default ApplicationDetailsModal;
