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
    <div className="space-y-8 my-20 px-4 bg-[#F9FAFB] text-[#111827]">
      <div className="flex justify-center items-center gap-3 flex-wrap">
        {["all", "Breakfast", "Lunch", "Dinner"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`btn rounded-full px-5 py-2 font-medium transition-colors duration-300 ${
              category === cat
                ? "bg-[#6366F1] text-white"
                : "bg-[#06B6D4] text-white hover:bg-[#6366F1]"
            }`}
          >
            {cat === "all" ? "All Meals" : cat}
          </button>
        ))}
      </div>

      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold">
          Meals for{" "}
          <span className="bg-gradient-to-r from-[#6366F1] to-[#06B6D4] text-transparent bg-clip-text capitalize">
            {category}
          </span>
        </h1>
        <div className="mt-2 h-1 w-36 mx-auto bg-gradient-to-r from-[#6366F1] to-[#06B6D4] rounded-full"></div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {meals?.map((item) => (
          <MealCart key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MealByCategory;
