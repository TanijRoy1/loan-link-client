import React from "react";
import { FaHandHoldingUsd } from "react-icons/fa";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to={`/`} className="text-primary text-2xl font-bold flex items-center">
      <FaHandHoldingUsd />
      <span className="text-secondary font-extrabold">Loan</span>
      Link
    </Link>
  );
};

export default Logo;
