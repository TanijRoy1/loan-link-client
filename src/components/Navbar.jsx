import { Link, NavLink } from "react-router";
import Logo from "./Logo";
import { MdDarkMode } from "react-icons/md";
import MyContainer from "./MyContainer";

export default function Navbar() {
  return (
    <div className="shadow-lg bg-base-100">
      <MyContainer>
        <header className="flex items-center justify-between fontFamily-poppins py-4">
          <Logo></Logo>
          <nav className="flex items-center gap-2">
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
            <button className="mr-2 p-2 rounded-md cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <MdDarkMode />
            </button>
          </nav>
        </header>
      </MyContainer>
    </div>
  );
}
