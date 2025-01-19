import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import MealCart from "../components/MealCart";

const AllMeals = () => {
    const axiosPublic = UseAxiosPublic()
    const {data: meals} = useQuery({
        queryKey: ['meals'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/meals')
            return res.data;
        }
    })

  return (
    <div className="flex gap-4 ">
      <div className="">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
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
              <li>
                <Link>All meals</Link>
              </li>
              <li>
                <Link>Breakfast</Link>
              </li>
              <li>
                <Link>lunch</Link>
              </li>
              <li>
                <Link>Dinner</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-3 gap-4">
        {
            meals?.map(item=><MealCart key={item._id} item={item}></MealCart>)
        }
      </div>
    </div>
  );
};

export default AllMeals;
