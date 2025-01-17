import { useForm } from "react-hook-form";

const AddItem = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <h1 className="text-gray-700 text-3xl font-medium">Add an meals</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* meal name  */}
        <div>
            <p>Meal Name</p>
          <input type="text" placeholder="inter meal name"
            {...register("mealName", { required: true })}
            aria-invalid={errors.mealName ? "true" : "false"}
          />
          {errors.mealName?.type === "required" && (
            <p role="alert">Meal name is required</p>
          )}
        </div>
        {/* meal category */}
        <div>
            <p>category name</p>
          <input type="text"
            {...register("category", { required: true })}
            aria-invalid={errors.category ? "true" : "false"}
          />
          {errors.category?.type === "required" && (
            <p role="alert">category name is required</p>
          )}
        </div>
        {/* meal image  */}
        <div>
            <p>Meal Image</p>
          <input type="file"
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
          <input type="text"
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
          <input type="number"
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
            <p>Meal Date</p>
          <input type="date"
            {...register("date", { required: true })}
            aria-invalid={errors.date ? "true" : "false"}
          />
          {errors.date?.type === "required" && (
            <p role="alert">First name is required</p>
          )}
        </div>
        {/* submit  */}
        <button >submit</button>
      </form>
    </div>
  );
};

export default AddItem;
