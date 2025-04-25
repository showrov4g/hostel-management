import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import MealCart from "../components/MealCart";

const AllMeals = () => {
  const axiosPublic = UseAxiosPublic();
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ minPrice: 0, maxPrice: 100 });
  const [visibleMeals, setVisibleMeals] = useState(6);

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-bars loading-lg text-[#6366F1]"></span>
      </div>
    );
  }

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };

  const loadMore = () => {
    setVisibleMeals((prev) => prev + 6);
  };

  return (
    <div className="my-20 px-4 md:px-8 bg-[#F9FAFB] text-[#111827]">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold capitalize bg-gradient-to-r from-[#6366F1] via-[#06B6D4] to-[#F43F5E] text-transparent bg-clip-text">
          {category} Meals
        </h1>
      </div>

      <div className="md:flex gap-8">
        {/* Sidebar Filter */}
        <div className="md:w-1/4 mb-8 md:mb-0">
          <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-[#111827]">Filter Meals</h2>
            <ul className="space-y-3">
              {["all", "Breakfast", "Lunch", "Dinner"].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setCategory(cat)}
                    className={`w-full text-left py-2 px-4 rounded-md transition-all duration-200 font-medium ${
                      category === cat
                        ? "bg-[#6366F1] text-white"
                        : "bg-[#F9FAFB] hover:bg-[#06B6D4] hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <label className="block text-sm font-medium">Min Price</label>
              <input
                type="number"
                name="minPrice"
                value={priceRange.minPrice}
                onChange={handlePriceChange}
                className="input input-bordered w-full mt-1 mb-3"
              />

              <label className="block text-sm font-medium">Max Price</label>
              <input
                type="number"
                name="maxPrice"
                value={priceRange.maxPrice}
                onChange={handlePriceChange}
                className="input input-bordered w-full mt-1"
              />
            </div>
          </div>
        </div>

        {/* Meal Cards */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          {meals?.slice(0, visibleMeals).map((item) => (
            <MealCart key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* Load More Button */}
      {visibleMeals < meals?.length && (
        <div className="text-center mt-10">
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-[#F43F5E] hover:bg-[#06B6D4] text-white rounded-lg font-medium transition-colors duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default AllMeals;
