import { NavLink, Outlet } from "react-router-dom";
import { CgProfile } from "react-icons/Cg";
import { GiWallet } from "react-icons/Gi";
import { HiHome } from "react-icons/Hi";
import { RiLogoutBoxRFill } from "react-icons/Ri";
import { useContext, useState } from "react";
import { AuthContext } from "../authProvider/AuthProvider";
import Swal from "sweetalert2";

const Secondary = () => {
  const { loggedInUser, logOut } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const userDetails = loggedInUser();

  const handleLogOut = () => {
    setErrorMessage("");

    logOut()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged out has been done successfully",
          showConfirmButton: true,
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const navbarContent = (
    <>
      <ul className="menu p-4 h-full bg-white text-base-content">
        <li className="mt-12 text-3xl font-bold">{userDetails[0]}</li>
        <li className="text-md font-semibold pt-1">{userDetails[1]}</li>

        <li className="mt-20 mb-1 link link-hover">
          <NavLink to="/">
            <HiHome></HiHome> Home
          </NavLink>
        </li>

        <li className="mb-1 link link-hover">
          <NavLink to="profile">
            <CgProfile></CgProfile> My Profile
          </NavLink>
        </li>

        <li className="mb-1 link link-hover">
          <NavLink to="payment-history">
            <GiWallet></GiWallet> Payment History
          </NavLink>
        </li>

        <li className="link link-hover">
          <NavLink to="/login" onClick={handleLogOut}>
            <RiLogoutBoxRFill></RiLogoutBoxRFill> LogOut
          </NavLink>
        </li>
      </ul>
    </>
  );

  return (
    <div className="container mx-auto">
      <div className="md:hidden drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          <div className="container mx-auto navbar fixed">
            <div className="flex-none lg:hidden text-black">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>

            <div className="flex-1 px-2 mx-2 font-semibold">
              Fun with Art & Craft
            </div>

            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">{navbarContent}</ul>
            </div>
          </div>

          <Outlet></Outlet>
        </div>

        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          {navbarContent}
        </div>
      </div>

      <div className="hidden md:block min-h-screen">
        <div className="drawer md:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

          <div className="drawer-content flex flex-col items-center justify-center">
            <Outlet></Outlet>
          </div>

          <div className="drawer-side mr-7">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

            <ul className="menu p-4 w-80 h-full border-x-2 text-base-content">
              {navbarContent}
            </ul>
          </div>
        </div>
      </div>

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

export default Secondary;