import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import MealCart from "../components/MealCart";

const MealByCategory = () => {
  const axiosPublic = UseAxiosPublic();
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ minPrice: 0, maxPrice: 100 });
  const { data: meals, isLoading } = useQuery({
    queryKey: ["meals", category, priceRange],
    queryFn: async () => {
      
      const data =
        category === "all"
          ? `/meals?limit=6`
          : `/meals/category/${category}`;

      const res = await axiosPublic.get(data);
      return res.data;
    },
  });

  return (
    <div className=" space-y-5 my-20">
      <div className="my-4 mx-auto">
        <ul className="flex items-center justify-center md:gap-2">
          {/* Sidebar content here */}
          <li>
            <button className="btn bg-[#3f8acd] hover:bg-[#6052ed] text-white"  onClick={() => setCategory("all")}>All meals</button>
          </li>
          <li>
            <button  className="btn bg-[#3f8acd] hover:bg-[#6052ed] text-white"   onClick={() => setCategory("Breakfast")}>breakfast</button>
          </li>
          <li>
            <button  className="btn bg-[#3f8acd] hover:bg-[#6052ed] text-white"  onClick={() => setCategory("Lunch")}>Lunch</button>
          </li>
          <li>
            <button  className="btn bg-[#3f8acd] hover:bg-[#6052ed] text-white"  onClick={() => setCategory("Dinner")}>Dinner</button>
          </li>
        </ul>
      </div> 
      <div>
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-semibold" >Meal for <span className="bg-gradient-to-r from-[#3f8acd] to-[#6052ed] text-transparent bg-clip-text">{category}</span></h1>
        <hr className="h-2 w-[28%] bg-gradient-to-r from-[#3f8acd] to-[#6052ed]" />
      </div>
      <div className="flex-1 grid md:grid-cols-3 gap-4">
        {meals?.map((item) => (
          <MealCart key={item._id} item={item}></MealCart>
        ))}
      </div>
    </div>
  );
};

export default MealByCategory;
