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
      confirmButtonColor: "#6366F1", // Primary Color (Indigo)
      cancelButtonColor: "#F43F5E", // Accent Color (Rose Red)
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
    <div className="bg-[#F9FAFB] p-5">
      <h1 className="text-[#111827] text-4xl font-semibold mb-5">You Have Added: {meals?.length} Meals</h1>
      <div className="mb-4">
        <button 
          onClick={() => handleSort("likes")} 
          className="btn" 
          style={{ backgroundColor: "#6366F1", color: "#fff" }} // Primary Color (Indigo)
        >
          Sort by Likes
        </button>
        <button 
          onClick={() => handleSort("reviews")} 
          className="btn ml-2" 
          style={{ backgroundColor: "#6366F1", color: "#fff" }} // Primary Color (Indigo)
        >
          Sort by Reviews Count
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead style={{ backgroundColor: "#6366F1", color: "#fff" }} className="font-semibold">
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
            {meals?.map((item, index) => (
              <tr key={item?._id}>
                <th>{index + 1}</th>
                <td>{item?.mealName}</td>
                <td>{item?.likes}</td>
                <td>{item?.review?.length}</td>
                <td>{item?.rating}</td>
                <td>{item?.distributer_name}</td>
                <td className="flex flex-col md:flex-row gap-3">
                  <button 
                    className="btn" 
                    style={{ backgroundColor: "#6366F1", color: "#fff" }} // Primary Color (Indigo)
                  >
                    <Link to={`/dashboard/updateMeals/${item?._id}`}>Update</Link>
                  </button>
                  <button 
                    className="btn" 
                    style={{ backgroundColor: "#F43F5E", color: "#fff" }} // Accent Color (Rose Red)
                    onClick={() => handleDelete(item?._id)}
                  >
                    Delete
                  </button>
                  <button 
                    className="btn" 
                    style={{ backgroundColor: "#6366F1", color: "#fff" }} // Primary Color (Indigo)
                  >
                    <Link to={`/mealsdetails`}>View Meals</Link>
                  </button>
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
