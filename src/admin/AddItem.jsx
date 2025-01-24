import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import Swal from "sweetalert2";

const AddItem = () => {
  const { imageHostingApi, user } = useContext(AuthContext);
  const axiosPublic = UseAxiosPublic();
  const axiosSecure = UseAxiosSecure();

  const [image_url, setImage_url] = useState("");
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
      headers: {
        "content-type": "multipart/form-data",
      },
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
      const mealRes = await axiosSecure.post("/meals", mealItem);

      if (mealRes.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div>
      <h1 className="text-gray-700 text-xl md:text-5xl font-medium text-center">Add an meals</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* meal name  */}
        <div>
          <p className=" md:text-2xl my-2">Meal Name</p>
          <input className="w-full p-3 font-bold"
            type="text"
            placeholder="inter meal name"
            {...register("mealName", { required: true })}
            aria-invalid={errors.mealName ? "true" : "false"}
          />
          {errors.mealName?.type === "required" && (
            <p role="alert" className="text-red-500">Meal name is required</p>
          )}
        </div>
 

        <div>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-2xl">Category*</span>
            </label>
            <select
              defaultValue="default"
              {...register("category", { required: true })}
              aria-invalid={errors.category ? "true" : "false"}
              className="select select-bordered w-full"
            >
              <option disabled value="default">
                Select a category
              </option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>
          
        </div>
        {/* meal image  */}
        <div>
          <p className="text-xl md:text-2xl my-2">Meal Image</p>
          <input className="w-full p-3 font-bold"
            type="file"
            {...register("mealImage", { required: true })}
            aria-invalid={errors.mealImage ? "true" : "false"}
          />
          {errors.mealImage?.type === "required" && (
            <p role="alert" className="text-red-500">Meal image is required</p>
          )}
        </div>
        {/* ingredients  */}
        <div>
          <p className="text-xl md:text-2xl my-2">Meal ingredients</p>
          <input className="w-full p-3 font-bold"
            type="text"
            {...register("ingredient", { required: true })}
            aria-invalid={errors.ingredient ? "true" : "false"}
          />
          {errors.ingredient?.type === "required" && (
            <p role="alert" className="text-red-500">First name is required</p>
          )}
        </div>
        {/* price */}
        <div>
          <p className="text-xl md:text-2xl my-2">Meal Price</p>
          <input className="w-full p-3 font-bold"
            type="number"
            {...register("price", { required: true })}
            aria-invalid={errors.price ? "true" : "false"}
          />
          {errors.price?.type === "required" && (
            <p role="alert" className="text-red-500">First name is required</p>
          )}
        </div>
        {/* description */}
        <div>
          <p className="text-xl md:text-2xl my-2">Meal Description</p>

          <textarea className="w-full" rows={5}
            {...register("description", { required: true })}
            aria-invalid={errors.description ? "true" : "false"}
          ></textarea>
          {errors.description?.type === "required" && (
            <p role="alert" className="text-red-500">First name is required</p>
          )}
        </div>

        {/* date */}
        <div>
          <p className="text-xl md:text-2xl my-2">Meal time</p>
          <input className="w-full p-3 font-bold"
            type="time"
            {...register("time", { required: true })}
            aria-invalid={errors.time ? "true" : "false"}
          />
          {errors.time?.type === "required" && (
            <p role="alert" className="text-red-500">First name is required</p>
          )}
        </div>
        {/* submit  */}
        <button className="btn btn-primary mt-4">submit</button>
      </form>
    </div>
  );
};

export default AddItem;
