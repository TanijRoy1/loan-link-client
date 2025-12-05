import { Link, NavLink } from "react-router";
import Logo from "./Logo";
import MyContainer from "./MyContainer";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="shadow-lg bg-base-100">
      <MyContainer>
        <header className="flex items-center justify-between fontFamily-poppins py-4">
          <Logo></Logo>
          <nav className="lg:flex  hidden  items-center gap-2">
            <NavLink to={`/`} className={`myNavLink`}>
              Home
            </NavLink>
            <NavLink to={`/dashboard/all-loans`} className={`myNavLink`}>
              All Loans
            </NavLink>
            <NavLink to={`/about-us`} className={`myNavLink`}>
              About Us
            </NavLink>
            <NavLink to={`/contact`} className={`myNavLink`}>
              Contact
            </NavLink>
            <Link to={`/login`} className={`btn btn-outline btn-primary`}>
              Login
            </Link>
            <Link to={`/register`} className={`btn btn-primary`}>
              Register
            </Link>
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
              <NavLink to={`/dashboard/all-loans`} className={`myNavLink`}>
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
      </MyContainer>
    </div>
  );
}
