import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

const DashboardAllLoans = () => {
  const axiosSecure = useAxiosSecure();

  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["all-loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loans");
      return res.data;
    },
  });

  const handleShowOnHome = (isChecked, id) => {
    console.log(isChecked);

    axiosSecure
      .patch(`/loans/${id}/show-on-home`, { showOnHome: isChecked })
      .then((res) => {
        if (res.data.modifiedCount) {
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
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">All Loans</h2>

        <div className="overflow-x-auto">
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
                    <span className="text-lg font-semibold">{loan.title}</span>
                  </td>
                  <td>{loan.interestRate}%</td>
                  <td>{loan.category}</td>
                  <td>{loan?.createdAt}</td>
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

                  <td>
                    <button className="btn hover:btn-primary">
                      <FaTrashCan />
                    </button>
                    <button className="btn ml-2 hover:btn-primary">
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardAllLoans;
