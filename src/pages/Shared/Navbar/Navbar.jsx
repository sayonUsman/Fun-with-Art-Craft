import { Link, NavLink, useNavigate } from "react-router-dom";
import { SiGoogleclassroom } from "react-icons/Si";
import { IconContext } from "react-icons";
import { useContext, useState } from "react";
import { AuthContext } from "../../../authProvider/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut, loggedInUser } = useContext(AuthContext);
  const userDetails = loggedInUser();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogOut = (event) => {
    event.preventDefault();
    setErrorMessage("");

    logOut()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged out has been done successfully",
          showConfirmButton: true,
        });

        navigate("/login");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const navbarContent = (
    <>
      <li>
        <NavLink to="/" className="mb-1 lg:mb-0 lg:mr-1 link link-hover">
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/instructors"
          className="mb-1 lg:mb-0 lg:mr-1 link link-hover"
        >
          Instructors
        </NavLink>
      </li>

      <li>
        <NavLink to="/classes" className="mb-1 lg:mb-0 lg:mr-1 link link-hover">
          Classes
        </NavLink>
      </li>

      {user ? (
        <>
          <li>
            <NavLink
              to="/dashboard"
              className="mb-1 lg:mb-0 lg:mr-1 link link-hover"
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/login"
              onClick={handleLogOut}
              className="link link-hover"
            >
              Log Out
            </NavLink>
          </li>
        </>
      ) : (
        <li>
          <NavLink to="/login" className="link link-hover">
            Login
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="container navbar fixed z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
          </label>

          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-black bg-opacity-50 rounded-md w-52 text-white"
          >
            {navbarContent}
          </ul>
        </div>

        <a className="hidden sm:flex btn btn-ghost normal-case text-xl">
          Fun with Art & Craft
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navbarContent}</ul>
      </div>

      <div className="navbar-end">
        <div className="dropdown dropdown-end mr-3 md:mr-4">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <IconContext.Provider value={{ size: "25px" }}>
                <SiGoogleclassroom></SiGoogleclassroom>
              </IconContext.Provider>
              <span className="badge badge-sm indicator-item">0</span>
            </div>
          </label>

          <div
            tabIndex={0}
            className="mt-3 card rounded-md card-compact dropdown-content w-52 bg-black bg-opacity-50 text-white"
          >
            <div className="card-body">
              <span className="font-bold text-lg">0 Classes</span>
              <span>Subtotal: $00</span>

              <div className="text-center">
                <Link to="/dashboard/cart" className="link link-hover">
                  View cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {user && (
        <div className="dropdown dropdown-end mr-3 md:mr-4">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar online"
          >
            <div className="rounded-full">
              <img
                src={
                  userDetails[2]
                    ? userDetails[2]
                    : "https://img.freepik.com/free-vector/flat-lay-arts-crafts-background_23-2149129572.jpg?w=1380&t=st=1686141729~exp=1686142329~hmac=3f6aaa7bae11a14081c76c5722df7cff1b8ec7a0e4cc3eb3fb98db22db5a3e04"
                }
              />
            </div>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-black bg-opacity-50 rounded-md w-52 text-white"
          >
            <li>
              <NavLink
                to="/dashboard"
                className="justify-between btn-ghost link link-hover mb-1"
              >
                {userDetails[0] ? userDetails[0] : userDetails[1]}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/settings"
                className="btn-ghost link link-hover mb-1"
              >
                Settings
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/login"
                onClick={handleLogOut}
                className="btn-ghost link link-hover"
              >
                Log Out
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      {errorMessage && (
        <div className="toast toast-end">
          <div className="alert alert-error">
            <div>
              <span>{errorMessage}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
