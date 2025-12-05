import React from "react";
import { Link } from "react-router";
import bannerImg from "../../../assets/banner.webp";
import MyContainer from "../../../components/MyContainer";

const HeroBanner = () => {
  return (
    <section
      className="relative bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <MyContainer className="relative py-35">
        <div className="lg:w-1/2 text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Empowering Microloans for Growth
          </h1>
          <p className="mb-8 max-w-md text-gray-300">
            LoanLink is your one-stop platform to request, manage, and track
            microloans seamlessly. Designed for NGOs, small financial
            institutions, and microloan providers.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/apply-loan"
              className="btn btn-primary px-8 py-6 font-semibold"
            >
              Apply for Loan
            </Link>

            <Link
              to="/dashboard/all-loans"
              className="btn btn-outline hover:btn-primary px-8 py-6 font-semibold"
            >
              Explore Loans
            </Link>
          </div>
        </div>
      </MyContainer>
    </section>
  );
};

export default HeroBanner;
