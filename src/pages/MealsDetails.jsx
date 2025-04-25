import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { useLocation, useNavigate, useParams } from "react-router";
import { Rating } from "@smastrom/react-rating";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";

const MealsDetails = () => {
  const [like, setLike] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const [mealName, setMealName] = useState("");
  const [likes, setLikes] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [mealID, setMealId] = useState();
  const [rating, setRating] = useState(0);

  const { data, refetch } = useQuery({
    queryKey: ["details", id],
    queryFn: async () => {
      const [mealDetails, upcomingDetails] = await Promise.all([
        axiosSecure.get(`/meals/meal/${id}`),
        axiosSecure.get(`/upcoming-meal/${id}`),
      ]);
      return {
        mealDetails: mealDetails.data,
        upcomingDetails: upcomingDetails.data,
      };
    },
  });

  const { data: review } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    setMealName(data?.mealDetails?.mealName);
    setLikes(data?.mealDetails?.likes);
    setReviewsCount(data?.mealDetails?.ratingCount);
    setMealId(data?.mealDetails?._id);
    setRating(data?.mealDetails?.ratings?.length);
  }, [data]);

  const handleLike = async () => {
    if (!user) {
      toast.error("You need to login first");
      refetch();
      return;
    }
    const res = await axiosSecure.patch(`/meals/like/${id}`, {
      userId: user?.uid,
    });
    if (res.data.modifiedCount) {
      setLike(!like);
      refetch();
      toast.success("You have unlike this meal");
    }
  };

  const handleMealRequest = (details) => {
    const { mealName, likes } = details;
    const mealRequest = {
      mealName,
      likes,
      request_data: new Date(),
      status: "pending",
      email: user?.email,
      name: user?.displayName,
    };
    if (!user) {
      toast.error("You need to login first");
      return navigate("/login");
    }
    axiosSecure
      .post("/meals/request", mealRequest)
      .then((res) => toast.success("You have successfully requested the meal"))
      .catch((err) => {
        toast.error("You need a subscription");
      });
  };

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
      .then(
        (res) => toast.success("You have successfully reviewed this product"),
        refetch()
      )
      .catch((err) => toast.error(err));
    e.target.reset();
  };

  return (
    <div className="w-full my-20 mx-auto bg-[#F9FAFB]">
      {data && (
        <div className="flex gap-10 p-10 rounded-2xl bg-white shadow-lg">
          <figure className="my-5">
            <img
              className="w-full rounded-xl"
              src={data?.mealDetails?.mealImage || data?.upcomingDetails?.mealImage}
              alt={data?.mealDetails?.mealName}
            />
          </figure>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-[#111827]">
              Meal Name:
              <span className="text-[#6366F1] ml-3">
                {data?.mealDetails?.mealName || data?.upcomingDetails?.mealName}
              </span>
            </h2>
            <p className="text-xl font-semibold text-[#111827] capitalize">
              Ingredients:
              <span className="text-[#06B6D4] ml-3">
                {data?.mealDetails?.ingredient || data?.upcomingDetails?.ingredient}
              </span>
            </p>
            <p className="text-xl font-semibold text-[#111827] capitalize">
              Description:
              <span className="text-[#06B6D4] text-lg ml-3">
                {data?.mealDetails?.description || data?.upcomingDetails?.description}
              </span>
            </p>
            <p className="text-lg font-semibold text-[#111827] capitalize">
              Distributor Name:
              <span className="text-[#06B6D4] ml-3">
                {data?.mealDetails?.distributer_name || data?.upcomingDetails?.distributer_name}
              </span>
            </p>
            <p className="text-xl font-semibold text-[#111827] capitalize">
              Post Time:
              <span className="text-[#06B6D4]">
                {data?.mealDetails?.time || data?.upcomingDetails?.time}
              </span>
            </p>

            <div className="my-3">
              <Rating
                readOnly
                style={{ maxWidth: 120 }}
                value={data?.mealDetails?.averageRating || 0}
              />
              <span className="ml-2 text-[#111827]">
                ({data?.mealDetails?.ratingCount || rating} Rating)
              </span>
            </div>
            <p className="text-[#111827]">
              Likes: {data?.mealDetails?.likes || data?.upcomingDetails?.likes}
            </p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleLike}
                className={`btn ${like ? "bg-[#F43F5E] text-white" : "bg-[#6366F1] text-white"} hover:opacity-80 transition`}
              >
                {like ? "Unlike" : "Like"}
              </button>
              {data?.mealDetails && (
                <button
                  onClick={() => handleMealRequest(data?.mealDetails)}
                  className="btn bg-[#06B6D4] text-white hover:opacity-80 transition"
                >
                  Meal Request
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="p-10 space-y-10">
        <hr className="bg-[#6366F1]" />
        <div className="text-center text-2xl md:text-4xl mt-10 text-[#111827]">
          Reviews about this Product
        </div>
        <div>
          {review?.map((item) => (
            <div key={item._id} className="my-4 p-4 bg-white shadow-md rounded-xl">
              <p className="text-2xl font-semibold text-[#111827]">Reviews by: {item?.userName}</p>
              <p className="text-[#6366F1]">{item?.reviewsText}</p>
              <hr className="bg-[#6366F1] my-4" />
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h2 className="text-2xl md:text-4xl text-[#111827] font-semibold text-center">
            Submit your reviews and Rating
          </h2>
          <div className="my-5">
            <h3 className="text-[#6366F1]">Rate this Meal</h3>
            <Rating
              value={userRating}
              onChange={setUserRating}
              style={{ maxWidth: 150 }}
            />
            <button
              onClick={handleRating}
              className="btn btn-sm bg-[#F43F5E] text-white mt-2 hover:opacity-80 transition"
            >
              Submit Rating
            </button>
          </div>

          <div>
            <form
              className="flex flex-col items-start justify-center gap-5"
              onSubmit={handleReviews}
            >
              <p className="text-[#111827]">Write a review:</p>
              <textarea
                className="border-2 w-full md:w-[50%] p-4 rounded-xl"
                placeholder="Write a review"
                name="reviews"
                id=""
                required
              ></textarea>
              <input
                className="btn bg-[#6366F1] text-white mt-4 hover:opacity-80 transition"
                type="submit"
                value={"Submit"}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealsDetails;
