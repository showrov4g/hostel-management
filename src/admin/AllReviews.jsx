import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { Link } from "react-router";
import Swal from "sweetalert2";

const AllReviews = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: reviews = [0], refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews`);
      return res.data;
    },
  });
  console.log(reviews);
  const handleDelete=(_id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
 
        const res =await axiosSecure.delete(`/meals/review/${_id}`)
        refetch()
        if(res.data.deletedCount){
          Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        }
      }
    });
  }

  return (
    <div>
      <h1 className="text-4xl font-semibold mb-5">All reviews: {reviews.length} </h1>
      {/* table  */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-primary text-white">
            <tr>
              <th>SL</th>
              <th>meal title</th>
              <th>likes</th>
              <th>reviews_count</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {reviews?.map((item, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{item?.mealName}</td>
                <td>{item?.likes}</td>
                <td>{item?.reviewsCount}</td>
                <td className="space-x-3">
                  <button className="btn btn-primary" onClick={()=>handleDelete(item?._id)}>Delete</button>
                  <button className="btn btn-error"><Link to={`/mealsdetails/${item?.productId}`}>view meal</Link></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllReviews;
