import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";

const AllReviews = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: reviews = [0] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews`);
      return res.data;
    },
  });
  console.log(reviews)
  return (
    <div>
      <h1>All reviews: {reviews.length} </h1>
      {/* table  */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
       
           
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllReviews;
