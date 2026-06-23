import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ApplicationDetailsModal from "../../../components/ApplicationDetailsModal";

const ApprovedApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedApplication, setSeletedApplication] = useState(null);
  const detailsMotalRef = useRef();

  const { data: applicationsData = [], isLoading, refetch } = useQuery({
    queryKey: ["loan-applications", "approved"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loan-applications?status=approved");
      return res.data;
    },
  });
  const applications = applicationsData.applications || [];

  const openDetailsModal = (application) => {
    setSeletedApplication(application);
    detailsMotalRef.current.showModal();
  };

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">
          Approved Loan Applications
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
                      <th>Approved Date</th>
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
                          {new Date(application.approvedAt).toLocaleString()}
                        </td>

                        <td className="flex items-center justify-center">
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
                          <span className="font-semibold">Approved At: </span>
                          {new Date(application.approvedAt).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex mt-2">
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
        <ApplicationDetailsModal
          application={selectedApplication}
          modalRef={detailsMotalRef}
          refetchApplications={refetch}
        />
      </div>
    </section>
  );
};

export default ApprovedApplications;
