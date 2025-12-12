import React from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import MyContainer from "../../../components/MyContainer";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { motion } from "motion/react";

const listVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const AvailableLoans = () => {
  const axiosPublic = useAxiosPublic();

  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["available-loans"],
    queryFn: async () => {
      const res = await axiosPublic.get("/available-loans");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  motion;

  return (
    <section className="py-12 bg-base-100">
      <MyContainer className="">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between flex-wrap mb-6"
        >
          <h2 className="text-2xl font-semibold text-accent">
            Available Loans
          </h2>
          <Link to="/all-loans" className="text-sm link link-primary">
            View all loans
          </Link>
        </motion.div>

        {loans.length === 0 ? (
          <div className="p-6 bg-base-200 text-center rounded">
            No loans available right now.
          </div>
        ) : (
          <motion.div
            variants={listVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {loans.map((loan) => (
              <motion.div
                key={loan._id}
                variants={itemVariant}
                className="bg-base-200 rounded-lg shadow-md border border-base-300 p-4 flex flex-col hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
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
                  <p className="text-sm text-accent-content mb-3 line-clamp-3">
                    {loan.description}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm text-muted">Max Limit</div>
                    <div className="font-semibold">{loan.maxLoanLimit} BDT</div>
                  </div>

                  <Link
                    to={`/loans/${loan._id}`}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </MyContainer>
    </section>
  );
};

export default AvailableLoans;
