import React from "react";
import { Link } from "react-router";
import bannerImg from "../../../assets/banner.webp";
import MyContainer from "../../../components/MyContainer";
import { motion } from "motion/react";

const HeroBanner = () => {
  motion;
  return (
    <section
      className="relative bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <MyContainer className="relative py-35">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1 }}
          className="lg:w-1/2 text-white"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            // animate={{ opacity: 1, y: 0 }}
            whileInView={{opacity:1, y:0}}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Empowering Microloans for Growth
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-8 max-w-md text-gray-300"
          >
            LoanLink is your one-stop platform to request, manage, and track
            microloans seamlessly. Designed for NGOs, small financial
            institutions, and microloan providers.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.2 },
              },
            }}
            className="flex flex-wrap gap-4"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.9 },
                show: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/dashboard"
                className="btn btn-primary px-8 py-6 font-semibold"
              >
                Go to Dashboard
              </Link>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.9 },
                show: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/all-loans"
                className="btn btn-outline hover:btn-primary px-8 py-6 font-semibold"
              >
                Explore Loans
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </MyContainer>
    </section>
  );
};

export default HeroBanner;
