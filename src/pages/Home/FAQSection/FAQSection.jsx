import React from "react";
import MyContainer from "../../../components/MyContainer";
import { motion } from "motion/react";

const faqs = [
  {
    q: "What is LoanLink and who can use it?",
    a: "LoanLink is a web-based microloan request, review and approval management system designed for NGOs, microfinance institutions, and small lenders. Borrowers, managers (loan officers), and admins can use the platform according to their roles.",
  },
  {
    q: "How do I apply for a loan?",
    a: "Create an account and log in as a borrower, visit the loan details page for the loan you want, then click 'Apply Now' and complete the application form. If an application fee is required, you'll be prompted to pay before the manager review.",
  },
  {
    q: "What documents do I need to apply?",
    a: "Required documents vary by loan product. Typical documents include a National ID (or passport), proof of income, and any loan-specific documents (e.g., business registration or invoice). Each loan shows the exact required documents on its details page.",
  },
  {
    q: "Is there an application fee? Will it be refunded if my loan is rejected?",
    a: "Some loan products require a small application/processing fee. By default, the fee pays for verification and processing and is not refunded if the loan is rejected. If your organization has a different refund policy, it will be displayed during application.",
  },
  {
    q: "How long does approval take?",
    a: "Approval time depends on the loan type and document verification, but most microloan applications are reviewed within a few business days after fee payment and submission of required documents.",
  },
  {
    q: "Can I cancel my application?",
    a: "Yes — borrowers can cancel an application while its status is still 'applied' (before payment or review). Once the manager starts processing (status: 'pending' or later), cancellation rules depend on your organization's policy.",
  },
  {
    q: "How can I check my loan status?",
    a: "After applying, you can track your application in Dashboard → My Loans. Each application shows its current status (applied, pending, approved, rejected) and important timestamps.",
  },
  {
    q: "What happens after my loan is approved?",
    a: "Once approved, the loan disbursement and EMI schedule steps follow your organization's process. Your dashboard will show EMI plans, payment schedules, and repayment options.",
  },
  {
    q: "Who can manage and approve loan applications?",
    a: "Managers (loan officers) can view pending applications, approve or reject them, and manage loans they created. Admins have full access to manage users, loans, and application records.",
  },
  {
    q: "I still need help — how do I contact support?",
    a: "Use the Contact page to send us a message or call the support number listed there. For urgent issues related to your application, include your application ID and contact information.",
  },
];

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

const FAQSection = () => {
  motion;
  return (
    <section className="py-16 bg-base-100">
      <MyContainer>
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-accent">
            Frequently Asked Questions
          </h2>
          <p className="text-accent-content mt-2">
            Answers to common questions about applying, fees, approvals and
            managing your loan.
          </p>
        </motion.div>

        <motion.div
          variants={listVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1  gap-6"
        >
          {faqs.map((item, idx) => (
            <motion.details
              variants={itemVariant}
              key={idx}
              className="group bg-base-200 rounded-lg p-5 open:shadow-lg"
            >
              <summary className="cursor-pointer list-none outline-none flex items-center justify-between">
                <span className="text-accent font-medium">{item.q}</span>
                <span className="ml-3 text-primary transition-transform group-open:rotate-180">
                  ▾
                </span>
              </summary>

              <div className="mt-4 text-accent-content">
                <p>{item.a}</p>
              </div>
            </motion.details>
          ))}
        </motion.div>

        <div className="text-center mt-8">
          <a href="/contact" className="btn btn-primary">
            Still have a question? Contact support
          </a>
        </div>
      </MyContainer>
    </section>
  );
};

export default FAQSection;
