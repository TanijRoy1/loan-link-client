import React from "react";
import { Link } from "react-router";
import MyContainer from "./MyContainer";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-10 py-10 border-t border-base-300">
      <MyContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Logo></Logo>
          <p className="text-sm text-accent-content max-w-sm mt-4">
            LoanLink is a simple and efficient microloan request, verification,
            and approval management system designed for NGOs, MFIs, and small
            financial organizations.
          </p>
        </div>

        <div>
          <h3 className="text-accent font-semibold text-lg mb-3">
            Useful Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard/all-loans" className="hover:text-primary">
                All Loans
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-accent font-semibold text-lg mb-3">
              Contact Info
            </h3>
            <p className="text-sm text-accent-content">
              Email: support@loanlink.com
            </p>
            <p className="text-sm text-accent-content">
              Phone: +880 1521799580
            </p>
          </div>

          <p className="text-xs text-accent-content mt-6">
            © {new Date().getFullYear()} LoanLink. All rights reserved.
          </p>
        </div>
      </MyContainer>
    </footer>
  );
};

export default Footer;
