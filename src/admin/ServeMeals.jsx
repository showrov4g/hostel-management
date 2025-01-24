import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const ServeMeals = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: serve = [0], refetch } = useQuery({
    queryKey: ["serve"],
    queryFn: async () => {
      const res = await axiosSecure.get("meals/request/all");
      return res.data;
    },
  });
  //   /meals/request/status
  const handleServe = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then( async(result) => {
      if (result.isConfirmed) {
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
        const res = await axiosSecure.patch(`/meals/request/status/${_id}`)
        refetch();
        console.log(res)
      }
    });
  };
  console.log(serve);
  return (
    <div>
      <h2 className="text-4xl text-semibold mb-5">Serve meals: {serve.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-primary text-white">
            <tr>
              <th>SL</th>
              <th>meal Title</th>
              <th>User Email</th>
              <th>User Name</th>
              <th>Status</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {serve?.map((item, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{item?.mealName}</td>
                <td>{item?.email}</td>
                <td>{item?.name}</td>
                <td>{item?.status}</td>
                <td>
                  <button onClick={()=>handleServe(item?._id)}>serve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServeMeals;
