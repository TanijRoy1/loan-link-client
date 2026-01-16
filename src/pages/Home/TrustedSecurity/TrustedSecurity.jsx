import { motion } from "framer-motion";
import { FaShieldAlt, FaLock, FaUserCheck, FaDatabase } from "react-icons/fa";
import MyContainer from "../../../components/MyContainer";

const securityFeatures = [
  {
    id: 1,
    title: "Secure Authentication",
    description:
      "Firebase authentication ensures secure login with encrypted credentials and protected sessions.",
    icon: <FaLock />,
  },
  {
    id: 2,
    title: "Data Encryption",
    description:
      "All sensitive user and loan data are securely stored using encrypted databases.",
    icon: <FaDatabase />,
  },
  {
    id: 3,
    title: "Verified Users & Roles",
    description:
      "Role-based access control for Users, Managers, and Admins ensures system integrity.",
    icon: <FaUserCheck />,
  },
  {
    id: 4,
    title: "Trusted Loan Processing",
    description:
      "Transparent loan approval workflow with real-time status tracking and admin verification.",
    icon: <FaShieldAlt />,
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

const TrustedSecurity = () => {
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
            Trusted & Secure Platform
          </motion.h2>

          <motion.p
            variants={headingVariants}
            transition={{ delay: 0.15 }}
            className="text-accent-content mt-2 max-w-2xl mx-auto"
          >
            LoanLink is built with enterprise-level security and transparency to
            keep your financial data safe and reliable.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {securityFeatures.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="card bg-base-200 border border-base-300 hover:border-primary transition-all duration-300"
            >
              <div className="card-body items-center text-center">
                <div className="text-primary text-4xl mb-4">{feature.icon}</div>
                <h3 className="card-title text-accent text-lg">
                  {feature.title}
                </h3>
                <p className="text-accent-content text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </MyContainer>
    </section>
  );
};

export default TrustedSecurity;
