import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Swal from "sweetalert2";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router";

const ManageLoans = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");

  const {
    data: loans = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-loans", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/loans?searchText=${searchText}`);
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

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-2xl font-semibold mb-4">Manage Loans</h2>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              required
              placeholder="Search"
            />
          </label>
        </div>

        <div>
          {isLoading ? (
            <LoadingSpinner></LoadingSpinner>
          ) : (
            <div>
              <div className="hidden lg:block overflow-x-auto mt-4">
                <table className="table  text-center">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th className="text-left">Image</th>
                      <th className="text-left">Title</th>
                      <th>Interest</th>
                      <th>Category</th>

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
                          <span className="font-semibold">
                            {loan.title}
                          </span>
                        </td>
                        <td>{loan.interestRate}%</td>
                        
                        <td>{loan.category}</td>

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
              <div className="lg:hidden space-y-4 mt-4">
                {loans.map((loan) => (
                  <div
                    key={loan._id}
                    className="card bg-base-100 border border-base-300 p-4 shadow"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={loan.image}
                        alt={loan.title}
                        className="w-20 h-20 rounded-2xl object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="font-bold text-accent-content">
                          {loan.title}
                        </h3>

                        <p className="text-sm text-accent-content">
                          Interest: {loan.interestRate}%
                        </p>

                        <p className="text-sm text-accent-content">
                          Category: {loan.category}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={() => handleDelete(loan._id)}
                        className="btn btn-sm hover:btn-primary"
                      >
                        <FaTrashCan />
                      </button>

                      <Link
                        to={`/dashboard/update-loan/${loan._id}`}
                        className="btn btn-sm hover:btn-primary"
                      >
                        <FaEdit />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ManageLoans;
