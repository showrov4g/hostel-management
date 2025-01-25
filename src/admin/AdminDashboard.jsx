import { useContext, useState } from "react";
import { FaCookie, FaHome, FaRegQuestionCircle, FaUser, FaUserCircle, FaUsers } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router";
import UseAdmin from "../Hooks/UseAdmin";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { MdAdminPanelSettings, MdOutlineReviews, MdReviews } from "react-icons/md";
import { RiAlignItemLeftFill } from "react-icons/ri";
import { IoAddCircle } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const AdminDashboard = () => {
  const [isAdmin] = UseAdmin();
  const{logout} = useContext(AuthContext);
  const handleLogOut =()=>{
    logout()
    .then(res=> (
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You have successfully Logout",
        showConfirmButton: false,
        timer: 1500
      })
    ))
    .catch(err=>console.log(err))
  }
  return (
    <div className="w-11/12 mx-auto">
      {/* navbar  */}
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to={'/dashboard'} className="btn btn-ghost text-xl">Dashboard</Link>
        </div>
        <div className="flex-none">
          <button onClick={handleLogOut} className="btn btn-primary">Logout</button>
        </div>
      </div>

      {/* navbar end */}
      <div className="md:flex gap-12 space-y-5">
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
                  Open menu
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-2"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 text-xl min-h-full w-80 p-4">
                  {/* Sidebar content here */}
                  {isAdmin ? (
                    // admin 
                    <div>
                      <li>
                        <Link to={"additem"}><IoAddCircle /> Add an item</Link>
                      </li>
                      <li>
                        <Link to={"addUpcomingMeal"}><IoAddCircle />Add upcoming Meal</Link>
                      </li>

                      <li>
                        <Link to={"alluser"}>
                        <FaUsers /> All user
                        </Link>
                      </li>

                      <li>
                        <Link to={"adminProfile"}>
                        <MdAdminPanelSettings /> Admin Profile
                        </Link>
                      </li>
                      <li>
                        <Link to={"allAddedMealsAdmin"}>
                        <RiAlignItemLeftFill /> All Meals
                        </Link>
                        <Link to={"allreviews"}>
                        <MdReviews /> All Reviews
                        </Link>
                        <Link to={"serve"}>
                        <FaCookie /> Serve Meals
                        </Link>
                        <Link to={"/"}>
                        <FaHome /> Go to Home
                        </Link>
                      </li>
                    </div>
                  ) : (
                    // user 
                    <div>
                      <li>
                        <Link to={"requested"}><FaRegQuestionCircle></FaRegQuestionCircle> My Requested Meals</Link>
                      </li>
                      <li>
                        <Link to={"reviews"}><MdOutlineReviews /> My Reviews</Link>
                      </li>
                      <li>
                        <Link to={"userprofile"}><CgProfile /> My Profile</Link>
                      </li>
                      <li>
                        <Link to={"history"}><CgProfile /> My Payment History</Link>
                      </li>
                      <li>
                        <Link to={"/"}><FaHome /> Go to Home</Link>
                      </li>
                     
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="md:flex-1 bg-green-100 p-2 md:p-14">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
