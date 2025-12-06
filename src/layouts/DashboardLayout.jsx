import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";
import { FaBars, FaHandHoldingUsd, FaTimes } from "react-icons/fa";
import { MdAddCard } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const DashboardLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOutUser } = useAuth();
  const handleSignOutUser = () => {
    signOutUser()
      .then(() => {
        toast.success("Sign Out Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4 flex w-full">
              <header className="flex items-center w-full justify-between fontFamily-poppins py-2">
                <Logo></Logo>
                <nav className="lg:flex  hidden  items-center gap-2">
                  <NavLink to={`/`} className={`myNavLink`}>
                    Home
                  </NavLink>
                  <NavLink to={`/all-loans`} className={`myNavLink`}>
                    All Loans
                  </NavLink>
                  <NavLink to={`/about-us`} className={`myNavLink`}>
                    About Us
                  </NavLink>
                  <NavLink to={`/contact`} className={`myNavLink`}>
                    Contact
                  </NavLink>
                  {user ? (
                    <>
                      <img
                        src={user?.photoURL}
                        alt={user?.displayName}
                        className="w-9 h-9 border-2 border-primary rounded-full"
                      />
                      <button
                        onClick={handleSignOutUser}
                        className="btn btn-outline btn-primary"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to={`/login`}
                        className={`btn btn-outline btn-primary`}
                      >
                        Login
                      </Link>
                      <Link to={`/register`} className={`btn btn-primary`}>
                        Register
                      </Link>
                    </>
                  )}
                  <ThemeToggle></ThemeToggle>
                </nav>
                <div className="flex lg:hidden">
                  <button
                    className="lg:hidden text-2xl text-primary cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                  </button>
                  <nav
                    className={`${
                      menuOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-90"
                    } transition-all duration-500 ease-in  transform flex absolute flex-col justify-end items-center p-4 w-50 rounded-lg gap-2  border border-gray-400 bg-base-100 z-50 top-13 right-9 lg:hidden`}
                  >
                    <NavLink to={`/`} className={`myNavLink`}>
                      Home
                    </NavLink>
                    <NavLink
                      to={`/dashboard/all-loans`}
                      className={`myNavLink`}
                    >
                      All Loans
                    </NavLink>
                    <NavLink to={`/about-us`} className={`myNavLink`}>
                      About Us
                    </NavLink>
                    <NavLink to={`/contact`} className={`myNavLink`}>
                      Contact
                    </NavLink>
                    <Link
                      to={`/login`}
                      className={`btn btn-outline btn-primary mt-3 w-full`}
                    >
                      Login
                    </Link>
                    <Link to={`/register`} className={`btn btn-primary w-full`}>
                      Register
                    </Link>
                    <div className="absolute right-0 top-2">
                      <ThemeToggle></ThemeToggle>
                    </div>
                  </nav>
                </div>
              </header>
            </div>
          </nav>
          {/* Page content here */}
          <div className="p-4">
            <Outlet></Outlet>
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* List item */}
              <li>
                <NavLink
                  to={`/`}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="LoanLink"
                >
                  <FaHandHoldingUsd className="my-1.5 inline-block size-6 text-primary" />
                  <span className="is-drawer-close:hidden text-2xl font-bold text-primary transform -translate-x-1.5">
                    <span className="text-secondary font-extrabold">Loan</span>
                    Link
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/dashboard`}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right mt-8"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span className="is-drawer-close:hidden">Homepage</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={`/dashboard/add-loan`}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashboardNavLink"
                  data-tip="Add Loan"
                >
                  <MdAddCard className="my-1.5 inline-block size-4" />
                  <span className="is-drawer-close:hidden">Add Loan</span>
                </NavLink>
              </li>

              {/* List item */}
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Settings"
                >
                  {/* Settings icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                  <span className="is-drawer-close:hidden">Settings</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;
