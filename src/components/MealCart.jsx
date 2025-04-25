import { useEffect, useState } from "react";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Link } from "react-router";

const MealCart = ({ item }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(item?.averageRating || 0);
  }, [item]);

  return (
    <div className="card bg-[#F9FAFB] border border-gray-200 hover:shadow-lg rounded-xl p-4 transition-transform duration-500 hover:scale-105">
      <figure>
        <img
          className="rounded-xl shadow-md w-full h-48 object-cover"
          src={item.mealImage}
          alt="Meals"
        />
      </figure>
      <div className="card-body text-[#111827]">
        <h2 className="card-title text-lg font-semibold flex justify-between items-center">
          {item.mealName}
          <span className="bg-[#6366F1] text-white text-sm px-3 py-1 rounded-full">${item.price}</span>
        </h2>

        <p className="text-sm text-gray-700 mt-2">
          <span className="font-medium">Description:</span> {item.description.slice(0, 100)}...
        </p>

        <div className="flex items-center gap-2 mt-3">
          <span className="font-medium">Rating: {rating}</span>
          <Rating readOnly style={{ maxWidth: 120 }} value={rating} />
        </div>

        <div className="card-actions justify-end mt-4">
          <Link
            to={`/mealsdetails/${item._id}`}
            className="btn bg-[#06B6D4] hover:bg-[#6366F1] text-white capitalize px-4 py-2 rounded-lg transition-colors duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealCart;
