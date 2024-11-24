import React, { useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../Account/PrivateRoute/Auth/AuthContext ";
import logo from "/src/assets/logo-icn.svg";

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useContext(AuthContext);

  // Dynamic title
  const pathTitle = {
    "/": "Eco-Adventure - Wildlife Safaris Assignment-9 Rusho",
    "/Login": "Login - Wildlife Safaris Assignment-9 Rusho",
    "/Register": "Register - Wildlife Safaris Assignment-9 Rusho",
    "/TalkWithExpert": "Talk With Expert - Wildlife Safaris Assignment-9 Rusho",
    "/Dashboard": "Dashboard - Wildlife Safaris Assignment-9 Rusho",
    "/UpdateProfile": "Update Profile - Wildlife Safaris Assignment-9 Rusho",
  };

  useEffect(() => {
    const currentTitle =
      pathTitle[location.pathname] ||
      "Eco-Adventure - Wildlife Safaris Assignment-9 Rusho";
    document.title = currentTitle;
  }, [location.pathname]);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-[16px] font-medium ${
              isActive
                ? "bg-primaryYellowBtn text-textWhite"
                : "hover:bg-btnHoverColor hover:text-textWhite"
            }`
          }
          end
        >
          Home
        </NavLink>
      </li>
      {!isAuthenticated ? (
        <>
          <li>
            <NavLink
              to="/Login"
              className={({ isActive }) =>
                `text-[16px] font-medium ${
                  isActive
                    ? "bg-primaryYellowBtn text-textWhite"
                    : "hover:bg-btnHoverColor hover:text-textWhite"
                }`
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Register"
              className={({ isActive }) =>
                `text-[16px] font-medium ${
                  isActive
                    ? "bg-primaryYellowBtn text-textWhite"
                    : "hover:bg-btnHoverColor hover:text-textWhite"
                }`
              }
            >
              Register
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink
              to="/Dashboard"
              className={({ isActive }) =>
                `text-[16px] font-medium ${
                  isActive
                    ? "bg-primaryYellowBtn text-textWhite"
                    : "hover:bg-btnHoverColor hover:text-textWhite"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/TalkWithExpert"
              className={({ isActive }) =>
                `text-[16px] font-medium ${
                  isActive
                    ? "bg-primaryYellowBtn text-textWhite"
                    : "hover:bg-btnHoverColor hover:text-textWhite"
                }`
              }
            >
              Talk with Expert
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <section className="bg-subTextColor backdrop-blur-md sticky top-0 z-10">
      <div className="max-w-6xl mx-auto">
        <div className="navbar font-barlowSemi py-8">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {links}
              </ul>
            </div>
            <div className="flex gap-2 items-center">
              <img className="w-10 h-10" src={logo} alt="Logo" />
              <a className="md:text-xl text-[16px] font-semibold">
                Wildlife Safaris
              </a>
            </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>
          <div className="navbar-end">
            <div className="flex gap-2 items-center justify-end w-full">
              {isAuthenticated && (
                <button
                  onClick={logout}
                  className="btn bg-primaryYellowBtn text-textWhite hover:bg-btnHoverColor cursor-pointer sm:w-full md:w-auto text-sm md:text-base"
                >
                  Logout
                </button>
              )}
              <span className="flex">
                <button className="btn hidden md:block bg-primaryYellowBtn text-textWhite hover:bg-btnHoverColor md:w-auto text-sm ">
                  BUY TICKETS
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
