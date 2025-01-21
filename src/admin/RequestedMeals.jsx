import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";

const RequestedMeals = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);
  // ---
  const { data: requestMeal, refetch } = useQuery({
    queryKey: ["requested"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/request/${user?.email}`);
      return res.data;
    },
  });

  const handleCancel = (_id) => {
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
        //   Swal.fire({
        //     title: "Deleted!",
        //     text: "Your file has been deleted.",
        //     icon: "success"
        //   });
        const res = await axiosSecure.delete(`/meals/request/${_id}`);
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

  return (
    <div>
      <h1>My requested Meal: {requestMeal?.length}</h1>
      {/* table  */}
      {requestMeal?.length !== 0 ? (
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>SL:</th>
                  <th>Meal name</th>
                  <th>likes</th>
                  <th>reviews count</th>
                  <th>status</th>
                  <th>manage</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}

                {requestMeal?.map((item, index) => (
                  <>
                    <tr className="bg-base-200">
                      <th>{index + 1}</th>
                      <td>{item.mealName}</td>
                      <td>{item?.review?.length}</td>
                      <td>{item.likes}</td>
                      <td>{item.status}</td>
                      <td>
                        <button
                          onClick={() => handleCancel(item._id)}
                          className="btn btn-primary"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <p>There is no request product</p>
        </div>
      )}
    </div>
  );
};

export default RequestedMeals;
