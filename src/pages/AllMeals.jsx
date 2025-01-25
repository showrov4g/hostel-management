import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import MealCart from "../components/MealCart";

const AllMeals = () => {
  const axiosPublic = UseAxiosPublic();
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ minPrice: 0, maxPrice: 100 });
  const { data: meals, isLoading } = useQuery({
    queryKey: ["meals", category, priceRange],
    queryFn: async () => {
      const query = `?minPrice=${priceRange.minPrice}&maxPrice=${priceRange.maxPrice}`;
      const data =
        category === "all"
          ? `/meals/${query}`
          : `/meals/category/${category}${query}`;

      const res = await axiosPublic.get(data);
      return res.data;
    },
  });
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="md:flex gap-4 space-y-8">
      <div className="">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
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
            <div>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <li>
                  <button onClick={() => setCategory("all")}>All meals</button>
                </li>
                <li>
                  <button onClick={() => setCategory("Breakfast")}>
                    breakfast
                  </button>
                </li>
                <li>
                  <button onClick={() => setCategory("Lunch")}>Lunch</button>
                </li>
                <li>
                  <button onClick={() => setCategory("Dinner")}>Dinner</button>
                </li>
                <li className="mt-4">
                  <div>
                    <label htmlFor="minPrice">Min Price</label>
                    <input
                      type="number"
                      name="minPrice"
                      value={priceRange.minPrice}
                      onChange={handlePriceChange}
                      className="input input-bordered w-full mb-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="maxPrice">Max Price</label>
                    <input
                      type="number"
                      name="maxPrice"
                      value={priceRange.maxPrice}
                      onChange={handlePriceChange}
                      className="input input-bordered w-full mb-2"
                    />
                  </div>
                </li>
              </ul>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div className="flex-1 grid md:grid-cols-3 gap-4">
        {meals?.map((item) => (
          <MealCart key={item._id} item={item}></MealCart>
        ))}
      </div>
    </div>
  );
};

export default AllMeals;
