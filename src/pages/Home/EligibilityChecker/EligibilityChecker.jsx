import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import MyContainer from "../../../components/MyContainer";

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const EligibilityChecker = () => {
  const { register, handleSubmit, reset } = useForm();
  const [result, setResult] = useState(null);

  const onSubmit = (data) => {
    const income = Number(data.income);
    const amount = Number(data.amount);

    if (income >= amount / 4) {
      setResult("eligible");
    } else {
      setResult("notEligible");
    }
  };
  motion;

  return (
    <section className="py-16 bg-base-100">
      <MyContainer>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2
            variants={headingVariants}
            className="sm:text-3xl text-2xl font-bold text-accent"
          >
            Check Your Loan Eligibility
          </motion.h2>
          <motion.p
            variants={headingVariants}
            transition={{ delay: 0.15 }}
            className="text-accent-content mt-2 max-w-2xl mx-auto"
          >
            Quickly estimate whether you are eligible for a loan before
            applying. This check does not affect your credit score.
          </motion.p>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="card bg-base-200 border border-base-300 max-w-3xl mx-auto"
        >
          <div className="card-body">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-4 sm:grid-cols-2"
            >
              <div className="form-control">
                <label className="label">Monthly Income ($)</label>
                <input
                  type="number"
                  //   placeholder="e.g. 2000"
                  className="input input-bordered"
                  {...register("income", { required: true })}
                />
              </div>

              <div className="form-control">
                <label className="label">Loan Amount ($)</label>
                <input
                  type="number"
                  //   placeholder="e.g. 8000"
                  className="input input-bordered"
                  {...register("amount", { required: true })}
                />
              </div>

              <div className="form-control">
                <label className="label">Employment Type</label>
                <select
                  className="select select-bordered"
                  {...register("employment")}
                >
                  <option>Salaried</option>
                  <option>Self-Employed</option>
                  <option>Student</option>
                  <option>Unemployed</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">Loan Duration</label>
                <select
                  className="select select-bordered"
                  {...register("duration")}
                >
                  <option>6 Months</option>
                  <option>12 Months</option>
                  <option>24 Months</option>
                  <option>36 Months</option>
                </select>
              </div>

              <div className="sm:col-span-2 flex gap-4 mt-4">
                <button type="submit" className="btn btn-primary">
                  Check Eligibility
                </button>
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setResult(null);
                  }}
                  className="btn btn-outline"
                >
                  Reset
                </button>
              </div>
            </form>

            {result && (
              <div className="mt-6">
                {result === "eligible" ? (
                  <div className="alert alert-success flex items-center gap-2">
                    <FaCheckCircle />
                    <span>
                      You are likely eligible based on the provided information.
                    </span>
                  </div>
                ) : (
                  <div className="alert alert-error flex items-center gap-2">
                    <FaTimesCircle />
                    <span>
                      You may not be eligible. Consider adjusting loan amount or
                      duration.
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </MyContainer>
    </section>
  );
};

export default EligibilityChecker;
