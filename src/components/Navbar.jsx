import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import UseAdmin from "../Hooks/UseAdmin";

const Navbar = () => {
  const axiosSecure = UseAxiosSecure();
  const { logout, user } = useContext(AuthContext);
  console.log(user)


  const handleLogOut = () => {
    logout()
      .then((res) => toast.success("You have successfully Logout"))
      .catch((err) => toast.error(err.message));
  };

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/allmeals"}>All Meals</NavLink>
      </li>
      <li>
        <NavLink to={"/upcomingmeals"}>Upcoming Meals</NavLink>
      </li>

      <li>
        <NavLink to={'/dashboard'}>Dashboard</NavLink>
      </li>

    </>
  );
  return (
    <div className="bg-[#F9FAFB] z-50" style={{ position: "sticky", top: "0" }}>
    <div className="navbar w-11/12 mx-auto text-[#111827]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-[#111827]">
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
            className="menu menu-sm dropdown-content bg-[#F9FAFB] text-[#111827] rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to={'/'} className="text-xl m-0 text-[#6366F1] font-bold uppercase">
          Hostel
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-[#111827] font-medium">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src={user?.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#F9FAFB] text-[#111827] rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <p className="justify-between ml-3">
                {user?.displayName}
                <span className="badge bg-[#06B6D4] text-white">New</span>
              </p>
              <li><a>Settings</a></li>
              <li>
                <a onClick={handleLogOut} className="hover:text-[#F43F5E]">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to={"/login"}
            className="btn bg-[#6366F1] text-white outline-none border-none hover:bg-[#4f46e5]"
          >
            Join Us
          </Link>
        )}
      </div>
    </div>
  </div>
  


  );
};

export default Navbar;
