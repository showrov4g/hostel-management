import React, { useContext } from "react";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";

const MyReviews = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);
  const { data: reviews, refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/review/${user?.email}`);
      return res.data;
    },
  });
  //
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
        const res = await axiosSecure.delete(`/meals/review/${_id}`);
        if (res.data.deletedCount) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };
  // =====
  const handleEdit = () => {document.getElementById("my_modal_5").showModal()};

  return (
    <div>
      <h1>My total reviews:{reviews?.length || 0}</h1>
      {/* table  */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Meal Name</th>
                <th>likes</th>
                <th>Reviews</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {reviews?.map((item, index) => (
                <tr key={item._id} className="bg-base-200">
                  <th>{index + 1}</th>
                  <td>{item?.mealName}</td>
                  <td>{item?.like}</td>
                  <td>{item?.reviewsText}</td>
                  <td className="flex flex-col md:flex-row gap-5">
                    <button onClick={handleEdit} className="btn btn-primary">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item?._id)}
                      className="btn btn-warning"
                    >
                      Delete
                    </button>
                    <button className="btn btn-primary">Views More</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* --------table---------- */}
      <div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MyReviews;
