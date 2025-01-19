import React, { useContext } from "react";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";
import { FaUser } from "react-icons/fa";

const AllUser = () => {
  const axiosSecure = UseAxiosSecure();
  const { deleteLoginUser } = useContext(AuthContext);
  const { data: users = [0], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${item?._id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  // handle user role
  const handleUserRole = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`users/admin/${item?._id}`).then((res) => {
          if (res.data.modifiedCount) {
            refetch()
            Swal.fire({
              title: `${item.name}`,
              text: "Your Are now admin",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <h1 className="font-bold text-3xl">USERS: {users.length}</h1>
      {/* user data table  */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>SL</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {users?.map((item, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    {item?.role === "admin" ? (
                      "admin"
                    ) : (
                      <button onClick={() => handleUserRole(item)}>
                        <FaUser></FaUser>
                      </button>
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleDelete(item)}>
                      {" "}
                      <MdDelete />{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUser;
