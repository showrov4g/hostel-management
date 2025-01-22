import { useState } from "react";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router";
import UseAdmin from "../Hooks/UseAdmin";

const AdminDashboard = () => {
  const [isAdmin] = UseAdmin();
  return (
    <div className="w-11/12 mx-auto">
      {/* navbar  */}
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Dashboard</a>
        </div>
        <div className="flex-none">
          <button className="btn btn-primary">Logout</button>
        </div>
      </div>

      {/* navbar end */}
      <div className="flex gap-12">
        <div className="bg-green-50">
          <div>
            <div className="drawer lg:drawer-open">
              <input
                id="my-drawer-2"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label
                  htmlFor="my-drawer-2"
                  className="btn btn-primary drawer-button lg:hidden"
                >
                  Open drawer
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-2"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                  {/* Sidebar content here */}
                  {isAdmin ? (
                    // admin 
                    <div>
                      <li>
                        <Link to={"additem"}>Add an item</Link>
                      </li>
                      <li>
                        <Link to={"addUpcomingMeal"}>Add up Coming Meal</Link>
                      </li>

                      <li>
                        <Link to={"alluser"}>
                          <FaUser></FaUser> All user
                        </Link>
                      </li>

                      <li>
                        <Link to={"adminProfile"}>
                          <FaUserCircle></FaUserCircle> Admin Profile
                        </Link>
                      </li>
                    </div>
                  ) : (
                    // user 
                    <div>
                      <li>
                        <Link to={"requested"}>My Requested Meals</Link>
                      </li>
                      <li>
                        <Link to={"reviews"}>My Reviews</Link>
                      </li>
                      <li>
                        <Link to={"userprofile"}>My Profile</Link>
                      </li>
                     
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-green-100 p-14">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
