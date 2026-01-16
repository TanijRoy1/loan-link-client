import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaArrowRight, FaUserPlus } from "react-icons/fa";
import MyContainer from "../../../components/MyContainer";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const CallToAction = () => {
    motion;
  return (
    <section className="py-16 bg-linear-to-r from-primary to-secondary">
      <MyContainer>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <h2 className="sm:text-3xl text-2xl font-bold">
            Ready to Take Control of Your Financial Journey?
          </h2>

          <p className="mt-3 max-w-2xl mx-auto text-white/90">
            Apply for a loan, track approvals, and manage everything from a
            secure and user-friendly dashboard with LoanLink.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/all-loans"
              className="btn bg-white text-primary hover:bg-base-200"
            >
              Apply for a Loan
              <FaArrowRight className="ml-2" />
            </Link>

            <Link
              to="/register"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-primary"
            >
              Create Free Account
              <FaUserPlus className="ml-2" />
            </Link>
          </div>
        </motion.div>
      </MyContainer>
    </section>
  );
};

export default CallToAction;
