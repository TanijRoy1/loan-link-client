import { Link, NavLink } from "react-router";
import Logo from "./Logo";
import MyContainer from "./MyContainer";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function Navbar() {
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
    <div className="shadow-xl bg-base-100">
      <MyContainer>
        <header className="flex items-center justify-between fontFamily-poppins py-4">
          <Logo></Logo>
          <nav className="lg:flex  hidden  items-center gap-2">
            <NavLink to={`/`} className={`myNavLink`}>
              Home
            </NavLink>
            <NavLink to={`all-loans`} className={`myNavLink`}>
              All Loans
            </NavLink>
            {user && (
              <NavLink to={`/dashboard`} className={`myNavLink`}>
                Dashboard
              </NavLink>
            )}
            <NavLink to={`/about-us`} className={`myNavLink`}>
              About Us
            </NavLink>
            <NavLink to={`/contact`} className={`myNavLink`}>
              Contact
            </NavLink>
            {user ? (
              <>
                <div className="dropdown dropdown-hover">
                  <div tabIndex={0} role="button" className="">
                    <img
                      src={user?.photoURL}
                      alt={user?.displayName}
                      className="w-9 h-9 border-2 border-primary rounded-full"
                    />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-1 mt-3 w-64 rounded-xl bg-base-100 p-4 shadow-lg transform -translate-x-45"
                  >
                    <li className="mb-3 cursor-default">
                      <div className="flex items-center gap-3">
                        <img
                          src={user?.photoURL}
                          alt={user?.displayName}
                          className="h-12 w-12 rounded-full border border-primary"
                        />
                        <div>
                          <p className="font-semibold leading-tight">
                            {user?.displayName || "User Name"}
                          </p>
                          <p className="text-xs opacity-70">{user?.email}</p>
                        </div>
                      </div>
                    </li>

                    <div className="divider my-2"></div>

                    <li>
                      <Link
                        to={`/dashboard/profile`}
                        className="btn btn-sm btn-primary w-full"
                      >
                        View Profile
                      </Link>
                    </li>

                    <li className="mt-2">
                      <button
                        onClick={handleSignOutUser}
                        className="btn btn-sm btn-outline btn-primary w-full"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={handleSignOutUser}
                  className="btn btn-outline btn-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to={`/login`} className={`btn btn-outline btn-primary`}>
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
              <NavLink to={`/all-loans`} className={`myNavLink`}>
                All Loans
              </NavLink>
              {user && (
                <NavLink to={`/dashboard`} className={`myNavLink`}>
                  Dashboard
                </NavLink>
              )}
              <NavLink to={`/about-us`} className={`myNavLink`}>
                About Us
              </NavLink>
              <NavLink to={`/contact`} className={`myNavLink`}>
                Contact
              </NavLink>
              {user ? (
                <>
                  <div className="flex items-center w-full gap-2 mt-3">
                    <img
                      src={user?.photoURL}
                      alt={user?.displayName}
                      className="w-9 h-9 border-2 border-primary rounded-full"
                    />
                    <h1 className="flex-1 text-lg font-semibold text-accent">
                      {user?.displayName}
                    </h1>
                  </div>
                  <button
                    onClick={handleSignOutUser}
                    className="btn btn-outline btn-primary w-full"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to={`/login`}
                    className={`btn btn-outline btn-primary mt-3 w-full`}
                  >
                    Login
                  </Link>
                  <Link to={`/register`} className={`btn btn-primary w-full`}>
                    Register
                  </Link>
                </>
              )}

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
