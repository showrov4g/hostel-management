import { useContext, useState } from "react";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const AllMealsAddedbyAdmin = () => {
  const {user} = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  // state variable
  const [sortBy,setSortBy] = useState(false)
  const { data: meals, refetch } = useQuery({
    queryKey: ["meals",sortBy],
    queryFn: async () => {
      const res = await axiosSecure.get(sortBy? `/meals/sorted-by-${sortBy}` : `/meals/${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/meals/delete/${_id}`);
        if (res.data.deletedCount) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const handleSort =(sort)=>{
    setSortBy(sort);

  }


  return (
    <div>
      <h1 className="text-4xl font-semibold mb-5">You Have Added: {meals?.length} Meals</h1>
      <div className="mb-4">
        <button onClick={() => handleSort("likes")} className="btn btn-primary">Sort by Likes</button>
        <button onClick={() => handleSort("reviews")} className="btn btn-primary ml-2">Sort by Reviews Count</button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-primary text-white font-semibold">
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
                <td className="flex flex-col md:flex-row gap-3">
                  <button className="btn btn-primary"><Link to={`/dashboard/updateMeals/${item?._id}`}>Update</Link></button>
                  <button className="btn btn-error" onClick={() => handleDelete(item?._id)}>
                    Delete
                  </button>
                  <button className="btn btn-primary"><Link to={`/mealsdetails`}>Views meals</Link></button>
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
