import React, { useState } from "react";
import { FaCalculator } from "react-icons/fa";
import MyContainer from "../../../components/MyContainer";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";

const LoanCalculator = () => {
  const { register, handleSubmit } = useForm();
  const [emi, setEmi] = useState(null);

  const handleCalculateEMI = (data) => {
    if (!data.loanAmount || !data.interestRate || !data.months) return;

    const principal = parseFloat(data.loanAmount);
    const rate = parseFloat(data.interestRate) / 12 / 100;
    const numPayments = parseFloat(data.months);

    const emiValue =
      (principal * rate * Math.pow(1 + rate, numPayments)) /
      (Math.pow(1 + rate, numPayments) - 1);

    setEmi(emiValue.toFixed(2));
  };

  motion;

  return (
    <section className="py-16 bg-base-200">
      <MyContainer>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="sm:text-3xl text-2xl font-bold text-accent flex items-start gap-2 mb-6"
        >
          <FaCalculator /> Smart Loan Calculator
        </motion.h2>

        <p className="text-accent-content mb-8 max-w-2xl">
          Easily estimate your monthly EMI and total repayment amount before
          applying. Make smarter financial decisions with our quick calculator.
        </p>

        <form onSubmit={handleSubmit(handleCalculateEMI)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="text"
              placeholder="Loan Amount (BDT)"
              className="input input-bordered w-full"
              {...register("loanAmount", { required: true })}
            />

            <input
              type="text"
              placeholder="Interest Rate (%)"
              className="input input-bordered w-full"
              {...register("interestRate", { required: true })}
            />

            <input
              type="text"
              placeholder="Duration (Months)"
              className="input input-bordered w-full"
              {...register("months", { required: true })}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-6">
            Calculate EMI
          </button>
        </form>

        {emi && (
          <div className="mt-6 p-6 bg-base-100 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-accent">
              Your Estimated EMI
            </h3>
            <p className="text-lg mt-2 font-bold">{emi} BDT / month</p>
            <p className="text-sm mt-1 text-accent-content">
              (Based on your inputs)
            </p>
          </div>
        )}
      </MyContainer>
    </section>
  );
};

export default LoanCalculator;
