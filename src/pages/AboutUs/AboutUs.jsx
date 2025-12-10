import React from "react";
import { FaHandshake, FaShieldAlt, FaUsers, FaChartLine } from "react-icons/fa";
import MyContainer from "../../components/MyContainer";

const AboutUs = () => {
  return (
    <section className="py-14 bg-base-100">
      <MyContainer>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl font-bold text-accent mb-3">
            About LoanLink
          </h1>
          <p className="text-accent-content">
            Empowering communities with transparent and accessible microloan
            solutions. LoanLink simplifies the loan journey for borrowers,
            managers, and financial organizations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-accent mb-3">
              Our Mission
            </h2>
            <p className="text-accent-content leading-relaxed">
              At LoanLink, our mission is to support individuals, entrepreneurs,
              farmers, and students by providing a seamless loan request and
              approval system. We aim to eliminate manual paperwork, reduce
              delays, and offer a user-friendly platform where borrowers can
              apply for loans easily and managers can review them efficiently.
            </p>
          </div>

          <div className="bg-base-200 p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-accent mb-3">
              Why LoanLink?
            </h3>
            <ul className="space-y-3 text-accent-content">
              <li>✔ Fast, secure, and paperless loan applications</li>
              <li>✔ Real-time application tracking for borrowers</li>
              <li>✔ Structured workflow for managers and admins</li>
              <li>
                ✔ Supports microfinance institutions, NGOs, and small lenders
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-base-200 rounded-xl text-center shadow">
            <FaHandshake className="size-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-accent mb-2">
              Transparency
            </h3>
            <p className="text-accent-content text-sm">
              Clear communication and honest loan terms for all users.
            </p>
          </div>

          <div className="p-6 bg-base-200 rounded-xl text-center shadow">
            <FaShieldAlt className="size-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-accent mb-2">Security</h3>
            <p className="text-accent-content text-sm">
              Your financial data is protected with advanced encryption.
            </p>
          </div>

          <div className="p-6 bg-base-200 rounded-xl text-center shadow">
            <FaUsers className="size-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-accent mb-2">
              Community Focus
            </h3>
            <p className="text-accent-content text-sm">
              Designed to support underserved communities and small borrowers.
            </p>
          </div>
        </div>

        <div className="bg-primary/10 p-8 rounded-xl shadow text-center">
          <h2 className="text-2xl font-semibold text-accent mb-3">
            Our Vision for the Future
          </h2>
          <p className="text-accent-content max-w-2xl mx-auto">
            We envision a world where financial access is simple, transparent,
            and equitable. LoanLink will continue evolving with smarter
            automation, faster approvals, and broader support for microfinance
            ecosystems.
          </p>
        </div>
      </MyContainer>
    </section>
  );
};

export default AboutUs;
