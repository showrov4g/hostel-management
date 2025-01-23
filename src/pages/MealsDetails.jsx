import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { useLocation, useNavigate, useParams } from "react-router";
import { Rating } from "@smastrom/react-rating";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";
import { use } from "react";

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
  const [mealName, setMealName] = useState("");
  const [likes, setLikes] = useState("");
  const [reviewsCount, setReviewsCount] = useState(0);
  const [mealID, setMealId] = useState();
  const [rating, setRating] = useState(0);
  console.log(rating);

  // Fetch meal details
  const { data, refetch } = useQuery({
    queryKey: ["details", id],
    queryFn: async () => {
      const [mealDetails, upcomingDetails] = await Promise.all([
        axiosSecure.get(`/meals/meal/${id}`),
        axiosSecure.get(`/upcoming-meal/${id}`),
      ]);

      const combineData = {
        mealDetails: mealDetails.data,
        upcomingDetails: upcomingDetails.data,
      };
      return combineData;
    },
  });
  // meal review data fetching
  const { data: review } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });
  useEffect(() => {
    setMealName(data?.mealDetails?.mealName);
  }, [data]);
  useEffect(() => {
    setLikes(data?.mealDetails?.likes);
  }, [data]);
  useEffect(() => {
    setReviewsCount(data?.mealDetails?.ratingCount);
  }, [data]);
  useEffect(() => {
    setMealId(data?.mealDetails?._id);
  }, [data]);
  useEffect(() => {
    setRating(data?.mealDetails?.ratings?.length);
  }, [data]);

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
    const { mealName, likes } = details;
    const mealRequest = {
      mealName,
      likes,
      request_data: new Date(),
      status: "panning",
      email: user?.email,
      name: user?.displayName,
    };
    if (!user) {
      toast.error("You need to login first");
      return navigate("/login");
    }
    axiosSecure
      .post("/meals/request", mealRequest)
      .then((res) => toast.success("You have successfully request for meal"))
      .catch((err) => {
        toast.error("You need an subscription");
      });
  };
  // rating
  const handleRating = async () => {
    if (!user) {
      toast.error("You need to login first");
      return navigate("/login", { state: { from: location } });
    }
    if (userRating < 1 || userRating > 5) {
      toast.error("Please provide a rating between 1 and 5");
      return;
    }
    axiosSecure
      .post(`/meals/rate/${id}`, { rating: userRating })
      .then((res) => {
        if (res.data.message) {
          toast.success(res.data.message);
          refetch();
        }
      })
      .catch(() => {
        toast.error("Failed to submit rating. Please try again later.");
      });
  };

  // =================
  const handleReviews = (e) => {
    e.preventDefault();
    const reviewText = e.target.reviews.value;

    const review = {
      reviewsText: reviewText,
      userName: user?.displayName,
      email: user?.email,
      createdAt: new Date(),
      mealName,
      likes,
      reviewsCount,
    };

    axiosSecure
      .post(`/meals/review/${id}`, review)
      .then((res) => console.log(res));
    e.target.reset();
  };

  return (
    <div className=" w-full md:w-10/12 mx-auto">
      {data && (
        <div className="card bg-base-100 shadow-xl rounded-2xl">
          <figure className="my-5">
            <img
              className="w-[80%] rounded-xl"
              src={
                data.mealDetails?.mealImage || data.upcomingDetails?.mealImage
              }
              alt={data.mealDetails?.mealName}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-2xl md:text-4xl font-semibold text-gray-800 flex flex-col md:flex-row items-start justify-start">
              Meal Name:
              <span className="text-gray-600 uppercase">
                {data.mealDetails?.mealName || data.upcomingDetails?.mealName}
              </span>
            </h2>
            <p className="text-xl md:text-2xl font-semibold text-gray-800 capitalize flex flex-col md:flex-row items-start justify-start">
              {" "}
              distributor name:
              <span className="text-gray-600">
                {" "}
                {data.mealDetails?.distributer_name ||
                  data.upcomingDetails?.distributer_name}
              </span>
            </p>
            <p className="text-xl md:text-2xl  font-semibold text-gray-800 capitalize flex flex-col md:flex-row items-start justify-start">
              ingredients:
              <span className="text-gray-600">
                {" "}
                {data.mealDetails?.ingredient ||
                  data.upcomingDetails?.ingredient}
              </span>
            </p>
            <p className="text-xl md:text-2xl  font-semibold text-gray-800 capitalize flex flex-col md:flex-row items-start justify-start">
              description:
              <span className="text-gray-600 text-xl">
                {data.mealDetails?.description ||
                  data.upcomingDetails?.description}
              </span>
            </p>
            <p className="text-xl md:text-2xl  font-semibold text-gray-800 capitalize ">
              {" "}
              post time :
              <span className="text-gray-600">
                {" "}
                {data.mealDetails?.time || data.upcomingDetails?.time}
              </span>
            </p>
            <p>
              <p>
                <Rating
                  className=""
                  readOnly
                  style={{ maxWidth: 120 }}
                  value={
                    data.mealDetails?.averageRating ||
                    0 ||
                    data.upcomingDetails?.averageRating ||
                    0
                  }
                />
                (
                {data.mealDetails?.ratingCount ||
                  rating ||
                  data.upcomingDetails?.ratingCount ||
                  rating}
                Rating)
              </p>
            </p>
            <p>
              Likes: {data.mealDetails?.likes || data.upcomingDetails?.likes}
            </p>
            <div className="card-actions justify-end">
              <button
                onClick={handleLike}
                className={`btn ${like ? "btn-secondary" : "btn-primary"}`}
              >
                {like ? "Unlike" : "Like"}
              </button>
              {data?.mealDetails ? (
                <button
                  onClick={() => handleMealRequest(data.mealDetails)}
                  className="btn btn-primary"
                >
                  Meal Request
                </button>
              ) : (
                ""
              )}
            </div>
            {/* ==================== */}
            {/* Rating Submission */}
            <div className="text-center text-2xl md:text-4xl mt-10">
              Reviews about this Product
            </div>
            <div>
              {review?.map((item) => (
                <div className="my-2">
                  <p className="text-2xl">Reviews by: {item?.userName}</p>
                  <p className="text-wrap">{item?.reviewsText}</p>
                  <hr />
                </div>
              ))}
            </div>
            <div>
               <h2 className="text-2xl md:text-4xl text-gray-600 font-semibold text-center">Submit your reviews and Rating</h2>
              <div>
                <h3>Rate this Meal</h3>
                <Rating
                  value={userRating}
                  onChange={setUserRating}
                  style={{ maxWidth: 150 }}
                />
                <button onClick={handleRating} className="btn btn-sm btn-primary mt-2">
                  Submit Rating
                </button>
              </div>
              {/* ================== */}
              <div>
                <form className="flex flex-col items-start justify-center gap-5" onSubmit={handleReviews}>
                  <p>Write a review:</p>
                  <textarea 
                  className="border-2 w-full md:w-[50%] p-4"
                    placeholder="Write a review"
                    name="reviews"
                    id=""
                    required
                  ></textarea>
                  <input className="btn btn-primary" type="submit" value={"Submit"} />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealsDetails;
