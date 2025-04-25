import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import Swal from "sweetalert2";

const AddUpComingMeal = () => {
  const { imageHostingApi, user } = useContext(AuthContext);
  const axiosPublic = UseAxiosPublic();
  const axiosSecure = UseAxiosSecure();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    const { email, displayName } = user;
    const {
      mealName,
      category,
      time,
      description,
      ingredient,
      mealImage,
      price,
    } = data;

    const mealImageList = { image: mealImage?.[0] };
    const res = await axiosPublic.post(imageHostingApi, mealImageList, {
      headers: { "content-type": "multipart/form-data" },
    });

    if (res.data.success) {
      const mealItem = {
        mealName,
        category,
        time,
        description,
        ingredient,
        mealImage: res.data.data.display_url,
        price,
        distributer_name: displayName,
        distributer_email: email,
        rating: 0,
        like: 0,
      };

      const mealRes = await axiosSecure.post("/upcoming-meal", mealItem);

      if (mealRes.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Meal added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen px-4 py-8">
      <h1 className="text-3xl md:text-5xl font-bold text-center text-[#111827] mb-10">
        Add Upcoming Meal
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6"
      >
        {/* Meal Name */}
        <div>
          <label className="block text-[#111827] text-lg font-semibold mb-2">
            Meal Name
          </label>
          <input
            type="text"
            placeholder="Enter meal name"
            {...register("mealName", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
          />
          {errors.mealName && (
            <p className="text-[#F43F5E] mt-1">Meal name is required</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-[#111827] text-lg font-semibold mb-2">
            Category
          </label>
          <select
            defaultValue="default"
            {...register("category", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
          >
            <option disabled value="default">
              Select a category
            </option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
          {errors.category && (
            <p className="text-[#F43F5E] mt-1">Category is required</p>
          )}
        </div>

        {/* Meal Image */}
        <div>
          <label className="block text-[#111827] text-lg font-semibold mb-2">
            Meal Image
          </label>
          <input
            type="file"
            {...register("mealImage", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          {errors.mealImage && (
            <p className="text-[#F43F5E] mt-1">Meal image is required</p>
          )}
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-[#111827] text-lg font-semibold mb-2">
            Ingredients
          </label>
          <input
            type="text"
            {...register("ingredient", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
          />
          {errors.ingredient && (
            <p className="text-[#F43F5E] mt-1">Ingredients are required</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-[#111827] text-lg font-semibold mb-2">
            Price
          </label>
          <input
            type="number"
            {...register("price", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          {errors.price && (
            <p className="text-[#F43F5E] mt-1">Price is required</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-[#111827] text-lg font-semibold mb-2">
            Description
          </label>
          <textarea
            rows={4}
            {...register("description", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-lg"
          ></textarea>
          {errors.description && (
            <p className="text-[#F43F5E] mt-1">Description is required</p>
          )}
        </div>

        {/* Time */}
        <div>
          <label className="block text-[#111827] text-lg font-semibold mb-2">
            Time
          </label>
          <input
            type="date"
            {...register("time", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          {errors.time && (
            <p className="text-[#F43F5E] mt-1">Time is required</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white py-3 rounded-lg font-semibold transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUpComingMeal;
