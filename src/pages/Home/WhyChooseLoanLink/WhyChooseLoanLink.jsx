import { motion } from "framer-motion";
import {
  FaBolt,
  FaChartLine,
  FaUserShield,
  FaClock,
  FaMoneyCheckAlt,
  FaLayerGroup,
} from "react-icons/fa";
import MyContainer from "../../../components/MyContainer";

const reasons = [
  {
    id: 1,
    title: "Fast Loan Processing",
    description:
      "Apply online and track your loan status in real-time with a smooth approval workflow.",
    icon: <FaBolt />,
  },
  {
    id: 2,
    title: "Transparent Interest Rates",
    description:
      "No hidden charges. View loan limits, interest rates, and repayment terms clearly.",
    icon: <FaChartLine />,
  },
  {
    id: 3,
    title: "Role-Based Dashboards",
    description:
      "Separate dashboards for Users, Managers, and Admins with secure access control.",
    icon: <FaLayerGroup />,
  },
  {
    id: 4,
    title: "Secure & Reliable",
    description:
      "Enterprise-level authentication and encrypted data storage keep your information safe.",
    icon: <FaUserShield />,
  },
  {
    id: 5,
    title: "24/7 Online Access",
    description:
      "Manage your loans anytime, anywhere without visiting any physical branch.",
    icon: <FaClock />,
  },
  {
    id: 6,
    title: "Smart Loan Management",
    description:
      "Track applications, approvals, and loan details from a single unified platform.",
    icon: <FaMoneyCheckAlt />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const WhyChooseLoanLink = () => {
  motion;
  return (
    <section className="py-16 bg-base-200">
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
            Why Choose LoanLink
          </motion.h2>
          <motion.p
            variants={headingVariants}
            transition={{ delay: 0.15 }}
            className="text-accent-content mt-2 max-w-2xl mx-auto"
          >
            LoanLink simplifies loan management with secure technology,
            transparency, and a user-first experience.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.id}
              variants={itemVariants}
              className="card bg-base-100 border border-base-300 hover:border-primary transition-all duration-300"
            >
              <div className="card-body text-center">
                <div className="text-primary text-4xl mb-4 mx-auto">
                  {reason.icon}
                </div>
                <h3 className="card-title justify-center text-accent">
                  {reason.title}
                </h3>
                <p className="text-accent-content text-sm">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </MyContainer>
    </section>
  );
};

export default WhyChooseLoanLink;
