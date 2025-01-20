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
    console.log(category)
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
      <h1 className="text-gray-700 text-3xl font-medium">Add an meals</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* meal name  */}
        <div>
          <p>Meal Name</p>
          <input
            type="text"
            placeholder="inter meal name"
            {...register("mealName", { required: true })}
            aria-invalid={errors.mealName ? "true" : "false"}
          />
          {errors.mealName?.type === "required" && (
            <p role="alert">Meal name is required</p>
          )}
        </div>
        {/* meal category */}
        {/* <div>
          <p>category name</p>
          <input
            type="text"
            {...register("category", { required: true })}
            aria-invalid={errors.category ? "true" : "false"}
          />
          {errors.category?.type === "required" && (
            <p role="alert">category name is required</p>
          )}
        </div> */}

        <div>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Category*</span>
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
          <p>Meal Image</p>
          <input
            type="file"
            {...register("mealImage", { required: true })}
            aria-invalid={errors.mealImage ? "true" : "false"}
          />
          {errors.mealImage?.type === "required" && (
            <p role="alert">Meal image is required</p>
          )}
        </div>
        {/* ingredients  */}
        <div>
          <p>Meal ingredients</p>
          <input
            type="text"
            {...register("ingredient", { required: true })}
            aria-invalid={errors.ingredient ? "true" : "false"}
          />
          {errors.ingredient?.type === "required" && (
            <p role="alert">First name is required</p>
          )}
        </div>
        {/* price */}
        <div>
          <p>Meal Price</p>
          <input
            type="number"
            {...register("price", { required: true })}
            aria-invalid={errors.price ? "true" : "false"}
          />
          {errors.price?.type === "required" && (
            <p role="alert">First name is required</p>
          )}
        </div>
        {/* description */}
        <div>
          <p>Meal Description</p>

          <textarea
            {...register("description", { required: true })}
            aria-invalid={errors.description ? "true" : "false"}
          ></textarea>
          {errors.description?.type === "required" && (
            <p role="alert">First name is required</p>
          )}
        </div>

        {/* date */}
        <div>
          <p>Meal time</p>
          <input
            type="time"
            {...register("time", { required: true })}
            aria-invalid={errors.time ? "true" : "false"}
          />
          {errors.time?.type === "required" && (
            <p role="alert">First name is required</p>
          )}
        </div>
        {/* submit  */}
        <button>submit</button>
      </form>
    </div>
  );
};

export default AddItem;
