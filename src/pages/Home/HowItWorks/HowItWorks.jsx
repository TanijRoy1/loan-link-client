import React from "react";

import {
  FaUserCheck,
  FaFileSignature,
  FaMoneyCheckAlt,
  FaCheckCircle,
} from "react-icons/fa";
import MyContainer from "../../../components/MyContainer";
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

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Create an Account",
      description:
        "Sign up using your email and verify your account to begin your journey.",
      icon: <FaUserCheck className="text-4xl text-primary" />,
    },
    {
      id: 2,
      title: "Apply for a Loan",
      description:
        "Fill in the loan application form and upload required information.",
      icon: <FaFileSignature className="text-4xl text-primary" />,
    },
    {
      id: 3,
      title: "Pay Application Fee",
      description: "Secure your application by paying a small processing fee.",
      icon: <FaMoneyCheckAlt className="text-4xl text-primary" />,
    },
    {
      id: 4,
      title: "Get Approved",
      description:
        "A manager reviews your application and approves or rejects it.",
      icon: <FaCheckCircle className="text-4xl text-primary" />,
    },
  ];

  motion;

  return (
    <section className="py-16 bg-base-200">
      <MyContainer>
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-accent">How It Works</h2>
          <p className="text-accent-content mt-2">
            Follow these simple steps to apply for your loan quickly and
            securely.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={listVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 llg:gap-8 gap-4"
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={itemVariant}
              className="p-6 bg-base-100 rounded-xl shadow hover:shadow-lg transition-all transform hover:-translate-y-1  duration-300 text-center"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold text-accent mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-accent-content">{step.description}</p>

              <div className="mt-4 text-sm font-medium text-primary">
                Step {step.id}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </MyContainer>
    </section>
  );
};

export default HowItWorks;
