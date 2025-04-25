import { useContext, useState } from "react";
import {
  FaCookie,
  FaHome,
  FaRegQuestionCircle,
  FaUser,
  FaUserCircle,
  FaUsers,
} from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router";
import UseAdmin from "../Hooks/UseAdmin";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import {
  MdAdminPanelSettings,
  MdOutlineReviews,
  MdReviews,
} from "react-icons/md";
import { RiAlignItemLeftFill } from "react-icons/ri";
import { IoAddCircle } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Overview from "./Overview";

const AdminDashboard = () => {
  const [isAdmin] = UseAdmin();
  const { logout } = useContext(AuthContext);
  const handleLogOut = () => {
    logout()
      .then((res) =>
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You have successfully Logout",
          showConfirmButton: false,
          timer: 1500,
        })
      )
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="bg-[#F9FAFB]">
        <div className="navbar w-11/12 mx-auto">
          <div className="flex-1">
            <Link to={"/dashboard"} className="btn btn-ghost text-xl text-[#111827]">
              Dashboard
            </Link>
          </div>
          <div className="flex-none">
            <button onClick={handleLogOut} className="btn bg-[#6366F1] text-white">
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto my-20">
        {/* navbar  */}
        {/* navbar end */}
        <div className="md:flex gap-12 space-y-5">
          <div className="bg-[#F9FAFB] rounded-lg shadow-lg">
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
                    className="btn bg-[#6366F1] text-white drawer-button lg:hidden"
                  >
                    Open menu
                  </label>
                </div>
                <div className="drawer-side">
                  <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <ul className="menu bg-[#06B6D4] text-[#111827] text-xl min-h-full rounded-xl w-80 p-4">
                    {/* Sidebar content here */}
                    {isAdmin ? (
                      // admin
                      <div>
                        <li>
                          <Link to={"overview"} className="hover:text-[#F43F5E]">
                            <IoAddCircle /> Overview
                          </Link>
                        </li>
                        <li>
                          <Link to={"additem"} className="hover:text-[#F43F5E]">
                            <IoAddCircle /> Add an item
                          </Link>
                        </li>
                        <li>
                          <Link to={"addUpcomingMeal"} className="hover:text-[#F43F5E]">
                            <IoAddCircle />
                            Add upcoming Meal
                          </Link>
                        </li>

                        <li>
                          <Link to={"alluser"} className="hover:text-[#F43F5E]">
                            <FaUsers /> All user
                          </Link>
                        </li>

                        <li>
                          <Link to={"adminProfile"} className="hover:text-[#F43F5E]">
                            <MdAdminPanelSettings /> Admin Profile
                          </Link>
                        </li>
                        <li>
                          <Link to={"allAddedMealsAdmin"} className="hover:text-[#F43F5E]">
                            <RiAlignItemLeftFill /> All Meals
                          </Link>
                        </li>
                        <li>
                          <Link to={"allreviews"} className="hover:text-[#F43F5E]">
                            <MdReviews /> All Reviews
                          </Link>
                        </li>
                        <li>
                          <Link to={"serve"} className="hover:text-[#F43F5E]">
                            <FaCookie /> Serve Meals
                          </Link>
                        </li>
                        <li>
                          <Link to={"/"} className="hover:text-[#F43F5E]">
                            <FaHome /> Go to Home
                          </Link>
                        </li>
                      </div>
                    ) : (
                      // user
                      <div>
                        <li>
                          <Link to={"requested"} className="hover:text-[#F43F5E]">
                            <FaRegQuestionCircle /> My Requested Meals
                          </Link>
                        </li>
                        <li>
                          <Link to={"reviews"} className="hover:text-[#F43F5E]">
                            <MdOutlineReviews /> My Reviews
                          </Link>
                        </li>
                        <li>
                          <Link to={"userprofile"} className="hover:text-[#F43F5E]">
                            <CgProfile /> My Profile
                          </Link>
                        </li>
                        <li>
                          <Link to={"history"} className="hover:text-[#F43F5E]">
                            <CgProfile /> My Payment History
                          </Link>
                        </li>
                        <li>
                          <Link to={"/"} className="hover:text-[#F43F5E]">
                            <FaHome /> Go to Home
                          </Link>
                        </li>
                      </div>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex-1 bg-[#F9FAFB] p-2 md:p-14">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
