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
  const [userRating, setUserRating] = useState(0);
  // ======
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch meal details
  const { data, refetch } = useQuery({
    queryKey: ["details", id],
    queryFn: async () => {
      const [mealDetails, upcomingDetails] = await Promise.all([
        axiosSecure.get(`/meals/${id}`),
        axiosSecure.get(`/upcoming-meal/${id}`)
      ]);

      const combineData = {
          mealDetails: mealDetails.data,
          upcomingDetails: upcomingDetails.data
      }
      // const res = await axiosSecure.get(`/meals/${id}`);
      // setLike(details?.likedBy?.includes(user?.uid));
      return combineData;
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
    });
    // ====
    if (res.data.modifiedCount) {
      setLike(!like);
      refetch();
      toast.success("you have liked this meal");
    }
  };

  // handle request meal

  const handleMealRequest = (details) => {
    const {} = details
    const mealRequest = {
      details,
      request_data: new Date(),
      status: "panning",
      email: user?.email
    };
    if (!user) {
      toast.error("You need to login first");
      return navigate("/login");
    }
    axiosSecure
      .post("/meals/request", mealRequest)
      .then((res) => {})
      .catch((err) => {
        toast.error("You need an subscription");
      });
  };
  // rating
  const handleRating = async () => {
    if (!user) {
      toast.error("You need to login first");
      return navigate("/login");
    }
    if (userRating < 1 || userRating > 5) {
      toast.error("Please provide a rating between 1 and 5");
      return;
    }

    const res = await axiosSecure.post(`/meals/rate/${id}`, {
      rating: userRating,
    });
    console.log(res);
    if (res.data.message) {
      toast.success(res.data.message);
      refetch();
    }

   
  };
  // =================
  const handleReviews = (e) => {
    e.preventDefault();
    const data = e.target.reviews.value;
    const review = {
      userid: id,
      userName : user?.displayName,
      reviewsText:data,
      createdAt: new Date(),
    };
    axiosSecure.post(`/meals/review/${id}`, {review})
    .then(res=> console.log(res))
  };

  return (
    <div className="w-11/12 mx-auto">
      {
        data && <div className="card bg-base-100 shadow-xl">
        <figure>
          <img src={data.mealDetails?.mealImage || data.upcomingDetails?.mealImage} alt={data.mealDetails?.mealName} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Meal Name: {data.mealDetails?.mealName || data.upcomingDetails?.mealName}</h2>
          <p>{data.mealDetails?.distributer_name || data.upcomingDetails?.distributer_name}</p>
          <p>{data.mealDetails?.ingredient || data.upcomingDetails?.ingredient}</p>
          <p>{data.mealDetails?.description || data.upcomingDetails?.description}</p>
          <p>{data.mealDetails?.time || data.upcomingDetails?.time}</p>
          <p>
            <p>
              <Rating
                readOnly
                style={{ maxWidth: 250 }}
                value={data.mealDetails?.averageRating || 0 || data.upcomingDetails?.averageRating||0}
              />
              ({data.mealDetails?.ratingCount || 0 || data.upcomingDetails?.ratingCount||0} ratings)
            </p>
          </p>
          <p>Likes: {data.mealDetails?.likes || data.upcomingDetails?.likes}</p>
          <div className="card-actions justify-end">
            <button
              onClick={handleLike}
              className={`btn ${like ? "btn-secondary" : "btn-primary"}`}
            >
              {like ? "Unlike" : "Like"}
            </button>
            <button
              onClick={() => handleMealRequest(data.mealDetails)}
              className="btn btn-primary"
            >
              Meal Request
            </button>
          </div>
          {/* ==================== */}
          {/* Rating Submission */}
          <div>
            <h3>Rate this Meal</h3>
            <Rating
              value={userRating}
              onChange={setUserRating}
              style={{ maxWidth: 250 }}
            />
            <button onClick={handleRating} className="btn btn-primary mt-2">
              Submit Rating
            </button>
          </div>
          {/* ================== */}
          <div>
            <form onSubmit={handleReviews}>
              <p>Write a review</p>
              <textarea
                placeholder="Write a review"
                name="reviews"
                id=""
              ></textarea>
              <input type="submit" value={"Submit"} />
            </form>
          </div>
        </div>
      </div>
      }
    </div>
    
  );
};

export default MealsDetails;
