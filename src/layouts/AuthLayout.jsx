import React from "react";
import { Outlet } from "react-router";
import MyContainer from "../components/MyContainer";
import Logo from "../components/Logo";

const AuthLayout = () => {
  return (
    <MyContainer className={`py-10`}>
      <Logo></Logo>
      <div className="flex lg:flex-row flex-col items-center justify-between gap-10 pt-8">
        <div className="flex-1 max-w-sm">
          <Outlet></Outlet>
        </div>
        <div className=" max-w-2xl">
          <h2 className="text-3xl font-bold text-accent mb-4">
            Welcome to Our Loan Portal
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Access flexible loans tailored to your needs. Login or create an
            account to manage your loan applications, view EMI plans, track loan
            status, and enjoy a seamless financial experience.
          </p>

          <ul className="mt-6 space-y-3 text-gray-700">
            <li>✔ Easy and secure login</li>
            <li>✔ Quick loan approval process</li>
            <li>✔ Transparent interest rates</li>
            <li>✔ Simple EMI calculator</li>
          </ul>
        </div>
      </div>
    </MyContainer>
  );
};

export default AuthLayout;
