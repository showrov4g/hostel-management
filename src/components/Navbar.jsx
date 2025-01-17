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
        <NavLink to={"/meals"}>Meals</NavLink>
      </li>
      <li>
        <NavLink to={"/upcoming-meals"}>Upcoming Meals</NavLink>
      </li>
      <li>
        <NavLink to={""}>
          <div tabIndex={0} role="button" className="">
            <div className="indicator">
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to={'/dashboard'}>Dashboard</NavLink>
      </li>
  
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
        <a className="btn btn-ghost text-xl uppercase">
          Hos<span className="text-gray-500 -m-2">tel</span>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
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
                <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <p className="justify-between ml-3">
                {user?.displayName}
                <span className="badge">New</span>
              </p>

              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogOut}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <Link to={"/login"} className="btn">
            Join Us
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
