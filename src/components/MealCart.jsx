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
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={item.mealImage} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {item.mealName}
          <div className="badge badge-secondary">${item.price}</div>
        </h2>
        {/* reacting  */}
        <p className="flex items-center gap-2 justify-start"> ({rating? rating: 0})
        <Rating readOnly style={{ maxWidth: 150 }} value={rating}/>
        </p>
        <div className="card-actions justify-end">
          <Link to={`/mealsdetails/${item._id}`}  className="btn btn-primary">details</Link>
          
        </div>
      </div>
    </div>
  );
};

export default MealCart;
