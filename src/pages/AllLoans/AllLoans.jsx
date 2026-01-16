import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import MyContainer from "../../components/MyContainer";
import LoanCardSkeleton from "../../components/LoanCardSkeleton";

const AllLoans = () => {
  const axiosPublic = useAxiosPublic();
  const [searchText, setSearchText] = useState("");

  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const limit = 8;
  const [currentPage, setCurrentPage] = useState(0);

  const { data = {}, isLoading } = useQuery({
    queryKey: ["all-loans", searchText, category, sortBy, currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/loans?limit=${limit}&skip=${
          currentPage * limit
        }&searchText=${searchText}&category=${category}&sortBy=${sortBy}`
      );
      return res.data;
    },
  });

  const loans = data.loans || [];
  const totalloansCount = data.count || 0;
  const totalPages = Math.ceil(totalloansCount / limit);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(0);
  }
  const handleFilter = (e) => {
    setCategory(e.target.value);
    setCurrentPage(0);
  }
  const handleSort = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(0);
  }

  return (
    <section className="py-12">
      <MyContainer className="">
        <div className="bg-base-200 rounded-lg p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
            <h2 className="sm:text-3xl text-2xl font-semibold text-accent">
              All Loans
            </h2>

            <div className="flex flex-wrap gap-3 items-center">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  className="h-4 w-4 opacity-60"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="m21 21-4.3-4.3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <input
                  type="search"
                  className="grow"
                  placeholder="Search loan title..."
                  value={searchText}
                  onChange={(e) => handleSearch(e)}
                />
              </label>

              <select
                className="select select-bordered"
                value={category}
                onChange={(e) => handleFilter(e)}
              >
                <option value="">All Categories</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Entrepreneur">Entrepreneur</option>
                <option value="Women">Women</option>
                <option value="Retail">Retail</option>
              </select>

              <select
                className="select select-bordered"
                value={sortBy}
                onChange={handleSort}
              >
                <option value="">Sort By</option>
                <option value="interestLow">Interest: Low → High</option>
                <option value="interestHigh">Interest: High → Low</option>
                <option value="limitLow">Max Limit: Low → High</option>
                <option value="limitHigh">Max Limit: High → Low</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {[...Array(8)].map((_, i) => (
                <LoanCardSkeleton key={i}></LoanCardSkeleton>
              ))}
            </div>
          ) : (
            <div>
              {loans.length === 0 ? (
                <div className="p-6 bg-base-200 text-center rounded">
                  No loans available right now.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                  {loans.map((loan) => (
                    <div
                      key={loan._id}
                      className="bg-base-200 rounded shadow border border-base-300 p-3 flex flex-col hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300"
                    >
                      <div className="h-40 rounded overflow-hidden mb-3">
                        <img
                          src={loan.image}
                          alt={loan.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-accent mb-1">
                          {loan.title}
                        </h3>
                        <div className="text-sm text-accent-content mb-2 line-clamp-3">
                          {loan.description}
                        </div>

                        <div className="text-sm text-muted mb-3">
                          <span className="font-medium">Category:</span>{" "}
                          {loan.category}
                          <span className="ml-3 font-medium">
                            Interest:
                          </span>{" "}
                          {loan.interestRate}%
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div>
                          <div className="text-sm text-muted">Max Limit</div>
                          <div className="font-semibold">
                            {loan.maxLoanLimit} BDT
                          </div>
                        </div>

                        <Link
                          to={`/loans/${loan._id}`}
                          className="btn btn-sm btn-outline btn-primary"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pagination button */}
        <div className="flex gap-2 justify-center py-10">
          {currentPage > 0 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="btn btn-sm"
            >
              Prev
            </button>
          )}
          {[...Array(totalPages).keys()].map((i) => (
            <button
              onClick={() => setCurrentPage(i)}
              key={i}
              className={`btn btn-sm ${currentPage === i && "btn-primary"}`}
            >
              {i + 1}
            </button>
          ))}
          {currentPage < totalPages - 1 && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="btn btn-sm"
            >
              Next
            </button>
          )}
        </div>
      </MyContainer>
    </section>
  );
};

export default AllLoans;
