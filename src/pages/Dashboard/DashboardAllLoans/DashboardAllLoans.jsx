import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router";

const DashboardAllLoans = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: loans = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loans");
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/loans/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Loan has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleShowOnHome = (isChecked, id) => {
    axiosSecure
      .patch(`/loans/${id}/show-on-home`, { showOnHome: isChecked })
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${
              isChecked
                ? "Loan is now visible on the home page."
                : "Loan has been removed from the home page."
            }`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">All Loans</h2>

        <div className="hidden lg:block overflow-x-auto">
          <table className="table  text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Interest</th>
                <th>Category</th>
                <th>Created By</th>
                <th>Show on Home</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan, i) => (
                <tr key={loan._id}>
                  <td>{i + 1}</td>
                  <td>
                    <img
                      src={loan.image}
                      alt={loan.title}
                      className="w-15 h-15 rounded-2xl object-cover"
                    />
                  </td>
                  <td className="text-left">
                    <span className="xl:text-lg font-semibold">{loan.title}</span>
                  </td>
                  <td>{loan.interestRate}%</td>
                  <td>{loan.category}</td>
                  <td>{loan?.createdBy}</td>
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={loan.showOnHome}
                      onChange={(e) =>
                        handleShowOnHome(e.target.checked, loan._id)
                      }
                      className="checkbox checkbox-primary"
                    />
                  </td>

                  <td className="min-w-35">
                    <button
                      onClick={() => handleDelete(loan._id)}
                      className="btn hover:btn-primary"
                    >
                      <FaTrashCan />
                    </button>
                    <Link
                      to={`/dashboard/update-loan/${loan._id}`}
                      className="btn ml-2 hover:btn-primary"
                    >
                      <FaEdit />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden space-y-3">
          {loans.map((loan) => (
            <div
              key={loan._id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between  shadow-sm rounded-lg p-3"
            >
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-16 h-16 shrink-0 rounded-2xl overflow-hidden border">
                  <img
                    src={loan.image}
                    alt={loan.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold truncate">
                      {loan.title}
                    </h3>
                   
                  </div>
                  <p className="text-xs text-gray-500 mt-1 truncate">
                    {loan.category} • {loan.interestRate}% interest
                  </p>
                  <p className="text-xs text-gray-400 mt-1 truncate">
                    By {loan?.createdBy}
                  </p>
                </div>
              </div>

              <div className="mt-3 sm:mt-0 flex items-center gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!loan.showOnHome}
                    onChange={(e) =>
                      handleShowOnHome(e.target.checked, loan._id)
                    }
                    className="checkbox checkbox-primary"
                    aria-label={`Show ${loan.title} on home`}
                  />
                  <span className="text-xs">Home</span>
                </label>

                <button
                  onClick={() => handleDelete(loan._id)}
                  className="btn btn-sm"
                  aria-label={`Delete ${loan.title}`}
                >
                  <FaTrashCan />
                </button>

                <Link
                  to={`/dashboard/update-loan/${loan._id}`}
                  className="btn btn-sm"
                  aria-label={`Edit ${loan.title}`}
                >
                  <FaEdit />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardAllLoans;
