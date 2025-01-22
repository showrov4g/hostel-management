import UseMeals from "../Hooks/UseMeals";

const AllMealsAddedbyAdmin = () => {
  const [meals, refetch] = UseMeals();
  console.log(meals);
  return (
    <div>
      <h1>You Have Added: {meals?.length} Meals</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Meal Name</th>
              <th>Likes</th>
              <th>Reviews Count</th>
              <th>Rating</th>
              <th>Distributer Name</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {meals?.map((item, index) => (
              <tr key={item?._id}>
                <th>{index + 1}</th>
                <td>{item?.mealName}</td>
                <td>{item?.likes}</td>
                <td>{item?.review?.length}</td>
                <td>{item?.rating}</td>
                <td>{item?.distributer_name}</td>
                <td className="flex flex-col md:flex-row">
                    <button>Update</button>
                    <button>Delete</button>
                    <button>Views meals</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllMealsAddedbyAdmin;
