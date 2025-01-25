import React, { useContext, useState } from "react";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { useParams } from "react-router";
import { toast } from "react-toastify";

const MyReviews = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);
  const { _id } = useParams();
  // state variable
  const [reviewsItem, setReviewsItem] = useState(null);
  const [reviewText, setReviewText] = useState("");

  // ----------
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
  const handleEdit = (item) => {
    setReviewsItem(item);
    document.getElementById("my_modal_5").showModal();
  };
  const handleReviews = async (e) => {
    e.preventDefault();
    console.log(reviewsItem);
    const data = e.target.reviews.value;
    const updateReviews = { reviewsText: data };
    const res = await axiosSecure.patch(
      `/meals/review/${reviewsItem?._id}`,
      updateReviews
    );
    if (res.data.modifiedCount) {
      refetch();
      toast.success("Successfully Update");
    }
  };

  return (
    <div>
      <h1>My total reviews:{reviews?.length || 0}</h1>
      {/* table  */}
      <div>
        <div className="overflow-x-auto">
          {reviews?.length ? (
            <table className="table">
              {/* head */}
              <thead className="bg-primary text-white font-bold">
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
                  <>
                    <tr key={item._id} className="bg-base-200">
                      <th>{index + 1}</th>
                      <td>{item?.mealName}</td>
                      <td>{item?.like}</td>
                      <td>{item?.reviewsText}</td>
                      <td className="flex flex-col md:flex-row gap-5">
                        <button
                          onClick={() => handleEdit(item)}
                          className="btn btn-primary"
                        >
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
                  </>
                ))}
              </tbody>
            </table>
          ) : (
            "there is no Reviews"
          )}
        </div>
      </div>
      {/* modal  */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <form onSubmit={handleReviews}>
            <p>Write a review</p>
            <textarea
              placeholder="Write a review"
              name="reviews"
              id=""
              required
            ></textarea>
            <input type="submit" value={"Submit"} />
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyReviews;
