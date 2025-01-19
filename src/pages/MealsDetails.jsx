import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { useLocation, useNavigate, useParams } from "react-router";
import { Rating } from "@smastrom/react-rating";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";

const MealsDetails = () => {
  // State variable
  const [like, setLike] = useState(false);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation()

  // Fetch meal details
  const { data: details, refetch } = useQuery({
    queryKey: ["details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/${id}`);
      setLike(details?.likedBy?.includes(user?.uid));
      return res.data;
    },
  });

  // Handle Like/Unlike API call
  const handleLike = async () => {
    if (!user) {
      toast.error("You need to login first");
      refetch();
      return;
    }
    const res = await axiosSecure.patch(`/meals/like/${id}`, {
      userId: user?.uid,
    })
    // ====
    if (res.data.modifiedCount) {
      setLike(!like); 
      refetch(); 
      toast.success("you have liked this meal")
    }
  };

  // handle request meal 

  const handleMealRequest =(details)=>{
    const mealRequest = {
      details,
      request_data: new Date(),
      status: "panning"
    }
    if(!user){
      toast.error("You need to login first")
      return navigate('/login')
    }
    axiosSecure.post('http://localhost:5000/meals/request',mealRequest)
    .then(res=>{})
    .catch(err=>{
      toast.error("You need an subscription")
    })
  }

  return (
    <div className="w-11/12 mx-auto">
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img src={details?.mealImage} alt={details?.mealName} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Meal Name: {details?.mealName}</h2>
          <p>{details?.distributer_name}</p>
          <p>{details?.ingredient}</p>
          <p>{details?.description}</p>
          <p>{details?.time}</p>
          <p>
            <Rating
              readOnly
              style={{ maxWidth: 250 }}
              value={details?.rating}
            />
            {details?.rating}
          </p>
          <p>Likes: {details?.likes}</p>
          <div className="card-actions justify-end">
            <button
              onClick={handleLike}
              className={`btn ${like ? "btn-secondary" : "btn-primary"}`}
            >
              {like ? "Unlike" : "Like"}
            </button>
            <button onClick={()=>handleMealRequest(details)} className="btn btn-primary">Meal Request</button>
          </div>
          <div>
            <p>Write a review</p>
            <textarea placeholder="Write a review" name="" id=""></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealsDetails;
