import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";

const ServeMeals = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: serve = [0], refetch } = useQuery({
    queryKey: ["serve"],
    queryFn: async () => {
      const res = await axiosSecure.get("meals/request/all");
      return res.data;
    },
  });
  return (
    <div>
      <h2>Serve meals: {serve.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>meal Title</th>
              <th>Use Email</th>
              <th>Name</th>
              <th>Status</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
           
           {
            serve?.map((item, index)=>(
                <tr>
                <th>{item?.index}</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
            ))
           }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServeMeals;
