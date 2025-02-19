import { useEffect, useState } from "react";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Link } from "react-router";

const MealCart = ({ item }) => {

  const [rating, setRating] = useState(0);


  useEffect(()=>{
    setRating(item?.averageRating)
  },[item])

  return (
    <div className="card bg-[#3f8acd] bg-opacity-10 hover:bg-opacity-15 p-3 shadow-xl transition-all duration-500  hover:scale-105">
      <figure>
        <img className="rounded-xl shadow-md" src={item.mealImage} alt="Meals" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Name:  {item.mealName}
          <div className="badge bg-[#767df1]">${item.price}</div>
        </h2>
        {/* short description */}
        <p>
          Description: {item.description.slice(0,100)}
        </p>

        {/* reacting  */}
        <p className="flex items-center gap-2 justify-start">Rating:({rating? rating: 0})
        <Rating  readOnly style={{ maxWidth: 120 }} value={rating}/>
        </p>
        <div className="card-actions justify-end">
          <Link to={`/mealsdetails/${item._id}`}  className="btn bg-[#3f8acd] hover:bg-[#6052ed] text-[#01080e] capitalize cursor-pointer">details</Link>
          
        </div>
      </div>
    </div>
  );
};

export default MealCart;
